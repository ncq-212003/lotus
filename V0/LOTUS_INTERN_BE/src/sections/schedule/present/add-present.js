import { Stack, TextField, Button, Autocomplete, Grid, Box } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddPresent = (props) => {
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
    gift_name: Yup
      .string()
      .required('Quà tặng không được để trống')
  });

  const initialValues = {
    gift_name: "",
    note: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      // e.preventDefault();
      try {
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
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "30px 0px",
        }}
      >
        <Box
          sx={{
            border: "1px solid rgb(224, 224, 224) !important",
            padding: "2px 10px 15px 10px",
          }}
        >
          <Grid container>
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
              rows={3}
            />
            <Stack direction="column" spacing={1} mt={3}>
              <Avatar
                sx={{
                  width: "120px",
                  height: "160px",
                  marginLeft: "10px"
                }}
                variant="rounded"
                src={selectedFile}
              ></Avatar>
              <Button size="small" component="label">
                Tải ảnh quà tặng
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
