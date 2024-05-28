import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
// import IconButton from '@mui/material/IconButton';

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
  const closeDialog = () => {
    closeComplain();
  };

  const [newRow, setNewRow] = useState({});
  const handleOnChange = (field, value) => {
    setNewRow({ ...newRow, [field]: value })
  }
  // check value xem co du lieu k neu dung k co sẽ trả về true

  const [isOject, setIsOject] = useState(true);

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
                    <TableCell align="center">Tên</TableCell>
                    <TableCell align="center">Ngày sinh</TableCell>
                    <TableCell align="center">Giới tính</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Công ty tiếp nhận </TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waitingListUser.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.ten}</TableCell>
                      <TableCell>{items.ngaysinh}</TableCell>
                      <TableCell>{items.gioitinh}</TableCell>
                      <TableCell>{items.sodienthoai}</TableCell>
                      <TableCell>{items.congtytiepnhan}</TableCell>
                      <TableCell align="center">
                        <Typography>
                          {isOject === false ? (
                            // <DoneOutlineIcon
                            //   sx={{ color: "#1C2536", marginRight: "30px" }}
                            //   onClick={() => handleComplainUser(items)}
                            // />

                            <Tooltip title="Thêm">
                              <IconButton aria-label="add" style={{ color: "#000000" }} >
                                <DoneOutlineIcon
                                  sx={{ color: "#1C2536", marginRight: "30px" }}
                                  onClick={() => handleComplainUser(items)}
                                />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Thêm">
                              <IconButton aria-label="add" style={{ color: "#000000" }} >
                                <CreateIcon
                                  sx={{ color: "#1C2536", marginRight: "30px" }}
                                  onClick={() => handleComplainUser(items)}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          <DeleteIcon sx={{ color: "#1C2536" }} onClick={() => handleDeleteUser(items)} />
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
      </BootstrapDialog>
    </>
  );
};
