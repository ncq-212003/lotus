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
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { addBranchApi, listBranchApi } from "src/contexts/api/company/api-branch";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";

// const companiesOption = [
//   { value: 1, label: "Công ty Apple" },
//   { value: 2, label: "Công ty Apple" },
//   { value: 3, label: "Công ty Apple " },
//   { value: 4, label: "Công ty Samsung" },
//   { value: 5, label: "Công ty Samsung " },
//   { value: 6, label: "Công ty Game" },
// ];

const employeeOption = [
  { value: 1, label: "Nghĩa" },
  { value: 2, label: "Tú" },
  { value: 3, label: "Dự" },
];

const locationOption = [
  { value: 1, label: "Trong nước" },
  { value: 2, label: "Nhật Bản" },
  { value: 3, label: "Hàn Quốc" },
];

export default function BranchAdd() {
  const [state, dispatch] = useApp();
  const [companyNameOption, setCompanyNameOption] = useState([]);
  const [employeeNameMain, setEmployeeNameMain] = useState([]);
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  //listCompanyName
  useEffect(() => {
    const listCompanyName = async () => {
      const res = await listCompanyApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const companies = res.data.map((com) => ({
          label: com.companyName,
          value: com.companyId,
        }));
        setCompanyNameOption(companies);
      }
    };
    listCompanyName();
  }, []);

  //listEmployeeName
  useEffect(() => {
    const listEmployeeName = async () => {
      const res = await listEmployeeApi();
      if (Array.isArray(res.data) && res.data.length > 0) {
        const employees = res.data.map((employee) => ({
          label: employee.lastName + " " + employee.middleName + " " + employee.firstName,
          value: employee.employeeId,
        }));
        setEmployeeNameMain(employees);
      }
    };
    listEmployeeName();
  }, []);

  const formik = useFormik({
    initialValues: {
      companies: "",
      address: "",
      mainPersonCharge: "",
      branchName: "",
      phone: "",
      website: "",
      country: "",
    },
    validationSchema: Yup.object({
      branchName: Yup.string().required("Vui lòng nhập thông tin vào trường này").nullable(),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
        .max(15, "Số điện thoại tối đa là 15 số"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          branchId: 1,
          companyId: values.companies.value,
          companyIdHidden: values.companies.value,
          branchName: values.branchName,
          address: values.address,
          location1: values.address,
          telephone: values.phone,
          website: values.website,
          employeeIdMain: values.mainPersonCharge.value,
          employeeIdMainHidden: values.mainPersonCharge.value,
          description: "1",
          field1: "1",
          field2: "1",
          field3: "1",
          fiedl4: "1",
          field5: "1",
          createdAt: new Date().toISOString(),
          createdBy: 1,
          createdByHidden: 1,
          lastModifedAt: new Date().toISOString(),
          lastModifedBy: 1,
          lastModifedByHidden: 1,
          flag: "1",
        };

        console.log(formData);

        const response = await addBranchApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Thêm thành công !");
          setSnackbarOpen(true);

          formik.resetForm();

          // call api list after add success
          const res = await listBranchApi();
          // dispatch list data
          dispatch({
            type: HANDLERS_BRANCH.LIST_BRANCH,
            payload: res.data,
          });
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Có lỗi xảy ra !");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.log(err.message);
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
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
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Autocomplete
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("companies", newValue)}
                  value={formik.values.companies}
                  name="companies"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={companyNameOption}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Tên công ty"
                      error={!!(formik.touched.companies && formik.errors.companies)}
                      helperText={formik.touched.companies && formik.errors.companies}
                    />
                  )}
                />
                <Autocomplete
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("mainPersonCharge", newValue)}
                  value={formik.values.mainPersonCharge}
                  name="mainPersonCharge"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={employeeOption}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      variant="outlined"
                      {...params}
                      label="Người phụ trách chính"
                      error={!!(formik.touched.mainPersonCharge && formik.errors.mainPersonCharge)}
                      helperText={formik.touched.mainPersonCharge && formik.errors.mainPersonCharge}
                    />
                  )}
                />
                <TextField
                  error={!!(formik.touched.address && formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  name="address"
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  label="Địa chỉ"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <TextField
                  error={!!(formik.touched.website && formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.website}
                  name="website"
                  variant="outlined"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Website"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  error={!!(formik.touched.branchName && formik.errors.branchName)}
                  helperText={formik.touched.branchName && formik.errors.branchName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.branchName}
                  name="branchName"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Tên chi nhánh "
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <Autocomplete
                  error={!!(formik.touched.country && formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("country", newValue)}
                  value={formik.values.country}
                  name="country"
                  size="small"
                  fullWidth
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={locationOption}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Chọn quốc gia" />
                  )}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  name="phone"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Số điện thoại "
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#1C2536",
                }}
                type="submit"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Stack>
        <SnackbarAlert
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        />
      </form>
    </>
  );
}
