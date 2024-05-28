import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  market: "",
  majorName: "",
  tranningTime: null,
  
};

const optionTypeDocument = [{ value: 1, label: "hello" }];

export default function MajorAdd() {
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
            <Autocomplete
              error={!!(formik.touched.market && formik.errors.market)}
              helperText={formik.touched.market && formik.errors.market}
              onBlur={formik.handleBlur}
              onChange={(event, newValue) => formik.setFieldValue("market", newValue)}
              value={formik.values.market}
              name="market"
              fullWidth
              options={optionTypeDocument}
              size="small"
              sx={{ margin: "10px 0 15px" }}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Thị trường" />
              )}
            />
            <TextField
              error={!!(formik.touched.majorName && formik.errors.majorName)}
              helperText={formik.touched.majorName && formik.errors.majorName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.majorName}
              name="majorName"
              variant="outlined"
              required
              sx={{ width: "100%", marginBottom: "15px" }}
              label="Tên chuyên ngành"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                error={!!(formik.touched.tranningTime && formik.errors.tranningTime)}
                helperText={formik.touched.tranningTime && formik.errors.tranningTime}
                onBlur={formik.handleBlur}
                onChange={(value) => {
                  const formattedDate = dayjs(value).format("YYYY-MM-DD");
                  formik.setFieldValue("tranningTime", formattedDate);
                }}
                value={formik.values.tranningTime}
                name="tranningTime"
                sx={{ width: "100%"}}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Thời gian đào tạo"
              />
            </LocalizationProvider>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: "12px" ,
                  backgroundColor: "#1C2536",
                }}
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
