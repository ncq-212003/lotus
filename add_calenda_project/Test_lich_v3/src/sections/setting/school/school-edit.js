import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
  SvgIcon,
  TextField,
  Grid,
  Stack,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { DateTimePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SchoolEdit({ open, onClose, id }) {
  console.log(id);

  const validationSchema = Yup.object({

  });
  const optionSchool = [
    { value: 1, label: "Việt nam" },
    { value: 2, label: "Nhật bản" },
  ];

  const initialValues = {
    schoolName: "",
    market: { value: 1, label: "Việt nam" },
    address: "",
    website: "",
    email: "",
    phone: "",
    contact: "",
    description: ""
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);

        console.log(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleAdd = () => {
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <Button autoFocus color="inherit" onClick={handleAdd}>
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
        <form
          onSubmit={formik.handleSubmit}
        >
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
                  bgcolor: "#f5f5f5",
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
                <Autocomplete
                  error={!!(formik.touched.congTy && formik.errors.congTy)}
                  helperText={formik.touched.congTy && formik.errors.congTy}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("congTy", newValue)}
                  value={formik.values.congTy}
                  name="congTy"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={['Công ty TNHH Tú', 'Công ty TNHH Nghĩa']}
                  renderInput={(params) => <TextField {...params} label="Thuộc công ty" variant="outlined" />}
                />
                <TextField
                  error={!!(formik.touched.maLopHoc && formik.errors.maLopHoc)}
                  helperText={formik.touched.maLopHoc && formik.errors.maLopHoc}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.maLopHoc}
                  name="maLopHoc"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Mã lớp học"
                  fullWidth
                  variant="outlined"
                />
                <Autocomplete
                  error={!!(formik.touched.giaoVien && formik.errors.giaoVien)}
                  helperText={formik.touched.giaoVien && formik.errors.giaoVien}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("giaoVien", newValue)}
                  value={formik.values.giaoVien}
                  name="giaoVien"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={['Cô Tú', 'Cô Nghĩa']}
                  renderInput={(params) => <TextField {...params} label="Giáo viên chủ nhiệm" variant="outlined" />}
                />
                <TextField
                  error={!!(formik.touched.tenPhongHoc && formik.errors.tenPhongHoc)}
                  helperText={formik.touched.tenPhongHoc && formik.errors.tenPhongHoc}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.tenPhongHoc}
                  name="tenPhongHoc"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Tên phòng học"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  error={!!(formik.touched.schoolName && formik.errors.schoolName)}
                  helperText={formik.touched.schoolName && formik.errors.schoolName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.schoolName}
                  name="schoolName"
                  variant="outlined"
                  required
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Tên trường học"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.contact && formik.errors.contact)}
                  helperText={formik.touched.contact && formik.errors.contact}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contact}
                  name="contact"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Người liên hệ"
                  fullWidth
                />
                <Autocomplete
                  error={!!(formik.touched.market && formik.errors.market)}
                  helperText={formik.touched.market && formik.errors.market}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("market", newValue)}
                  value={formik.values.market}
                  name="market"
                  required
                  fullWidth
                  size="small"
                  options={optionSchool}
                  sx={{ margin: "0px auto 13px" }}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Thị trường" />
                  )}
                />
                <TextField
                  error={!!(formik.touched.address && formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  name="address"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Địa chỉ trường học"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Địa chỉ email"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.website && formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.website}
                  name="website"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Website"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  name="phone"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Điện thoại"
                  fullWidth
                />
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  multiline
                  name="description"
                  variant="outlined"
                  sx={{
                    marginBottom: "12px",
                  }}
                  size="small"
                  label="Ghi chú"
                  fullWidth
                />
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
                    }}
                    type="submit"
                  >
                    Thêm
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Dialog>
  );
}
