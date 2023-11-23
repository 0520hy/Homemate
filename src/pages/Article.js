import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { InputAdornment, IconButton,Box, TextField, Grid, Typography, Container, Button, ButtonGroup, Divider } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router';

export default function Article() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { articleId } = useParams(); //url id
console.log(articleId);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ceprj.gachon.ac.kr:60014/article/get', {
          params: {
            articleId: articleId
          }
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log("console:",data);
  }, [articleId]);


  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Grid container maxWidth="lg" marginLeft="5vw">
        <Grid item>
          <ArrowBackIcon
          onClick={handleGoBack}
            style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }}
          />
          
        </Grid>
      
        
<Container>
  <Grid marginLeft="7vw" container justifyContent="center" alignItems="center" marginTop="40px">
    <Grid item>
      <EditNoteIcon style={{ color: '#1976d2', fontSize: 60, marginRight: '10px' }} />
    </Grid>
    <Grid item>
      <Typography variant="h4" style={{ fontWeight: 'bold', color: '#4F4E4E', display: 'inline-block' }}>
        게시글
      </Typography>
    </Grid>
  </Grid>

        {/* 게시글 */}
        <Grid container direction="row" alignItems="center" justifyContent="flex-start" marginTop="80px" marginLeft="20px">
  <Grid item>
    <AccountBoxIcon  style={{ fontSize: 90, color: '#4F4E4E', cursor: 'pointer'}}/>
  </Grid>
  <Grid item>
    <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E' }}>
      {data.nickName}
    </Typography>
    <Typography style={{ marginLeft: '15px', fontSize: '20px', color: '#757474' }}>
      날짜
    </Typography> 
  </Grid>
</Grid>

        <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">
        
          <Grid item>
            <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E', fontWeight: 'bold'}}  align="left">
              {data.title}
            </Typography>
            <Typography style={{ marginLeft: '15px', fontSize: '30px', color: '#4F4E4E' }}  align="left">
              {data.content}
            </Typography>
          </Grid>
        </Grid>
      </Container>
  </Grid>
      <Grid  >
      <Grid container justifyContent="flex-end" paddingRight="10vw" marginBottom="60px">
  <ButtonGroup  
  variant="outlined"
  aria-label="outlined button group">
    <Button >삭제</Button>
    <Button>신고하기</Button>
  </ButtonGroup>
</Grid>
<Divider style={{ margin: '20px 5vw' }} />
  </Grid>
  {data.comments && data.comments.map((comments, index) => (
  <div key={index}>
      <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">
        
        <Grid item marginLeft="6vw">
          <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '25px', color: '#4F4E4E', fontWeight: 'bold'}}  align="left">
            Re: {data.comments.nickname}
          </Typography>
          <Typography style={{ marginLeft: '15px', fontSize: '25px', color: '#4F4E4E' }}  align="left">
            {data.comments.content}
          </Typography>
          <Typography style={{ marginLeft: '15px', fontSize: '20px', color: '#757474' }}>
            날짜
          </Typography>
        </Grid>
      </Grid>
      <Grid  >
      <Grid container justifyContent="flex-end" paddingRight="10vw" marginBottom="30px">
  <ButtonGroup  
  variant="outlined"
  aria-label="outlined button group">
    <Button >삭제</Button>
    <Button>신고하기</Button>
  </ButtonGroup>
</Grid>
<Divider style={{ margin: '20px 5vw' }} />
  </Grid>
  </div>
  ))}
  <Box sx={{ position: 'fixed', bottom: 40, width: 'calc(100% - 200px)', height: '70px', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0 }}>
  <TextField
    hiddenLabel
    id="filled-hidden-label-normal"
    placeholder="댓글을 입력하세요."
    variant="filled"
    multiline
    fullWidth
    size="small"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <SendIcon />
          </IconButton>
        </InputAdornment>
      )
    }}
  />
</Box>


    </>
  );
}
