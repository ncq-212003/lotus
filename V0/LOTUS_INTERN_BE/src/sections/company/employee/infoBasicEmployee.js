import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStoreEmployee, setFieldInput } from "src/contexts/employee-context";

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

export default function InfoBaseEmployee() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, dispatch] = useStoreEmployee();
  const tab = "basicInfo";
  const { basicInfo } = state;
  const {
    avatar,
    employeeId,
    employeeCode,
    deparment,
    role,
    citizenIdentity,
    issuedBy,
    dateRange,
    lastName,
    middleName,
    firstName,
    city,
    district,
    ward,
    address,
    email,
    phone,
    deskPhone,
    contractSigningDate,
    dob,
    gender,
    educationalLevel,
    marriageStatus,
    description,
    loginName,
    password,
    confirmPassword,
    status,
  } = basicInfo;

  const [deparmentM, setDepartmentM] = useState([]);
  const [roleM, setRoleM] = useState([]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event, fieldName) => {
    dispatch(setFieldInput(tab, fieldName, event.target.value));
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch(setFieldInput(tab, fieldName, newValue));
  };

  const handleChangeDate = (value, fieldName) => {
    const formattedDate = dayjs(value).format("YYYY-MM-DD");
    dispatch(setFieldInput("yourTabName", fieldName, formattedDate));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setFieldInput(tab, "avatar", file));
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const filteredOptions = optionCompanyDepartmentRole.filter((optionRole) =>
    deparmentM.includes(optionRole.departmentId)
  );

  const findLabelByValue = (value) => {
    const selectedOption = optionCompanyDepartment.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : ""; // Trả về nhãn nếu tìm thấy hoặc chuỗi trống nếu không tìm thấy
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginBottom: "12px",
      }}
    >
      <div>
        <Grid container spacing={2} style={{ marginBottom: "-20px" }}>
          <Grid item xs={12} md={2} lg={2}>
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
            <Button sx={{ marginBottom: "10px", width: "120px" }} component="label">
              Tải ảnh
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <TextField
              onChange={(event) => handleChange(event, "employeeCode")}
              value={employeeCode}
              name="employeeCode"
              variant="outlined"
              fullWidth
              required
              label="Mã nhân viên"
              sx={{ margin: "1px", marginBottom: "7px" }}
            />
            <Autocomplete
              onChange={(event, newValue) => {
                setDepartmentM(newValue.map((option) => option.value));
              }}
              name="deparment"
              multiple
              limitTags={2}
              id="checkboxes-department"
              disableCloseOnSelect
              size="small"
              sx={{ marginBottom: "9px" }}
              options={optionCompanyDepartment}
              groupBy={(option) => option.company}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Công ty - Phòng ban" />
              )}
            />
            <Autocomplete
              options={filteredOptions}
              name="role"
              multiple
              limitTags={3}
              disableCloseOnSelect
              size="small"
              sx={{ width: "100%" }}
              groupBy={(option) => option.company + " - " + option.department}
              getOptionLabel={(option) => option.label}
              renderOption={(props, optionRole, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {optionRole.label}
                </li>
              )}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Vai trò" />}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <TextField
              onChange={(event) => handleChange(event, "citizenIdentity")}
              value={citizenIdentity}
              variant="outlined"
              fullWidth
              required
              sx={{ marginBottom: "7px" }}
              label="Số CMND/CCD"
              name="citizenIdentity"
            />
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "issuedBy", newValue)}
              value={issuedBy}
              name="issuedBy"
              fullWidth
              size="small"
              options={[
                { value: 1, label: "Hà Nội" },
                { value: 2, label: "Hải Dương" },
              ]}
              renderInput={(params) => <TextField {...params} label="Nơi cấp" variant="outlined" />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onChange={(value) => handleChangeDate(value, "dateRange")}
                value={dateRange}
                name="dateRange"
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
                sx={{ marginTop: "10px" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Họ tên */}
        <Grid container spacing={2} style={{ marginTop: "15px", marginBottom: "10px" }}>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => handleChange(event, "lastName")}
              value={lastName}
              variant="outlined"
              fullWidth
              required
              label="Họ"
              name="lastName"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => handleChange(event, "middleName")}
              value={middleName}
              variant="outlined"
              fullWidth
              required
              label="Tên đệm"
              name="middleName"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(event) => handleChange(event, "firstName")}
              value={firstName}
              variant="outlined"
              fullWidth
              required
              label="Tên"
              name="firstName"
            />
          </Grid>
        </Grid>

        {/* Tỉnh thành phố */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "city", newValue)}
              value={city}
              name="city"
              fullWidth
              size="small"
              options={cityOptions}
              renderInput={(params) => (
                <TextField {...params} label="Tỉnh/ Thành phố" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "district", newValue)}
              value={district}
              name="district"
              fullWidth
              size="small"
              options={districtOptions}
              renderInput={(params) => (
                <TextField {...params} label="Quận/ Huyện" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "ward", newValue)}
              value={ward}
              name="ward"
              fullWidth
              size="small"
              options={wardOptions}
              renderInput={(params) => (
                <TextField {...params} label="Xã/ Phường" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>

        {/* Địa chỉ thường trú */}
        <Grid container spacing={2}>
          <Grid item sm={5} md={7} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "address")}
              value={address}
              variant="outlined"
              fullWidth
              required
              label="Địa chỉ thường trú (Số nhà, tòa nhà, thôn, xóm...)"
              name="address"
              sx={{ marginTop: "16px" }}
            />
          </Grid>
          <Grid item sm={5} md={5} xs={12} style={{ marginTop: "15px" }}>
            <TextField
              onChange={(event) => handleChange(event, "email")}
              value={email}
              variant="outlined"
              fullWidth
              label="Email"
              name="email"
              sx={{ margin: "1px" }}
            />
          </Grid>
        </Grid>

        {/* Sđt, ngày vào công ty */}
        <Grid container spacing={2}>
          <Grid item sm={3} md={3} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "phone")}
              value={phone}
              variant="outlined"
              fullWidth
              required
              label="Số điện thoại"
              name="phone"
              sx={{ marginTop: "8px" }}
            />
          </Grid>
          <Grid item sm={3} md={3} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "deskPhone")}
              value={deskPhone}
              variant="outlined"
              fullWidth
              label="Số điện thoại bàn"
              sx={{ marginTop: "8px" }}
              name="deskPhone"
            />
          </Grid>
          <Grid item sm={3} md={2} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onChange={(value) => handleChangeDate(value, "contractSigningDate")}
                value={contractSigningDate}
                name="contractSigningDate"
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày ký hợp đồng"
                sx={{ marginTop: "8px" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={3} md={2} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onChange={(value) => handleChangeDate(value, "dob")}
                value={dob}
                name="dob"
                required
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày sinh"
                sx={{ marginTop: "8px" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item sm={3} md={2} xs={12}>
            <FormLabel sx={{ marginTop: "8px" }}>Giới tính</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={gender}
              onChange={(event) => handleChange(event, "gender")}
            >
              <FormControlLabel value="male" control={<Radio size="small" />} label="Nam" />
              <FormControlLabel value="female" control={<Radio size="small" />} label="Nữ" />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* Trình độ văn hóa */}
        <Grid container spacing={2}>
          <Grid item sm={5} md={6} xs={12}>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "educationalLevel", newValue)}
              value={educationalLevel}
              name="educationalLevel"
              fullWidth
              size="small"
              options={educationalLevelOptions}
              renderInput={(params) => (
                <TextField {...params} label="Trình độ văn hóa" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item sm={5} md={6} xs={12}>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "marriageStatus", newValue)}
              value={marriageStatus}
              name="marriageStatus"
              fullWidth
              size="small"
              options={marriageStatusOptions}
              renderInput={(params) => (
                <TextField {...params} label="Tình trạng hôn nhân" variant="outlined" />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              onChange={(event) => handleChange(event, "description")}
              value={description}
              variant="outlined"
              fullWidth
              multiline
              margin="normal"
              style={{ marginBottom: "20px" }}
              label="Ghi chú"
              name="description"
            />
          </Grid>
        </Grid>

        <FormControlLabel
          control={<Switch checked={isSwitchOn} onChange={handleSwitchChange} />}
          label="Cho phép truy cập hệ thống"
        />

        {isSwitchOn && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              margin: "0 auto",
              maxWidth: "600px",
            }}
          >
            <TextField
              onChange={(event) => handleChange(event, "loginName")}
              value={loginName}
              variant="outlined"
              label="Tên người dùng"
              fullWidth
              name="loginName"
              sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
            />
            <Box
              sx={{
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <TextField
                onChange={(event) => handleChange(event, "password")}
                value={password}
                variant="outlined"
                label="Mật khẩu"
                fullWidth
                name="password"
                sx={{ flex: 1, mr: 1, marginBottom: "10px" }}
              />
              <TextField
                onChange={(event) => handleChange(event, "confirmPassword")}
                value={confirmPassword}
                variant="outlined"
                label="Xác nhận mật khẩu"
                fullWidth
                name="confirmPassword"
                sx={{ flex: 1, mr: 1 }}
              />
            </Box>
            <FormLabel>Trạng thái</FormLabel>
            <RadioGroup
              row
              name="status"
              value={status}
              onChange={(event) => handleChange(event, "status")}
            >
              <FormControlLabel
                value="isActive"
                control={<Radio size="small" />}
                label="Đang hoạt động"
              />
              <FormControlLabel value="locked" control={<Radio size="small" />} label="Khóa" />
            </RadioGroup>
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000} // Tự động ẩn sau 2 giây
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Vị trí ở góc dưới bên phải
        >
          <Alert
            elevation={6}
            variant="filled"
            severity={snackbarSeverity}
            onClose={handleCloseSnackbar}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
}

const optionCompanyDepartment = [
  { value: 1, company: "Công ty Apple", label: "Phòng nhân sự" },
  { value: 2, company: "Công ty Apple", label: "Phòng kế toán" },
  { value: 3, company: "Công ty Apple", label: "Phòng công nghệ & truyền thông" },
  { value: 4, company: "Công ty Samsung", label: "Phòng tài chính" },
  { value: 5, company: "Công ty Samsung", label: "Phòng chăm sóc khách hàng" },
  { value: 6, company: "Công ty Samsung", label: "Phòng hành chính" },
];

const optionCompanyDepartmentRole = [
  {
    value: 1,
    company: "Công ty Apple",
    department: "Phòng nhân sự",
    label: "Quản trị",
    departmentId: 1,
  },
  {
    value: 2,
    company: "Công ty Apple",
    department: "Phòng nhân sự",
    label: "Giáo viên",
    departmentId: 1,
  },
  {
    value: 3,
    company: "Công ty Apple",
    department: "Phòng nhân sự",
    label: "Cán bộ tuyển dụng",
    departmentId: 1,
  },
  {
    value: 5,
    company: "Công ty Apple",
    department: "Phòng kế toán",
    label: "Quản trị",
    departmentId: 2,
  },
  {
    value: 6,
    company: "Công ty Apple",
    department: "Phòng kế toán",
    label: "Giáo viên",
    departmentId: 2,
  },
  {
    value: 7,
    company: "Công ty Apple",
    department: "Phòng kế toán",
    label: "Cán bộ tuyển dụng",
    departmentId: 2,
  },
  {
    value: 8,
    company: "Công ty Apple",
    department: "Phòng kế toán",
    label: "Nhân viên",
    departmentId: 2,
  },
  {
    value: 4,
    company: "Công ty Apple",
    department: "Phòng công nghệ & truyền thông",
    label: "Nhân viên",
    departmentId: 3,
  },
  {
    value: 9,
    company: "Công ty Samsung",
    department: "Phòng tài chính",
    label: "Quản trị",
    departmentId: 4,
  },
  {
    value: 10,
    company: "Công ty Samsung",
    department: "Phòng tài chính",
    label: "Giáo viên",
    departmentId: 4,
  },
  {
    value: 11,
    company: "Công ty Samsung",
    department: "Phòng tài chính",
    label: "Cán bộ tuyển dụng",
    departmentId: 4,
  },
  {
    value: 12,
    company: "Công ty Samsung",
    department: "Phòng chăm sóc khách hàng",
    label: "Nhân viên",
    departmentId: 5,
  },
];

const marriageStatusOptions = [
  { value: 1, label: "Chưa kết hôn" },
  { value: 2, label: "Sống chung chưa kết hôn" },
  { value: 3, label: "Đang có vợ/chồng" },
  { value: 4, label: "Góa" },
  { value: 5, label: "Ly thân và ly hôn" },
];

const educationalLevelOptions = [
  { value: 1, label: "Cấp 1" },
  { value: 2, label: "Cấp 2" },
  { value: 3, label: "Cấp 3" },
  { value: 4, label: "Đại học" },
  { value: 5, label: "Cao đẳng" },
];