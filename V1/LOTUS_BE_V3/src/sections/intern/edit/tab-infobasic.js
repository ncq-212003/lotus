import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  FormControl,
  Checkbox,
  Autocomplete,
  Button,
  Avatar,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_INTERN } from "src/contexts/reducer/intern/reducer-intern";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const wantToGoOption = [
  { value: 1, label: "Nhật" },
  { value: 2, label: "Hàn" },
];

const experienceOption = [
  { value: 1, label: "Cắt, Mài, Đánh bóng" },
  { value: 2, label: "Cơ điện" },
  { value: 3, label: "Hàn xì" },
  { value: 4, label: "May mặc" },
];

export default function TabInfoBasic() {
  const [selectedPortraitPhoto, setSelectedPortraitPhoto] = useState(null);
  const [selectedFullBodyPhoto, setSelectedFullBodyPhoto] = useState(null);
  const tab = "thongTinCoBan";
  const [state, dispatch] = useApp();
  const { intern } = state;
  const { thongTinCoBan } = intern;
  const {
    maHoSo,
    maThucTapSinh,
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
    CCCD,
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
    ghiChu,
  } = thongTinCoBan;

  const handlePortraitPhotoChange = (event) => {
    const file = event.target.files[0];
    const newValue = file.name;
    const fieldName = "anhChanDung";
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({
          type: HANDLERS_INTERN.SET_INPUT_INTERN,
          payload: { tab, fieldName, newValue },
        });
        setSelectedPortraitPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFullBodyPhotoChange = (event) => {
    const file = event.target.files[0];
    const newValue = file.name;
    const fieldName = "anhToanThan";
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({
          type: HANDLERS_INTERN.SET_INPUT_INTERN,
          payload: { tab, fieldName, newValue },
        });
        setSelectedFullBodyPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event, fieldName) => {
    const newValue = event.target.value;
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeSelect = (event, fieldName, newValue) => {
    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  const handleChangeDate = (value, fieldName) => {
    const newValue = value;
    const format = dayjs(value).format("DD/MM/YYYY");

    dispatch({
      type: HANDLERS_INTERN.SET_INPUT_INTERN,
      payload: { tab, fieldName, newValue },
    });
  };

  return (
    <>
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
              <TextField
                onChange={(event) => handleChange(event, "maHoSo")}
                value={maHoSo}
                name="maHoSo"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Mã hồ sơ"
                fullWidth
              />
              <TextField
                onChange={(event) => handleChange(event, "maThucTapSinh")}
                value={maThucTapSinh}
                name="maThucTapSinh"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Mã thực tập sinh"
                fullWidth
                variant="outlined"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayNhapHoc")}
                  value={ngayNhapHoc}
                  name="ngayNhapHoc"
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày nhập học"
                />
              </LocalizationProvider>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "ho")}
                    value={ho}
                    name="ho"
                    variant="outlined"
                    required
                    sx={{ margin: "4px", marginTop: "12px" }}
                    size="small"
                    label="Họ"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "tenDem")}
                    value={tenDem}
                    name="tenDem"
                    variant="outlined"
                    required
                    sx={{ margin: "2px", marginTop: "12px" }}
                    size="small"
                    label="Tên đệm"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    onChange={(event) => handleChange(event, "ten")}
                    value={ten}
                    name="ten"
                    variant="outlined"
                    required
                    sx={{ margin: "2px", marginTop: "12px" }}
                    size="small"
                    label="Tên"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngaySinh")}
                  name="ngaySinh"
                  value={ngaySinh}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày sinh"
                />
              </LocalizationProvider>
              <Box sx={{ margin: "4px", marginTop: "12px", display: "flex", flexDirection: "row" }}>
                <FormLabel sx={{ margin: "10px 10px 0 6px" }}>Giới tính</FormLabel>
                <RadioGroup
                  row
                  name="gioiTinh"
                  value={gioiTinh}
                  onChange={(event) => handleChange(event, "gioiTinh")}
                  sx={{ margin: "2px 0 0 0" }}
                >
                  <FormControlLabel value="1" control={<Radio size="small" />} label="Nam" />
                  <FormControlLabel value="2" control={<Radio size="small" />} label="Nữ" />
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
                options={["Không lựa chọn", "Kinh", "Hmooong"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Dân tộc" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "tonGiao", newValue)}
                value={tonGiao}
                name="tonGiao"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Phật", "Không"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Tôn giáo" />
                )}
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
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "maChuongTrinhThamGia", newValue)
                }
                value={maChuongTrinhThamGia}
                name="maChuongTrinhThamGia"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "TTS", "CT khác"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chương trình tham gia" />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayDangKy")}
                  name="ngayDangKy"
                  value={ngayDangKy}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày đăng ký"
                />
              </LocalizationProvider>
            </Box>

            {/* Căn cước công dân */}
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
                onChange={(event) => handleChange(event, "CCCD")}
                value={CCCD}
                name="CCCD"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số CCCD"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayCapCCCD")}
                  name="ngayCapCCCD"
                  value={ngayCapCCCD}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày cấp"
                />
              </LocalizationProvider>
              <TextField
                onChange={(event) => handleChange(event, "noiCapCCCD")}
                value={noiCapCCCD}
                name="noiCapCCCD"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Nơi cấp"
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
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "noiCapHoChieu", newValue)}
                value={noiCapHoChieu}
                name="noiCapHoChieu"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Cục CS XNC"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nơi cấp hộ chiếu" />
                )}
              />
              <TextField
                onChange={(event) => handleChange(event, "soHoChieu")}
                value={soHoChieu}
                name="soHoChieu"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số hộ chiếu"
                fullWidth
              />
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayCapHoChieu")}
                  name="ngayCapHoChieu"
                  value={ngayCapHoChieu}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày cấp"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayHetHanHoChieu")}
                  name="ngayHetHanHoChieu"
                  value={dayjs(ngayCapHoChieu).add(10, "year")}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày hết hạn"
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item sm={12} md={6} xs={12}>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "maThanhPho", newValue)}
                  value={maThanhPho}
                  name="maThanhPho"
                  sx={{ margin: "4px 4px 4px 4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Tỉnh, thành phố" variant="outlined" />
                  )}
                />
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "maQuan", newValue)}
                  value={maQuan}
                  name="maQuan"
                  sx={{ margin: "4px 4px 4px 4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Quận / huyện" variant="outlined" />
                  )}
                />
                <Autocomplete
                  onChange={(event, newValue) => handleChangeSelect(event, "maPhuong", newValue)}
                  value={maPhuong}
                  name="maPhuong"
                  sx={{ margin: "4px 0px 4px 4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label="Xã phường" variant="outlined" />
                  )}
                />
              </Box>
              <TextField
                onChange={(event) => handleChange(event, "diaChi")}
                value={diaChi}
                name="diaChi"
                required
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ"
                fullWidth
              />
              <TextField
                onChange={(event) => handleChange(event, "dienThoai")}
                value={dienThoai}
                name="dienThoai"
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Điện thoại di động"
                fullWidth
              />
              <Box
                sx={{
                  margin: "20px 0px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                    Ảnh chân dung
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{
                        width: "120px",
                        height: "160px",
                      }}
                      variant="rounded"
                      src={selectedPortraitPhoto}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handlePortraitPhotoChange} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="b" component="b" sx={{ margin: "16px" }}>
                    Ảnh toàn thân
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      sx={{
                        width: "120px",
                        height: "160px",
                      }}
                      variant="rounded"
                      src={selectedFullBodyPhoto}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handleFullBodyPhotoChange} />
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin nộp hồ sơ
              </Typography>
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "muonDi", newValue)}
                name="muonDi"
                multiple
                limitTags={3}
                options={wantToGoOption}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
                getOptionLabel={(option) => option.label}
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
                  <TextField variant="outlined" {...params} label="Muốn đi" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) =>
                  handleChangeSelect(event, "canBoTuyenDung", newValue)
                }
                value={canBoTuyenDung}
                name="canBoTuyenDung"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Tú", "Nghĩa"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Cán bộ tuyển dụng" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "ketQuaSoTuyen", newValue)}
                value={ketQuaSoTuyen}
                name="ketQuaSoTuyen"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Đang tư vấn", "Đã ký hợp đồng", "Đã rút hồ sơ"]}
                renderInput={(params) => (
                  <TextField {...params} label="Kết quả sơ tuyển" variant="outlined" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "kinhNghiem", newValue)}
                value={kinhNghiem}
                name="kinhNghiem"
                multiple
                limitTags={3}
                options={experienceOption}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
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
                  <TextField variant="outlined" {...params} label="Kinh nghiệm" />
                )}
              />
              <Autocomplete
                onChange={(event, newValue) => handleChangeSelect(event, "nhomNguon", newValue)}
                value={nhomNguon}
                name="nhomNguon"
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
                options={supplySourceOption}
                groupBy={(option) => option.typeSupply}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nhóm nguồn cung ứng" />
                )}
              />
            </Box>

            {/* Visa */}
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2">
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
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayCapVisa")}
                  name="ngayCapVisa"
                  value={ngayCapVisa}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày cấp"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayHetHanVisa")}
                  name="ngayHetHanVisa"
                  value={dayjs(ngayCapVisa).add(2, "year")}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày hết hạn"
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DatePicker
                  onChange={(value) => handleChangeDate(value, "ngayNhanTCLT")}
                  name="ngayNhanTCLT"
                  value={dayjs(ngayCapVisa).add(3, "month")}
                  sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      variant: "outlined",
                    },
                  }}
                  label="Ngày nhận tư cách lưu trú"
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

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
