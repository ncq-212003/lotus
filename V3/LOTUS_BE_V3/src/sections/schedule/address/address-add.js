import { Stack, TextField, Button, Autocomplete, Grid, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TypeAddress } from "./address-type";
import Rating from '@mui/material/Rating';
import { addAddress, listAddress } from "src/contexts/api/schedule/api-address";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import useFetchLocation from "src/contexts/api/location-api";

export const AddAddress = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isOpenType, setIsOpenType] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();

  // Mở thêm loại địa điểm
  const handleOpenType = () => {
    setIsOpenType(true);
  }
  const handleCloseType = () => {
    setIsOpenType(false);
  };
  // Đóng thêm loại địa điểm

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

  const [typeCalendar, setTypeCalendar] = useState([
    { id: 1, name: "Nhà hàng" },
    { id: 2, name: "Quán cà phê" },
    { id: 3, name: "Sân bay" },
    { id: 4, name: "Họp" },
    { id: 5, name: "Khác" },
  ])

  const initialValues = {
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
  };

  const formik = useFormik({
    initialValues,
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

        const response = await addAddress(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Dữ liệu đã được thêm thành công.");
          setSnackbarOpen(true);
          formik.resetForm();

          const listData = await listAddress();
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: listData.data
          })
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Đã xảy ra lỗi. Vui lòng kiểm tra lại!!!");
          setSnackbarOpen(true);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          sm={12}
          md={12}
          xs={12}
        >
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "16px" }}
            >
              Thông tin cơ bản
            </Typography>
            <TextField
              error={!!(formik.touched.tenDiaDiem && formik.errors.tenDiaDiem)}
              helperText={formik.touched.tenDiaDiem && formik.errors.tenDiaDiem}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenDiaDiem}
              name="tenDiaDiem"
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
              label="Số điện thoại"
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                width: '100%',
                marginTop: '20px'
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1C2536',
                  width: "100px",
                }}
                onClick={formik.handleSubmit}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <TypeAddress openType={isOpenType} closeType={handleCloseType} />
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
};
