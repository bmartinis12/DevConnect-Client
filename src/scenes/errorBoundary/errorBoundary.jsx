import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    handleReturn() {
      localStorage.removeItem('persist:root');
      localStorage.clear();
      window.location.reload()
    }
  
    render() {
      if (this.state.hasError) {
        return (
            <Box  height='100vh' width='100vw' padding='2rem 6%' display='flex' flexDirection='column' gap='0.5rem' alignItems='center' justifyContent='center'>
                <Typography variant="h2">An error has occured</Typography>
                <i className="fa-regular fa-face-frown" style={{ fontSize: '3rem', margin: '30px 0'}}></i>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography variant="h4" sx={{ color: '#FFA280'}} onClick={this.handleReturn} >Return home!</Typography>
                </Link>
            </Box>
        );
      }
  
      return this.props.children;
    }
}