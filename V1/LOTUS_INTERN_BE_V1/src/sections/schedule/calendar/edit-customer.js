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
  InputBase,
  Paper
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DialogContent from "@mui/material/DialogContent";
import InfoRecord from "src/components/info-record";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [searchTerm, setSearchTerm] = useState('');
  const [typeUnionNumber, setTypeUnionNumber] = useState(null);
  const [listCustomersById, setListCustomersById] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    closeEditCustomer(false);
  };

  // open data template
  const [unionOptions, setUnionOptions] = useState([
    { id: 1, label: "Nghiệp đoàn 1" },
    { id: 2, label: "Nghiệp đoàn 2" },
    { id: 3, label: "Nghiệp đoàn 3" },
    { id: 4, label: "Nghiệp đoàn 4" },
    { id: 5, label: "Nghiệp đoàn 5" }
  ]);

  const [rows, setRows] = useState([
    { id: 1, khachhang: "Nguyễn Hoàng Tuấn", unionId: 1 },
    { id: 2, khachhang: "Trần Thị Thu Hương", unionId: 1 },
    { id: 3, khachhang: "Lê Hồng Phong", unionId: 1 },
    { id: 4, khachhang: "Nguyễn Minh Anh", unionId: 2 },
    { id: 5, khachhang: "Phạm Thanh Trúc", unionId: 2 },
    { id: 6, khachhang: "Vũ Hải Yến", unionId: 2 },
    { id: 7, khachhang: "Hoàng Văn Hùng", unionId: 3 },
    { id: 8, khachhang: "Trương Thị Mai Anh", unionId: 3 },
    { id: 9, khachhang: "Đặng Quang Minh", unionId: 3 },
    { id: 10, khachhang: "Bùi Thị Thanh Hương", unionId: 4 },
    { id: 11, khachhang: "Ngô Đức Thắng", unionId: 4 },
    { id: 12, khachhang: "Đỗ Ngọc Linh", unionId: 5 },
    { id: 13, khachhang: "Vũ Thị Hạnh", unionId: 5 }
  ]);
  // end data

  const handleSearch = () => {
    const filteredRows = rows.filter((row) =>
      row.khachhang.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRows(filteredRows ? filteredRows : rows);
  };

  const handleDelete = (index) => {
    if (listCustomersById.length > 0) {
      const newRows = [...listCustomersById];
      newRows.splice(index, 1);
      setListCustomersById(newRows);
    } else {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  // Open Popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const open = Boolean(anchorEl);// khác null sẽ là true 
  const id = open ? 'input-popover' : undefined;
  // Close Popover

  const validationSchema = Yup.object({
    khachhang: Yup
      .string()
      .required('Tên lịch không được để trống'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      khachhang: selectedRow?.khachhang || "",
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log("value", values)
        if (listCustomersById.length > 0) {
          const rowIndex = listCustomersById.findIndex((row) => row.id === selectedRow.id);
          if (rowIndex !== -1) {
            const updatedRows = [...listCustomersById];
            updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...values };
            setListCustomersById(updatedRows);
          }
        }
        const rowIndex = rows.findIndex((row) => row.id === selectedRow.id);
        if (rowIndex !== -1) {
          const updatedRows = [...rows];
          updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...values };
          setRows(updatedRows);
        }
        alert("thanh cong")
        handleClosePopover();
        return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  // lấy dữ liệu từ auto => typeUnionNumber
  const handleAutocompleteChange = (event, value) => {
    if (value) {
      const selectedOption = unionOptions.find(option => option.label === value);
      if (selectedOption) {
        const selectedId = selectedOption.id;
        setTypeUnionNumber(selectedId);
      }
    }
  };
  // cập nhật mảng khi đã lọc
  useEffect(() => {
    const filteredRows = rows.filter(row => row.unionId === typeUnionNumber);
    setListCustomersById(filteredRows);
  }, [typeUnionNumber]);

  return (
    <>
      <BootstrapDialog
        open={openEditCustomer}
        // onClose={handleClose}
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
              size="small"
              options={unionOptions.map(option => option.label)}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Chọn nghiệp đoàn" />}
              onChange={handleAutocompleteChange}
            />
            <Box sx={{ width: '100%' }}>
              <TableContainer
                sx={{
                  border: "1px solid rgb(224, 224, 224) !important",
                  marginTop: "5px",
                }}
                fullWidth
              >
                <TextField
                  id="input-with-icon-textfield"
                  label="Tìm kiếm khách hàng"
                  sx={{ width: "30%" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Tooltip title="Tìm kiếm">
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                          <InputAdornment position="start">
                            <SearchIcon onClick={handleSearch} />
                          </InputAdornment>
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                  variant="standard"
                />
                <Table>
                  <TableHead sx={{ backgroundColor: "	#A52A2A" }}>
                    <TableRow sx={{ border: "1px solid rgb(224, 224, 224) !important" }}>
                      <TableCell width={50}>id</TableCell>
                      <TableCell align="center">Tên khách hàng</TableCell>
                      <TableCell align="center" width={200} >Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {listCustomersById && listCustomersById.length > 0
                      ? listCustomersById.map((items, index) => (
                        <TableRow key={index}>
                          <TableCell>{items.id}</TableCell>
                          <TableCell>{items.khachhang}</TableCell>
                          <TableCell align="center" >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Tooltip title="Chỉnh sửa thông tin">
                                <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={(event) => handleButtonClick(event, items)}>
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
                      ))
                      : rows.map((items, index) => (
                        <TableRow key={index}>
                          <TableCell>{items.id}</TableCell>
                          <TableCell>{items.khachhang}</TableCell>
                          <TableCell align="center" >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Tooltip title="Chỉnh sửa thông tin">
                                <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={(event) => handleButtonClick(event, items)}>
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
          </Box>
        </DialogContent>

        {/* Tạo 1 popover để nhập dữ liệu khi thay đổi */}
        <div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
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
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>Thông tin cần chỉnh sửa</Typography>
              <TextField
                error={!!(formik.touched.khachhang && formik.errors.khachhang)}
                helperText={formik.touched.khachhang && formik.errors.khachhang}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.khachhang}
                name="khachhang"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên khách hàng"
                fullWidth
                variant="outlined"
              />
              <Stack display="flex">
                <Box marginLeft="auto">
                  <Button
                    variant="contained"
                    onClick={formik.handleSubmit}
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