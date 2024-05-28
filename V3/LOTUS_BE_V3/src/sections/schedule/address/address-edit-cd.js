import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions, TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import InfoRecord from "src/components/info-record";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import { TypeAddress } from "./address-type";
import Rating from '@mui/material/Rating';
import { listAddress, updateAddress } from "src/contexts/api/schedule/api-address";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import useFetchLocation, { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";

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
  const [isOpenType, setIsOpenType] = useState(false);
  const [districtsByCityId, setDistrictsByCityId] = useState([]);
  const [wardsByDistrictId, setWardsByDistrictId] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();
  const { address } = state;
  const { addresses } = address;
  const [listDataTable, setListDataTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openBoots, setOpenBoots] = useState(false);

  const closeDialog = () => {
    closeEditAdress();

  };
  const AddressEdit = Array.isArray(addresses) ? addresses.find(add => add.placeId == selectedRow) : [];

  //Mở thêm loại địa điểm
  const handleOpenType = () => {
    setIsOpenType(true);
  }

  const handleCloseType = () => {
    setIsOpenType(false);
  };
  //Đóng thêm loại địa điểm

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAddress();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: response.data,
          });
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error);
      }
    };
    fetchData();
  }, []);

  const [typeCalendar, setTypeCalendar] = useState([
    { id: 1, name: "Nhà hàng" },
    { id: 2, name: "Quán cà phê" },
    { id: 3, name: "Sân bay" },
    { id: 4, name: "Họp" },
    { id: 5, name: "Khác" },
  ])

  useEffect(() => {
    const updateListDataTable = async () => {
      const updatedList = await Promise.all(
        addresses.map(async (add, index) => {
          const { cityId, districtId, wardId } = add;

          // Gọi các hàm fetch thay vì hook ở đây
          const cities = await fetchCities();
          const districts = await fetchDistricts(cityId);
          const wards = await fetchWards(districtId);

          return {
            ...add,
            stt: index + 1,
            id: add.id || index + 1,
            nameCity: cities.find((city) => city.value === cityId)?.label,
            nameDistrict: districts.find((district) => district.value === districtId)?.label,
            nameWard: wards.find((ward) => ward.value === wardId)?.label,
            nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
          };
        })
      );
      setListDataTable(updatedList);
    };
    updateListDataTable();
  }, [addresses])

  useEffect(() => {
    const fetchDataDistrictId = async () => {
      if (AddressEdit && AddressEdit.cityId !== null) {
        if (cityId !== 10000) {
          const districtsData = await fetchDistricts(AddressEdit.cityId);
          setDistrictsByCityId(districtsData);
        } else {
          setDistrictsByCityId([]);
        }
      }
    };
    fetchDataDistrictId();
  }, [AddressEdit?.cityId, cityId])

  useEffect(() => {
    const fetchDataWards = async () => {
      if (AddressEdit && AddressEdit.districtId !== null) {
        if (districtId !== 10000) {
          const wardsData = await fetchWards(AddressEdit.districtId);
          setWardsByDistrictId(wardsData);
        } else {
          setWardsByDistrictId([]);
        }
      }
    }
    fetchDataWards();
  }, [AddressEdit?.districtId, districtId])

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
      .required('Vui lòng nhập thông tin vào trường này'),
    quanHuyen: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    xaPhuong: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    loai: Yup.string()
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseBoots = () => {
    setOpenBoots(false);
    setDistrictId(9999);
    setCityId(9999);
  };

  const handleButtonClick = (rowId) => {
    setOpenBoots(true);
    setSelectedRow(rowId);
  };

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
      loai: "",
      danhGia: 1,
      submit: null
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
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
          formik.resetForm();
          const list = await listAddress();
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: list.data
          });
        }
        setDistrictId(9999);
        setCityId(9999);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  useEffect(() => {
    const fetchDataAddress = () => {
      try {
        formik.setValues({
          tenDiaDiem: AddressEdit.placeName || "",
          nguoiLienHe: AddressEdit.manager || "",
          soDienThoai: AddressEdit.contactPhone || "",
          tinhThanhPho: AddressEdit.cityId || "",
          quanHuyen: AddressEdit.districtId || "",
          xaPhuong: AddressEdit.wardId || "",
          kinhDo: AddressEdit.geoX || "",
          viDo: AddressEdit.geoY || "",
          loai: (parseInt(AddressEdit.type) || 0) || "",
          danhGia: AddressEdit.rate || "",
        })
      } catch (error) {
        console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
      }
    }
    if (selectedRow) {
      fetchDataAddress();
    }
  }, [selectedRow])

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
                    <TableCell align="center" width={120}>Đánh giá</TableCell>
                    <TableCell align="center" width={100}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDataTable.map((items, index) => (
                    <TableRow key={index}>
                      <TableCell>{items.id}</TableCell>
                      <TableCell>{items.placeName}</TableCell>
                      <TableCell>{items.manager}</TableCell>
                      <TableCell>{items.contactPhone}</TableCell>
                      <TableCell>{items.nameCity}</TableCell>
                      <TableCell>{items.nameDistrict}</TableCell>
                      <TableCell>{items.nameWard}</TableCell>
                      <TableCell>{items.geoX}&deg;{items.geoDo && ` ${items.geoDo}`}</TableCell>
                      <TableCell>{items.geoY}&deg;{items.geoDo && ` ${items.geoDo}`}</TableCell>
                      <TableCell>{items.nameType}</TableCell>
                      <TableCell>
                        <Rating name={`rating-${index}`} value={items.rate} readOnly />
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Tooltip title="Chỉnh sửa thông tin">
                            <IconButton aria-label="Lưu" style={{ color: "#1C2536" }} onClick={() => handleButtonClick(items.id)}>
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
          <BootstrapDialog
            onClose={handleCloseBoots}
            open={openBoots}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
              Thông tin cần chỉnh sửa
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseBoots}
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
              <TextField
                error={!!(formik.touched.tenDiaDiem && formik.errors.tenDiaDiem)}
                helperText={formik.touched.tenDiaDiem && formik.errors.tenDiaDiem}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.tenDiaDiem}
                name="tenDiaDiem"
                required
                // sx={{ marginTop: "12px" }}
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
                    options={districts.length === 0 ? districtsByCityId : districts}
                    value={districts.length === 0 ? districtsByCityId?.find((item) => item.value === formik.values.quanHuyen) || null : districts?.find((item) => item.value === formik.values.quanHuyen) || null}
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
                    options={wards.length === 0 ? wardsByDistrictId : wards}
                    value={wards.length === 0 ? wardsByDistrictId?.find((item) => item.value === formik.values.xaPhuong) || null : wards?.find((item) => item.value === formik.values.xaPhuong) || null}
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
                  name="nguoiXuLy"
                  sx={{ marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={typeCalendar}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => formik.setFieldValue('loai', newValue?.id || '')}
                  value={typeCalendar.find((option) => option.id === formik.values.loai) || null}
                  renderInput={(params) => (
                    <TextField
                      onBlur={formik.handleBlur}
                      error={!!(formik.touched.loai && formik.errors.loai)}
                      helperText={formik.touched.loai && formik.errors.loai}
                      {...params}
                      label="Loại"
                      variant="outlined"
                    />
                  )}
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
                  name="danhGia"
                  value={formik.values.danhGia}
                  max={5}
                  onChange={(event, value) => formik.setFieldValue("danhGia", value)}
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
                      width: "100px",
                    }}
                  >
                    Lưu
                  </Button>
                </Box>
              </Stack>
            </DialogContent>
          </BootstrapDialog>
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