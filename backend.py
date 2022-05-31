from typing import Any
import uvicorn
import pickle
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel


class County(BaseModel):
    state: str
    county: str
    population: int
    cases: int
    deaths: int
    state_names: Any
    GDP: int

    def __init__(self) -> None:
        super().__init__()
        self.state_names = pd.read_csv('us-counties-2020.csv')['state'].unique()


app = FastAPI()

with open("./packaged_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.get('/')
def index():
    return {'message': 'This is the homepage of the API '}


@app.get('/prediction')
def get_prediction(data: County):
    received = dict(data)
    death_rate = data.deaths / data.population
    positivity_rate = data.cases / data.population

    return {'prediction': 'some name'}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=4000, debug=True)  # type:ignore
