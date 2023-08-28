import React from "react";
import s from './AdminNav.module.css'
import {Tabs, Tab, Box, Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function AdminNav() {
    const [value, setValue] = React.useState("products");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Grid item xs={12}>
            <Tabs
                variant="scrollable"
                value={value}
                scrollButtons
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab key={1} label='products' value='products' component={Link} to='products'/>
                <Tab key={2} label='colors' value='colors' component={Link} to='colors' />
                <Tab key={3} label='categories' value='categories' component={Link} to='categories' />
                <Tab key={4} label='properties' value='properties' component={Link} to='properties' />
                <Tab key={5} label='brand' value='brand' component={Link} to='brand' />
                <Tab key={6} label='models' value='models' component={Link} to='models' />
                <Tab key={7} label='questions' value='questions' component={Link} to='questions' />
                <Tab key={8} label='orders' value='orders' component={Link} to='orders' />
            </Tabs>
        </Grid>
    )
}

export default AdminNav