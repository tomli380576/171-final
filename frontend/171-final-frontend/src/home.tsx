import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Stack
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={10}>
            <Typography variant="h1">
                COVID - GDP impact regrssor
            </Typography>


            <Button className="nav-buttons" variant="outlined" onClick={() => navigate('/prediction')}>
                Go to Prediction Page
            </Button>
        </Stack>
    )
}