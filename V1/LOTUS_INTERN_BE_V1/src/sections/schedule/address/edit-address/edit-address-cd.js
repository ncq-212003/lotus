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
import Popover from '@mui/material/Popover';
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { TypeAddress } from "../type-address";

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

  //Mở thêm loại địa điểm
  const [isOpenType, setIsOpenType] = useState(false);

  const handleOpenType = () => {
    setIsOpenType(true);
  }

  const handleCloseType = () => {
    setIsOpenType(false);
  };
  //Đóng thêm loại địa điểm
  // khai bao du lieu 
  const [rows, setRows] = useState([
    {
      id: 1,
      stt: 1,
      locationName: "Nhà hàng Nam Phương",
      contactPerson: "Nguyễn Thị Tâm",
      phoneNumber: "04857456374",
      mobileNumber: "054365634",
      cityProvince: "Hà Nội",
      district: "Dống Đa",
      ward: "Láng Hạ",
      longitude: "85*",
      latitude: "36*",
      type: "Loại 1",
    },
    {
      id: 2,
      stt: 2,
      locationName: "Nhà hàng Mỹ Lệ",
      contactPerson: "Nguyễn Văn Nam",
      phoneNumber: "0436523456",
      mobileNumber: "0987654321",
      cityProvince: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Bến Nghé",
      longitude: "106*",
      latitude: "10*",
      type: "Loại 2",
    },
    {
      id: 3,
      stt: 3,
      locationName: "Nhà hàng Hoàng Yến",
      contactPerson: "Trần Thị Hương",
      phoneNumber: "0245678910",
      mobileNumber: "0912345678",
      cityProvince: "Hà Nội",
      district: "Hoàn Kiếm",
      ward: "Hàng Bạc",
      longitude: "105*",
      latitude: "21*",
      type: "Loại 3",
    },
    {
      id: 4,
      stt: 5,
      locationName: "Nhà hàng Nam Dương",
      contactPerson: "Trần Thị Thảo",
      phoneNumber: "0245678910",
      mobileNumber: "0912345678",
      cityProvince: "Hà Nội",
      district: "Dống Da",
      ward: "Hàng Kay",
      longitude: "105*",
      latitude: "21*",
      type: "Loại 4",
    },
    {
      id: 5,
      stt: 5,
      locationName: "Nhà hàng Hoa Sữa",
      contactPerson: "Phạm Thị Hiền",
      phoneNumber: "0567891234",
      mobileNumber: "0823456789",
      cityProvince: "Đà Nẵng",
      district: "Sơn Trà",
      ward: "Mỹ An",
      longitude: "108*",
      latitude: "15*",
      type: "Loại 5",
    },
    {
      id: 6,
      stt: 6,
      locationName: "Nhà hàng Lẩu Quê",
      contactPerson: "Trần Văn Thắng",
      phoneNumber: "0398765432",
      mobileNumber: "0976543210",
      cityProvince: "Hà Nội",
      district: "Hai Bà Trưng",
      ward: "Tràng Tiền",
      longitude: "105*",
      latitude: "21*",
      type: "Loại 6",
    },
  ])

  const validationSchema = Yup.object({
    locationName: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    contactPerson: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    phoneNumber: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    mobileNumber: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    cityProvince: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    district: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    ward: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    type: Yup.string()
  });
  const [anchorEl, setAnchorEl] = useState(null);
  // Open Popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleButtonClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const open = Boolean(anchorEl);// khác null sẽ là true 
  const id = open ? 'input-popover' : undefined;
  // Close Popover

  const [selectedRow, setSelectedRow] = useState(null);
  const handleDelete = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      locationName: selectedRow?.locationName || "",
      contactPerson: selectedRow?.contactPerson || "",
      phoneNumber: selectedRow?.phoneNumber || "",
      mobileNumber: selectedRow?.mobileNumber || "",
      cityProvince: selectedRow?.cityProvince || "",
      district: selectedRow?.district || "",
      ward: selectedRow?.ward || "",
      longitude: selectedRow?.longitude || "",
      latitude: selectedRow?.latitude || "",
      type: selectedRow?.type || "",
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        alert("Cập nhật dữ liệu thành công")
        const data = JSON.stringify(values);
        const rowIndex = rows.findIndex((row) => row.id === selectedRow.id);
        if (rowIndex !== -1) {
          const updatedRows = [...rows];
          updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...values };
          setRows(updatedRows);
        }
        formik.resetForm();
        handleClose();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openEditAdress}
        fullWidth
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
                    <TableCell align="center" width={250}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.locationName}</TableCell>
                      <TableCell>{items.contactPerson}</TableCell>
                      <TableCell>{items.phoneNumber}</TableCell>
                      <TableCell>{items.mobileNumber}</TableCell>
                      <TableCell>{items.cityProvince}</TableCell>
                      <TableCell>{items.district}</TableCell>
                      <TableCell>{items.ward}</TableCell>
                      <TableCell>{items.longitude}</TableCell>
                      <TableCell>{items.latitude}</TableCell>
                      <TableCell>{items.type}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
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
              <Typography variant="h6" sx={{ marginBottom: '8px' }}>Thông tin cần chỉnh sửa</Typography>
              <TextField
                error={!!(formik.touched.locationName && formik.errors.locationName)}
                helperText={formik.touched.locationName && formik.errors.locationName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.locationName}
                name="locationName"
                required
                sx={{ marginTop: "12px" }}
                size="small"
                label="Tên địa điểm"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={!!(formik.touched.contactPerson && formik.errors.contactPerson)}
                helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contactPerson}
                name="contactPerson"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Người liên hệ"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                name="phoneNumber"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số điện thoại bàn"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={!!(formik.touched.mobileNumber && formik.errors.mobileNumber)}
                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
                name="mobileNumber"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số điện thoại di động"
                fullWidth
                variant="outlined"
              />
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Autocomplete
                    onChange={(event, newValue) => formik.setFieldValue("cityProvince", newValue || "")}
                    value={formik.values.cityProvince}
                    name="cityProvince"
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={["", "Hà Nội", "Vĩnh phúc", "Thái bình"]}
                    renderInput={(params) => <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.cityProvince && formik.errors.cityProvince)}
                      helperText={formik.touched.cityProvince && formik.errors.cityProvince}
                      {...params} label="Tỉnh/ Thành phố" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    onBlur={formik.handleBlur}
                    onChange={(event, newValue) => formik.setFieldValue("district", newValue || "")}
                    value={formik.values.district}
                    name="district"
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={["", "Thanh Xuân", "Đống Đa", "Hai Bà Trưng", "Vĩnh Tường"]}
                    renderInput={(params) => <TextField
                      error={!!(formik.touched.district && formik.errors.district)}
                      helperText={formik.touched.district && formik.errors.district}
                      {...params} label="Quận/ Huyện" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    onChange={(event, newValue) => formik.setFieldValue("ward", newValue || "")}
                    value={formik.values.ward}
                    name="ward"
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={["", "Hoàng Liệt", "Láng Thượng", "Trung Hòa", "Tân Tiến"]}
                    renderInput={(params) => <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.ward && formik.errors.ward)}
                      helperText={formik.touched.ward && formik.errors.ward}
                      {...params} label="Xã/ Phường" variant="outlined" />}
                  />
                </Grid>
              </Grid>
              <TextField
                error={!!(formik.touched.longitude && formik.errors.longitude)}
                helperText={formik.touched.longitude && formik.errors.longitude}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.longitude}
                name="longitude"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Kinh độ"
                fullWidth
                variant="outlined"
              />
              <TextField
                error={!!(formik.touched.latitude && formik.errors.latitude)}
                helperText={formik.touched.latitude && formik.errors.latitude}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.latitude}
                name="latitude"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Vĩ độ"
                fullWidth
                variant="outlined"
              />
              {/* <Autocomplete
                onChange={(event, newValue) => formik.setFieldValue("type", newValue || "")}
                value={formik.values.type}
                name="type"
                sx={{ marginTop: "12px" }}
                fullWidth
                size="small"
                options={["", "Nhà Hàng", "Sân Bay", "Quán cafe", "Tân Tiến"]}
                renderInput={(params) => <TextField
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.type && formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                  {...params} label="Loại" variant="outlined" />}
              /> */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  width: "100%"
                }}
              >
                <Autocomplete
                  onChange={(event, newValue) => formik.setFieldValue("type", newValue || "")}
                  value={formik.values.type}
                  name="type"
                  sx={{ marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={["", "Nhà Hàng", "Sân Bay", "Quán cafe", "Tân Tiến"]}
                  renderInput={(params) => <TextField
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.type && formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                    {...params} label="Loại" variant="outlined" />}
                />

                <Tooltip title="Thêm">
                  <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                    onClick={handleOpenType}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Stack display="flex">
                <Box marginLeft="auto">
                  <Button
                    variant="contained"
                    // onClick={handleClose}
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
      <TypeAddress openType={isOpenType} closeType={handleCloseType} />
    </>
  );
};