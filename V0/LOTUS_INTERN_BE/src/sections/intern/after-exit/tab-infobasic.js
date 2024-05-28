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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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

export default function TabInfoBasic() {
  const [selectedFileAvt, setSelectedFileAvt] = useState(null);
  const [selectedFileBody, setSelectedFileBody] = useState(null);

  const handleFileAvtChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFileAvt(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileBodyChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFileBody(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
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
                Thông tin cơ bản
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="outlined"
                  required
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  label="Mã hồ sơ"
                  fullWidth
                />
              </Box>
              <DatePicker
                sx={{ width: "100%", margin: "4px", marginTop: "12px", maxHeight: "47px" }}
                label="Ngày đăng ký"
                renderInput={(params) => <TextField variant="outlined" {...params} />}
              />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
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
                    variant="outlined"
                    required
                    sx={{ margin: "2px", marginTop: "12px" }}
                    size="small"
                    label="Tên"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <DatePicker
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày sinh"
              />
              <TextField
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
              </TextField>
              <TextField
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Hôn nhân"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                // value={values.state}
              >
                <option value={1}>Không lựa chọn</option>
                <option value={2}>Chưa kết hôn</option>
                <option value={3}>Đã kết hôn</option>
                <option value={4}>Ly hôn</option>
              </TextField>
              <TextField
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Trình độ văn hóa"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                // value={values.state}
              >
                <option value={0}>Không lựa chọn</option>
                <option value={1}>CĐ</option>
                <option value={2}>TC NGHE</option>
                <option value={3}>THCS</option>
                <option value={4}>THPT</option>
                <option value={5}>ĐH</option>
              </TextField>
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Kinh", "Hmooong"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Dân tộc" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Phật", "Không"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Tôn giáo" />
                )}
              />
              <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
                <TextField variant="outlined" size="small" fullWidth label="Tiến độ hồ sơ" />
              </FormControl>
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "TTS", "CT khác"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chương trình tham gia" />
                )}
              />
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
                Căn cước công dân
              </Typography>
              <TextField
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số CCCD"
                fullWidth
              />
              <DatePicker
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
              <TextField
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Nơi cấp"
                fullWidth
              />
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
                Hộ chiếu
              </Typography>
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Cục CS XNC"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nơi cấp hộ chiếu" />
                )}
              />
              <TextField
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số hộ chiếu"
                fullWidth
              />
              <DatePicker
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày cấp"
              />
              <DatePicker
                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "outlined",
                  },
                }}
                label="Ngày hết hạn"
              />
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
              <TextField
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số nhà, đường phố/Thôn"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Tỉnh, thành phố" />
                  )}
                />
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Quận / huyện" />
                  )}
                />
                <Autocomplete
                  sx={{ margin: "4px", marginTop: "12px" }}
                  fullWidth
                  size="small"
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Xã phường" />
                  )}
                />
              </Box>
              <TextField
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Địa chỉ nơi ở"
                fullWidth
              />
              <TextField
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Điện thoại di động"
                fullWidth
              />
              <TextField
                variant="outlined"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="ĐT cố định"
                fullWidth
              />
              <Box
                sx={{
                  margin: "20px 60px",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
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
                      src={selectedFileAvt}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handleFileAvtChange} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
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
                      src={selectedFileBody}
                    ></Avatar>
                  </Stack>
                  <Button size="small" component="label">
                    Tải ảnh lên
                    <VisuallyHiddenInput type="file" onChange={handleFileBodyChange} />
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
                multiple
                limitTags={3}
                options={[
                  { value: 2, label: "Nhật" },
                  { value: 2, label: "Hàn" },
                ]}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
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
                  <TextField variant="outlined" {...params} label="Muốn đi" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Tú", "Nghĩa"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Cán bộ tuyển dụng" />
                )}
              />
              <Autocomplete
                multiple
                limitTags={3}
                options={[
                  { value: 1, label: "Cắt, Mài, Đánh bóng" },
                  { value: 2, label: "Cơ điện" },
                  { value: 3, label: "Hàn xì" },
                  { value: 4, label: "May mặc" }
                ]}
                disableCloseOnSelect
                size="small"
                sx={{ margin: "4px", marginTop: "12px" }}
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
                  <TextField variant="outlined" {...params} label="Kinh nghiệm" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Nguồn dài hạn", "Chỉ thi tuyển"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Nhóm nguồn" />
                )}
              />
            </Box>
            {/* <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin visa
              </Typography>
              <TextField
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Số hồ sơ"
                fullWidth
              />
              <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
                <InputLabel>Ngày cấp</InputLabel>
                <TextField
                  type="date"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                />
              </FormControl>
              <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
                <InputLabel>Ngày hết hạn</InputLabel>
                <TextField
                  type="date"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                />
              </FormControl>
              <FormControl size="small" fullWidth sx={{ margin: "4px", marginTop: "12px" }}>
                <InputLabel>Ngày nhận TCLT</InputLabel>
                <TextField
                  type="date"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                />
              </FormControl>
            </Box> */}
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
