import {
  Card,
  Stack,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Table,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { HandleComplain } from "./handle-complain";

export const AddComplain = (props) => {
  const [openComplain, setOpenComplain] = useState(false);

  const handleClickOpen = () => {
    setOpenComplain(true);
  };

  const handleClose = () => {
    setOpenComplain(false);
  };
  const [searchUserComplain, setSearchUserComplain] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [listSuccessComplain, setListSuccessComplain] = useState([]);

  // Tìm kiếm người mà công ty cần khiếu nại 
  const handleSearchUser = () => {
    if (!searchUserComplain) {
      setSearchResults([]);
      return;
    }
    const listUser = [
      { id: 1, stt: 1, ten: 'Phạm Tiến Bình', ngaysinh: '29-11-2023', gioitinh: 'Nam', sodienthoai: '0837444553', congtytiepnhan: 'Cong ty A' },
      { id: 2, stt: 2, ten: 'Nguyễn Thị Hương', ngaysinh: '30-02-2023', gioitinh: 'Nữ', sodienthoai: '0912345678', congtytiepnhan: 'Công ty B' },
      { id: 3, stt: 3, ten: 'Trần Văn Nam', ngaysinh: '10-02-2102', gioitinh: 'Nam', sodienthoai: '0978654321', congtytiepnhan: 'Công ty C' },
      { id: 4, stt: 4, ten: 'Nguyễn Thị An', ngaysinh: '09-09-2034', gioitinh: 'Nữ', sodienthoai: '0898765432', congtytiepnhan: 'Công ty D' },
      { id: 5, stt: 5, ten: 'Lê Văn Long', ngaysinh: '13-03-1990', gioitinh: 'Nam', sodienthoai: '0923456789', congtytiepnhan: 'Công ty E' }
    ]
    const filterUserComplain = listUser.filter(user => user.ten.toLowerCase().includes(searchUserComplain.toLowerCase()));
    setSearchResults(filterUserComplain);
  }

  // Thêm danh sách người cần xử lý ở bảng chờ xử lý 
  const listUserWaiting = (row) => {
    // xóa nguoi dung trong danh sách tìm kiếm
    setSearchResults(searchResults.filter((user) => user.id !== row.id));
    //them nguoi dùng vào danh sách xử lý
    setWaitingList([...waitingList, row])
  }
  // xóa người dùng ở danh sách chở và đưa vào mục xử lý
  const deleteUserComplain = (row) => {
    setWaitingList(waitingList.filter(user => user.id !== row.id))
  }

  // Thêm khiếu nại 
  const handleUserComplain = (newRow) => {
    const updatedList = [...waitingList];
    const rowIndex = updatedList.findIndex(items => items.id === newRow.id); //có sẽ trả về vị trí của mảng đấy và ngược lại -1 
    console.log("checkkkrow", rowIndex)
    if (rowIndex !== -1) {
      updatedList[rowIndex] = { ...newRow };
    }
    setListSuccessComplain(updatedList);
    alert("Thanh cong")
  }

  return (
    <>
      <Stack spacing={3}>
        <Paper
          component="form"
          sx={{
            p: "0px 4px",
            display: "flex",
            alignItems: "center",
            width: "50%",
            margin: "30px 15px 0px 15px ",
            border: "1px solid",
            borderColor: "black",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tên thực tập sinh/ du học sinh"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => {
              setSearchUserComplain(event.target.value)
              handleSearchUser()
            }
            }
            autoFocus
          />
          <Tooltip title="Tìm kiếm">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                onClick={handleSearchUser}
              />
            </IconButton>
          </Tooltip>
        </Paper>
        <TableContainer component={Paper}>
          <Typography sx={{ fontWeight: "700", margin: "20px 0px 20px 15px", fontSize: "17px" }}>
            Danh sách kết quả tìm kiếm
          </Typography>
          <Table>
            <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
              <TableRow>
                <TableCell>Stt</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Công ty tiếp nhận </TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography>{row.ten}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.ngaysinh}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.gioitinh}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.sodienthoai}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.congtytiepnhan}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text"
                      onClick={() => listUserWaiting(row)}
                    >
                      Thêm
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Danh sách chở xử lý */}

        <TableContainer component={Paper}>
          <Typography sx={{ fontWeight: "700", margin: "20px 0px 20px 15px", fontSize: "17px" }}>
            Danh sách chờ xử lý
          </Typography>
          <Table>
            <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
              <TableRow>
                <TableCell>Stt</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Công ty tiếp nhận </TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waitingList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">
                    <Typography>{row.ten}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.ngaysinh}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.gioitinh}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.sodienthoai}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{row.congtytiepnhan}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text"
                      onClick={() => deleteUserComplain(row)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1C2536" }}
            onClick={handleClickOpen}
          >
            Xử lý chung
          </Button>
        </Box>
      </Stack>
      <HandleComplain
        openComplain={openComplain}
        closeComplain={handleClose}
        waitingListUser={waitingList}
        handleDeleteUser={deleteUserComplain}
        handleComplainUser={handleUserComplain}
      />
    </>
  );
};
