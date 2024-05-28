import { Stack, TextField, Button, Autocomplete, Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
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

export const AddPresent = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFile(fileUrl);
  };

  const validationSchema = Yup.object({
    gift_name: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này')
  });

  const initialValues = {
    gift_name: "",
    note: "",
    linkImage: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        values.linkImage = selectedFile;
        alert("thanh cong")
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
              error={!!(formik.touched.gift_name && formik.errors.gift_name)}
              helperText={formik.touched.gift_name && formik.errors.gift_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.gift_name}
              name="gift_name"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Tên quà tặng"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.note && formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.note}
              name="note"
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
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography variant="b" component="b" sx={{ margin: "14px" }}>
                Ảnh quà tặng
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
