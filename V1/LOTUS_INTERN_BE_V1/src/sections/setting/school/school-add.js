import React, { useState, useEffect } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  schoolName: "",
  market: { value: 1, label: "Việt nam" },
  address: "",
  website: "",
  email: "",
  phone: "",
  contact: "",
  description:""
};

const optionSchool = [
  { value: 1, label: "Việt nam" },
  { value: 2, label: "Nhật bản" },
];
export default function SchoolAdd() {
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
    <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin cơ bản
              </Typography>
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}
