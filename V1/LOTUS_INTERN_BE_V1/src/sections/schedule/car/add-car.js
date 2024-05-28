import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AddCar = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    companies: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    carName: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    numberOfSeats: Yup
      .number()
      .positive(' Vui lòng nhập một số lớn hơn 0')
      .typeError('Vui lòng nhập số vào trường này')
      .required('Vui lòng nhập thông tin vào trường này'),
    licensePlate: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    mainSupervisor: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
  });

  const initialValues = {
    companies: "",
    carName: "",
    numberOfSeats: "",
    licensePlate: "",
    mainSupervisor: "",
    linkImage: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        values.linkImage = selectedFile;
        const data = JSON.stringify(values);
        console.log(values)
        setSnackbarSeverity("success");
        setSnackbarMessage("Dữ liệu đã được gửi thành công.");
        setSnackbarOpen(true);
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

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("companies", newValue || "")}
              value={formik.values.companies}
              name="companies"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "Công ty Hưng Thịnh", "Công ty Hoàng Lâm", "Công ty Sơn Hà", "Công ty Minh Tâm", "Công ty Đại Phát"]}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.companies && formik.errors.companies)}
                helperText={formik.touched.companies && formik.errors.companies}
                {...params} label="Thuộc công ty" variant="outlined" />}
            />


            <TextField
              error={!!(formik.touched.carName && formik.errors.carName)}
              helperText={formik.touched.carName && formik.errors.carName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.carName}
              name="carName"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Xe"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.numberOfSeats && formik.errors.numberOfSeats)}
              helperText={formik.touched.numberOfSeats && formik.errors.numberOfSeats}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.numberOfSeats}
              name="numberOfSeats"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Số ghế"
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("licensePlate", newValue || "")}
              value={formik.values.licensePlate}
              name="licensePlate"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "30A-12345", "51B-67890", "92C-45678", "43H-98765", "14A-246813"]}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.licensePlate && formik.errors.licensePlate)}
                helperText={formik.touched.licensePlate && formik.errors.licensePlate}
                {...params} label="Biển số xe" variant="outlined" />}
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("mainSupervisor", newValue || "")}
              value={formik.values.mainSupervisor}
              name="mainSupervisor"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "Nguyễn Văn Thảo", "Phạm Danh Nam", "Nguyễn Công Quyết", "Phùng Văn Tiến"]}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.mainSupervisor && formik.errors.mainSupervisor)}
                helperText={formik.touched.mainSupervisor && formik.errors.mainSupervisor}
                {...params} label="Phụ trách chính" variant="outlined" />}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="b" component="b" sx={{ margin: "14px 14px 14px 30px" }}>
                Ảnh Xe
              </Typography>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    width: "120px",
                    height: "160px",
                  }}
                  variant="rounded"
                  src={selectedFile}
                ></Avatar>
              </Stack>
              <Button size="small" component="label" sx={{ marginLeft: "14px" }}>
                Tải ảnh lên
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
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
    </Stack>
  );
};
