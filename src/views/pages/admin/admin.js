import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import Blogs from './sections/blogs';

function TabPanel(props) {
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [value, setValue] = useState(0);
    useEffect(() => {
        let person = prompt("Please enter password:");
        if (person == null || person == "" || person !== "admin") {
            window.alert("Not authenticated !");
        } else {
            setIsAdmin(true);
        }
    }, []);

    if (isAdmin) {
        return (
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', padding: 1 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={(_, value) => { setValue(value) }}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Blogs" {...a11yProps(0)} />
                    <Tab label="Videos" {...a11yProps(1)} />
                    <Tab label="Forums" {...a11yProps(2)} />
                    <Tab label="Reports" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Blogs />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Videos
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Forums
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Reports
                </TabPanel>
            </Box >
        );
    }

    return <div>
        <h1>Not authorized</h1>
    </div>

}
