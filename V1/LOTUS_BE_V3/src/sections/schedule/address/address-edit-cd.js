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
import { TypeAddress } from "./address-type";
import Rating from '@mui/material/Rating';
import { listAddress, updateAddress } from "src/contexts/api/schedule/api-address";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import useFetchLocation from "src/contexts/api/location-api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const EditAddress = ({ openEditAdress, closeEditAdress }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();

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
    tenDiaDiem: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    nguoiLienHe: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    soDienThoai: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    tinhThanhPho: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    quanHuyen: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    xaPhuong: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    loai: Yup.string()
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
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
    initialValues: {
      tenDiaDiem: "",
      nguoiLienHe: "",
      soDienThoai: "",
      tinhThanhPho: "",
      quanHuyen: "",
      xaPhuong: "",
      kinhDo: "",
      viDo: "",
      loai: "Nhà Hàng",
      danhGia: "",
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // const rowIndex = rows.findIndex((row) => row.id === selectedRow.id);
        // if (rowIndex !== -1) {
        //   const updatedRows = [...rows];
        //   updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...values };
        //   setRows(updatedRows);
        // }

        const formData = {
          PlaceId: 1,
          PlaceName: values.tenDiaDiem,
          Manager: values.nguoiLienHe,
          ContactPhone: values.soDienThoai,
          CityId: values.tinhThanhPho,
          CityIdHidden: "1",
          DistrictId: values.quanHuyen,
          DistrictIdHidden: "1",
          WardId: values.xaPhuong,
          WardIdHidden: "1",
          GeoX: values.kinhDo,
          GeoY: values.viDo,
          Rate: values.danhGia,
          RateHidden: "1",
          Type: values.loai,
          Description: "Chọn địa điểm thích hợp sẽ thu hút được sự hứng thú và có thêm nhà đầu tư",
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifedAt: new Date().toISOString(),
          LastModifedBy: "1",
          LastModifedByHidden: "1",
          Flag: "1"
        }

        const response = await updateAddress(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Chỉnh sửa dữ liệu thành công !");
          setSnackbarOpen(true);

          const list = await listAddress();
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: list.data
          });
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await listAddress();
  //       if (response.status === 200) {
  //         dispatch({
  //           type: HANDLERS_ADDRESS.LIST_ADDRESS,
  //           payload: response.data
  //         })
  //       }
  //     } catch (error) {
  //       console.log("Đã xảy ra lỗi !!!", error)
  //     }
  //   }
  //   fetchData();
  // }, [])

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
                    <TableCell align="center" width={150}>Số điện thoại</TableCell>
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
                error={!!(formik.touched.nguoiLienHe && formik.errors.nguoiLienHe)}
                helperText={formik.touched.nguoiLienHe && formik.errors.nguoiLienHe}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nguoiLienHe}
                name="nguoiLienHe"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Người liên hệ"
                fullWidth
                variant="outlined"
              />

              <TextField
                error={!!(formik.touched.soDienThoai && formik.errors.soDienThoai)}
                helperText={formik.touched.soDienThoai && formik.errors.soDienThoai}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.soDienThoai}
                name="soDienThoai"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số điện thoại "
                fullWidth
                variant="outlined"
              />

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Autocomplete
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={cities}
                    value={cities.find((item) => item.value === formik.values.tinhThanhPho) || null}
                    onChange={(_, newValue) => {
                      if (newValue === null) {
                        formik.setFieldValue('tinhThanhPho', "");
                        formik.setFieldValue('quanHuyen', "");
                        formik.setFieldValue('xaPhuong', "");
                        setDistrictId(10000);
                        setCityId(10000);
                      } else {
                        const newCityId = newValue ? newValue.value : null;
                        formik.setFieldValue('tinhThanhPho', newCityId);
                        setCityId(newCityId);
                      }
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        label="Tỉnh/ Thành phố"
                        name="tinhThanhPho"
                        onBlur={formik.handleBlur}
                        error={formik.touched.tinhThanhPho && Boolean(formik.errors.tinhThanhPho)}
                        helperText={formik.touched.tinhThanhPho && formik.errors.tinhThanhPho}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={districts}
                    value={districts.find((item) => item.value === formik.values.quanHuyen) || null}
                    onChange={(_, newValue) => {
                      if (newValue === null) {
                        formik.setFieldValue('quanHuyen', "");
                        formik.setFieldValue('xaPhuong', "");
                        setDistrictId(10000);
                      } else {
                        const newDistrictId = newValue ? newValue.value : null;
                        formik.setFieldValue('quanHuyen', newDistrictId);
                        setDistrictId(newDistrictId);
                      }
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        label="Quận/ Huyện"
                        name="quanHuyen"
                        onBlur={formik.handleBlur}
                        error={formik.touched.quanHuyen && Boolean(formik.errors.quanHuyen)}
                        helperText={formik.touched.quanHuyen && formik.errors.quanHuyen}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    sx={{ marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={wards}
                    value={wards.find((item) => item.value === formik.values.xaPhuong) || null}
                    onChange={(_, newValue) => {
                      const newWardId = newValue ? newValue.value : null;
                      formik.setFieldValue('xaPhuong', newWardId);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        label="Xã/ Phường"
                        name="xaPhuong"
                        onBlur={formik.handleBlur}
                        error={formik.touched.xaPhuong && Boolean(formik.errors.xaPhuong)}
                        helperText={formik.touched.xaPhuong && formik.errors.xaPhuong}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <TextField
                error={!!(formik.touched.kinhDo && formik.errors.kinhDo)}
                helperText={formik.touched.kinhDo && formik.errors.kinhDo}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.kinhDo}
                name="kinhDo"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Kinh độ"
                fullWidth
                variant="outlined"
              />

              <TextField
                error={!!(formik.touched.viDo && formik.errors.viDo)}
                helperText={formik.touched.viDo && formik.errors.viDo}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.viDo}
                name="viDo"
                sx={{ marginTop: "12px" }}
                size="small"
                label="Vĩ độ"
                fullWidth
                variant="outlined"
              />

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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  margin: "12px 10px",
                }}
              >
                <Typography component="legend" sx={{ fontWeight: "600", fontSize: "14px" }}>Đánh giá địa điểm:</Typography>
                <Rating
                  name="rate"
                  defaultValue={1}
                  max={5}
                  onChange={(event, value) => formik.setFieldValue("rate", value)}
                />
              </Box>
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
      <TypeAddress openType={isOpenType} closeType={handleCloseType} />

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};