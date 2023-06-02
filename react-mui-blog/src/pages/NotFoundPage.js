import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Container>
            <Box
            sx={{
                marginTop: 16
            }}
            >
                <Typography
                    variant="h1"
                    fontSize={170}
                    textAlign={"center"}
                >404</Typography>
                <Typography
                    textAlign={"center"}
                    fontSize={30}
                >Trang không tồn tại</Typography>
                <Box
                display={"flex"}
                justifyContent={"center"}
                >
                    <Button
                    size="large"
                    component={ Link }
                    to='/'
                    variant="contained"
                    sx={{marginTop: 2}}
                    >Trở lại trang chủ</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default NotFoundPage;