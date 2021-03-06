import uvicorn
import pickle
import pandas as pd
import numpy as np

from typing import Final
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class ModelInputs(BaseModel):
    state: str
    county: str
    population: int
    cases: int
    deaths: int
    GDP: int


app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


state_names: Final = pd.read_csv(
    './neural-network/us-counties-2020.csv')['state'].unique()

with open("./neural-network/packaged_model.pkl", "rb") as f:
    NNmodel: Final = pickle.load(f)
with open("./regression-model/linearModel.pkl", "rb") as f:
    LinearModel: Final = pickle.load(f)
with open("./neural-network/gdp_scaler.pkl", "rb") as f:
    gdp_scaler: Final = pickle.load(f)
with open("./neural-network/population_scaler.pkl", "rb") as f:
    population_scaler: Final = pickle.load(f)
with open("./neural-network/y_scaler.pkl", "rb") as f:
    y_scaler: Final = pickle.load(f)
with open('./regression-model/linearModelScaler.pkl', 'rb') as f:
    linear_model_scaler: Final = pickle.load(f)


def encodeStateName(state_name: str):
    res_dct: dict = {state: 0 for state in state_names}
    if state_name in res_dct:
        res_dct[state_name] = 1
    else:
        raise HTTPException(status_code=403,
                            detail=f'Input state name is invalid')
    return res_dct


def buildInput(data: ModelInputs) -> pd.DataFrame:
    received = dict(data)
    death_rate = data.deaths / data.population
    positivity_rate = data.cases / data.population

    del received['state']
    received.update(encodeStateName(data.state))

    model_input = pd.DataFrame(received, index=[0])
    model_input['Death Rate'] = [death_rate]
    model_input['Positivity Rate'] = [positivity_rate]

    model_input.rename(
        columns={'GDP': '2019 raw GDP', 'population': '2020 population'}, inplace=True)
    model_input.drop(columns=['county', 'cases', 'deaths'], inplace=True)

    print(model_input.columns)

    model_input['2019 raw GDP'] = gdp_scaler.transform(
        np.array(model_input['2019 raw GDP']).reshape(-1, 1))
    model_input['2020 population'] = population_scaler.transform(
        np.array(model_input['2020 population']).reshape(-1, 1))

    return model_input


def buildRegressionInput(data: ModelInputs) -> pd.DataFrame:
    received = dict(data)
    del received['state']
    del received['county']
    model_input = pd.DataFrame(received, index=[0])
    model_input.rename(
        columns={'GDP': '2019 raw GDP', 'population': '2020 population'}, inplace=True)
    model_input = model_input[['cases',  'deaths',
                               '2020 population', '2019 raw GDP']]
    return model_input


@app.get('/')
def index():
    return {'message': 'This is the homepage of the API '}


@app.post('/NNprediction')
def get_nn_prediction(data: ModelInputs):
    model_input = buildInput(data)
    y = y_scaler.inverse_transform(NNmodel.predict(model_input).reshape(-1, 1))
    print(f'predicted: {float(y)}')
    return float(y)


@app.post('/RegPrediction')
def get_regression_prediction(data: ModelInputs):
    model_input = buildRegressionInput(data)
    y = linear_model_scaler.inverse_transform(
        LinearModel.predict(model_input).reshape(-1, 1))
    return float(y)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=4000, debug=True)  # type:ignore
