import uvicorn
import pickle
import pandas as pd

from typing import Final
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


class County(BaseModel):
    state: str
    county: str
    population: int
    cases: int
    deaths: int
    GDP: int


app = FastAPI()
state_names: Final = pd.read_csv('us-counties-2020.csv')['state'].unique()

with open("./packaged_model.pkl", "rb") as f:
    model = pickle.load(f)


@app.get('/')
def index():
    return {'message': 'This is the homepage of the API '}


def encodeStateName(state_name: str):
    res_dct: dict = {state: 0 for state in state_names}
    if state_name in res_dct:
        res_dct[state_name] = 1
    else:
        raise HTTPException(status_code=403,
                            detail=f'Input state name is invalid')
    return res_dct


@app.get('/prediction')
def get_prediction(data: County):
    received = dict(data)
    death_rate = data.deaths / data.population
    positivity_rate = data.cases / data.population

    del received['state']
    model_input = pd.DataFrame.from_dict({
        received.update(encodeStateName(data.state))
    })
    model_input['death_rate']
    print(model_input)

    return {'prediction': 'some name'}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=4000, debug=True)  # type:ignore
