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
import useFetchLocation from "src/contexts/api/location-api";

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

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
  const validationSchema = Yup.object().shape({
    selectedFile: Yup.string(),
    avatar: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    employeeCode: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    // deparment: Yup.mixed().test("isValid", "Phòng ban là trường bắt buộc", (value) => {
    //   return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
    // }),
    // role: Yup.mixed().test("isValid", "Vai trò là trường bắt buộc", (value) => {
    //   return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
    // }),
    deparment: Yup.array(),
    role: Yup.array(),
    lastName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    middleName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    firstName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    birthday: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
    contractDate: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
    sex: Yup.string(),
    nationality: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    mobilePhone: Yup.string()
      .required("Vui lòng nhập thông tin vào trường này")
      .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
      .max(15, "Số điện thoại tối đa là 15 số"),
    educationLevelId: Yup.string(),
    marriedStatus: Yup.string(),
    ethnicityId: Yup.string(),
    religion: Yup.string(),
    employeeType: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    email: Yup.string()
      .email("Vui lòng nhập email đúng định dạng")
      .required("Vui lòng nhập thông tin vào trường này"),
    identification: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    identificationDate: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    identificationLocation: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    domicileCityId: Yup.object()
      .shape({
        value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    domicileDistrictId: Yup.object()
      .shape({
        value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    domicileWardId: Yup.object()
      .shape({
        value: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        label: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      })
      .typeError("Vui lòng nhập thông tin vào trường này"),
    normallyAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    temporaryAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    domicileAddress: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    passportProvideLocation: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    passportNumber: Yup.string().required("Vui lòng nhập thông tin vào trường này"),

    passportProvideDate: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
    passwordExpiredDate: Yup.date()
      .typeError("Vui lòng nhập đúng định dạng")
      .test("is-greater", "Ngày hết hạn phải lớn hơn ngày cấp", function (value) {
        const passportProvideDate = this.resolve(Yup.ref("passportProvideDate"));
        return dayjs(value).isAfter(passportProvideDate);
      }),
    touched: Yup.object(),
    errors: Yup.object(),
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
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  //context API
  const [state, dispatch] = useApp();
  const tab = "basicInfo";
  const { employee } = state;
  const { basicInfo } = employee;
  const {
    selectedFile,
    avatar,
    employeeCode,
    deparment,
    role,
    lastName,
    middleName,
    firstName,
    birthday,
    contractDate,
    sex,
    nationality,
    mobilePhone,
    educationLevelId,
    marriedStatus,
    ethnicityId,
    religion,
    employeeType,
    email,
    identification,
    identificationDate,
    identificationLocation,
    domicileCityId,
    domicileDistrictId,
    domicileWardId,
    normallyAddress,
    temporaryAddress,
    domicileAddress,
    passportProvideLocation,
    passportNumber,
    passportProvideDate,
    passwordExpiredDate,
    touched,
    errors,
  } = basicInfo;

  //Options location
  const { cities, districts, wards } = useFetchLocation(
    domicileCityId?.value,
    domicileDistrictId?.value
  );

  const [deparmentM, setDepartmentM] = useState([]);
  const [roleM, setRoleM] = useState([]);

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
      let newValue = file.name;
      let fieldName = "avatar";

      actionSetTouched(dispatch, tab, fieldName);

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
          });
          newValue = e.target.result;
          fieldName = "selectedFile";
          dispatch({
            type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
            payload: { tab, fieldName, newValue },
          });
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

  // const handleSwitchChange = () => {
  //   setIsSwitchOn(!isSwitchOn);
  // };

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
                    onBlur={() => handleBlur("birthday")}
                    onChange={(value) => handleChangeDate(value, "birthday")}
                    value={birthday}
                    name="birthday"
                    required
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        error: !!(touched.birthday && errors.birthday),
                        helperText: touched.birthday && errors.birthday,
                      },
                    }}
                    label="Ngày sinh"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                  <DatePicker
                    onBlur={() => handleBlur("contractDate")}
                    onChange={(value) => handleChangeDate(value, "contractDate")}
                    value={contractDate}
                    name="contractDate"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        error: !!(touched.contractDate && errors.contractDate),
                        helperText: touched.contractDate && errors.contractDate,
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
                  name="sex"
                  value={sex}
                  onChange={(event) => handleChange(event, "sex")}
                >
                  <FormControlLabel value="Nam" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio size="small" />} label="Nữ" />
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
              error={!!(touched.mobilePhone && errors.mobilePhone)}
              helperText={touched.mobilePhone && errors.mobilePhone}
              onBlur={() => handleBlur("mobilePhone")}
              onChange={(event) => handleChange(event, "mobilePhone")}
              value={mobilePhone}
              name="mobilePhone"
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
            <TextField
              onChange={(event) => handleChange(event, "educationLevelId")}
              value={educationLevelId}
              name="educationLevelId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Trình độ văn hóa"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Cao Đẳng">Cao Đẳng</option>
              <option value="TC NGHỀ">TC NGHỀ</option>
              <option value="THCS ">THCS</option>
              <option value="THPT ">THPT</option>
              <option value="ĐH ">ĐH</option>
            </TextField>
            <TextField
              onChange={(event) => handleChange(event, "marriedStatus")}
              value={marriedStatus}
              name="marriedStatus"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              label="Tình trạng hôn nhân"
              select
              SelectProps={{ native: true }}
              variant="outlined"
            >
              <option value="Chưa kết hôn">Chưa kết hôn</option>
              <option value="Đã kết hôn">Đã kết hôn</option>
              <option value="Ly hôn">Ly hôn</option>
            </TextField>
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "ethnicityId", newValue)}
              value={ethnicityId}
              name="ethnicityId"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Kinh", "Hmooong"]}
              renderInput={(params) => <TextField variant="outlined" {...params} label="Dân tộc" />}
            />
            <Autocomplete
              onChange={(event, newValue) => handleChangeSelect(event, "religion", newValue)}
              value={religion}
              name="religion"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Phật", "Không"]}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Tôn giáo" />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("employeeType")}
              onChange={(event, newValue) => handleChangeSelect(event, "employeeType", newValue)}
              value={employeeType}
              name="employeeType"
              fullWidth
              size="small"
              options={["Toàn thời gian", "Bán thời gian"]}
              sx={{ marginTop: "12px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hình thức nhân viên"
                  variant="outlined"
                  error={!!(touched.employeeType && errors.employeeType)}
                  helperText={touched.employeeType && errors.employeeType}
                />
              )}
            />
          </Box>
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
              error={!!(touched.identification && errors.identification)}
              helperText={touched.identification && errors.identification}
              onBlur={() => handleBlur("identification")}
              onChange={(event) => handleChange(event, "identification")}
              value={identification}
              name="identification"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số CCCD"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("identificationDate")}
                onChange={(value) => handleChangeDate(value, "identificationDate")}
                name="identificationDate"
                value={identificationDate}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.identificationDate && errors.identificationDate),
                    helperText: touched.identificationDate && errors.identificationDate,
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <TextField
              error={!!(touched.identificationLocation && errors.identificationLocation)}
              helperText={touched.identificationLocation && errors.identificationLocation}
              onBlur={() => handleBlur("identificationLocation")}
              onChange={(event) => handleChange(event, "identificationLocation")}
              value={identificationLocation}
              name="identificationLocation"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nơi cấp"
              fullWidth
            />
            <Autocomplete
              onBlur={() => handleBlur("domicileCityId")}
              onChange={(event, newValue) => handleChangeSelect(event, "domicileCityId", newValue)}
              value={domicileCityId}
              name="domicileCityId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tỉnh / TP Nguyên quán"
                  variant="outlined"
                  error={!!(touched.domicileCityId && errors.domicileCityId)}
                  helperText={touched.domicileCityId && errors.domicileCityId}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("domicileDistrictId")}
              onChange={(event, newValue) =>
                handleChangeSelect(event, "domicileDistrictId", newValue)
              }
              value={domicileDistrictId}
              name="domicileDistrictId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={districts || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quận / Huyện Nguyên quán"
                  variant="outlined"
                  error={!!(touched.domicileDistrictId && errors.domicileDistrictId)}
                  helperText={touched.domicileDistrictId && errors.domicileDistrictId}
                />
              )}
            />
            <Autocomplete
              onBlur={() => handleBlur("domicileWardId")}
              onChange={(event, newValue) => handleChangeSelect(event, "domicileWardId", newValue)}
              value={domicileWardId}
              name="domicileWardId"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={wards || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Xã / Phường Nguyên quán"
                  variant="outlined"
                  error={!!(touched.domicileWardId && errors.domicileWardId)}
                  helperText={touched.domicileWardId && errors.domicileWardId}
                />
              )}
            />
            <TextField
              error={!!(touched.normallyAddress && errors.normallyAddress)}
              helperText={touched.normallyAddress && errors.normallyAddress}
              onBlur={() => handleBlur("normallyAddress")}
              onChange={(event) => handleChange(event, "normallyAddress")}
              value={normallyAddress}
              name="normallyAddress"
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
              error={!!(touched.domicileAddress && errors.domicileAddress)}
              helperText={touched.domicileAddress && errors.domicileAddress}
              onBlur={() => handleBlur("domicileAddress")}
              onChange={(event) => handleChange(event, "domicileAddress")}
              value={domicileAddress}
              name="domicileAddress"
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
              error={!!(touched.passportNumber && errors.passportNumber)}
              helperText={touched.passportNumber && errors.passportNumber}
              onBlur={() => handleBlur("passportNumber")}
              onChange={(event) => handleChange(event, "passportNumber")}
              value={passportNumber}
              name="passportNumber"
              variant="outlined"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số hộ chiếu"
              fullWidth
            />
            <Autocomplete
              onBlur={() => handleBlur("passportProvideLocation")}
              onChange={(event, newValue) =>
                handleChangeSelect(event, "passportProvideLocation", newValue)
              }
              value={passportProvideLocation}
              name="passportProvideLocation"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Không lựa chọn", "Cục CS XNC"]}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Nơi cấp hộ chiếu"
                  error={!!(touched.passportProvideLocation && errors.passportProvideLocation)}
                  helperText={touched.passportProvideLocation && errors.passportProvideLocation}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("passportProvideDate")}
                onChange={(value) => handleChangeDate(value, "passportProvideDate")}
                name="passportProvideDate"
                value={passportProvideDate}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.passportProvideDate && errors.passportProvideDate),
                    helperText: touched.passportProvideDate && errors.passportProvideDate,
                  },
                }}
                label="Ngày cấp"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
              <DatePicker
                onBlur={() => handleBlur("passwordExpiredDate")}
                onChange={(value) => handleChangeDate(value, "passwordExpiredDate")}
                name="passwordExpiredDate"
                value={dayjs(passportProvideDate).add(10, "year")}
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                    error: !!(touched.passwordExpiredDate && errors.passwordExpiredDate),
                    helperText: touched.passwordExpiredDate && errors.passwordExpiredDate,
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

const marriedStatusOptions = [
  { value: 1, label: "Chưa kết hôn" },
  { value: 2, label: "Sống chung chưa kết hôn" },
  { value: 3, label: "Đang có vợ/chồng" },
  { value: 4, label: "Góa" },
  { value: 5, label: "Ly thân và ly hôn" },
];

const educationLevelIdOptions = [
  { value: 1, label: "Cấp 1" },
  { value: 2, label: "Cấp 2" },
  { value: 3, label: "Cấp 3" },
  { value: 4, label: "Đại học" },
  { value: 5, label: "Cao đẳng" },
];
