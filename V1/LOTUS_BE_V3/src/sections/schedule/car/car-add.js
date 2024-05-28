import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { addCarApi, listCarApi, } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import { HANDLERS_COMPANY } from 'src/contexts/reducer/company/reducer-company';
import { listEmployeeApi } from "src/contexts/api/company/api-employee";
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // api 
  const [state, dispatch] = useApp();
  const { car, company, employee } = state;
  const { cars } = car;
  const { companies } = company;
  const { employees } = employee;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        formik.setFieldValue('hinhAnh', URL.createObjectURL(file));
        formik.setFieldError('hinhAnh', ''); // Xóa lỗi file
      } else {
        formik.setFieldError('hinhAnh', 'File đã chọn không phải là hình ảnh.');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object({
    tenCongTy: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    tenXe: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    soGhe: Yup
      .number()
      .positive(' Vui lòng nhập một số lớn hơn 0')
      .typeError('Vui lòng nhập số vào trường này')
      .required('Vui lòng nhập thông tin vào trường này'),
    bienSoXe: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    nhanvienPhuTrach: Yup
      .string()
      .required('Vui lòng chọn thông tin vào trường này'),
    hinhAnh: Yup
      .mixed()
      .test('required', 'Vui lòng chọn một ảnh.', function (value) {
        return !!value;
      }),
  });

  const initialValues = {
    tenCongTy: "",
    tenXe: "",
    soGhe: "",
    bienSoXe: "",
    nhanvienPhuTrach: "",
    hinhAnh: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          CarId: "1",
          CompanyId: values.tenCongTy,
          CompanyIdHidden: "1",
          CarName: values.tenXe,
          NumberSeats: values.soGhe,
          CarNumber: values.bienSoXe,
          NumberSeatsHidden: "1",
          EmployeeIdMain: 2,
          EmployeeIdMainHidden: "1",
          Avatar: "1",
          Description: "Lưu ý khi chọn",
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifedAt: new Date().toISOString(),
          LastModifedByHidden: "1",
          Flag: "1"
        }
        const response = await addCarApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Dữ liệu đã được thêm thành công.");
          setSnackbarOpen(true);
          formik.resetForm();

          const listData = await listCarApi();
          dispatch({
            type: HANDLERS_CAR.LIST_CAR,
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
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await listCompanyApi();
      dispatch({
        type: HANDLERS_COMPANY.LIST_COMPANY,
        payload: response.data
      })
    }
    fetchData()
  }, [])

  const companyWithSTT = Array.isArray(companies[0]) ? companies[0].map((company, index) => ({
    id: company.companyId,
    name: company.companyName
  })) : [];

  const handleFindIdByName = (field, value) => {
    formik.setFieldValue(field, value ? value.id : null)
  }

  // useEffect(() => {
  //   const fetchDataEmployee = async () => {
  //     const response = await listEmployeeApi();
  //     dispatch({
  //       type: HANDLERS_EMPLOYEE.LIST_EMPLOYEES,
  //       payload: response.data
  //     })
  //   }
  //   fetchDataEmployee();
  // }, [])

  // const findEmployee = Array.isArray(employees[0]) ? employees[0].map((employee, index) => ({
  //   id: employee.employeeId,
  //   name: employee.userName
  // })) : [];

  // console.log("checkkkk kkkkk", employees[0])

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
              options={companyWithSTT}
              value={companyWithSTT.find(option => option.id === formik.values.tenCongTy) || null}
              onChange={(event, value) => handleFindIdByName('tenCongTy', value)}
              onBlur={formik.handleBlur('tenCongTy')}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Thuộc công ty"
                  name="tenCongTy"
                  error={formik.touched.tenCongTy && Boolean(formik.errors.tenCongTy)}
                  helperText={formik.touched.tenCongTy && formik.errors.tenCongTy}
                />
              )}
            />

            <TextField
              error={!!(formik.touched.tenXe && formik.errors.tenXe)}
              helperText={formik.touched.tenXe && formik.errors.tenXe}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenXe}
              name="tenXe"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Xe"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.soGhe && formik.errors.soGhe)}
              helperText={formik.touched.soGhe && formik.errors.soGhe}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.soGhe}
              name="soGhe"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Số ghế"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.bienSoXe && formik.errors.bienSoXe)}
              helperText={formik.touched.bienSoXe && formik.errors.bienSoXe}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.bienSoXe}
              name="bienSoXe"
              sx={{ marginTop: "12px" }}
              size="small"
              label="Biển số xe"
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("nhanvienPhuTrach", newValue || "")}
              value={formik.values.nhanvienPhuTrach}
              name="nhanvienPhuTrach"
              sx={{ marginTop: "12px" }}
              fullWidth
              size="small"
              options={["", "Nguyễn Văn Thảo", "Phạm Danh Nam", "Nguyễn Công Quyết", "Phùng Văn Tiến"]}
              // options={findEmployee}
              renderInput={(params) => <TextField
                onBlur={formik.handleBlur}
                error={!!(formik.touched.nhanvienPhuTrach && formik.errors.nhanvienPhuTrach)}
                helperText={formik.touched.nhanvienPhuTrach && formik.errors.nhanvienPhuTrach}
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
                  src={formik.values.hinhAnh}
                ></Avatar>
              </Stack>
              <Button size="small" component="label" sx={{ marginLeft: "14px" }}>
                Tải ảnh lên
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              <FormHelperText sx={{ color: 'red' }}>
                {formik.touched.hinhAnh && formik.errors.hinhAnh}
              </FormHelperText>
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

      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Stack>
  );
};
