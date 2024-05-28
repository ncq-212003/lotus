import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

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

export const AddProcess = (props) => {
  // lấy file ảnh
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
  };
  // end

  const colorOptions = [
    { label: 'Red', color: 'red' },
    { label: 'Blue', color: 'blue' },
    { label: 'Green', color: 'green' },
    { label: 'Yellow', color: 'Yellow' },
    { label: 'Orange', color: 'Orange' },
    { label: 'Purple', color: 'Purple' },
    // Thêm các đối tượng màu sắc khác tại đây
  ];

  const validationSchema = Yup.object({
    title: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    progress: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    color: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
  });

  const initialValues = {
    title: "",
    progress: "",
    color: "",
    linkImage: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
      try {
        values.linkImage = selectedFile;
        const data = JSON.stringify(values);
        alert("thanh cong")
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
              error={!!(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              name="title"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Tiêu đề"
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("progress", newValue || "")}
              value={formik.values.progress}
              name="progress"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "10%", "20%", "30%", "40%", "60%", "70%", "90%", "100%"]}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.progress && formik.errors.progress)}
                helperText={formik.touched.progress && formik.errors.progress}
                {...params} label="Tiến trình" variant="outlined" />}
            />

            <Autocomplete
              id="color-select-demo"
              fullWidth
              sx={{ marginTop: "12px" }}
              size="small"
              options={colorOptions}
              autoHighlight
              getOptionLabel={(option) => option.label}
              value={colorOptions.find((option) => option.label === formik.values.color) || null}
              onChange={(event, value) => formik.setFieldValue('color', value ? value.label : '')}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '& > div': {
                      display: 'flex',
                      alignItems: 'center',
                      mr: 2,
                      flexShrink: 0,
                    },
                  }}
                  {...props}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: option.color,
                    }}
                  />
                  <span>{option.label}</span>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.color && formik.errors.color)}
                  helperText={formik.touched.color && formik.errors.color}
                  {...params}
                  variant="outlined"
                  label="Màu sắc"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="b" component="b" sx={{ margin: "14px 14px 14px 20px" }}>
                Ảnh icons
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
