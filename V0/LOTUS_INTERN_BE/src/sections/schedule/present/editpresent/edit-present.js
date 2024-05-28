import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import InfoRecord from "src/components/info-record";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const EditPresent = ({ openEditPresent, closeEditPresent }) => {
  const closeDialog = () => {
    closeEditPresent();
  };

  // khai bao du lieu 
  const [newRow, setNewRow] = useState({});
  const [rows, setRows] = useState([
    {
      id: 1,
      stt: 1,
      tenquatang: "Rượu táo mèo",
      chuthich: "Mua quà tặng khách hàng Nguyễn Thị Cẩm Tú",
      hinhanh: ""
    },
    {
      id: 2,
      stt: 2,
      tenquatang: "Quần áo",
      chuthich: "Mua quà tặng khách hàng Nguyễn Thị Hằng, ghi chú: Quà tặng đặc biệt cho khách hàng thân thiết",
      hinhanh: ""
    },
    {
      id: 3,
      stt: 4,
      tenquatang: "Quần áo đẹp",
      chuthich: "Mua quà tặng khách hàng Nguyễn Thị Hằng, ghi chú: Quà tặng đặc biệt cho khách hàng thân thiết",
      hinhanh: ""
    },
    {
      id: 4,
      stt: 4,
      tenquatang: "Áo khoác",
      chuthich: "Mua quà tặng khách hàng Trần Văn Cường, ghi chú: Áo khoác thời trang cho mùa đông",
      hinhanh: ""
    },
    {
      id: 5,
      stt: 5,
      tenquatang: "Túi xách",
      chuthich: "Mua quà tặng khách hàng Nguyễn Thị Mai, ghi chú: Túi xách cao cấp thời trang",
      hinhanh: ""
    },
    {
      id: 6,
      stt: 6,
      tenquatang: "Áo sơ mi",
      chuthich: "Mua quà tặng khách hàng Lê Văn Tân, ghi chú: Áo sơ mi nam công sở",
      hinhanh: ""
    }
  ])

  const handleDelete = (postIndex) => {
    setRows((prevPosts) => prevPosts.filter((_, index) => index !== postIndex));
  }
  const handleEdit = (edit) => {
    const isOject = Object.keys(newRow).length === 0;
    if (isOject === false && newRow.id === edit.id) {
      const updatedRows = rows.map((row) => (row.id === edit.id ? { ...row, ...newRow } : row));
      setRows(updatedRows);
      setNewRow({});
    }
    else {
      setNewRow(edit)
    }
  }
  const handleOnChange = (field, value) => {
    setNewRow({ ...newRow, [field]: value })
  }
  const isOject = Object.keys(newRow).length === 0; // check value xem co du lieu k neu dung k co sẽ trả về true

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openEditPresent}
        fullWidth
        // maxWidth="lg"
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Chỉnh sửa quà tặng
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
                    <TableCell width={50}>Stt</TableCell>
                    <TableCell align="center" width={200}>Tên quà tặng</TableCell>
                    <TableCell align="center" width={300}>Chú thích</TableCell>
                    <TableCell align="center" width={200}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.tenquatang}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.tenquatang || items.tenquatang}
                                size="small"
                                onChange={(e) => handleOnChange('tenquatang', e.target.value)}
                                sx={{ overflow: 'auto' }}
                              />
                            ) : (
                              <Typography>{items.tenquatang}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.chuthich}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                multiline
                                rows={3}
                                variant="outlined"
                                value={newRow.chuthich || items.chuthich}
                                size="small"
                                onChange={(e) => handleOnChange('chuthich', e.target.value)}
                                sx={{ overflow: 'auto', overflow: "hidden" }}
                              />
                            ) : (
                              <Typography>{items.chuthich}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Typography>
                          {isOject === false && newRow.stt === items.stt ? (
                            <Tooltip title="Lưu">
                              <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={() => handleEdit(items)}>
                                <DoneOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Sửa">
                              <IconButton aria-label="Sửa" style={{ color: "#1C2536" }} onClick={() => handleEdit(items)}>
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
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer >
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
