import * as React from "react";
import { useEffect, useState } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { addDocumentApi, ListDocumentApi } from "src/contexts/api/setting/api-document";
import { HANDLERS_DOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import { useApp } from "src/hooks/use-app";

export default function DocumentAdd() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();

  const [paper, setPaper] = useState([
    { id: 1, name: "Căn cước công dân/ CMND" },
    { id: 2, name: "Giấy xác nhận" },
    { id: 3, name: "Loại thông báo" },
  ]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    loaiGiayTo: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    tenGiayTo: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    thuTu: Yup
      .number()
      .positive('Vui lòng nhập một số lớn hơn 0')
      .typeError('Vui lòng nhập số vào trường này')
      .required('Vui lòng nhập thông tin vào trường này'),
    maGiayTo: Yup
      // .number()
      // .positive('Vui lòng nhập một số lớn hơn 0')
      // .typeError('Vui lòng nhập số vào trường này')
      // .required('Vui lòng nhập thông tin vào trường này'),
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    loaiGiayTo: "",
    tenGiayTo: "",
    thuTu: "",
    maGiayTo: "",
    ghiChu: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          PaperId: 1,
          PaperName: values.tenGiayTo,
          Code: values.maGiayTo,
          PaperOrder: values.thuTu,
          PaperOrderHidden: "1",
          Description: values.ghiChu,
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: 1,
          LastModifiedByHidden: "1",
          Flag: "1"
        }
        const response = await addDocumentApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Dữ liệu đã được thêm thành công.");
          setSnackbarOpen(true);
          formik.resetForm();

          const listData = await ListDocumentApi();
          dispatch({
            type: HANDLERS_DOCUMENT.LIST_DOCUMENTS,
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
    },
  });

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
            <Autocomplete
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={paper}
              value={paper.find((item) => item.id === formik.values.loaiGiayTo) || null}
              onChange={(_, newValue) => {
                formik.setFieldValue('loaiGiayTo', newValue ? newValue.id : null);
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Loại giấy tờ"
                  name="loaiGiayTo"
                  onBlur={formik.handleBlur}
                  error={formik.touched.loaiGiayTo && Boolean(formik.errors.loaiGiayTo)}
                  helperText={formik.touched.loaiGiayTo && formik.errors.loaiGiayTo}
                />
              )}
            />

            <TextField
              error={!!(formik.touched.tenGiayTo && formik.errors.tenGiayTo)}
              helperText={formik.touched.tenGiayTo && formik.errors.tenGiayTo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenGiayTo}
              name="tenGiayTo"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Tên giấy tờ"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.thuTu && formik.errors.thuTu)}
              helperText={formik.touched.thuTu && formik.errors.thuTu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.thuTu}
              name="thuTu"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Thứ tự"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.maGiayTo && formik.errors.maGiayTo)}
              helperText={formik.touched.maGiayTo && formik.errors.maGiayTo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.maGiayTo}
              name="maGiayTo"
              variant="outlined"
              size="small"
              sx={{ marginTop: "12px" }}
              label="Mã giấy tờ"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
              helperText={formik.touched.ghiChu && formik.errors.ghiChu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ghiChu}
              name="ghiChu"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
              variant="outlined"
              multiline
              rows={2}
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
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
}
