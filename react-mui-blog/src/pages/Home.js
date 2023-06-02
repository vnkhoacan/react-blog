import { useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Container, Grid, Tab, Typography, Link, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Newest from "../components/home/Newest";
import Popular from "../components/home/Popular";

const Home = () => {
    const [tabValue, setTabValue] = useState('newest');
    let [searchParams, setSearchParams] = useSearchParams();

    const handleChangeTab = (event, newValue) => {
        setSearchParams({tab: newValue})
        setTabValue(newValue);
    }

    return (
        <>
            <Container sx={{ mt: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                    <Tab label="Mới nhât" value="newest"/>
                                    <Tab label="Phổ biến" value="popular" />
                                </TabList>
                            </Box>
                            <TabPanel value="newest" sx={{p : 1}}>
                                <Newest/>
                            </TabPanel>
                            <TabPanel value="popular" sx={{p : 1}}>
                                <Popular/>
                            </TabPanel>
                        </TabContext>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ p:2, border: 1, borderColor: "#e0e0e0", borderRadius: 1 }}>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography fontSize={'17px'} sx={{ fontWeight: 500}}>TÁC GIẢ NỔI BẬT</Typography>
                                <Link href="#" color="inherit" underline="hover" sx={{fontSize: "12px"}}>Xem thêm</Link>
                            </Box>
                            <Box>
                                <List>
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{ p:0}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="" />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary={
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{display: "inline"}}>vnkhoacan</Typography>
                                                <Button size="small" fontSize={5}>Theo dõi</Button>
                                            </Box>
                                        }
                                        secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
                                        />
                                    </ListItem>
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{ p:0}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="" />
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary={
                                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{display: "inline"}}>abcd</Typography>
                                                <Button size="small" fontSize={5}>Theo dõi</Button>
                                            </Box>
                                        }
                                        secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home