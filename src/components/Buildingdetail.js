import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useParams } from 'react-router-dom';




function preventDefault(event) {
  event.preventDefault();
}

export default function Details(props) {
  let { buildingName } = useParams();
  
 
  const [building, setBuilding] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ceprj.gachon.ac.kr:60014/building/get', {
          params: {
            buildingName: buildingName
          }
        });
        setBuilding(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [buildingName]);

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title>상세 정보</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>매물명</TableCell>
            <TableCell>{building.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>주소</TableCell>
            <TableCell>{building.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>매물 특징</TableCell>
            <TableCell>{building.content}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>층</TableCell>
            <TableCell>{building.floor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>보증금</TableCell>
            <TableCell>{building.warantPrice}만 원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>매매가</TableCell>
            <TableCell>{building.dealPrice}만 원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>월세</TableCell>
            <TableCell>{building.rentPrice}만 원</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>입주가능일</TableCell>
            <TableCell>{building.moveInDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>복층 여부</TableCell>
            <TableCell>{building.checkDuplex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>방향</TableCell>
            <TableCell>{building.direction}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>총 주차 가능 대수</TableCell>
            <TableCell>{building.numberOfParking}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>부동산명</TableCell>
            <TableCell>{building.realterName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>부동산 전화번호</TableCell>
            <TableCell>{building.realterNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>매물 종류</TableCell>
            <TableCell>{building.buildingField}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>방 개수</TableCell>
            <TableCell>{building.numberOfRoom}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>거래 유형</TableCell>
            <TableCell>{building.transactionType}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
