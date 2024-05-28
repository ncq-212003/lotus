import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  SvgIcon,
  DialogActions,
  styled,
  Tooltip,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDetail from "src/components/modal-detail";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DialogContent from "@mui/material/DialogContent";
import InfoRecord from "src/components/info-record";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const EditCustomer = (props) => {
  const { openEditCustomer, closeEditCustomer } = props;

  const handleClose = () => {
    closeEditCustomer(false);
  };
  const [rows, setRows] = useState([
    {
      stt: "1",
      khachhang: "Nguyễn Hoàng Tuấn",
    },
    {
      stt: "2",
      khachhang: "Phạm Thị Thủy",
    },
    {
      stt: "3",
      khachhang: "Nguyễn Quốc An",
    },
    {
      stt: "4",
      khachhang: "Phạm gia bảo",
    },
    {
      stt: "5",
      khachhang: "Hoàng Cửu Nam",
    },
  ]);

  const [newRow, setNewRow] = useState({});

  const handleDelete = (postIndex) => {
    // Hiển thị cảnh báo trước khi xóa
    setRows((prevPosts) => prevPosts.filter((_, index) => index !== postIndex));
  };

  const handleEdit = (edit) => {
    let isOject = Object.keys(newRow).length === 0;
    setNewRow(edit);
    if (isOject === false && newRow.stt === edit.stt) {
      const listRows = [...rows];
      const index = listRows.findIndex((tt) => tt.khachhang === edit.khachhang);
      listRows[index].khachhang = newRow.khachhang;
      setRows(listRows);
      setNewRow({});
    }
  };

  const handleOnChange = (event) => {
    setNewRow({ ...newRow, khachhang: event.target.value });
  };
  let isOject = Object.keys(newRow).length === 0;

  return (
    <>
      <BootstrapDialog
        open={openEditCustomer}
        onClose={handleClose}
        fullWidth
        maxWidth="md"  // Đặt chiều rộng tối đa nếu cần
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Chỉnh sửa khách hàng
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
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

        <DialogContent dividers sx={{ width: '100%' }}>
          <Box sx={{ typography: "body1" }}>
            <Autocomplete
              fullWidth
              sx={{
                border: "1px solid rgb(224, 224, 224) !important",
                borderRadius: "10px",
              }}
              size="small"
              options={["Công ty a", "Công ty b", "Công ty c", "Nghiệp đoàn a"]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Chọn nghiệp đoàn" />}
            />

            <Box sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: "1px solid rgb(224, 224, 224) !important",
                  marginTop: "5px",
                }}
                fullWidth
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                      <TableCell width={50}>Stt</TableCell>
                      <TableCell align="center"  >
                        Tên khách hàng
                      </TableCell>
                      <TableCell align="center" width={200} >
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {isOject === true ? (
                            <Typography>{row.khachhang}</Typography>
                          ) : (
                            <>
                              {newRow.stt === row.stt ? (
                                <TextField
                                  fullWidth
                                  hiddenLabel
                                  variant="outlined"
                                  value={newRow.khachhang}
                                  size="small"
                                  onChange={handleOnChange}
                                  sx={{ overflow: 'auto', }}
                                />
                              ) : (
                                <Typography>{row.khachhang}</Typography>
                              )}
                            </>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Typography>
                            {isOject === false && newRow.stt === row.stt ? (
                              <Tooltip title="Lưu">
                                <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={() => handleEdit(row)}>
                                  <DoneOutlineIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Sửa">
                                <IconButton aria-label="Sửa" style={{ color: "#1C2536" }} onClick={() => handleEdit(row)}>
                                  <CreateIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Xóa">
                              <IconButton aria-label="Xóa" style={{ color: "#1C2536" }} onClick={() => handleDelete(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: '#e3e6e6'
          }}
        >
          <InfoRecord />
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
