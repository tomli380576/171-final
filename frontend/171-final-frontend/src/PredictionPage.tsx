import React from "react";
import { Stack, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ModelInput, getNNPrediction } from './modelAPIs.service';
import { stateNames } from './stateNames';

const defaultInputs: ModelInput = {
    state: 'California',
    county: '',
    population: 0,
    cases: 0,
    deaths: 0,
    GDP: 0
};

export const PredictionPage: React.FC = () => {

    const [inputs, setInputs] = useState<ModelInput>(defaultInputs);
    const [selectedState, setSelectedState] = useState<string>('California');
    const [NNResult, setNNResult] = useState<number| null>(null);

    function handleChange(key: string, value: string | number) {
        inputs[key] = value;
        console.log(inputs)
        setInputs(inputs);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            {NNResult === null ?
                <Stack direction='column' spacing={2} sx={{ width: 500 }}>
                    <TextField id="outlined-basic" label="County Name" variant="outlined" onChange={(e) => handleChange('county', e.target.value)} />
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
                        <Select
                            label="State"
                            id="demo-simple-select"
                            value={selectedState}
                            onChange={(e) => {
                                handleChange('state', e.target.value)
                                setSelectedState(e.target.value)
                            }}
                        >
                            {stateNames.map(name => <MenuItem value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField type="number" id="outlined-basic" label="Population" variant="outlined" required={true} onChange={(e) => {
                        handleChange('population', parseInt(e.target.value))
                    }} />
                    <TextField type="number" id="outlined-basic" label="Cases" variant="outlined" required={true} onChange={(e) => {
                        handleChange('cases', parseInt(e.target.value))
                    }} />
                    <TextField type="number" id="outlined-basic" label="Deaths" variant="outlined" required={true}
                        onChange={(e) => {
                            handleChange('deaths', parseInt(e.target.value))
                        }} />
                    <TextField type="number" id="outlined-basic" label="GDP" variant="outlined" required={true}
                        onChange={(e) => {
                            handleChange('GDP', parseInt(e.target.value))
                        }} />
                    <Button variant='contained' onClick={
                        async () => {
                            getNNPrediction(inputs).then(res => {
                                setNNResult(res);
                            });

                        }}>
                        Predict with Neural Network
                    </Button>
                    <Button variant='contained'>Predict with Linear Regression</Button>
                </Stack>
                :
                <Stack>
                    <Typography variant='h5'>
                        The model result is {NNResult!.toFixed(2)}% change in GDP
                    </Typography>
                </Stack>
            }
        </Box>
    )
}