import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    Autocomplete,
    Button,
    Avatar,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormHelperText,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useEffect, useState } from "react";
import SnackbarAlert from "src/components/action-notification";
import { GenerateApi } from "src/contexts/api/random-api";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";
import * as Yup from "yup";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const supplySourceOption = [
    { value: 1, typeSupply: "Cá nhân", label: "Phạm Văn Nam" },
    { value: 2, typeSupply: "Cá nhân", label: "Đinh Văn Thắng" },
    { value: 3, typeSupply: "Cá nhân", label: "Nguyễn Anh Tú" },
    { value: 4, typeSupply: "Tỉnh / thành phố", label: "Hà Nội" },
    { value: 5, typeSupply: "Tỉnh / thành phố", label: "Bắc Ninh" },
    { value: 6, typeSupply: "Tỉnh / thành phố", label: "Hải Dương" },
    { value: 6, typeSupply: "Tỉnh / thành phố", label: "Hồ Chí Minh" },
    { value: 6, typeSupply: "Khác", label: "Bộ lao động thương binh" },
    { value: 6, typeSupply: "Khác", label: "Trung tâm giáo dục thường xuyên" },
];

export function actionSetTouched(dispatch, tab, fieldName) {
    const value = true;
    dispatch({
        type: HANDLERS_OVERSEAS_STUDENT.SET_TOUCHED_OVERSEAS_STUDENT,
        payload: { tab, fieldName, value },
    });
}

export function validateField(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        maHoSo: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        maHocSinh: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayNhapHoc: Yup.date(),
        ho: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        tenDem: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ten: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngaySinh: Yup.date().typeError("Vui lòng nhập thông tin vào trường này"),
        gioiTinh: Yup.string().max(4000),
        tinhTrangHonNhan: Yup.string().max(4000),
        trinhDoVanHoa: Yup.string().max(4000),
        maDanToc: Yup.string().max(4000),
        tonGiao: Yup.string().max(4000),
        tienTrinhHoSo: Yup.string().max(4000),
        maChuongTrinhThamGia: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayDangKy: Yup.date(),
        soCCCD: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        noiCapCCCD: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapCCCD: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        soHoChieu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        noiCapHoChieu: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapHoChieu: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        ngayHetHanHoChieu: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày hết hạn phải lớn hơn ngày cấp", function (value) {
                const ngayCapHoChieu = this.resolve(Yup.ref("ngayCapHoChieu"));
                return dayjs(value).isAfter(ngayCapHoChieu);
            }),
        soHoSoVisa: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ngayCapVisa: Yup.date().typeError("Vui lòng nhập đúng định dạng"),
        ngayHetHanVisa: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày hết hạn visa phải lớn hơn ngày cấp", function (value) {
                const ngayCapVisa = this.resolve(Yup.ref("ngayCapVisa"));
                return dayjs(value).isAfter(ngayCapVisa);
            }),
        ngayNhanTCLT: Yup.date().typeError("Vui lòng nhập đúng định dạng")
            .test("is-greater", "Ngày nhận tư cách lưu trú phải lớn hơn ngày cấp", function (value) {
                const soHoSoVisa = this.resolve(Yup.ref("soHoSoVisa"));
                return dayjs(value).isAfter(soHoSoVisa);
            }),
        maThanhPho: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        maQuan: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        maPhuong: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        diaChi: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        dienThoai: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này").matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại").max(15, "Số điện thoại tối đa là 15 số"),
        anhChanDung: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này"),
        anhToanThan: Yup.string().max(4000)
            .required("Vui lòng nhập thông tin vào trường này"),
        muonDi: Yup.array().min(1, "Bạn phải chọn ít nhất một lựa chọn cho Muốn đi"),
        canBoTuyenDung: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        ketQuaSoTuyen: Yup.string().max(4000).required("Vui lòng nhập thông tin vào trường này"),
        kinhNghiem: Yup.array(),
        nhomNguon: Yup.mixed().test("isValid", "Nhóm nguồn cung ứng là trường bắt buộc", (value) => {
            // Kiểm tra nếu giá trị là null, undefined, hoặc ""
            return value && value.value !== "" && value.typeSupply !== "" && value.label !== "";
        }),

        // Ví dụ cho validation number
        // ageInput: Yup.number()
        //   .typeError("Age must be a number") // Thông báo lỗi nếu không phải là số
        //   .integer("Age must be an integer") // Thông báo lỗi nếu không phải số nguyên
        //   .positive("Age must be a positive number") // Thông báo lỗi nếu không phải số dương
        //   .required("Age is required"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        });
}

export default function TabInfoBasic() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [selectedFileAvt, setSelectedFileAvt] = useState(null);
    const [selectedFileBody, setSelectedFileBody] = useState(null);
    const tab = "thongTinCoBan";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { thongTinCoBan } = overseasStudent;
    const {
        maHoSo,
        maHocSinh,
        ngayNhapHoc,
        ho,
        tenDem,
        ten,
        ngaySinh,
        gioiTinh,
        tinhTrangHonNhan,
        trinhDoVanHoa,
        maDanToc,
        tonGiao,
        tienTrinhHoSo,
        maChuongTrinhThamGia,
        ngayDangKy,
        soCCCD,
        ngayCapCCCD,
        noiCapCCCD,
        noiCapHoChieu,
        soHoChieu,
        ngayCapHoChieu,
        ngayHetHanHoChieu,
        soHoSoVisa,
        ngayCapVisa,
        ngayHetHanVisa,
        ngayNhanTCLT,
        maThanhPho,
        maQuan,
        maPhuong,
        diaChi,
        dienThoai,
        anhChanDung,
        anhToanThan,
        muonDi,
        canBoTuyenDung,
        ketQuaSoTuyen,
        kinhNghiem,
        nhomNguon,
        touched,
        errors,
    } = thongTinCoBan;

    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi("PR-DHS", "Number");
            const fieldName = "maHoSo";
            const newValue = res.data;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        };
        getRandom();
    }, []);

    useEffect(() => {
        const getRandom = async () => {
            const res = await GenerateApi("DHS", "Number");
            const fieldName = "maHocSinh";
            const newValue = res.data;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        };
        getRandom();
    }, []);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileAvtChange = (event) => {
        const file = event.target.files[0];
        if (file != null) {
            const newValue = file.name;
            const fieldName = "anhChanDung";

            actionSetTouched(dispatch, tab, fieldName);

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    dispatch({
                        type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                        payload: { tab, fieldName, newValue },
                    });
                    setSelectedFileAvt(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
                setSelectedFileAvt(null);
            }

            validateField(dispatch, tab, fieldName, newValue);
        }
    };

    const handleFileBodyChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newValue = file.name;
            const fieldName = "anhToanThan";

            actionSetTouched(dispatch, tab, fieldName);

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    dispatch({
                        type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                        payload: { tab, fieldName, newValue },
                    });
                    setSelectedFileBody(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setSnackbarSeverity("warning");
                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                setSnackbarOpen(true);
                setSelectedFileBody(null);
            }

            validateField(dispatch, tab, fieldName, newValue);
        }
    };

    const handleChange = (event, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);

        const fieldValue = event.target.value;
        let newValue;

        if (fieldValue.length >= 0) {
            newValue = fieldValue;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        }

        validateField(dispatch, tab, fieldName, fieldValue);
    };

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);

        let newValue;

        if (newValueSelect !== null) {
            newValue = newValueSelect;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        }

        validateField(dispatch, tab, fieldName, newValue);
    };

    const handleChangeDate = (value, fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
        const newValue = value;
        const format = dayjs(value).format("DD/MM/YYYY");

        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });

        validateField(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
    };

    return (
        <>
            <Stack spacing={3}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin cơ bản
                            </Typography>
                            <TextField
                                error={!!(touched.maHoSo && errors.maHoSo)}
                                helperText={touched.maHoSo && errors.maHoSo}
                                onBlur={() => handleBlur("maHoSo")}
                                //a
                                onChange={(event) => handleChange(event, "maHoSo")}
                                value={maHoSo}
                                name="maHoSo"
                                //b
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã hồ sơ"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                error={!!(touched.maHocSinh && errors.maHocSinh)}
                                helperText={touched.maHocSinh && errors.maHocSinh}
                                onBlur={() => handleBlur("maHocSinh")}
                                onChange={(event) => handleChange(event, "maHocSinh")}
                                value={maHocSinh}
                                name="maHocSinh"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã du học sinh"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayNhapHoc")}
                                    onChange={(value) => handleChangeDate(value, "ngayNhapHoc")}
                                    value={ngayNhapHoc}
                                    name="ngayNhapHoc"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayNhapHoc && errors.ngayNhapHoc),
                                            helperText: touched.ngayNhapHoc && errors.ngayNhapHoc,
                                        }
                                    }}
                                    label="Ngày nhập học"
                                />
                            </LocalizationProvider>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    error={!!(touched.ho && errors.ho)}
                                    helperText={touched.ho && errors.ho}
                                    onBlur={() => handleBlur("ho")}
                                    onChange={(event) => handleChange(event, "ho")}
                                    value={ho}
                                    name="ho"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Họ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(touched.tenDem && errors.tenDem)}
                                    helperText={touched.tenDem && errors.tenDem}
                                    onBlur={() => handleBlur("tenDem")}
                                    onChange={(event) => handleChange(event, "tenDem")}
                                    value={tenDem}
                                    name="tenDem"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên đệm"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(touched.ten && errors.ten)}
                                    helperText={touched.ten && errors.ten}
                                    onBlur={() => handleBlur("ten")}
                                    onChange={(event) => handleChange(event, "ten")}
                                    value={ten}
                                    name="ten"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngaySinh")}
                                    onChange={(value) => handleChangeDate(value, "ngaySinh")}
                                    value={ngaySinh}
                                    name="ngaySinh"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngaySinh && errors.ngaySinh),
                                            helperText: touched.ngaySinh && errors.ngaySinh,
                                        }
                                    }}
                                    label="Ngày sinh"
                                />
                            </LocalizationProvider>
                            <Box
                                sx={{ margin: "4px", marginTop: "12px", display: "flex", flexDirection: "row" }}
                            >
                                <FormLabel sx={{ margin: "10px 10px 0 8px" }}>Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    name="gioiTinh"
                                    value={gioiTinh}
                                    onChange={(event) => handleChange(event, "gioiTinh")}
                                >
                                    <FormControlLabel value="1"
                                        control={<Radio size="small" />}
                                        label="Nam" />
                                    <FormControlLabel value="2"
                                        control={<Radio size="small" />}
                                        label="Nữ" />
                                </RadioGroup>
                            </Box>
                            <TextField
                                onChange={(event) => handleChange(event, "tinhTrangHonNhan")}
                                value={tinhTrangHonNhan}
                                name="tinhTrangHonNhan"
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
                            <TextField
                                onChange={(event) => handleChange(event, "trinhDoVanHoa")}
                                value={trinhDoVanHoa}
                                name="trinhDoVanHoa"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Trình độ văn hóa"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value="Cao Đẳng ">Cao Đẳng</option>
                                <option value="TC NGHỀ">TC NGHỀ</option>
                                <option value="THCS ">THCS</option>
                                <option value="THPT ">THPT</option>
                                <option value="ĐH ">ĐH</option>
                            </TextField>
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "maDanToc", newValue)}
                                value={maDanToc}
                                name="maDanToc"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Kinh', 'Hmooong']}
                                renderInput={(params) => <TextField {...params}
                                    label="Dân tộc"
                                    variant="outlined" />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "tonGiao", newValue)}
                                value={tonGiao}
                                name="tonGiao"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Phật', 'Không']}
                                renderInput={(params) => <TextField {...params}
                                    label="Tôn giáo"
                                    variant="outlined" />}
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "tienTrinhHoSo")}
                                value={tienTrinhHoSo}
                                name="tienTrinhHoSo"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tiến độ hồ sơ"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value={0}>Không lựa chọn</option>
                            </TextField>
                            <Autocomplete
                                onBlur={() => handleBlur("maChuongTrinhThamGia")}
                                onChange={(event, newValue) => handleChangeSelect(event, "maChuongTrinhThamGia", newValue)}
                                value={maChuongTrinhThamGia}
                                name="maChuongTrinhThamGia"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'TTS', 'CT khác']}
                                renderInput={(params) => <TextField {...params}
                                    label="Chương trình tham gia"
                                    variant="outlined"
                                    error={!!(touched.maChuongTrinhThamGia && errors.maChuongTrinhThamGia)}
                                    helperText={touched.maChuongTrinhThamGia && errors.maChuongTrinhThamGia}
                                />}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayDangKy")}
                                    onChange={(value) => handleChangeDate(value, "ngayDangKy")}
                                    value={ngayDangKy}
                                    name="ngayDangKy"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayDangKy && errors.ngayDangKy),
                                            helperText: touched.ngayDangKy && errors.ngayDangKy,
                                        }
                                    }}
                                    label="Ngày đăng ký"
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Căn cước công dân / CMND
                            </Typography>
                            <TextField
                                error={!!(touched.soCCCD && errors.soCCCD)}
                                helperText={touched.soCCCD && errors.soCCCD}
                                onBlur={() => handleBlur("soCCCD")}
                                onChange={(event) => handleChange(event, "soCCCD")}
                                value={soCCCD}
                                name="soCCCD"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số CCCD"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "noiCapCCCD", newValue)}
                                value={noiCapCCCD}
                                name="noiCapCCCD"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["Không lựa chọn", "Cục CS XNC"]}
                                renderInput={(params) => (
                                    <TextField
                                        error={!!(touched.noiCapCCCD && errors.noiCapCCCD)}
                                        helperText={touched.noiCapCCCD && errors.noiCapCCCD}
                                        variant="outlined"
                                        {...params}
                                        label="Nơi cấp CCCD"
                                    />
                                )}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapCCCD")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapCCCD")}
                                    value={ngayCapCCCD}
                                    name="ngayCapCCCD"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapCCCD && errors.ngayCapCCCD),
                                            helperText: touched.ngayCapCCCD && errors.ngayCapCCCD,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Hộ chiếu
                            </Typography>
                            <TextField
                                error={!!(touched.soHoChieu && errors.soHoChieu)}
                                helperText={touched.soHoChieu && errors.soHoChieu}
                                onBlur={() => handleBlur("soHoChieu")}
                                onChange={(event) => handleChange(event, "soHoChieu")}
                                value={soHoChieu}
                                name="soHoChieu"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hộ chiếu"
                                fullWidth
                                variant="outlined"
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "noiCapHoChieu", newValue)}
                                value={noiCapHoChieu}
                                name="noiCapHoChieu"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Cục CS XNC']}
                                renderInput={(params) => <TextField {...params}
                                    label="Nơi cấp hộ chiếu"
                                    variant="outlined" />}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapHoChieu")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                                    value={ngayCapHoChieu}
                                    name="ngayCapHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapHoChieu && errors.ngayCapHoChieu),
                                            helperText: touched.ngayCapHoChieu && errors.ngayCapHoChieu,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayHetHanHoChieu")}
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanHoChieu")}
                                    value={dayjs(ngayCapHoChieu).add(10, "year")}
                                    name="ngayHetHanHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayHetHanHoChieu && errors.ngayHetHanHoChieu),
                                            helperText: touched.ngayHetHanHoChieu && errors.ngayHetHanHoChieu,
                                        }
                                    }}
                                    label="Ngày hết hạn"
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={6}
                        xs={12}
                    >
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Địa chỉ
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Autocomplete
                                    onBlur={() => handleBlur("maThanhPho")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maThanhPho", newValue)}
                                    value={maThanhPho}
                                    name="maThanhPho"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Tỉnh, thành phố"
                                        variant="outlined"
                                        error={!!(touched.maThanhPho && errors.maThanhPho)}
                                        helperText={touched.maThanhPho && errors.maThanhPho}
                                    />}
                                />
                                <Autocomplete
                                    onBlur={() => handleBlur("maQuan")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maQuan", newValue)}
                                    value={maQuan}
                                    name="maQuan"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Quận / huyện"
                                        variant="outlined"
                                        error={!!(touched.maQuan && errors.maQuan)}
                                        helperText={touched.maQuan && errors.maQuan}
                                    />}
                                />
                                <Autocomplete
                                    onBlur={() => handleBlur("maPhuong")}
                                    onChange={(event, newValue) => handleChangeSelect(event, "maPhuong", newValue)}
                                    value={maPhuong}
                                    name="maPhuong"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Xã phường"
                                        variant="outlined"
                                        error={!!(touched.maPhuong && errors.maPhuong)}
                                        helperText={touched.maPhuong && errors.maPhuong}
                                    />}
                                />
                            </Box>
                            <TextField
                                error={!!(touched.diaChi && errors.diaChi)}
                                helperText={touched.diaChi && errors.diaChi}
                                onBlur={() => handleBlur("diaChi")}
                                onChange={(event) => handleChange(event, "diaChi")}
                                value={diaChi}
                                name="diaChi"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={!!(touched.dienThoai && errors.dienThoai)}
                                helperText={touched.dienThoai && errors.dienThoai}
                                onBlur={() => handleBlur("dienThoai")}
                                onChange={(event) => handleChange(event, "dienThoai")}
                                value={dienThoai}
                                name="dienThoai"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điện thoại di động"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    margin: '20px 0px',
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh chân dung
                                    </Typography>
                                    <Stack direction="row"
                                        spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedFileAvt}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small"
                                        component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file"
                                            accept="image/*"
                                            onChange={handleFileAvtChange}
                                            onBlur={() => handleBlur("anhChanDung")}
                                        />
                                    </Button>
                                    {touched.anhChanDung && errors.anhChanDung && (
                                        <FormHelperText sx={{ color: "red" }}>{errors.anhChanDung}</FormHelperText>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        variant="b"
                                        component="b"
                                        sx={{ margin: "16px" }}
                                    >
                                        Ảnh toàn thân
                                    </Typography>
                                    <Stack direction="row"
                                        spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "160px",
                                            }}
                                            variant="rounded"
                                            src={selectedFileBody}
                                        ></Avatar>
                                    </Stack>
                                    <Button size="small"
                                        component="label">
                                        Tải ảnh lên
                                        <VisuallyHiddenInput type="file"
                                            accept="image/*"
                                            onChange={handleFileBodyChange}
                                            onBlur={() => handleBlur("anhToanThan")}
                                        />
                                    </Button>
                                    {touched.anhToanThan && errors.anhToanThan && (
                                        <FormHelperText sx={{ color: "red" }}>{errors.anhToanThan}</FormHelperText>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px" }}
                            >
                                Thông tin nộp hồ sơ
                            </Typography>
                            <Autocomplete
                                onBlur={() => handleBlur("muonDi")}
                                onChange={(event, newValue) => handleChangeSelect(event, "muonDi", newValue)}
                                value={muonDi}
                                name="muonDi"
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Nhật', 'Hàn']}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                                            checkedIcon={<CheckBox fontSize="small" />}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params}
                                    label="Muốn đi"
                                    variant="outlined"
                                    error={!!(touched.muonDi && errors.muonDi)}
                                    helperText={touched.muonDi && errors.muonDi}
                                />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("canBoTuyenDung")}
                                onChange={(event, newValue) => handleChangeSelect(event, "canBoTuyenDung", newValue)}
                                value={canBoTuyenDung}
                                name="canBoTuyenDung"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Tú', 'Nghĩa']}
                                renderInput={(params) => <TextField {...params}
                                    label="Cán bộ tuyển dụng"
                                    variant="outlined"
                                    error={!!(touched.canBoTuyenDung && errors.canBoTuyenDung)}
                                    helperText={touched.canBoTuyenDung && errors.canBoTuyenDung}
                                />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "ketQuaSoTuyen", newValue)}
                                value={ketQuaSoTuyen}
                                name="ketQuaSoTuyen"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Đang tư vấn', 'Đã ký hợp đồng', 'Đã rút hồ sơ']}
                                renderInput={(params) => <TextField {...params}
                                    label="Kết quả sơ tuyển"
                                    variant="outlined"
                                    error={!!(touched.ketQuaSoTuyen && errors.ketQuaSoTuyen)}
                                    helperText={touched.ketQuaSoTuyen && errors.ketQuaSoTuyen}
                                />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "kinhNghiem", newValue)}
                                value={kinhNghiem}
                                name="kinhNghiem"
                                multiple
                                disableCloseOnSelect
                                getOptionLabel={(option) => option}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Cắt, Mài, Đánh bóng', 'Cơ điện', 'Hàn xì', 'May mặc']}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlank fontSize="small" />}
                                            checkedIcon={<CheckBox fontSize="small" />}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params}
                                    label="Kinh nghiệm"
                                    variant="outlined" />}
                            />
                            <Autocomplete
                                onBlur={() => handleBlur("nhomNguon")}
                                onChange={(event, newValue) => handleChangeSelect(event, "nhomNguon", newValue)}
                                value={nhomNguon}
                                name="nhomNguon"
                                fullWidth
                                size="small"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                options={supplySourceOption}
                                groupBy={(option) => option.typeSupply}
                                renderInput={(params) => (
                                    <TextField variant="outlined"
                                        {...params}
                                        label="Nhóm nguồn cung ứng"
                                        error={!!(touched.nhomNguon && errors.nhomNguon)}
                                        helperText={touched.nhomNguon && errors.nhomNguon}
                                    />
                                )}
                            />
                        </Box>
                        <Box
                            sx={{
                                padding: "16px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: '12px'
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px", marginTop: "16px" }}
                            >
                                Thông tin visa
                            </Typography>
                            <TextField
                                error={!!(touched.soHoSoVisa && errors.soHoSoVisa)}
                                helperText={touched.soHoSoVisa && errors.soHoSoVisa}
                                onBlur={() => handleBlur("soHoSoVisa")}
                                onChange={(event) => handleChange(event, "soHoSoVisa")}
                                value={soHoSoVisa}
                                name="soHoSoVisa"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hồ sơ"
                                fullWidth
                                variant="outlined"
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayCapVisa")}
                                    onChange={(value) => handleChangeDate(value, "ngayCapVisa")}
                                    value={ngayCapVisa}
                                    name="ngayCapVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayCapVisa && errors.ngayCapVisa),
                                            helperText: touched.ngayCapVisa && errors.ngayCapVisa,
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayHetHanVisa")}
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanVisa")}
                                    value={ngayHetHanVisa}
                                    name="ngayHetHanVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayHetHanVisa && errors.ngayHetHanVisa),
                                            helperText: touched.ngayHetHanVisa && errors.ngayHetHanVisa,
                                        }
                                    }}
                                    label="Ngày hết hạn"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onBlur={() => handleBlur("ngayNhanTCLT")}
                                    onChange={(value) => handleChangeDate(value, "ngayNhanTCLT")}
                                    value={ngayNhanTCLT}
                                    name="ngayNhanTCLT"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined',
                                            error: !!(touched.ngayNhanTCLT && errors.ngayNhanTCLT),
                                            helperText: touched.ngayNhanTCLT && errors.ngayNhanTCLT,
                                        }
                                    }}
                                    label="Ngày nhận tư cách lưu trú"
                                />
                            </LocalizationProvider>
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
        </>
    )
};