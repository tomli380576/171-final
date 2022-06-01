import React from "react";
import { Stack, Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { ModelInput, getNNPrediction } from './modelAPIs.service';

const defaultInputs: ModelInput = {
    state: "",
    county: "",
    population: 0,
    cases: 0,
    deaths: 0,
    GDP: 0
};

export const PredictionPage: React.FC = () => {

    const [inputs, setInputs] = useState<ModelInput>(defaultInputs);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Stack direction='column' spacing={2} sx={{ width: 500 }}>
                <TextField id="outlined-basic" label="County Name" variant="outlined"
                    onChange={(e) => {
                        inputs.county = e.target.value;
                    }} />
                <TextField id="outlined-basic" label="State Name" variant="outlined" required={true}
                    onChange={(e) => {
                        inputs.state = e.target.value;
                    }} />
                <TextField id="outlined-basic" label="Population" variant="outlined" required={true} onChange={(e) => {
                    inputs.population = parseInt(e.target.value);
                }} />
                <TextField id="outlined-basic" label="Cases" variant="outlined" required={true} onChange={(e) => {
                    inputs.cases = parseInt(e.target.value);
                }} />
                <TextField id="outlined-basic" label="Deaths" variant="outlined" required={true}
                    onChange={(e) => {
                        inputs.deaths = parseInt(e.target.value);
                    }} />
                <TextField id="outlined-basic" label="GDP" variant="outlined" required={true}
                    onChange={(e) => {
                        inputs.GDP = parseInt(e.target.value);
                    }} />
                <Button variant='contained' onClick={() => getNNPrediction(inputs)}>Predict with Neural Network</Button>
                <Button variant='contained'>Predict with Linear Regression</Button>
            </Stack>
        </Box>
    )
}