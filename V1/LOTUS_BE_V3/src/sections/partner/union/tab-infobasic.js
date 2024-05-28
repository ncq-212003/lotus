import React, { useState, useEffect } from "react";
import MultiLanguageComponent from "./multilanguage";
import { TextField, Grid, Stack, Box, Autocomplete, Checkbox, Avatar, Button, styled, Typography, FormHelperText, } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union"
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export function actionSetTouched(dispatch, tab, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_UNION.SET_TOUCHED_UNION,
        payload: { tab, fieldName, value },
    });
}

export function validateFieldInfobasic(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        avatar: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        tenNghiepDoan: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        diaChiWebsite: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        tinhTrangTrinhCuc: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        maSoCapPhep: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        nhanVienChamSoc: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        ghiChu: Yup.string(),
        maSoHopDong: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        ngayKyHopDong: Yup
            .date()
            .typeError("Vui lòng nhập đúng định dạng")
            .required("Vui lòng nhập thông tin vào trường này"),
        troCapThangDau: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiCapDaoTao: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        thiTruong: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        thanhPho: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        soDienThoai: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        fax: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        hoTenNguoiDaiDien: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        chucVu: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
        phiQuanLy: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_UNION.SET_ERRORS_UNION,
                payload: { tab, fieldName, newValue },
            });
        });
}

export default function TabInfoBasic() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const tab = "basicInfo";
    const [state, dispatch] = useApp();
    const { union } = state;
    const { basicInfo } = union;
    const {
        avatar,
        maSoNghiepDoan,
        tenNghiepDoan,
        diaChiWebsite,
        tinhTrangTrinhCuc,
        maSoCapPhep,
        nhanVienChamSoc,
        ghiChu,
        maSoHopDong,
        ngayKyHopDong,
        troCapThangDau,
        phiCapDaoTao,
        thiTruong,
        thanhPho,
        diaChi,
        soDienThoai,
        fax,
        hoTenNguoiDaiDien,
        chucVu,
        phiQuanLy,
        touched,
        errors,
    } = basicInfo;

    console.log(selectedAvatar);


    //Chọn nhiều ngôn ngữ
    const [tenNghiepDoanValues, setTenNghiepDoanValues] = useState([]);
    const [diaChiValues, setdiaChiValues] = useState([]);
    const [hoTenNguoiDaiDienValues, setHoTenNguoiDaiDienValues] = useState([]);

    //Hanle 
    const handleChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        const fieldValue = event.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        }

        validateFieldInfobasic(dispatch, tab, fieldName, fieldValue);
    };

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);

        let newValue;

        if (newValueSelect !== null) {
            newValue = newValueSelect.label;
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_UNION.SET_INPUT_UNION,
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
            type: HANDLERS_UNION.SET_INPUT_UNION,
            payload: { tab, fieldName, newValue },
        });

        validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const newValue = file.name;
        const fieldName = "avatar";
        actionSetTouched(dispatch, tab, fieldName);
        if (file) {
            const reader = new FileReader();
            actionSetTouched(dispatch, tab, fieldName);

            reader.onload = (e) => {
                dispatch({
                    type: HANDLERS_UNION.SET_INPUT_UNION,
                    payload: { tab, fieldName, newValue },
                });
                setSelectedAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        validateFieldInfobasic(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    //Ảnh
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

    return (
        <Stack spacing={2}
            sx={{ p: 2 }}>
            <Grid container
                spacing={2}>
                <Grid item
                    xs={12}
                    md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>
                        <Grid container
                            spacing={2}>
                            <Grid
                                item
                                container
                            >
                                <Grid item
                                    xs={12}
                                    md={3}
                                    lg={3}
                                    style={{ marginBottom: "-20px" }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "120px",
                                            }}
                                            variant="rounded"
                                            src={selectedAvatar}
                                        ></Avatar>
                                    </Stack>
                                    <Button
                                        sx={{ width: "120px" }}
                                        component="label"
                                    >
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
                                <Grid item
                                    container
                                    xs={12}
                                    md={9}
                                    lg={9}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            error={!!(touched.maSoNghiepDoan && errors.maSoNghiepDoan)}
                                            helperText={touched.maSoNghiepDoan && errors.maSoNghiepDoan}
                                            onBlur={() => handleBlur("maSoNghiepDoan")}
                                            onChange={(event) => handleChange(event, "maSoNghiepDoan")}
                                            value={maSoNghiepDoan}
                                            name="maSoNghiepDoan"
                                            required
                                            variant="outlined"
                                            size="small"
                                            label="Mã số nghiệp đoàn"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={!!(touched.tenNghiepDoan && errors.tenNghiepDoan)}
                                            helperText={touched.tenNghiepDoan && errors.tenNghiepDoan}
                                            onBlur={() => handleBlur("tenNghiepDoan")}
                                            onChange={(event) => handleChange(event, "tenNghiepDoan")}
                                            value={tenNghiepDoan}
                                            name="tenNghiepDoan"
                                            required
                                            variant="outlined"
                                            size="small"
                                            label="Tên nghiệp đoàn"
                                            fullWidth
                                        />
                                        <MultiLanguageComponent
                                            inputValues={tenNghiepDoanValues}
                                            setInputValues={setTenNghiepDoanValues}
                                            label="Tên nghiệp đoàn"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    error={!!(touched.diaChiWebsite && errors.diaChiWebsite)}
                                    helperText={touched.diaChiWebsite && errors.diaChiWebsite}
                                    onBlur={() => handleBlur("diaChiWebsite")}
                                    onChange={(event) => handleChange(event, "diaChiWebsite")}
                                    value={diaChiWebsite}
                                    name="diaChiWebsite"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Địa chỉ website"
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <Autocomplete
                                    onBlur={() => handleBlur("tinhTrangTrinhCuc")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "tinhTrangTrinhCuc", newValue)
                                    }
                                    value={tinhTrangTrinhCuc}
                                    name="tinhTrangTrinhCuc"
                                    fullWidth
                                    size="small"
                                    options={submissionStatuOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Tình trạng trình cục"
                                            error={!!(touched.tinhTrangTrinhCuc && errors.tinhTrangTrinhCuc)}
                                            helperText={touched.tinhTrangTrinhCuc && errors.tinhTrangTrinhCuc}
                                        />
                                    )}
                                />
                            </Grid>
                            {basicInfo.tinhTrangTrinhCuc?.value === 1 && (
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        error={!!(touched.maSoCapPhep && errors.maSoCapPhep)}
                                        helperText={touched.maSoCapPhep && errors.maSoCapPhep}
                                        onBlur={() => handleBlur("maSoCapPhep")}
                                        onChange={(event) => handleChange(event, "maSoCapPhep")}
                                        value={maSoCapPhep}
                                        name="maSoCapPhep"
                                        required
                                        variant="outlined"
                                        size="small"
                                        label="Mã số cấp phép"
                                        fullWidth
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("nhanVienChamSoc")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "nhanVienChamSoc", newValue)
                                    }
                                    value={nhanVienChamSoc}
                                    name="nhanVienChamSoc"
                                    fullWidth
                                    size="small"
                                    options={submissionStatuOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Nhân viên chăm sóc"
                                            error={!!(touched.nhanVienChamSoc && errors.nhanVienChamSoc)}
                                            helperText={touched.nhanVienChamSoc && errors.nhanVienChamSoc}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    required
                                    name="ghiChu"
                                    onChange={(event) => handleChange(event, "ghiChu")}
                                    variant="outlined"
                                    size="small"
                                    value={ghiChu}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Hợp đồng
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.maSoHopDong && errors.maSoHopDong)}
                                    helperText={touched.maSoHopDong && errors.maSoHopDong}
                                    onBlur={() => handleBlur("maSoHopDong")}
                                    onChange={(event) => handleChange(event, "maSoHopDong")}
                                    value={maSoHopDong}
                                    name="maSoHopDong"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số hợp đồng"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                                    <DatePicker
                                        onBlur={() => handleBlur("ngayKyHopDong")}
                                        onChange={(value) => handleChangeDate(value, "ngayKyHopDong")}
                                        name="ngayKyHopDong"
                                        value={ngayKyHopDong}
                                        sx={{ width: "100%" }}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                variant: "outlined",
                                                error: !!(touched.ngayKyHopDong && errors.ngayKyHopDong),
                                                helperText: touched.ngayKyHopDong && errors.ngayKyHopDong,
                                            },
                                        }}
                                        label="Ngày ký hợp đồng"
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí hỗ trợ thực tập sinh / người lao động
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.troCapThangDau && errors.troCapThangDau)}
                                    helperText={touched.troCapThangDau && errors.troCapThangDau}
                                    onBlur={() => handleBlur("troCapThangDau")}
                                    onChange={(event) => handleChange(event, "troCapThangDau")}
                                    value={troCapThangDau}
                                    name="troCapThangDau"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Trợ cấp tháng đầu"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.phiCapDaoTao && errors.phiCapDaoTao)}
                                    helperText={touched.phiCapDaoTao && errors.phiCapDaoTao}
                                    onBlur={() => handleBlur("phiCapDaoTao")}
                                    onChange={(event) => handleChange(event, "phiCapDaoTao")}
                                    value={phiCapDaoTao}
                                    name="phiCapDaoTao"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Địa chỉ website"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Địa chỉ nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("thiTruong")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "thiTruong", newValue)
                                    }
                                    value={thiTruong}
                                    name="thiTruong"
                                    fullWidth
                                    size="small"
                                    options={marketOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Thị trường"
                                            error={!!(touched.thiTruong && errors.thiTruong)}
                                            helperText={touched.thiTruong && errors.thiTruong}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    onBlur={() => handleBlur("thanhPho")}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "thanhPho", newValue)
                                    }
                                    value={thanhPho}
                                    name="thanhPho"
                                    fullWidth
                                    size="small"
                                    options={submissionStatuOptions}
                                    renderInput={(params) => (
                                        <TextField
                                            variant="outlined"
                                            {...params}
                                            label="Thuộc tỉnh / Thành phố"
                                            error={!!(touched.thanhPho && errors.thanhPho)}
                                            helperText={touched.thanhPho && errors.thanhPho}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.diaChi && errors.diaChi)}
                                    helperText={touched.diaChi && errors.diaChi}
                                    onBlur={() => handleBlur("diaChi")}
                                    onChange={(event) => handleChange(event, "diaChi")}
                                    value={diaChi}
                                    name="diaChi"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Địa chỉ"
                                    fullWidth
                                />

                                <MultiLanguageComponent
                                    inputValues={diaChiValues}
                                    setInputValues={setdiaChiValues}
                                    label="Địa chỉ"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.soDienThoai && errors.soDienThoai)}
                                    helperText={touched.soDienThoai && errors.soDienThoai}
                                    onBlur={() => handleBlur("soDienThoai")}
                                    onChange={(event) => handleChange(event, "soDienThoai")}
                                    value={soDienThoai}
                                    name="soDienThoai"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số điện thoại"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.fax && errors.fax)}
                                    helperText={touched.fax && errors.fax}
                                    onBlur={() => handleBlur("fax")}
                                    onChange={(event) => handleChange(event, "fax")}
                                    value={fax}
                                    name="fax"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Số fax"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Đại diện nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.hoTenNguoiDaiDien && errors.hoTenNguoiDaiDien)}
                                    helperText={touched.hoTenNguoiDaiDien && errors.hoTenNguoiDaiDien}
                                    onBlur={() => handleBlur("hoTenNguoiDaiDien")}
                                    onChange={(event) => handleChange(event, "hoTenNguoiDaiDien")}
                                    value={hoTenNguoiDaiDien}
                                    name="hoTenNguoiDaiDien"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Họ và tên người đại diện"
                                    fullWidth
                                />
                                <MultiLanguageComponent
                                    inputValues={hoTenNguoiDaiDienValues}
                                    setInputValues={setHoTenNguoiDaiDienValues}
                                    label="Họ và tên người đại diện"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!(touched.chucVu && errors.chucVu)}
                                    helperText={touched.chucVu && errors.chucVu}
                                    onBlur={() => handleBlur("chucVu")}
                                    onChange={(event) => handleChange(event, "chucVu")}
                                    value={chucVu}
                                    name="chucVu"
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="Chức vụ"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí quản lý
                        </Typography>
                        <TextField
                            error={!!(touched.phiQuanLy && errors.phiQuanLy)}
                            helperText={touched.phiQuanLy && errors.phiQuanLy}
                            onBlur={() => handleBlur("phiQuanLy")}
                            onChange={(event) => handleChange(event, "phiQuanLy")}
                            value={phiQuanLy}
                            name="phiQuanLy"
                            required
                            variant="outlined"
                            size="small"
                            label="Phí quản lý"
                            fullWidth
                        />
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}


const marketOptions = [
    { value: 1, label: "Nhật" },
    { value: 2, label: "Hàn" },
    { value: 3, label: "Châu Âu" }
];

const cityOptions = [
    { value: 1, label: "Tokyo" },
    { value: 2, label: "Hirosima" },
    { value: 3, label: "Hokkaido" },
]

const submissionStatuOptions = [
    { value: 1, label: "Được cấp phép" },
    { value: 2, label: "Chưa được cấp phép" }
];

const employeeOptions = [
    { value: 1, label: "Nguyễn Thành Nam" },
    { value: 2, label: "Đặng Duy Long" },
    { value: 3, label: "Nguyễn Thị Hải Yến" },
    { value: 4, label: "Lê Thanh Nghị" },
    { value: 5, label: "Trần Đức Bo" }
]
