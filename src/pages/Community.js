import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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


// 스타일링
const Search = styled('div')(({ theme }) => ({
  display: 'flex', // 추가: 검색창과 칩을 같은 라인에 위치시키기 위해 flex로 설정
  alignItems: 'center', // 추가: 검색창과 칩을 수직 정렬
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

const ChipContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2), // 추가: 칩의 왼쪽 여백 설정
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

  return (
    <>
      <Grid container direction="column"  justifyContent="space-around" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar elevation={0} style={{ backgroundColor: 'transparent' }} position="static">
            <Grid item style={{ margin: '100px 50px 50px 50px' }}>
             <div></div>
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
              <ChipContainer>
                <Chip 
                  size="medium"
                  icon={<DriveFileRenameOutlineTwoToneIcon />} 
                  label="글쓰기" 
                />
              </ChipContainer>
            </Grid>
          </AppBar>
        </Box>
        <List sx={{ textAlign: 'center', width: '70%', margin: '50px', bgcolor: 'background.paper' }}>
          <Grid style={{ margin: '20px', textAlign: 'left', fontWeight: 'bold', color: '#414141' }}>커뮤니티</Grid>
          <Divider sx={{ margin: '0 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

          {getCurrentItems().map((article) => (
            <React.Fragment key={article.id}>
              <ListItem alignItems="center" onClick={()=>{navigate(`/details/${encodeURIComponent(article.title)}`)}}>
               
                
                <div style={{ margin: '30px' }}>
                  <ListItemText
                    primary={<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{article.title}</Typography>}
          
                  />
                </div>
                
              </ListItem>
              <Divider sx={{ margin: '0 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              <Divider variant="inset" component="li" />
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
