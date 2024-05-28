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
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

export default function TabProfile() {
  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin trường học
              </Typography>
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Nhật bản"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Thị trường" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Aptech"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Muốn vào trường" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "Aptech"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Trường trúng tuyển" />
                )}
              />
              <Autocomplete
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Không lựa chọn", "IT", "Cơ khí"]}
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Chuyên ngành học" />
                )}
              />
              <TextField
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Học kỳ"
                fullWidth
              />
              <TextField
                fullWidth
                sx={{ margin: "4px", marginTop: "12px" }}
                label="Cấp học"
                select
                SelectProps={{ native: true }}
                variant="outlined"
                // value={values.state}
              >
                <option value={1}>Không lựa chọn</option>
                <option value={2}>Du học nghề</option>
                <option value={3}>Đại học</option>
                <option value={4}>Thạc sĩ</option>
              </TextField>
              <TextField
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Nhóm xuất cảnh"
                fullWidth
              />
              {/* <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày xuất cảnh</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày chuyển tiếp XN</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày chuyển đổi CT</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày kết thúc HĐ TTSKN</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                >
                                    <InputLabel>Ngày ra ngoài HĐ</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        fullWidth
                                    />
                                </FormControl>
                            </Box> */}
            </Box>
          </Grid>
          {/* <Grid
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
                                Lịch bay
                            </Typography>
                            <FormControl
                                size="small"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                            >
                                <InputLabel>Ngày bay</InputLabel>
                                <TextField
                                    type="date"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    fullWidth
                                />
                            </FormControl>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giờ bay"
                                    fullWidth
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Giờ đến"
                                    fullWidth
                                />
                            </Box>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hiệu chuyến bay"
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Sân bay đi"
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Sân bay đến"
                                fullWidth
                            />
                            <TextField
                                multiline
                                rows={3}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                            />
                        </Box>
                    </Grid> */}
        </Grid>
      </Stack>
    </>
  );
}
