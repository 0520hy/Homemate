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
  const [buildingList, setBuildingList] = useState([]); // 건물 목록 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage] = useState(20); // 페이지 당 아이템 수
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부 상태
  const navigate = useNavigate();
 

 // 컴포넌트 마운트 후 초기 데이터 가져오기
 useEffect(() => {
  fetchData();
}, []);

// 데이터 불러오기
const fetchData = async () => {
  try {
    setLoading(true);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const response = await axios.get('http://ceprj.gachon.ac.kr:60014/building/getAll', {
      params: {
        startIndex,
        endIndex,
      },
    });
    const newData = response.data;
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setBuildingList((prevData) => [...prevData, ...newData]);
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
    fetchData();
  }
};


  // 건물 가격 텍스트
  const getPriceText = (building) => {
    let priceText = '';
    if (building.transactionType === '월세' || building.transactionType === '단기임대') {
      priceText = ` ${building.rentPrice}만 원`;
    } else if (building.transactionType === '전세') {
      priceText = ` ${building.warantPrice}만 원`;
    } else if (building.transactionType === '매매') {
      priceText = ` ${building.dealPrice}만 원`;
    }
    return `${building.transactionType} ${priceText}`;
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // 검색 api call
  const search = async () => {
    try {
      const response = await axios.get('http://ceprj.gachon.ac.kr:60014/building/search', {
        params: {
          keyword: searchTerm,
        },
      });
      setBuildingList(response.data);
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
          style={{ fontSize: 50, color: '#4F4E4E', cursor: 'pointer' }}
        />
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {/* ... */}
        <List sx={{ textAlign: 'center', width: '70%', margin: '50px', bgcolor: 'background.paper' }}>
          {/* ... */}
          {buildingList.map((building) => (
            <React.Fragment key={building.id}>
              <ListItem alignItems="center" onClick={() => { navigate(`/details/${encodeURIComponent(building.buildingName)}`) }}>
                {/* ... */}
              </ListItem>
              <Divider sx={{ margin: '0 0', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          {loading && (
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', marginTop: '20px' }}>
              로딩 중...
            </Typography>
          )}
        </List>
      </Grid>
    </>
  );
}