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
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const companiesOption = [
  { value: 1, label: "Công ty Apple" },
  { value: 2, label: "Công ty Apple" },
  { value: 3, label: "Công ty Apple " },
  { value: 4, label: "Công ty Samsung" },
  { value: 5, label: "Công ty Samsung " },
  { value: 6, label: "Công ty Game" },
];

const branchsOption = [
  { value: 1, label: "Trong nước" },
  { value: 2, label: "Nhật Bản" },
  { value: 3, label: "Hàn Quốc" },
];

const aspectOption = [
  { value: 1, label: "Hoạt động" },
  { value: 2, label: "Dừng hoạt động" },
];

export default function DepartmentEdit({ open, onClose, id }) {
  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      company: "",
      branch: "",
      departmentName: "",
      departmentId: "",
      deskPhone: "",
      mainPersonInCharge: "",
      status: "",
      description: "",
    },
    validationSchema: Yup.object({}),
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
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            SỬA THÔNG TIN
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <SvgIcon fontSize="small">
              <XCircleIcon />
            </SvgIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={3} sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            spacing={3}
            sx={{
              margin: "20px 0",
            }}
          >
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                <Grid item sm={12} xs={12} md={6}>
                  <Autocomplete
                    error={!!(formik.touched.company && formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                    onBlur={formik.handleBlur}
                    onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                    value={formik.values.company}
                    name="company"
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    fullWidth
                    disablePortal
                    options={companiesOption}
                    renderInput={(params) => (
                      <TextField variant="outlined" {...params} label="Công ty" />
                    )}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      error={!!(formik.touched.branch && formik.errors.branch)}
                      helperText={formik.touched.branch && formik.errors.branch}
                      onBlur={formik.handleBlur}
                      onChange={(event, newValue) => formik.setFieldValue("branch", newValue)}
                      value={formik.values.branch}
                      name="branch"
                      sx={{ margin: "4px", marginTop: "12px" }}
                      fullWidth
                      size="small"
                      options={branchsOption}
                      renderInput={(params) => (
                        <TextField {...params} label="Chi nhánh" variant="outlined" />
                      )}
                    />
                  </Box>

                  <TextField
                    error={!!(formik.touched.departmentName && formik.errors.departmentName)}
                    helperText={formik.touched.departmentName && formik.errors.departmentName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.departmentName}
                    name="departmentName"
                    required
                    fullWidth
                    label="Tên phòng ban "
                    variant="outlined"
                    size="small"
                    sx={{ margin: "4px", marginTop: "12px" }}
                  />
                  <TextField
                    error={!!(formik.touched.departmentId && formik.errors.departmentId)}
                    helperText={formik.touched.departmentId && formik.errors.departmentId}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.departmentId}
                    name="departmentId"
                    required
                    fullWidth
                    label="Mã phòng ban "
                    variant="outlined"
                    size="small"
                    sx={{ margin: "4px", marginTop: "12px" }}
                  />
                </Grid>

                <Grid item sm={12} xs={12} md={6}>
                  <TextField
                    error={!!(formik.touched.deskPhone && formik.errors.deskPhone)}
                    helperText={formik.touched.deskPhone && formik.errors.deskPhone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.deskPhone}
                    name="deskPhone"
                    required
                    fullWidth
                    label="Số điện thoại bàn "
                    variant="outlined"
                    size="small"
                    sx={{ margin: "4px", marginTop: "12px" }}
                  />
                  <TextField
                    error={
                      !!(formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge)
                    }
                    helperText={
                      formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.mainPersonInCharge}
                    name="mainPersonInCharge"
                    fullWidth
                    label="Người phụ trách chính "
                    variant="outlined"
                    size="small"
                    sx={{ margin: "4px", marginTop: "12px" }}
                  />
                  <Autocomplete
                    error={!!(formik.touched.status && formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    onBlur={formik.handleBlur}
                    onChange={(event, newValue) => formik.setFieldValue("status", newValue)}
                    value={formik.values.status}
                    name="status"
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    fullWidth
                    disablePortal
                    options={aspectOption}
                    renderInput={(params) => (
                      <TextField variant="outlined" {...params} label="Tình trạng" />
                    )}
                  />
                  <TextField
                    error={!!(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    name="description"
                    fullWidth
                    label="Mô tả "
                    variant="outlined"
                    size="small"
                    sx={{ margin: "4px", marginTop: "12px" }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1C2536",
                  }}
                  type="submit"
                >
                  Thêm
                </Button>
              </Box>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
}
