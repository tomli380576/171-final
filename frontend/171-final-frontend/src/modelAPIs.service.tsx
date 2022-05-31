import axios from 'axios';

interface ModelInput {
    state: string
    county: string
    population: number
    cases: number
    deaths: number
    GDP: number
}


async function getPrediction(inputs: ModelInput): Promise<number> {
    const response = axios.post('http://127.0.0.1:4000/prediction', { inputs });
    return (await response).data;
}