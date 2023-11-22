import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Grid, Typography, TextField, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateArticle() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const userId = 123; // 사용자의 실제 userId로 변경해주세요
      const data = {
        title: title,
        content: content,
        complain: 0
      };

      await axios.post(`http://ceprj.gachon.ac.kr:60014/article/create?userId=${userId}`, data);
   
      navigate('/main');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px">
        <Grid item>
          <ArrowBackIcon style={{ fontSize: 30, cursor: 'pointer' }} onClick={handleGoBack} />
        </Grid>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Grid>
      
      </Grid>
      <Grid container justifyContent="center" marginTop="80px">
        <Grid item>
          <Button 
            style={{ fontSize: "20px", width: "250px" }}
            variant="contained" 
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            확인
          </Button>
        </Grid>
      </Grid>
      {showAlert && (
        <Grid container justifyContent="center" marginTop="20px">
          <Typography variant="body1" style={{ color: 'green' }}>
            게시글이 작성되었습니다.
          </Typography>
        </Grid>
      )}
    </Container>
  );
}