import React, { useState, useEffect } from "react";
import {  Dialog, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import InfoRecord from "src/components/info-record";
import EditFormPresent from "./edit-form-present";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AvatarCell = ({ imageUrl }) => (
  <img
    src={imageUrl}
    alt="Avatar"
    style={{ width: 59, height: 38, borderRadius: 3 }}
  />
);

export const EditPresent = ({ openEditPresent, closeEditPresent }) => {
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenEditFormPresent = (event, row) => {
    setSelectedRow(row);
    setIsOpenEditPresent(true);
  }

  const handleCloseEditPresent = () => {
    setIsOpenEditPresent(false);
  }
  const closeDialog = () => {
    closeEditPresent();
  };

  const [rows, setRows] = useState([
    { id: 1, stt: 1, gift_name: "Rượu táo mèo", note: "Mua quà tặng khách hàng Nguyễn Thị Cẩm Tú", logo_img: "https://ruoudaocongthanh.vn/wp-content/uploads/2022/07/r%C6%B0%E1%BB%A3u-t%C3%A1o-m%C3%A8o-%C4%91%C3%B3ng-chai-1-1-800x800.jpg" },
    { id: 2, stt: 2, gift_name: "Quần áo polo", note: "Mua quà tặng khách hàng Nguyễn Thị Hằng, ghi chú: Quà tặng đặc biệt cho khách hàng thân thiết", logo_img: "https://product.hstatic.net/1000352218/product/ao_polo_nam_kwin_kps17_19_02_809b03928ecc43749a41cf1f7701c04c_grande.jpg" },
    { id: 3, stt: 4, gift_name: "Son black rouge ", note: "Mua quà tặng khách hàng Nguyễn Thị Hằng, ghi chú: Quà tặng đặc biệt cho khách hàng thân thiết", logo_img: "https://bloganchoi.com/wp-content/uploads/2019/07/son-black-rouge-1.jpg" },
    { id: 4, stt: 4, gift_name: "Áo khoác", note: "Mua quà tặng khách hàng Trần Văn Cường, ghi chú: Áo khoác thời trang cho mùa đông", logo_img: "https://www.armybox.vn/wp-content/uploads/2019/12/Ao-khoac-nam-3-lop-chong-tham-3-768x768.jpg" },
    { id: 5, stt: 5, gift_name: "Túi xách", note: "Mua quà tặng khách hàng Nguyễn Thị Mai, ghi chú: Túi xách cao cấp thời trang", logo_img: "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/mau-tui-xach-nu-dep-gia-re-co-hoa-tiet-con-gau.jpg" },
    { id: 6, stt: 6, gift_name: "Áo sơ mi", note: "Mua quà tặng khách hàng Lê Văn Tân, ghi chú: Áo sơ mi nam công sở", logo_img: "https://top.chon.vn/wp-content/uploads/2019/08/shop-ao-so-mi-nu-3.jpg" },
  ]);

  const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openEditPresent}
        fullWidth
        fullScreen
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>Danh sách quà tặng</DialogTitle>
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
            <TableContainer sx={{ border: "1px solid rgb(224, 224, 224) !important" }} fullWidth>
              <Table>
                <TableHead sx={{ backgroundColor: "#A52A2A" }}>
                  <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                    <TableCell width={10}>STT</TableCell>
                    <TableCell align="center" width={200}>Tên quà tặng</TableCell>
                    <TableCell align="center" width={300}>Chú thích</TableCell>
                    <TableCell align="center" width={150}>Hình ảnh</TableCell>
                    <TableCell align="center" width={100}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.gift_name}</TableCell>
                      <TableCell>{items.note}</TableCell>
                      <TableCell align="center"><AvatarCell imageUrl={items.logo_img} /></TableCell>
                      <TableCell align="center" >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Tooltip title="Chỉnh sửa thông tin">
                            <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={(event) => handleOpenEditFormPresent(event, items)}>
                              <CreateIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton aria-label="Xóa" style={{ color: "#1C2536" }} onClick={() => handleDelete(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', backgroundColor: '#e3e6e6' }}>
          <InfoRecord />
        </DialogActions>
      </BootstrapDialog>
      <EditFormPresent
        openEditFormPresent={isOpenEditFormPresent}
        closeEditFormPresent={handleCloseEditPresent}
        rowData={selectedRow}
      />
    </>
  );
};