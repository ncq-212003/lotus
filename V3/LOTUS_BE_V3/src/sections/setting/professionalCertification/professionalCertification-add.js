import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, Box, Autocomplete } from "@mui/material";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';
import 'dayjs/locale/en-gb';
import { addCertificationApi, listCertificationApi } from "src/contexts/api/setting/api-certification";
import { useApp } from "src/hooks/use-app";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_CERTIFICATION } from "src/contexts/reducer/setting/reducer-certification";
import useFetchLocation from "src/contexts/api/location-api";

export default function ProfessionalCertificationAdd() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [typeBusiness, setTypeBusiness] = useState([
    { id: 1, name: 'Doanh nghiệp tư nhân' },
    { id: 2, name: 'Công ty trách nhiệm hữu hạn một thành viên' },
    { id: 3, name: 'Công ty trách nhiệm hữu hạn hai thành viên trở lên' },
    { id: 4, name: 'Công ty cổ phần' },
    { id: 5, name: 'Công ty hợp danh' },
  ])

  const validationSchema = Yup.object({
    tenCongTy: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    tenGiaoDich: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    loaiHinhDoanhNghiep: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    diaDiemDat: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    diaChiCty: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    soDienThoai: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    soFax: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[\d.]+$/, "Vui lòng nhập số Fax")
      .max(15, "Số fax tối đa là 15 số"),
    email: Yup
      .string()
      .max(4000)
      .email("Vui lòng nhập email đúng định dạng")
      .required("Vui lòng nhập thông tin vào trường này"),
    ngayDangKy: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    ngayCapGiayPhep: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    soGiayPhep: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    nguoiDaiDien: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    chucVuDaiDien: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    dienThoaiNguoiDaiDien: Yup
      .string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    nguoiKyCV: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
    chucDanhNguoiKy: Yup
      .string()
      .required('Vui lòng nhập thông tin vào trường này'),
  });

  const initialValues = {
    tenCongTy: "",
    tenGiaoDich: "",
    loaiHinhDoanhNghiep: "",
    diaDiemDat: "",
    diaChiCty: "",
    soDienThoai: "",
    soFax: "",
    email: "",
    ngayDangKy: "",
    ngayCapGiayPhep: "",
    soGiayPhep: "",
    thongTinKhac: "",
    nguoiDaiDien: "",
    chucVuDaiDien: "",
    dienThoaiNguoiDaiDien: "",
    nguoiKyCV: "",
    chucDanhNguoiKy: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          CertificationCompanyId: 1,
          CertificationCompanyName: values.tenCongTy,
          TransactionName: values.tenGiaoDich,
          Type: values.loaiHinhDoanhNghiep,
          LocationId: values.diaDiemDat,
          LocationIdHidden: "1",
          Address: values.diaChiCty,
          Phone: values.soDienThoai,
          Description: values.thongTinKhac,
          Fax: values.soFax,
          Email: values.email,
          RegisterDate: format(new Date(values.ngayDangKy), 'yyyy/MM/dd'),
          LicenseDate: format(new Date(values.ngayCapGiayPhep), 'yyyy/MM/dd'),
          NumberLicense: values.soGiayPhep,
          Representative: values.nguoiDaiDien,
          JobRepresentative: values.chucVuDaiDien,
          ReprentivePhone: values.dienThoaiNguoiDaiDien,
          SignaturePersonName: values.nguoiKyCV,
          JobSignaturePersonName: values.chucDanhNguoiKy,
          Field1: "1",
          Field2: "1",
          Field3: "1",
          Field4: "1",
          Field5: "1",
          TimeStamp: Math.floor(new Date().getTime() / 1000),
          CreatedAt: new Date().toISOString(),
          CreatedBy: 1,
          CreatedByHidden: "1",
          LastModifiedAt: new Date().toISOString(),
          LastModifiedBy: "1",
          LastModifiedByHidden: "1",
          Flag: "1"
        }
        const response = await addCertificationApi(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Dữ liệu đã được thêm thành công.");
          setSnackbarOpen(true);
          formik.resetForm();

          const res = await listCertificationApi();
          dispatch({
            type: HANDLERS_CERTIFICATION.LIST_CERTIFICATION,
            payload: res.data
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
    },
  });

  return (
    <Stack spacing={3} sx={{ marginTop: "80px" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>
            <TextField
              error={!!(formik.touched.tenCongTy && formik.errors.tenCongTy)}
              helperText={formik.touched.tenCongTy && formik.errors.tenCongTy}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenCongTy}
              name="tenCongTy"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              required
              label="Tên công ty"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.tenGiaoDich && formik.errors.tenGiaoDich)}
              helperText={formik.touched.tenGiaoDich && formik.errors.tenGiaoDich}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tenGiaoDich}
              name="tenGiaoDich"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              required
              label="Tên giao dịch "
              fullWidth
            />

            <Autocomplete
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={typeBusiness}
              value={typeBusiness.find((item) => item.name === formik.values.loaiHinhDoanhNghiep) || null}
              onChange={(_, newValue) => {
                formik.setFieldValue('loaiHinhDoanhNghiep', newValue ? newValue.name : null);
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Loại hình doanh nghiệp"
                  name="loaiHinhDoanhNghiep"
                  onBlur={formik.handleBlur}
                  error={formik.touched.loaiHinhDoanhNghiep && Boolean(formik.errors.loaiHinhDoanhNghiep)}
                  helperText={formik.touched.loaiHinhDoanhNghiep && formik.errors.loaiHinhDoanhNghiep}
                />
              )}
            />

            <Autocomplete
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={cities}

              value={cities.find((item) => item.value === formik.values.diaDiemDat) || null}
              onChange={(_, newValue) => {
                if (newValue === null) {
                  formik.setFieldValue('diaDiemDat', "");
                } else {
                  const newCityId = newValue ? newValue.value : null;
                  formik.setFieldValue('diaDiemDat', newCityId);
                  setCityId(newCityId);
                }
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  required
                  {...params}
                  label="Địa điểm đặt trụ sở"
                  name="diaDiemDat"
                  onBlur={formik.handleBlur}
                  error={formik.touched.diaDiemDat && Boolean(formik.errors.diaDiemDat)}
                  helperText={formik.touched.diaDiemDat && formik.errors.diaDiemDat}
                />
              )}
            />

            <TextField
              error={!!(formik.touched.diaChiCty && formik.errors.diaChiCty)}
              helperText={formik.touched.diaChiCty && formik.errors.diaChiCty}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.diaChiCty}
              name="diaChiCty"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ công ty "
              fullWidth
            />

            <TextField
              error={!!(formik.touched.soDienThoai && formik.errors.soDienThoai)}
              helperText={formik.touched.soDienThoai && formik.errors.soDienThoai}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.soDienThoai}
              name="soDienThoai"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Điện thoại"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.soFax && formik.errors.soFax)}
              helperText={formik.touched.soFax && formik.errors.soFax}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.soFax}
              name="soFax"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số fax"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ email"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Giấy phép
            </Typography>
            <DatePicker
              onChange={(value) => {
                formik.setFieldValue('ngayDangKy', Date.parse(value));
              }}
              value={formik.values.ngayDangKy}
              name="ngayDangKy"
              sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined',
                  onBlur: formik.handleBlur,
                  error: !!(formik.touched.ngayDangKy && formik.errors.ngayDangKy),
                  helperText: formik.touched.ngayDangKy && formik.errors.ngayDangKy,
                }
              }}
              label="Ngày đăng ký"
            />

            <DatePicker
              onChange={(value) => {
                formik.setFieldValue('ngayCapGiayPhep', Date.parse(value));
              }}
              value={formik.values.ngayCapGiayPhep}
              name="ngayCapGiayPhep"
              sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined',
                  onBlur: formik.handleBlur,
                  error: !!(formik.touched.ngayCapGiayPhep && formik.errors.ngayCapGiayPhep),
                  helperText: formik.touched.ngayCapGiayPhep && formik.errors.ngayCapGiayPhep,
                }
              }}
              label="Ngày cấp giấy phép"
            />

            <TextField
              error={!!(formik.touched.soGiayPhep && formik.errors.soGiayPhep)}
              helperText={formik.touched.soGiayPhep && formik.errors.soGiayPhep}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.soGiayPhep}
              name="soGiayPhep"
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số giấy phép"
              required
              fullWidth
            />

            <TextField
              error={!!(formik.touched.thongTinKhac && formik.errors.thongTinKhac)}
              helperText={formik.touched.thongTinKhac && formik.errors.thongTinKhac}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.thongTinKhac}
              name="thongTinKhac"
              variant="outlined"
              multiline
              rows={2}
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Thông tin khác"
              fullWidth
            />
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Người đại diện
            </Typography>
            <TextField
              error={!!(formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien)}
              helperText={formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nguoiDaiDien}
              name="nguoiDaiDien"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Người đại diện"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.chucVuDaiDien && formik.errors.chucVuDaiDien)}
              helperText={formik.touched.chucVuDaiDien && formik.errors.chucVuDaiDien}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.chucVuDaiDien}
              name="chucVuDaiDien"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chức vụ người đại diện"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.dienThoaiNguoiDaiDien && formik.errors.dienThoaiNguoiDaiDien)}
              helperText={formik.touched.dienThoaiNguoiDaiDien && formik.errors.dienThoaiNguoiDaiDien}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.dienThoaiNguoiDaiDien}
              name="dienThoaiNguoiDaiDien"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Điện thoại người đại diện"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.nguoiKyCV && formik.errors.nguoiKyCV)}
              helperText={formik.touched.nguoiKyCV && formik.errors.nguoiKyCV}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nguoiKyCV}
              name="nguoiKyCV"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Người ký CV"
              fullWidth
            />

            <TextField
              error={!!(formik.touched.chucDanhNguoiKy && formik.errors.chucDanhNguoiKy)}
              helperText={formik.touched.chucDanhNguoiKy && formik.errors.chucDanhNguoiKy}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.chucDanhNguoiKy}
              name="chucDanhNguoiKy"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chức danh người ký CV"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item sm={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1C2536",
            }}
            onClick={formik.handleSubmit}
          >
            Thêm
          </Button>
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
}
