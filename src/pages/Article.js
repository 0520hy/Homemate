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
  const [commentContent, setCommentContent] = useState('');
 
  //article 정보 get api
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

  useEffect(() => {
    const fetchDataAndLogData = async () => {
      await fetchData();
      
    };

    fetchDataAndLogData();
  }, [articleId]);


  const handleGoBack = () => {
    navigate(-1);
  };

 //댓글 생성 api
 const createComment = async () => {
  try {
    const userId = localStorage.getItem('userId');
    await axios.post('http://ceprj.gachon.ac.kr:60014/comment/create', {
      articleId: articleId,
      content: commentContent,
      complain: 0
    }, {
      params: {
        userId: userId
      }
    });
    fetchData(); // 데이터 다시 가져오기
    setCommentContent(''); // 입력창 초기화
  } catch (error) {
    console.error(error);
  }
};

  //신고하기 게시글 api
  const createArticleComplain = async () => {
    try {
      const response = await axios.patch(
        'http://ceprj.gachon.ac.kr:60014/article/addComplain',
        null,
        {
          params: {
            articleId: articleId,
          },
        }
      );
      // API 호출 성공 시 알림창 표시
      alert('신고가 완료되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

    //신고하기 댓글 api
const createCommentComplain = async (id) => {
  try {
    const response = await axios.patch(
      'http://ceprj.gachon.ac.kr:60014/comment/addComplain',
      null,
      {
        params: {
          commentId: id,
        },
      }
    );
    // API 호출 성공 시 알림창 표시
    alert('신고가 완료되었습니다.');
  } catch (error) {
    console.error(error);
  }
};

// 게시글 삭제 api
const deleteArticle = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (userId === data.userId.toString()) { // 작성자 권한 체크
      await axios.delete('http://ceprj.gachon.ac.kr:60014/article/delete', {
        params: {
          articleId: articleId
        }
      });
      alert('게시글이 삭제되었습니다.');
      navigate('/community'); // /community로 이동
    } else {
      alert('해당 게시글 작성자만 삭제할 수 있습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};

// 댓글 삭제 api
const deleteComment = async (commentId, CommentUserId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (userId === CommentUserId.toString()) { // 작성자 권한 체크
      await axios.delete('http://ceprj.gachon.ac.kr:60014/comment/delete', {
        params: {
          commentId: commentId
        }
      });
      alert('댓글이 삭제되었습니다.');
      fetchData(); // 데이터 다시 가져오기
    } else {
      alert('해당 댓글 작성자만 삭제할 수 있습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};





  
  return (
    <>
    
      <Grid container maxWidth="lg" marginLeft="5vw">
        <Grid item marginTop="20px">
          <ArrowBackIcon
          onClick={handleGoBack}
            style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }}
          />
          
        </Grid>
      
        
<Container>
  <Grid container justifyContent="center" alignItems="center" marginTop="40px">
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
    <Typography style={{ marginLeft: '15px', textAlign: 'left', fontSize: '20px', color: '#757474' }}>
    {data.createAt && new Date(data.createAt[0], data.createAt[1] - 1, data.createAt[2]).toLocaleDateString()}
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
    <Button onClick={deleteArticle}>삭제</Button>
    <Button  onClick={createArticleComplain}>신고하기</Button>
  </ButtonGroup>
</Grid>
<Divider style={{ margin: '20px 5vw' }} />
  </Grid>
  <Box paddingBottom="100px">
  {data.comments && data.comments.map((comment, index) => {
    console.log('Comment ID:', comment.id); // 콘솔에 commentId 출력
    return (
      <div key={index}>
        <Grid container alignItems="center" justifyContent="flex-start" marginTop="20px" marginLeft="20px">
          <Grid item marginLeft="6vw">
            <Typography variant="body1" style={{ marginLeft: '15px', fontSize: '25px', color: '#4F4E4E', fontWeight: 'bold' }} align="left">
              Re: {comment.nickName}
            </Typography>
            <Typography style={{ marginLeft: '15px', fontSize: '25px', color: '#4F4E4E' }} align="left">
              {comment.content}
            </Typography>
            <Typography style={{ marginLeft: '20px', textAlign: 'left', fontSize: '20px', color: '#757474' }}>
              {comment.createAt && new Date(comment.createAt[0], comment.createAt[1] - 1, comment.createAt[2]).toLocaleDateString()}
            </Typography>
           
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" paddingRight="10vw" marginBottom="60px">
            <ButtonGroup  
            variant="outlined"
            aria-label="outlined button group">
              <Button onClick={deleteArticle}>삭제</Button>
              <Button  onClick={createArticleComplain}>신고하기</Button>
            </ButtonGroup>
          </Grid>
        <Divider style={{ margin: '20px 5vw' }} />
      </div>
    );
  })}
</Box>

  <Box sx={{ position: 'fixed', bottom: 10, width: 'calc(100% - 200px)', height: '60px', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0 }}>
  <TextField
    hiddenLabel
    id="filled-hidden-label-normal"
    placeholder="댓글을 입력하세요."
    variant="filled"
    multiline
    fullWidth
    height="120px"
    size="small"

    value={commentContent} // 입력 값과 상태 연결
    onChange={(e) => setCommentContent(e.target.value)} // 입력 이벤트 처리
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={createComment}> 
            <SendIcon />
          </IconButton>
          </InputAdornment>
      ),
    }}
    sx={{
      '& .MuiFilledInput-root': {
        backgroundColor: 'lightgray', // 배경색을 회색으로 설정
      },
    }}
  />

</Box>


    </>
  );
}
