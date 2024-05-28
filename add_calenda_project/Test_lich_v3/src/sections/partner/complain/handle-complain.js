import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import Popover from '@mui/material/Popover';
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const HandleComplain = (props) => {
  const { openComplain, closeComplain, waitingListUser, handleDeleteUser, handleComplainUser } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [formValues, setFormValues] = useState({
    ngaytiepnhan: null,
    loiphatsinh: "",
    phuonganxuly: "",
    nguoixuly: "",
    ghichu: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ngaytiepnhan: date,
    }));
  };

  const handleNguoiXuLyChange = (event, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      nguoixuly: value,
    }));
  };

  // Close 
  const closeDialog = () => {
    closeComplain();
  };

  // Open Popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);// khác null sẽ là true 
  const id = open ? 'input-popover' : undefined;
  // Close Popover

  const [listUser, setListUser] = useState([
    { id: 1, stt: 1, name: 'Phạm Tiến Bình', dateofbirth: '29-11-2023', gender: 'Nam', phone: '0837444553', company: 'Cong ty A', union: 'Nghiệp đoàn 1' },
    { id: 2, stt: 2, name: 'Nguyễn Thị Hương', dateofbirth: '30-02-2023', gender: 'Nữ', phone: '0912345678', company: 'Công ty B', union: 'Nghiệp đoàn 2' },
    { id: 3, stt: 3, name: 'Trần Văn Nam', dateofbirth: '10-02-2102', gender: 'Nam', phone: '0978654321', company: 'Công ty C', union: 'Nghiệp đoàn 3' },
    { id: 4, stt: 4, name: 'Nguyễn Thị An', dateofbirth: '09-09-2034', gender: 'Nữ', phone: '0898765432', company: 'Công ty D', union: 'Nghiệp đoàn 4' },
    { id: 5, stt: 5, name: 'Lê Văn Long', dateofbirth: '13-03-1990', gender: 'Nam', phone: '0923456789', company: 'Công ty E', union: 'Nghiệp đoàn 5' }
  ]);


  const handleSave = () => {
    console.log("Check data nhập vào: ", formValues)

    const updatedListUser = listUser.map(user => ({
      ...user,
      ngaytiepnhan: formValues.ngaytiepnhan,
      loiphatsinh: formValues.loiphatsinh,
      phuonganxuly: formValues.phuonganxuly,
      nguoixuly: formValues.nguoixuly,
      ghichu: formValues.ghichu,
    }));

    // Cập nhật state với danh sách người dùng đã được cập nhật
    setListUser(updatedListUser);
    handleClose();
  };

  return (
    <>

      <BootstrapDialog
        onClose={closeDialog}
        open={openComplain}
        fullWidth
        // maxWidth="xl"
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Xử lý thông tin khiếu nại
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="inherit">
            <XCircleIcon />
          </SvgIcon>
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ typography: "body1" }}>
            <TableContainer
              sx={{
                border: "1px solid rgb(224, 224, 224) !important",
              }}
              fullWidth
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                  <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={50}>STT</TableCell>
                    <TableCell align="left">Tên</TableCell>
                    <TableCell align="left">Ngày sinh</TableCell>
                    <TableCell align="left">Giới tính</TableCell>
                    <TableCell align="left">Số điện thoại</TableCell>
                    <TableCell align="left">Công ty tiếp nhận </TableCell>
                    <TableCell align="left">Nghiệp đoàn </TableCell>
                    <TableCell align="left">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waitingListUser.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.name}</TableCell>
                      <TableCell>{items.dateofbirth}</TableCell>
                      <TableCell>{items.gender}</TableCell>
                      <TableCell>{items.phone}</TableCell>
                      <TableCell>{items.company}</TableCell>
                      <TableCell>{items.union}</TableCell>
                      <TableCell align="left">
                        <Typography>
                          <Tooltip title="Chi tiết">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                // handleViewDetail(params);
                              }}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Thêm khiếu nại">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={handleClick}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton
                              sx={{ color: "black" }}
                              onClick={() => handleDeleteUser(items)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer >
          </Box>
        </DialogContent>

        {/* Tạo 1 popover để nhập dữ liệu khi thay đổi */}
        <div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div style={{ padding: '16px' }}>
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>Thêm nội dung khiếu nại</Typography>
              <DatePicker
                sx={{ width: "100%", marginTop: "4px" }}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined'
                  }
                }}
                value={formValues.ngaytiepnhan}
                onChange={handleDateChange}
                label="Ngày tiếp nhận"
              />
              <TextField
                label="Lỗi phát sinh"
                variant="outlined"
                fullWidth
                value={formValues.loiphatsinh}
                onChange={handleInputChange}
                name="loiphatsinh" // add the name attribute
                sx={{ marginTop: '12px' }}
                size="small"
              />
              <TextField
                label="Phương án xử lý"
                variant="outlined"
                fullWidth
                value={formValues.phuonganxuly}
                name="phuonganxuly"
                onChange={handleInputChange}
                sx={{ marginTop: '12px' }}
                size="small"
              />
              <Autocomplete
                sx={{ margin: "12px 0px 0px 0px " }}
                fullWidth
                size="small"
                options={["Phạm Thái An", "Nguyễn Thi Dương", "Đào Văn Đỗ"]}
                value={formValues.nguoixuly}
                onChange={handleNguoiXuLyChange}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Người xử lý"
                    name="nguoixuly"
                  />
                )}
              />
              <TextField
                label="Ghi chú"
                variant="outlined"
                fullWidth
                value={formValues.ghichu}
                onChange={handleInputChange}
                name="ghichu"
                sx={{ marginTop: '12px' }}
                size="small"
              />
              <Stack display="flex">
                <Box marginLeft="auto">
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      marginTop: "30px",
                      backgroundColor: "#1C2536",
                    }}
                  >
                    Lưu
                  </Button>
                </Box>
              </Stack>
            </div>
          </Popover>
        </div>

      </BootstrapDialog>

    </>
  );
};
