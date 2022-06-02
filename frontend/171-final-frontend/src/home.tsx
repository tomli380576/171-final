import React from "react";
import { Stack, Button, Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Stack
                direction='column'
                justifyContent="center"
                alignItems="center"
                spacing={10}
                sx={{ width: 500 }}>
                <Typography variant="h2">
                    GDP impact regressor
                </Typography>

                <Button sx={{ height: 100, width: '100%' }} variant="outlined" onClick={() => navigate('/prediction')}>
                    Go to Prediction Page
                </Button>
            </Stack>
        </Box>
    )
}