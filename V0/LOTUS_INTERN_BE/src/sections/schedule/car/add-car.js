import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddCar = (props) => {
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
  const [selectValue, setSelectValue] = useState('');

  const options = [
    {
      id: 1,
      carName: "Toyota Camry",
      hinhanh: "https://sohanews.sohacdn.com/160588918557773824/2023/11/16/photo-16-1700101109495544117008.jpg"
    },
    {
      id: 2,
      carName: "BMW 3 Series",
      hinhanh: "https://www.bmw.com/content/dam/bmw/common/all-models/3-series/sedan/2022/navigation/bmw-3-series-sedan-lci-phev-modelfinder.png"
    },
    {
      id: 3,
      carName: "Mercedes-Benz S-Class",
      hinhanh: "https://storage.googleapis.com/f1-cms/2021/11/8d3d4f41-20211130_064002.jpg"
    },
    {
      id: 4,
      carName: "Ford Mustang",
      hinhanh: "https://images2.thanhnien.vn/Uploaded/chicuong/2022_09_18/2024-mustang-20-6147.jpg"
    },
    {
      id: 5,
      carName: "Toyota Camry",
      hinhanh: "https://vcdn-vnexpress.vnecdn.net/2021/01/28/2021-tesla-model-s-1-5568-1611825229.jpg"
    },
  ];

  const validationSchema = Yup.object({
    companies: Yup
      .string()
      .required('Công ty không được để trống'),
    carName: Yup
      .string()
      .required('Tên xe không được để trống'),
    numberOfSeats: Yup
      .string()
      .required('Số ghế không được để trống'),
    licensePlate: Yup
      .string()
      .required('Biển số xe không được để trống'),
    mainSupervisor: Yup
      .string()
      .required("Người phụ trách không được để trống"),
  });

  const initialValues = {
    companies: "",
    carName: "",
    numberOfSeats: "",
    licensePlate: "",
    mainSupervisor: "",
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
                Tải hình ảnh
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
