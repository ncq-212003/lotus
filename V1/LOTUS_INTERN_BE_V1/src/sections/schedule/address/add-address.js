import { Stack, TextField, Button, Autocomplete, Grid, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TypeAddress } from "./type-address";

export const AddAddress = (props) => {
  // Mở thêm loại địa điểm
  const [isOpenType, setIsOpenType] = useState(false);

  const handleOpenType = () => {
    setIsOpenType(true);
  }
  const handleCloseType = () => {
    setIsOpenType(false);
  };
  // Đóng thêm loại địa điểm

  // khai báo mảng giá trị bên ngoài
  const city = [
    "Hà Nội",
    "Vĩnh Phúc",
    "Quảng Bình",
    "Nam Định",
    "Bắc Ninh"
  ]

  const district = [
    "Thanh Xuân",
    "Đống Đa",
    "Hai Bà Trưng",
    "Vĩnh Tường"
  ]
  // đóng khai báo bên ngoài

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

  const initialValues = {
    locationName: "",
    contactPerson: "",
    phoneNumber: "",
    mobileNumber: "",
    cityProvince: "",
    district: "",
    ward: "",
    longitude: "",
    latitude: "",
    type: "Nhà Hàng",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(values)
        formik.resetForm();
        // return data;
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
                  options={city}
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
                  options={district}
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
    </Stack>
  );
};
