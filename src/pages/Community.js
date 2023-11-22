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

export default function Community() {

  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const navigate = useNavigate();
 

  



  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar elevation={0} style={{ backgroundColor: 'transparent' }} position="static">
            <Grid item style={{ margin: '100px 50px 50px 50px' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  style={{ color: '#898989' }}
                  placeholder="지역명 또는 단지명으로 검색해주세요."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  
                />
              </Search>
            </Grid>
            <DriveFileRenameOutlineTwoToneIcon>
             글쓰기</DriveFileRenameOutlineTwoToneIcon>
          </AppBar>
        </Box>

      </Grid>
    </>
  );
}
