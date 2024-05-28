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

export const EditCalander = (props) => {
  const { openEditCalendar, closeEditCalendar } = props;

  const handleClose = () => {
    closeEditCalendar(false);
  };
  const [rows, setRows] = useState([
    {
      stt: "1",
      tenlich: "Lịch họp quan trọng",
    },
    {
      stt: "2",
      tenlich: "Lịch sinh nhật",
    },
    {
      stt: "3",
      tenlich: "Lịch ăn nhà hàng",
    },
    {
      stt: "4",
      tenlich: "Lịch sự kiện đặc biệt",
    },
    {
      stt: "5",
      tenlich: "Lịch đón khách sân bay",
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
      const index = listRows.findIndex((tt) => tt.tenlich === edit.tenlich);
      listRows[index].tenlich = newRow.tenlich;
      setRows(listRows);
      setNewRow({});
    }
  };

  const handleOnChange = (event) => {
    setNewRow({ ...newRow, tenlich: event.target.value });
  };
  let isOject = Object.keys(newRow).length === 0;

  return (
    <>
      <BootstrapDialog
        open={openEditCalendar}
        onClose={handleClose}
        fullWidth
        maxWidth="md"  // Đặt chiều rộng tối đa nếu cần
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Chỉnh sửa lịch
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
          <Box sx={{ typography: "body1", padding: "2px" }}>
            <Box sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: "1.5px solid rgb(224, 224, 224) !important",
                }}
                fullWidth
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                      <TableCell width={50}>Stt</TableCell>
                      <TableCell align="center">
                        Tên lịch
                      </TableCell>
                      <TableCell align="center" width={200} >
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {isOject === true ? (
                            <Typography>{row.tenlich}</Typography>
                          ) : (
                            <>
                              {newRow.stt === row.stt ? (
                                <TextField
                                  fullWidth
                                  hiddenLabel
                                  variant="outlined"
                                  value={newRow.tenlich}
                                  size="small"
                                  onChange={handleOnChange}
                                  sx={{ overflow: 'auto', }}
                                />
                              ) : (
                                <Typography>{row.tenlich}</Typography>
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
