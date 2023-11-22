import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 스타일링
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '2px solid #5784F7',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#5784F7',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 0),
    marginLeft: `calc(1em + ${theme.spacing(6)})`,
    marginRight: `calc(1em + ${theme.spacing(1)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default function RealtyList() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [communityList, setCommunityList] = useState([]); // 글 목록 상태
  const [itemsPerPage] = useState(20); // 페이지 당 아이템 수
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const navigate = useNavigate();

  // 커뮤니티 글 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const response = await axios.get('http://ceprj.gachon.ac.kr:60014/article/getAll', {
          params: {
            startIndex,
            endIndex,
          },
        });
        setCommunityList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  // 현재 페이지 아이템
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return communityList.slice(indexOfFirstItem, indexOfLastItem);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // 검색 api call
  const search = async () => {
    try {
      const response = await axios.get('http://ceprj.gachon.ac.kr:60014/article/search', {
        params: {
          keyword: searchTerm,
        },
      });
      setCommunityList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('검색 결과가 없습니다');
      } else {
        console.error(error);
      }
    }
  };

  // 검색 입력 (엔터) 핸들러
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    }
  };

  
  const handleGoBack = () => {
    navigate(-1);
  };
  

  return (
    <>
     <Grid container alignItems="center" justifyContent="flex-start" margin="30px">
    <ArrowBackIcon
    onClick={handleGoBack}
    style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }} />
  </Grid>
      <Grid container direction="column" justifyContent="space-around" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar elevation={0} style={{ backgroundColor: 'transparent' }} position="static">
            <Grid item style={{ margin: '100px 50px 50px 50px' }}>
              <Grid container spacing={12} alignItems="center">
                <Grid item xs={9}> 
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      style={{ color: '#898989' }}
                      placeholder="검색어를 입력해주세요."
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      onKeyPress={handleSearchKeyPress}
                    />
                  </Search>
                </Grid>
                <Grid item xs={3} justifyContent="flex-end" display="flex"> 
                <Chip
                    style={{ fontSize: "20px", width: "160px", height: "50px"}}
                    icon={<DriveFileRenameOutlineTwoToneIcon fontSize='large'/>}
                    label="글쓰기"
                    onClick={()=>{navigate("/create-article")}}
                  />
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
        <List sx={{ textAlign: 'center', width: '70%', margin: '50px', bgcolor: 'background.paper' }}>
          <Grid style={{ margin: '20px', textAlign: 'left', fontWeight: 'bold', color: '#414141' }}>커뮤니티</Grid>
          <Divider sx={{ margin: '0 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

          {getCurrentItems().map((article) => (
            <React.Fragment key={article.id}>
              <ListItem alignItems="center" onClick={() => { navigate(`/details/${encodeURIComponent(article.title)}`) }}>
                <div style={{ margin: '20px' }}>
                  <ListItemText
                    primary={<Typography variant="h5" style={{  fontSize: '1.5rem' }}>{article.title}</Typography>}
                  />
                </div>
              </ListItem>
              <Divider sx={{ margin: '0 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
            </React.Fragment>
          ))}

          <Grid sx={{ justifyContent: 'center', marginTop: '20px' }}>
            <Pagination count={Math.ceil(communityList.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
          </Grid>
        </List>
      </Grid>
    </>
  );
}
