import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddProcess = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    title: Yup
      .string()
      .required('Tiêu đề không được để trống'),
    progress: Yup
      .string()
      .required('Tiến trình không được để trống'),
    color: Yup
      .string()
      .required('Màu sắc không được để trống'),
  });

  const initialValues = {
    title: "",
    progress: "",
    color: "",
    image: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
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
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "30px 0px",
        }}
      >
        <Box
          sx={{
            border: "2px solid rgb(224, 224, 224) !important",
            padding: "10px 10px 15px 10px",
          }}
        >
          <Grid container>
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
              onChange={(event, newValue) => formik.setFieldValue("color", newValue || "")}
              value={formik.values.color}
              name="color"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Brown", "Pink"]}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.color && formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                {...params} label="Màu sắc" variant="outlined" />}
            />

            <Stack direction="column" spacing={1} mt={3}>
              <Avatar
                sx={{
                  width: "120px",
                  height: "160px",
                }}
                variant="rounded"
                src={selectedFile}
              ></Avatar>
              <Button size="small" component="label">
                Tải icons
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Stack>
          </Grid>
          <Stack display="flex">
            <Box marginLeft="auto">
              <Button
                variant="contained"
                onClick={formik.handleSubmit}
                sx={{
                  marginTop: "30px",
                  backgroundColor: "#1C2536",
                  width: "150px",
                }}
              >
                Lưu
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
