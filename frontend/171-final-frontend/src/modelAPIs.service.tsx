import axios from 'axios';

export interface ModelInput {
    state: string
    county: string
    population: number
    cases: number
    deaths: number
    GDP: number
}

export async function getNNPrediction(inputs: ModelInput): Promise<number> {
    const response = axios.post('http://127.0.0.1:4000/NNprediction', inputs);
    return (await response).data;
}

export async function getRegressionPrediction(inputs: ModelInput): Promise<number> {
    const response = axios.post('http://127.0.0.1:4000/RegPrediction', inputs);
    return (await response).data;
}