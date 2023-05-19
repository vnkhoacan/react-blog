import { Box, Container, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

const ListPost = () => {
    return (
        <>
            <Box>
                <Container>
                    <Box mt={5}>
                        <Typography
                            variant="h4"
                            align="center"
                            fontWeight={700}
                            textTransform={"uppercase"}
                            gutterBottom
                        >
                            List Post
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Body</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ListPost