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
  } = basicInfo;

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
                    src="https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/26/ngo-ngang-voi-ve-dep-cua-hot-girl-anh-the-chua-tron-18-docx-1622043349706.jpeg"
                  ></Avatar>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "16px"
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Mã nhân viên:</span> LT0000001
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "16px"
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Công ty - Phòng ban:</span> Công ty Apple - Phòng kế toán
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: "16px"
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>Vai trò:</span> Trưởng phòng
                </Typography>
              </Grid>
            </Grid>

            {/* Họ tên */}
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px",
                marginTop: "34px",
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Họ & Tên:</span> Nguyễn Chính Nghĩa
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Ngày sinh:</span> 28/11/2003
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Ngày ký hợp đồng:</span> 28/11/2020
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Giới tính:</span> Nữ
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Quốc tịch:</span> Việt Nam
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Điện thoại di động:</span> 0929832838
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Email:</span> ncnghia@gmail.com
            </Typography>

            {/* Trình độ văn hóa */}
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Trình độ văn hóa:</span> Đại học
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Tình trạng hôn nhân:</span> Đã kết hôn
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Hình thức nhân viên:</span> Toàn thời gian
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Cho phép truy cập hệ thống:</span> Có
            </Typography>
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

            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Số CCCD:</span> 022202222222
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Ngày cấp:</span> 12/12/2019
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Nơi cấp:</span> Công An Hà Nội
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Tỉnh /TP Nguyên quán:</span> Hà Nội
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Quận /Huyện Nguyên quán:</span> Hai Bà Trưng
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Xã / Phường Nguyên quán:</span> Hàng Cót
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Địa chỉ thường chú:</span> Hàng cót - Hai Bà Trưng - Hà Nội
            </Typography>
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
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Địa chỉ tạm trú:</span> Mỹ Đình - Nam Từ Liêm - Hà Nội
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Địa chỉ nguyên quán:</span> Hàng cót - Hai Bà Trưng - Hà Nội
            </Typography>
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
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Nơi cấp hộ chiếu:</span> Cục CS XNC
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Ngày cấp:</span> 12/1/2021
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "16px"
              }}
            >
              <span style={{ fontWeight: 'bold' }}>Ngày hết hạn:</span> 12/1/2022
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}