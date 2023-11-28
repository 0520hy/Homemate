import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from '../components/Buildingdetail';
import Swiper from '../components/Swiper';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const defaultTheme = createTheme();


export default function Details(props) {

  let { buildingName } = useParams();
  
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
    
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            <Grid container alignItems="center" justifyContent="flex-start" margin="30px">
            <ArrowBackIcon
            onClick={handleGoBack}
            style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }} />
          </Grid>
             <Swiper buildingName={buildingName}/>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders buildingName={buildingName} />
                </Paper>
              </Grid>
            </Grid>
           
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}