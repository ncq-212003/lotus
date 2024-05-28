import { Add } from "@mui/icons-material";
import {
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  SvgIcon,
  Link,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import ModalAddBranch from "src/components/modal-add-branch";
import * as Yup from "yup";

const companiesOption = [
  { value: 1, label: "Công ty Apple" },
  { value: 2, label: "Công ty Apple1" },
  { value: 3, label: "Công ty Apple2 " },
  { value: 4, label: "Công ty Samsung" },
  { value: 5, label: "Công ty Samsung1 " },
  { value: 6, label: "Công ty Game" },
];

const branchsOption = [
  { value: 1, label: "Trong nước" },
  { value: 2, label: "Nhật Bản" },
  { value: 3, label: "Hàn Quốc" },
];

const statusOption = [
  { value: 1, label: "Hoạt động" },
  { value: 2, label: "Dừng hoạt động" },
];

export default function DepartmentAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (params) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      company: "",
      branch: "",
      departmentName: "",
      departmentId: "",
      deskPhone: "",
      mainPersonInCharge: "",
      status: "",
      description: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required("Cần cung cấp tên phong ban"),
      departmentId: Yup.string().required("Cần cung cấp mã phong ban"),
      deskPhone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .required("Cần cung cấp số điện thoại"),
      mainPersonInCharge: Yup.string().required("Cần cung cấp người đại diện"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(data);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={3}
          sx={{
            margin: "38px 0",
          }}
        >
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item sm={12} xs={12} md={6}>
                <Autocomplete
                  error={!!(formik.touched.company && formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                  value={formik.values.company}
                  name="company"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={companiesOption}
                  renderInput={(params) => (
                    <TextField {...params} label="Công ty" variant="outlined" />
                  )}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Autocomplete
                    error={!!(formik.touched.branch && formik.errors.branch)}
                    helperText={formik.touched.branch && formik.errors.branch}
                    onBlur={formik.handleBlur}
                    onChange={(event, newValue) => formik.setFieldValue("branch", newValue)}
                    value={formik.values.branch}
                    name="branch"
                    sx={{ margin: "4px", marginTop: "12px" }}
                    fullWidth
                    size="small"
                    options={branchsOption}
                    renderInput={(params) => (
                      <TextField {...params} label="Chi nhánh" variant="outlined" />
                    )}
                  />
                  <Tooltip title="Thêm">
                    <IconButton onClick={handleOpenModal}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                </Box>

                <TextField
                  error={!!(formik.touched.departmentName && formik.errors.departmentName)}
                  helperText={formik.touched.departmentName && formik.errors.departmentName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.departmentName}
                  name="departmentName"
                  required
                  fullWidth
                  label="Tên phòng ban "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <TextField
                  error={!!(formik.touched.departmentId && formik.errors.departmentId)}
                  helperText={formik.touched.departmentId && formik.errors.departmentId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.departmentId}
                  name="departmentId"
                  required
                  fullWidth
                  label="Mã phòng ban "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>

              <Grid item sm={12} xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.deskPhone && formik.errors.deskPhone)}
                  helperText={formik.touched.deskPhone && formik.errors.deskPhone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.deskPhone}
                  name="deskPhone"
                  required
                  fullWidth
                  label="Số điện thoại bàn "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <TextField
                  error={!!(formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge)}
                  helperText={formik.touched.mainPersonInCharge && formik.errors.mainPersonInCharge}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mainPersonInCharge}
                  name="mainPersonInCharge"
                  fullWidth
                  label="Người phụ trách chính "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <Autocomplete
                  error={!!(formik.touched.status && formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("status", newValue)}
                  value={formik.values.status}
                  name="status"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                  disablePortal
                  options={statusOption}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Tình trạng" />
                  )}
                />
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  fullWidth
                  label="Mô tả "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
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
        </Stack>
        <ModalAddBranch open={isModalOpen} onClose={closeModal} />
      </form>
    </>
  );
}
