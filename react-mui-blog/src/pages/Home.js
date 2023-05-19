import { useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Container, Tab } from "@mui/material";

const Home = () => {
    const [tabValue, setTabValue] = useState('1');

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <>
        <Container>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Mới nhât" value="newest" />
                        <Tab label="Phổ biến" value="popular" />
                    </TabList>
                </Box>
                <TabPanel value="newest">Mới nhât</TabPanel>
                <TabPanel value="popular">Phổ biến</TabPanel>
            </TabContext>
        </Container>
        </>
    )
}

export default Home