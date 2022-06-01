import React from "react";
import { Stack, Button, Typography } from "@mui/material";

export const Home: React.FC = () => {
    return (
        <Stack
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={10}>
            <Typography variant="h1">
                COVID - GDP impact regrssor
            </Typography>


            <Button className="nav-buttons" variant="outlined">
                Go to Prediction Page
            </Button>
        </Stack>
    )
}