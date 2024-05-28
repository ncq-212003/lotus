import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Button,
    Avatar,
    InputAdornment,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";

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
    { value: 6, typeSupply: "---", label: "Bộ lao động thương binh" },
    { value: 6, typeSupply: "---", label: "Trung tâm giáo dục thường xuyên" },
];

export default function TabInfoBasic() {
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
        chuongTrinhThamGia,
        ngayDangKy,
        soCMND,
        ngayCapCMND,
        noiCapCMND,
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
        mahuong,
        diaChi,
        dienThoai,
        anhChanDung,
        anhToanThan,
        muonDi,
        canBoTuyenDung,
        ketQuaSoTuyen,
        kinhNghiem,
        nhomNguon,
        ghiChu,
    } = thongTinCoBan;
    const [issueDate, setIssueDate] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);

    const handleIssueDateChange = (date) => {
        setIssueDate(date);

        // Tính ngày hết hạn là 10 năm sau ngày cấp
        const expiryDate = new Date(date);
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        setExpiryDate(expiryDate);
    };

    const handleFileAvtChange = (event) => {
        const file = event.target.files[0];
        const newValue = file.name;
        const fieldName = "anhChanDung";
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch({
                    type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                    payload: { tab, fieldName, newValue },
                });
                setSelectedFileAvt(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileBodyChange = (event) => {
        const file = event.target.files[0];
        const newValue = file.name;
        const fieldName = "anhToanThan";
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
        }
    };

    const handleChange = (event, fieldName) => {
        const newValue = event.target.value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeSelect = (event, fieldName, newValue) => {
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeDate = (value, fieldName) => {
        const newValue = value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
            payload: { tab, fieldName, newValue },
        });
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
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "maHocSinh")}
                                value={maHocSinh}
                                name="maHocSinh"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã du học sinh"
                                fullWidth
                                variant="outlined"
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayNhapHoc")}
                                    value={ngayNhapHoc}
                                    name="ngayNhapHoc"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
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
                                    onChange={(value) => handleChangeDate(value, "ngaySinh")}
                                    value={ngaySinh}
                                    name="ngaySinh"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày sinh"
                                />
                            </LocalizationProvider>
                            {/* <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Giới tính"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </TextField> */}
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
                                onChange={(event, newValue) => handleChangeSelect(event, "chuongTrinhThamGia", newValue)}
                                value={chuongTrinhThamGia}
                                name="chuongTrinhThamGia"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'TTS', 'CT khác']}
                                renderInput={(params) => <TextField {...params}
                                    label="Chương trình tham gia"
                                    variant="outlined" />}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayDangKy")}
                                    value={ngayDangKy}
                                    name="ngayDangKy"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
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
                                onChange={(event) => handleChange(event, "soCMND")}
                                value={soCMND}
                                name="soCMND"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số CCCD"
                                fullWidth
                                variant="outlined"
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayCapCMND")}
                                    value={ngayCapCMND}
                                    name="ngayCapCMND"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <TextField
                                onChange={(event) => handleChange(event, "noiCapCMND")}
                                value={noiCapCMND}
                                name="noiCapCMND"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Nơi cấp"
                                fullWidth
                                variant="outlined"
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
                                sx={{ marginBottom: "16px" }}
                            >
                                Hộ chiếu
                            </Typography>
                            {/* lấy từ cấu hình chung */}
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
                            <TextField
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
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                                    value={ngayCapHoChieu}
                                    name="ngayCapHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanHoChieu")}
                                    value={dayjs(ngayCapHoChieu).add(10, "year")}
                                    name="ngayHetHanHoChieu"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
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
                                    onChange={(event, newValue) => handleChangeSelect(event, "maThanhPho", newValue)}
                                    value={maThanhPho}
                                    name="maThanhPho"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Tỉnh, thành phố"
                                        variant="outlined" />}
                                />
                                <Autocomplete
                                    onChange={(event, newValue) => handleChangeSelect(event, "maQuan", newValue)}
                                    value={maQuan}
                                    name="maQuan"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Quận / huyện"
                                        variant="outlined" />}
                                />
                                <Autocomplete
                                    onChange={(event, newValue) => handleChangeSelect(event, "mahuong", newValue)}
                                    value={mahuong}
                                    name="mahuong"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params}
                                        label="Xã phường"
                                        variant="outlined" />}
                                />
                            </Box>
                            <TextField
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
                                            onChange={handleFileAvtChange} />
                                    </Button>
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
                                            onChange={handleFileBodyChange} />
                                    </Button>
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
                                    variant="outlined" />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "canBoTuyenDung", newValue)}
                                value={canBoTuyenDung}
                                name="canBoTuyenDung"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Tú', 'Nghĩa']}
                                renderInput={(params) => <TextField {...params}
                                    label="Cán bộ tuyển dụng"
                                    variant="outlined" />}
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
                                    variant="outlined" />}
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
                                        label="Nhóm nguồn cung ứng" />
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
                                    onChange={(value) => handleChangeDate(value, "ngayCapVisa")}
                                    value={ngayCapVisa}
                                    name="ngayCapVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày cấp"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayHetHanVisa")}
                                    value={ngayHetHanVisa}
                                    name="ngayHetHanVisa"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày hết hạn"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale={"en-gb"}>
                                <DatePicker
                                    onChange={(value) => handleChangeDate(value, "ngayNhanTCLT")}
                                    value={ngayNhanTCLT}
                                    name="ngayNhanTCLT"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày nhận tư cách lưu trú"
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};