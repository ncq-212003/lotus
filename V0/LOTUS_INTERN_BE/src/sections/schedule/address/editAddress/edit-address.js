import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InfoRecord from "src/components/info-record";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const EditAddress = ({ openEditAdress, closeEditAdress }) => {
  const closeDialog = () => {
    closeEditAdress();
  };
  const [newRow, setNewRow] = useState({});
  // khai bao du lieu 
  const [rows, setRows] = useState([
    {
      id: 1,
      stt: 1,
      tendiadiem: "Nhà hàng Nam Phương",
      nguoilienhe: "Nguyễn Thị Tâm",
      sodienthoaiban: "04857456374",
      sodienthoaididong: "054365634",
      tinhthanhpho: "Hà Nội",
      quanhuyen: "Dống Đa",
      xaphuong: "Láng Hạ",
      kinhdo: "85*",
      vido: "36*",
      loai: "Loại 1",
    },
    {
      id: 2,
      stt: 2,
      tendiadiem: "Nhà hàng Mỹ Lệ",
      nguoilienhe: "Nguyễn Văn Nam",
      sodienthoaiban: "0436523456",
      sodienthoaididong: "0987654321",
      tinhthanhpho: "Hồ Chí Minh",
      quanhuyen: "Quận 1",
      xaphuong: "Bến Nghé",
      kinhdo: "106*",
      vido: "10*",
      loai: "Loại 2",
    },
    {
      id: 3,
      stt: 3,
      tendiadiem: "Nhà hàng Hoàng Yến",
      nguoilienhe: "Trần Thị Hương",
      sodienthoaiban: "0245678910",
      sodienthoaididong: "0912345678",
      tinhthanhpho: "Hà Nội",
      quanhuyen: "Hoàn Kiếm",
      xaphuong: "Hàng Bạc",
      kinhdo: "105*",
      vido: "21*",
      loai: "Loại 3",
    },
    {
      id: 4,
      stt: 5,
      tendiadiem: "Nhà hàng Nam Dương",
      nguoilienhe: "Trần Thị Thảo",
      sodienthoaiban: "0245678910",
      sodienthoaididong: "0912345678",
      tinhthanhpho: "Hà Nội",
      quanhuyen: "Dống Da",
      xaphuong: "Hàng Kay",
      kinhdo: "105*",
      vido: "21*",
      loai: "Loại 4",
    },
    {
      id: 5,
      stt: 5,
      tendiadiem: "Nhà hàng Hoa Sữa",
      nguoilienhe: "Phạm Thị Hiền",
      sodienthoaiban: "0567891234",
      sodienthoaididong: "0823456789",
      tinhthanhpho: "Đà Nẵng",
      quanhuyen: "Sơn Trà",
      xaphuong: "Mỹ An",
      kinhdo: "108*",
      vido: "15*",
      loai: "Loại 5",
    },
    {
      id: 6,
      stt: 6,
      tendiadiem: "Nhà hàng Lẩu Quê",
      nguoilienhe: "Trần Văn Thắng",
      sodienthoaiban: "0398765432",
      sodienthoaididong: "0976543210",
      tinhthanhpho: "Hà Nội",
      quanhuyen: "Hai Bà Trưng",
      xaphuong: "Tràng Tiền",
      kinhdo: "105*",
      vido: "21*",
      loai: "Loại 6",
    },
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
        open={openEditAdress}
        fullWidth
        // maxWidth="lg"
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Chỉnh sửa địa điểm
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
                  <TableRow sx={{ border: "1.5px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={50}>Stt</TableCell>
                    <TableCell align="center" width={250}>Tên địa điểm</TableCell>
                    <TableCell align="center" width={95}>Người liên hệ</TableCell>
                    <TableCell align="center" width={150}>Số điện thoại bàn</TableCell>
                    <TableCell align="center" width={200}>Số điện thoại di động</TableCell>
                    <TableCell align="center" width={300}>Tỉnh/ Thành phố</TableCell>
                    <TableCell align="center" width={200}>Quận/ Huyện</TableCell>
                    <TableCell align="center" width={200}>Xã/ Phường</TableCell>
                    <TableCell align="center" width={200}>Kinh độ</TableCell>
                    <TableCell align="center" width={200}>Vĩ độ</TableCell>
                    <TableCell align="center" width={180}>Loại</TableCell>
                    <TableCell align="center" width={200}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.tendiadiem}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.tendiadiem || items.tendiadiem}
                                size="small"
                                onChange={(e) => handleOnChange('tendiadiem', e.target.value)}
                                sx={{ overflow: 'auto' }}
                              />
                            ) : (
                              <Typography>{items.tendiadiem}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.nguoilienhe}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.nguoilienhe || items.nguoilienhe}
                                size="small"
                                onChange={(e) => handleOnChange('nguoilienhe', e.target.value)}
                                sx={{ overflow: 'auto' }}
                              />
                            ) : (
                              <Typography>{items.nguoilienhe}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.sodienthoaiban}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.sodienthoaiban || items.sodienthoaiban}
                                size="small"
                                onChange={(e) => handleOnChange('sodienthoaiban', e.target.value)}
                                // InputProps={{
                                //   inputProps: { value: newRow.sodienthoaiban || items.sodienthoaiban }
                                // }}
                                sx={{ overflow: 'auto' }}
                              />
                            ) : (
                              <Typography>{items.sodienthoaiban}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.sodienthoaididong}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.sodienthoaididong || items.sodienthoaididong}
                                size="small"
                                onChange={(e) => handleOnChange('sodienthoaididong', e.target.value)}
                                sx={{ overflow: 'auto' }}
                              />
                            ) : (
                              <Typography>{items.sodienthoaididong}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.tinhthanhpho}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <Autocomplete
                                sx={{ margin: "12px 0px 0px 4px " }}
                                fullWidth
                                size="small"
                                value={newRow.tinhthanhpho || items.tinhthanhpho}
                                options={["Hà nội", "Vĩnh phúc", "Thái bình"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Tỉnh/ Thành phố" />}
                                onChange={(event, value) => handleOnChange("tinhthanhpho", value)}
                              />
                            ) : (
                              <Typography>{items.tinhthanhpho}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.quanhuyen}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <Autocomplete
                                sx={{ margin: "12px 0px 0px 4px " }}
                                fullWidth
                                size="small"
                                value={newRow.quanhuyen || items.quanhuyen}
                                options={["Đống Đa", "Vĩnh Tường", "Yên Nhiên"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Quận/ Huyện" />}
                                onChange={(event, value) => handleOnChange("quanhuyen", value)}
                              />
                            ) : (
                              <Typography>{items.quanhuyen}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.xaphuong}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <Autocomplete
                                sx={{ margin: "12px 0px 0px 4px " }}
                                fullWidth
                                size="small"
                                value={newRow.xaphuong || items.xaphuong}
                                options={["Láng hạ", "Tân Tiến", "Bình Dương"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Xã/ Phường" />}
                                onChange={(event, value) => handleOnChange("xaphuong", value)}
                              />
                            ) : (
                              <Typography>{items.xaphuong}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.kinhdo}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.kinhdo || items.kinhdo}
                                size="small"
                                onChange={(e) => handleOnChange('kinhdo', e.target.value)}
                                sx={{ overflow: 'auto', overflow: "hidden" }}
                              />
                            ) : (
                              <Typography>{items.kinhdo}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.vido}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <TextField
                                fullWidth
                                hiddenLabel
                                variant="outlined"
                                value={newRow.vido || items.vido}
                                size="small"
                                onChange={(e) => handleOnChange('vido', e.target.value)}
                                sx={{ overflow: 'auto', overflow: "hidden" }}
                              />
                            ) : (
                              <Typography>{items.vido}</Typography>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {isOject === true ? (
                          <Typography>{items.loai}</Typography>
                        ) : (
                          <>
                            {newRow.id === items.id ? (
                              <Autocomplete
                                sx={{ margin: "12px 0px 0px 4px " }}
                                fullWidth
                                size="small"
                                value={newRow.loai || items.loai}
                                options={["Nhà hàng", "Khách san", "Sân bay"]}
                                renderInput={(params) => <TextField variant="outlined" {...params} label="Loại" />}
                                onChange={(event, value) => handleOnChange("loai", value)}
                              />
                            ) : (
                              <Typography>{items.loai}</Typography>
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
