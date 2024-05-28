import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, Box, Autocomplete } from "@mui/material";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';

const validationSchema = Yup.object({});

const initialValues = {
  companyName: "",
  transactionName: "",
  businessType: "",
  headquarters: "",
  addressCompany: "",
  phone: "",
  faxNumber: "",
  email: "",
  registrationDate: null,
  licenseIssuanceDate: null,
  licenseNumber: "",
  otherInformation: "",
  representative: "",
  positionOfRepresentative: "",
  phoneOfRepresentative: "",
  signer: "",
  positionOfSigner: "",
};


export default function ProfessionalCertificationAdd() {
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
  
  return (
    <Stack spacing={3} sx={{ marginTop: "80px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin cơ bản
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  error={!!(formik.touched.companyName && formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                  name="companyName"
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Tên công ty "
                  fullWidth
                />
              </Box>
              <TextField
                error={!!(formik.touched.transactionName && formik.errors.transactionName)}
                helperText={formik.touched.transactionName && formik.errors.transactionName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.transactionName}
                name="transactionName"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên giao dịch "
                fullWidth
              />
              <Autocomplete
                error={!!(formik.touched.businessType && formik.errors.businessType)}
                helperText={formik.touched.businessType && formik.errors.businessType}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("businessType", newValue)}
                value={formik.values.businessType}
                name="businessType"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={[
                  { value: 1, label: "Tổng công ty" },
                  { value: 2, label: "Công ty" },
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="Loại hình DN" variant="outlined" />
                )}
              />
              <Autocomplete
                error={!!(formik.touched.headquarters && formik.errors.headquarters)}
                helperText={formik.touched.headquarters && formik.errors.headquarters}
                onBlur={formik.handleBlur}
                onChange={(event, newValue) => formik.setFieldValue("headquarters", newValue)}
                value={formik.values.headquarters}
                name="headquarters"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={[
                  { value: 1, label: "Hà Nội" },
                  { value: 2, label: "Hồ Chí Minh" },
                  { value: 3, label: "Đồng Tháp" },
                  { value: 4, label: "Bắc Ninh" },
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="Tỉnh đặt trụ sở" variant="outlined" />
                )}
              />
              <TextField
                error={!!(formik.touched.addressCompany && formik.errors.addressCompany)}
                helperText={formik.touched.addressCompany && formik.errors.addressCompany}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.addressCompany}
                name="addressCompany"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ công ty "
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
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Điện thoại"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.faxNumber && formik.errors.faxNumber)}
                helperText={formik.touched.faxNumber && formik.errors.faxNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.faxNumber}
                name="faxNumber"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số fax"
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
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ email"
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item sm={12} md={6} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Địa chỉ
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  error={!!(formik.touched.registrationDate && formik.errors.registrationDate)}
                  helperText={formik.touched.registrationDate && formik.errors.registrationDate}
                  onBlur={formik.handleBlur}
                  onChange={(value) => {
                    const formattedDate = dayjs(value).format("YYYY-MM-DD");
                    formik.setFieldValue("registrationDate", formattedDate);
                  }}
                  value={formik.values.registrationDate}
                  name="registrationDate"
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày đăng ký"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  error={
                    !!(formik.touched.licenseIssuanceDate && formik.errors.licenseIssuanceDate)
                  }
                  helperText={
                    formik.touched.licenseIssuanceDate && formik.errors.licenseIssuanceDate
                  }
                  onBlur={formik.handleBlur}
                  onChange={(date) => {
                    const formattedDate = dayjs(date).format("YYYY-MM-DD");
                    formik.setFieldValue("licenseIssuanceDate", formattedDate);
                  }}
                  value={formik.values.licenseIssuanceDate}
                  name="licenseIssuanceDate"
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày cấp giấy phép"
                />
              </LocalizationProvider>
              <TextField
                error={!!(formik.touched.licenseNumber && formik.errors.licenseNumber)}
                helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.licenseNumber}
                name="licenseNumber"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số giấy phép"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.otherInformation && formik.errors.otherInformation)}
                helperText={formik.touched.otherInformation && formik.errors.otherInformation}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.otherInformation}
                name="otherInformation"
                variant="outlined"
                multiline
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Thông tin khác"
                fullWidth
              />
            </Box>
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Người đại diện
              </Typography>
              <TextField
                error={!!(formik.touched.representative && formik.errors.representative)}
                helperText={formik.touched.representative && formik.errors.representative}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.representative}
                name="representative"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Người đại diện"
                fullWidth
              />
              <TextField
                error={
                  !!(
                    formik.touched.positionOfRepresentative &&
                    formik.errors.positionOfRepresentative
                  )
                }
                helperText={
                  formik.touched.positionOfRepresentative && formik.errors.positionOfRepresentative
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.positionOfRepresentative}
                name="positionOfRepresentative"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Chức vụ người đại diện"
                fullWidth
              />
              <TextField
                error={
                  !!(formik.touched.phoneOfRepresentative && formik.errors.phoneOfRepresentative)
                }
                helperText={
                  formik.touched.phoneOfRepresentative && formik.errors.phoneOfRepresentative
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneOfRepresentative}
                name="phoneOfRepresentative"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Điện thoại đại diện"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.signer && formik.errors.signer)}
                helperText={formik.touched.signer && formik.errors.signer}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.signer}
                name="signer"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Người ký CV"
                fullWidth
              />
              <TextField
                error={!!(formik.touched.positionOfSigner && formik.errors.positionOfSigner)}
                helperText={formik.touched.positionOfSigner && formik.errors.positionOfSigner}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.positionOfSigner}
                name="positionOfSigner"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Chức danh người ký CV"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1C2536",
              }}
              type="submit"
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}
