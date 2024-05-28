import * as React from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({});

const initialValues = {
  documentType: "",
  ordinal: "",
};

export default function DocumentAdd() {
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
              <Box
                sx={{
                  paddingBottom: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  error={!!(formik.touched.documentType && formik.errors.documentType)}
                  helperText={formik.touched.documentType && formik.errors.documentType}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("documentType", newValue)}
                  value={formik.values.documentType}
                  name="documentType"
                  fullWidth
                  size="small"
                  options={[
                    { value: 1, label: "Tài liệu 1" },
                    { value: 2, label: "Tài liệu 2" },
                  ]}
                  sx={{ marginRight: "10px" }}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Loại giấy tờ" />
                  )}
                />
                <TextField
                  error={!!(formik.touched.ordinal && formik.errors.ordinal)}
                  helperText={formik.touched.ordinal && formik.errors.ordinal}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.ordinal}
                  name="ordinal"
                  variant="outlined"
                  required
                  size="small"
                  sx={{ marginRight: "10px" }}
                  label="Thứ tự"
                  fullWidth
                />
              </Box>
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
