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
import { HANDLERS_EMPLOYEE } from "src/contexts/reducer/company/reducer-employee";
import { useApp } from "src/hooks/use-app";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

export function actionSetTouched(dispatch, tab, fieldName) {
  const newValue = true;
  dispatch({
    type: HANDLERS_EMPLOYEE.SET_TOUCHED_EMPLOYEE,
    payload: { tab, fieldName, newValue },
  });
}
let filedValuePassword;

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
  if (fieldName === "password") {
    filedValuePassword = fieldValue;
  }
  const validationSchema = Yup.object().shape({
    avatar: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    employeeCode: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    deparment: Yup.mixed().test("isValid", "Phòng ban là trường bắt buộc", (value) => {
      return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
    }),
    role: Yup.mixed().test("isValid", "Vai trò là trường bắt buộc", (value) => {
      return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
    }),
    lastName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    middleName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    firstName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    dob: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
    contractSigningDate: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
    gender: Yup.string(),
    nationality: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    phone: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    educationalLevel: Yup.string(),
    marriageStatus: Yup.string(),
    employeeForm: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    email: Yup.string()
      .email("Vui lòng nhập email đúng định dạng")
      .required("Vui lòng nhập thông tin vào trường này"),
    loginName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    password: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .max(40, "Mật khẩu tối đa là 40 ký tự"),
    confirmPassword: Yup.string()
      .required("Xác nhận mật khẩu là trường bắt buộc")
      .max(40, "Mật khẩu tối đa là 40 ký tự")
      .test("is-greater", "Mật khẩu không trùng khớp", (value) => {
        return value === filedValuePassword;
      }),
    status: Yup.string(),
    citizenIdentity: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    dateRange: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    issuedBy: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    cityDomicile: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    districtDomicile: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    wardDomicile: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    permanentAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    temporaryAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    hometownAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    issuedPassportBy: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    passport: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    passportDate: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    passportExpirationDate: Yup.date()
      .typeError("Vui lòng nhập đúng định dạng")
      .test("is-greater", "Ngày hết hạn phải lớn hơn ngày cấp", function (value) {
        const passportDate = this.resolve(Yup.ref("passportDate"));
        return dayjs(value).isAfter(passportDate);
      }),
  });

  let newValue;
  validationSchema
    .validateAt(fieldName, { [fieldName]: fieldValue })
    .then(() => {
      newValue = null;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    })
    .catch((error) => {
      newValue = error.message;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_ERRORS_EMPLOYEE,
        payload: { tab, fieldName, newValue },
      });
    });
}

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
  const [state, dispatch] = useApp();
  const tab = "basicInfo";
  const { employee } = state;
  const { basicInfo } = employee;
  const {
    avatar,
    employeeCode,
    deparment,
    role,
    lastName,
    middleName,
    firstName,
    dob,
    contractSigningDate,
    gender,
    nationality,
    phone,
    educationalLevel,
    marriageStatus,
    employeeForm,
    email,
    loginName,
    password,
    confirmPassword,
    status,
    citizenIdentity,
    dateRange,
    issuedBy,
    cityDomicile,
    districtDomicile,
    wardDomicile,
    permanentAddress,
    temporaryAddress,
    hometownAddress,
    issuedPassportBy,
    passport,
    passportDate,
    passportExpirationDate,
    touched,
    errors,
  } = basicInfo;

  const [deparmentM, setDepartmentM] = useState([]);
  const [roleM, setRoleM] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);

    const fieldValue = event.target.value;
    let newValue;

    if (fieldValue.length >= 0) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldInfobasic(dispatch, tab, fieldName, fieldValue);
  };

  const handleChangeSelect = (event, fieldName, fieldValue) => {
    actionSetTouched(dispatch, tab, fieldName);

    let newValue;

    if (fieldValue !== null) {
      newValue = fieldValue;
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    } else {
      newValue = "";
      dispatch({
        type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
        payload: { tab, fieldName, newValue },
      });
    }

    validateFieldInfobasic(dispatch, tab, fieldName, newValue);
  };

  const handleChangeDate = (value, fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
    const newValue = value;
    const format = dayjs(value).format("DD/MM/YYYY");

    dispatch({
      type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
      payload: { tab, fieldName, newValue },
    });

    validateFieldInfobasic(dispatch, tab, fieldName, newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      const newValue = file.name;
      const fieldName = "avatar";

      actionSetTouched(dispatch, tab, fieldName);

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
          });
          setSelectedFile(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSnackbarSeverity("warning");
        setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
        setSnackbarOpen(true);
        setSelectedFile(null);
      }
      validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    }
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleBlur = (fieldName) => {
    actionSetTouched(dispatch, tab, fieldName);
  };

  const filteredOptions = optionCompanyDepartmentRole.filter((optionRole) =>
    deparmentM.includes(optionRole.departmentId)
  );

  const findLabelByValue = (value) => {
    const selectedOption = optionCompanyDepartment.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : ""; // Trả về nhãn nếu tìm thấy hoặc chuỗi trống nếu không tìm thấy
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} xs={12}>
          {/* Thông tin cơ bản */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Thông tin cơ bản
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4} style={{ marginBottom: "-20px" }}>
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
                <Button sx={{ width: "120px" }} component="label">
                  Tải ảnh lên
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={() => handleBlur("avatar")}
                  />
                </Button>
                {touched.avatar && errors.avatar && (
                  <FormHelperText sx={{ color: "red" }}>{errors.avatar}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <TextField
                  error={!!(touched.employeeCode && errors.employeeCode)}
                  helperText={touched.employeeCode && errors.employeeCode}
                  onBlur={() => handleBlur("employeeCode")}
                  onChange={(event) => handleChange(event, "employeeCode")}
                  value={employeeCode}
                  name="employeeCode"
                  variant="outlined"
                  fullWidth
                  required
                  label="Mã nhân viên"
                  sx={{ margin: "1px", marginBottom: "15px" }}
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
                  sx={{ marginBottom: "17px" }}
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
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Vai trò" />
                  )}
                />
              </Grid>
            </Grid>

            {/* Họ tên */}
            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Grid item xs={4}>
                <TextField
                  error={!!(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  onBlur={() => handleBlur("lastName")}
                  onChange={(event) => handleChange(event, "lastName")}
                  value={lastName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Họ"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  error={!!(touched.middleName && errors.middleName)}
                  helperText={touched.middleName && errors.middleName}
                  onBlur={() => handleBlur("middleName")}
                  onChange={(event) => handleChange(event, "middleName")}
                  value={middleName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Tên đệm"
                  name="middleName"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  error={!!(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  onBlur={() => handleBlur("firstName")}
                  onChange={(event) => handleChange(event, "firstName")}
                  value={firstName}
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                  label="Tên"
                  name="firstName"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onBlur={() => handleBlur("dob")}
                    onChange={(value) => handleChangeDate(value, "dob")}
                    value={dob}
                    name="dob"
                    required
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        error: !!(touched.dob && errors.dob),
                        helperText: touched.dob && errors.dob,
                      },
                    }}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onBlur={() => handleBlur("contractSigningDate")}
                    onChange={(value) => handleChangeDate(value, "contractSigningDate")}
                    value={contractSigningDate}
                    name="contractSigningDate"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        error: !!(touched.contractSigningDate && errors.contractSigningDate),
                        helperText: touched.contractSigningDate && errors.contractSigningDate,
                      },
                    }}
                    label="Ngày ký hợp đồng"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: "-13px" }}>
                <FormLabel>Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={gender}
                  onChange={(event) => handleChange(event, "gender")}
                >
                  <FormControlLabel value="1" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="2" control={<Radio size="small" />} label="Nữ" />
                </RadioGroup>
              </Grid>
            </Grid>

            <Autocomplete
              onBlur={() => handleBlur("nationality")}
              onChange={(event, newValue) => handleChangeSelect(event, "nationality", newValue)}
              value={nationality}
              name="nationality"
              fullWidth
              size="small"
              sx={{ margin: "10px 0" }}
              options={["Việt Nam", "Nhật Bản", "Hàn Quốc", "Úc", "Mỹ"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quốc tịch"
                  variant="outlined"
                  error={!!(touched.nationality && errors.nationality)}
                  helperText={touched.nationality && errors.nationality}
                />
              )}
            />
            <TextField
              error={!!(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              onBlur={() => handleBlur("phone")}
              onChange={(event) => handleChange(event, "phone")}
              value={phone}
              name="phone"
              variant="outlined"
              required
              size="small"
              label="Điện thoại di động"
              fullWidth
            />
            <TextField
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={() => handleBlur("email")}
              onChange={(event) => handleChange(event, "email")}
              value={email}
              name="email"
              variant="outlined"
              required
              sx={{ marginTop: "12px" }}
              size="small"
              label="Email"
              fullWidth
            />

            {/* Trình độ văn hóa */}
            <Autocomplete
              onChange={(event, newValue) =>
                handleChangeSelect(event, "educationalLevel", newValue)
              }
              value={educationalLevel}
              name="educationalLevel"
              fullWidth
              size="small"
              sx={{ marginTop: "12px" }}
              options={educationalLevelOptions}
              renderInput={(params) => (
                <TextField {...params} label="Trình độ văn hóa" variant="outlined" />
              )}
            />
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "marriageStatus", newValue)}
              value={marriageStatus}
              name="marriageStatus"
              fullWidth
              size="small"
              options={marriageStatusOptions}
              sx={{ marginTop: "12px" }}
              renderInput={(params) => (
                <TextField {...params} label="Tình trạng hôn nhân" variant="outlined" />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("employeeForm")}
              onChange={(event, newValue) => handleChangeSelect(event, "employeeForm", newValue)}
              value={employeeForm}
              name="employeeForm"
              fullWidth
              size="small"
              options={["Toàn thời gian", "Bán thời gian"]}
              sx={{ marginTop: "12px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hình thức nhân viên"
                  variant="outlined"
                  error={!!(touched.employeeForm && errors.employeeForm)}
                  helperText={touched.employeeForm && errors.employeeForm}
                />
              )}
            />
          </Box>
          <FormControlLabel
            control={<Switch checked={isSwitchOn} onChange={handleSwitchChange} />}
            label="Cho phép truy cập hệ thống"
          />
          {isSwitchOn && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                margin: "0 auto",
                borderRadius: "6px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <TextField
                error={!!(touched.loginName && errors.loginName)}
                helperText={touched.loginName && errors.loginName}
                onBlur={() => handleBlur("loginName")}
                onChange={(event) => handleChange(event, "loginName")}
                value={loginName}
                variant="outlined"
                label="Tên người dùng"
                size="small"
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    error={!!(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    onBlur={() => handleBlur("password")}
                    onChange={(event) => handleChange(event, "password")}
                    value={password}
                    name="password"
                    variant="outlined"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Mật khẩu"
                  />

                  <TextField
                    error={!!(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    onBlur={() => handleBlur("confirmPassword")}
                    onChange={(event) => handleChange(event, "confirmPassword")}
                    value={confirmPassword}
                    name="confirmPassword"
                    size="small"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Xác nhận mật khẩu"
                  />
                </Box>
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
        </Grid>

        <Grid item sm={12} md={6} xs={12}>
          {/* CCCD */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Căn cước công dân
            </Typography>

            <TextField
              error={!!(touched.citizenIdentity && errors.citizenIdentity)}
              helperText={touched.citizenIdentity && errors.citizenIdentity}
              onBlur={() => handleBlur("citizenIdentity")}
              onChange={(event) => handleChange(event, "citizenIdentity")}
              value={citizenIdentity}
              name="citizenIdentity"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số CCCD"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("dateRange")}
                onChange={(value) => handleChangeDate(value, "dateRange")}
                name="dateRange"
                value={dateRange}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.dateRange && errors.dateRange),
                    helperText: touched.dateRange && errors.dateRange,
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <TextField
              error={!!(touched.issuedBy && errors.issuedBy)}
              helperText={touched.issuedBy && errors.issuedBy}
              onBlur={() => handleBlur("issuedBy")}
              onChange={(event) => handleChange(event, "issuedBy")}
              value={issuedBy}
              name="issuedBy"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nơi cấp"
              fullWidth
            />
            <Autocomplete
              onBlur={() => handleBlur("cityDomicile")}
              onChange={(event, newValue) => handleChangeSelect(event, "cityDomicile", newValue)}
              value={cityDomicile}
              name="cityDomicile"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={cityOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tỉnh /TP Nguyên quán"
                  variant="outlined"
                  error={!!(touched.cityDomicile && errors.cityDomicile)}
                  helperText={touched.cityDomicile && errors.cityDomicile}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("districtDomicile")}
              onChange={(event, newValue) =>
                handleChangeSelect(event, "districtDomicile", newValue)
              }
              value={districtDomicile}
              name="districtDomicile"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={districtOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quận /Huyện Nguyên quán"
                  variant="outlined"
                  error={!!(touched.districtDomicile && errors.districtDomicile)}
                  helperText={touched.districtDomicile && errors.districtDomicile}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("wardDomicile")}
              onChange={(event, newValue) => handleChangeSelect(event, "wardDomicile", newValue)}
              value={wardDomicile}
              name="wardDomicile"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={wardOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Xã / Phường Nguyên quán"
                  variant="outlined"
                  error={!!(touched.wardDomicile && errors.wardDomicile)}
                  helperText={touched.wardDomicile && errors.wardDomicile}
                />
              )}
            />
            <TextField
              error={!!(touched.permanentAddress && errors.permanentAddress)}
              helperText={touched.permanentAddress && errors.permanentAddress}
              onBlur={() => handleBlur("permanentAddress")}
              onChange={(event) => handleChange(event, "permanentAddress")}
              value={permanentAddress}
              name="permanentAddress"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ thường trú"
              fullWidth
            />
          </Box>

          {/* Address */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Địa chỉ
            </Typography>
            <TextField
              error={!!(touched.temporaryAddress && errors.temporaryAddress)}
              helperText={touched.temporaryAddress && errors.temporaryAddress}
              onBlur={() => handleBlur("temporaryAddress")}
              onChange={(event) => handleChange(event, "temporaryAddress")}
              value={temporaryAddress}
              name="temporaryAddress"
              required
              variant="outlined"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ tạm trú"
              fullWidth
            />
            <TextField
              error={!!(touched.hometownAddress && errors.hometownAddress)}
              helperText={touched.hometownAddress && errors.hometownAddress}
              onBlur={() => handleBlur("hometownAddress")}
              onChange={(event) => handleChange(event, "hometownAddress")}
              value={hometownAddress}
              name="hometownAddress"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ nguyên quán"
              fullWidth
            />
          </Box>

          {/* Hộ chiếu */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
              Hộ chiếu
            </Typography>
            <TextField
              error={!!(touched.passport && errors.passport)}
              helperText={touched.passport && errors.passport}
              onBlur={() => handleBlur("passport")}
              onChange={(event) => handleChange(event, "passport")}
              value={passport}
              name="passport"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hộ chiếu"
              fullWidth
            />
            <Autocomplete
              onBlur={() => handleBlur("issuedPassportBy")}
              onChange={(event, newValue) =>
                handleChangeSelect(event, "issuedPassportBy", newValue)
              }
              value={issuedPassportBy}
              name="issuedPassportBy"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Cục CS XNC"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nơi cấp hộ chiếu"
                  error={!!(touched.issuedPassportBy && errors.issuedPassportBy)}
                  helperText={touched.issuedPassportBy && errors.issuedPassportBy}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("passportDate")}
                onChange={(value) => handleChangeDate(value, "passportDate")}
                name="passportDate"
                value={passportDate}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.passportDate && errors.passportDate),
                    helperText: touched.passportDate && errors.passportDate,
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("passportExpirationDate")}
                onChange={(value) => handleChangeDate(value, "passportExpirationDate")}
                name="passportExpirationDate"
                value={dayjs(passportDate).add(10, "year")}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.passportExpirationDate && errors.passportExpirationDate),
                    helperText: touched.passportExpirationDate && errors.passportExpirationDate,
                  },
                }}
                label="Ngày hết hạn"
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>

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
    </Stack>
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
    label: "Cộng tác viên",
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
    label: "Cộng tác viên",
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
