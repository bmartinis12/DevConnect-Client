import { Box, Typography } from "@mui/material";
import Navbar from "../navbar";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <Box height='100vh' width='100vw'>
            <Navbar />
            <Box width='100%' padding='2rem 6%' display='flex' flexDirection='column' gap='0.5rem' alignItems='center' justifyContent='center'>
                <Typography variant="h2">Page Not Found</Typography>
                <i className="fa-regular fa-face-frown" style={{ fontSize: '3rem', margin: '30px 0'}}></i>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography variant="h4" sx={{ color: '#FFA280'}} >Return home!</Typography>
                </Link>
            </Box>
        </Box>
    )
};

export default PageNotFound;