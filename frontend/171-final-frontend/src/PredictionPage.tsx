import React from "react";
import { Stack, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { ModelInput, getNNPrediction } from './modelAPIs.service';
import { stateNames } from './stateNames';
import { Yolo, Augusta } from "./sampleInputs";

export const PredictionPage: React.FC = () => {

    const [selectedState, setSelectedState] = useState<string>('California');
    const [county, setCounty] = useState<string>('');
    const [population, setPopulation] = useState<number>(0);
    const [cases, setCases] = useState<number>(0);
    const [deaths, setDeaths] = useState<number>(0);
    const [GDP, setGDP] = useState<number>(0);

    const [NNResult, setNNResult] = useState<number | null>(null);

    function buildModelInput(): ModelInput {
        return {
            state: selectedState,
            county: county,
            population: population,
            cases: cases,
            deaths: deaths,
            GDP: GDP
        }
    }

    function fillInputs(data: ModelInput) {
        setSelectedState(data.state);
        setCounty(data.county);
        setPopulation(data.population);
        setCases(data.cases);
        setDeaths(data.deaths);
        setGDP(data.GDP);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            {NNResult === null ?
                <Stack direction='row' spacing={5}>
                    <Stack direction='column' spacing={2} sx={{ width: 500 }}>
                        <Typography variant='h5'>Enter County Data</Typography>
                        <TextField
                            id="outlined-basic"
                            label="County Name"
                            variant="outlined"
                            value={county}
                            onChange={(e) => setCounty(e.target.value)} />
                        <FormControl sx={{ minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
                            <Select
                                label="State"
                                id="demo-simple-select"
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                            >
                                {stateNames.map((name, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <TextField
                            type="number" id="outlined-basic"
                            label="Population"
                            variant="outlined" required={true}
                            value={population}
                            onChange={(e) => setPopulation(parseInt(e.target.value))} />
                        <TextField type="number" id="outlined-basic"
                            label="Cases"
                            variant="outlined" required={true}
                            value={cases}
                            onChange={(e) => setCases(parseInt(e.target.value))} />
                        <TextField type="number" id="outlined-basic"
                            label="Deaths"
                            variant="outlined" required={true}
                            value={deaths}
                            onChange={(e) => setDeaths(parseInt(e.target.value))} />
                        <TextField type="number" id="outlined-basic"
                            label="GDP"
                            variant="outlined" required={true}
                            value={GDP}
                            onChange={(e) => setGDP(parseInt(e.target.value))} />
                        <Button variant='contained' onClick={
                            async () => {
                                getNNPrediction(buildModelInput()).then(res => {
                                    setNNResult(res);
                                });
                            }}>
                            Predict with Neural Network
                        </Button>
                        <Button variant='contained'>Predict with Linear Regression</Button>
                    </Stack>

                    <Stack direction='column' spacing={2} sx={{ width: 200 }}>
                        <Typography variant='h5'>Sample Inputs</Typography>
                        <Button variant='outlined' onClick={() => fillInputs(Yolo)}>Yolo County, CA</Button>
                        <Button variant='outlined' onClick={() => fillInputs(Augusta)}>Augusta County, VA</Button>
                    </Stack>

                </Stack>

                :
                <Stack spacing={5}>
                    <Typography variant='h5'>
                        The model result is {NNResult!.toFixed(2)}% change in GDP
                    </Typography>
                    <Button variant='outlined' onClick={() => { setNNResult(null) }}>
                        Reset
                    </Button>
                </Stack>
            }
        </Box>
    )
}