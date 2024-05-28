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
import { HANDLERS_BRANCH } from "src/contexts/reducer/company/reducer-branch";
import * as Yup from "yup";

const companiesOption = [
  { value: 1, label: "Công ty Apple" },
  { value: 2, label: "Công ty Apple" },
  { value: 3, label: "Công ty Apple " },
  { value: 4, label: "Công ty Samsung" },
  { value: 5, label: "Công ty Samsung " },
  { value: 6, label: "Công ty Game" },
];
const locationOption = [
  { value: 1, label: "Trong nước" },
  { value: 2, label: "Nhật Bản" },
  { value: 3, label: "Hàn Quốc" },
];

export default function BranchAdd() {
  const formik = useFormik({
    initialValues: {
      companies: "",
      address: "",
      mainPersonCharge: "",
      deparment: "",
      phone: "",
      country: "",
    },
    validationSchema: Yup.object({
      mainPersonCharge: Yup.string().required("Cần cung cấp người đại diện"),
      deparment: Yup.string().required("Cần cung cấp phong ban"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .required("Cần cung cấp số điện thoại"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(data);

        // call api
        // const response = addCompanyApi(data);

        // dispatch
        // dispatch({
        //   type: HANDLERS_COMPANY.ADD_COMPANY,
        //   payload: response.data,
        // });
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
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Autocomplete
                  error={!!(formik.touched.companies && formik.errors.companies)}
                  helperText={formik.touched.companies && formik.errors.companies}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("companies", newValue)}
                  value={formik.values.companies}
                  name="companies"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  options={companiesOption}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Tên công ty" />
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
                  error={!!(formik.touched.mainPersonCharge && formik.errors.mainPersonCharge)}
                  helperText={formik.touched.mainPersonCharge && formik.errors.mainPersonCharge}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mainPersonCharge}
                  name="mainPersonCharge"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Người phụ trách chính "
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  error={!!(formik.touched.deparment && formik.errors.deparment)}
                  helperText={formik.touched.deparment && formik.errors.deparment}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.deparment}
                  name="deparment"
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Tên phòng ban "
                  sx={{ margin: "4px", marginTop: "12px" }}
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
      </form>
    </>
  );
}
