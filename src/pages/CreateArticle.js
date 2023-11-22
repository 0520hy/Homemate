import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Grid, Typography, TextField, Divider, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function CreateArticle() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <>
 <Grid item>
          <ArrowBackIcon 
          style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }} 
          onClick={handleGoBack}/>
        </Grid>
    <Container> 
      <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px">
      </Grid>
      <Grid container alignItems="center" justifyContent="center" marginTop="40px">
        <Grid item>
          <AssignmentTwoToneIcon style={{ color: '#1976d2', fontSize: 60, marginRight: '10px' }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" style={{ fontWeight: 'bold', color: '#4F4E4E', display: 'inline-block' }}>
            커뮤니티 글쓰기
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" marginTop="80px">
        <Grid item  style={{ width: "80vw" }}>
          <TextField
            id="outlined-basic"
            label="제목"
            variant="outlined"
            style={{ width: "100%", marginBottom: '10px' }}
          />
        </Grid>
        
        <Grid item style={{ width: "80vw" }}>
          <Divider style={{ margin: '20px 0' }} />
          <TextField
            id="outlined-basic"
            label="내용을 입력하세요"
            variant="outlined"
            multiline
            rows={20}
            style={{ width: "100%", marginBottom: '10px' }}
          />
        </Grid>
      
      </Grid>
      <Grid container justifyContent="center" marginTop="80px">
        <Grid item>
          <Button 
            style={{ fontSize: "20px", width: "250px" }}
            variant="contained" 
            endIcon={<SendIcon />}
          >
            확인
          </Button>
        </Grid>
      </Grid>
    </Container></>
  );
}
