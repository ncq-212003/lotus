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

} from "@mui/material";
import { styled } from '@mui/material/styles';
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã hồ sơ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <DateTimePicker
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày đăng ký"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Họ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên đệm"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
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
                                options={['Không lựa chọn', 'Kinh', 'Hmooong']}
                                renderInput={(params) => <TextField {...params} label="Dân tộc" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Phật', 'Không']}
                                renderInput={(params) => <TextField {...params} label="Tôn giáo" variant="outlined" />}
                            />
                            <TextField
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tiến độ hồ sơ"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            // value={values.state}
                            >
                                <option value={0}>Không lựa chọn</option>
                            </TextField>
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'TTS', 'CT khác']}
                                renderInput={(params) => <TextField {...params} label="Chương trình tham gia" variant="outlined" />}
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
                                Căn cước công dân / CMND
                            </Typography>
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số CCCD"
                                fullWidth
                                variant="outlined"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                            />
                            <TextField
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
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Cục CS XNC']}
                                renderInput={(params) => <TextField {...params} label="Nơi cấp hộ chiếu" variant="outlined" />}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hộ chiếu"
                                fullWidth
                                variant="outlined"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày hết hạn"
                            />
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: "16px", marginTop: "16px" }}
                            >
                                Thông tin visa
                            </Typography>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số hồ sơ"
                                fullWidth
                                variant="outlined"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày cấp"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày hết hạn"
                            />
                            <DateTimePicker
                                sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        variant: 'outlined'
                                    }
                                }}
                                label="Ngày nhận TCLT"
                            />
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
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số nhà, đường phố/Thôn"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Tỉnh, thành phố" variant="outlined" />}
                                />
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Quận / huyện" variant="outlined" />}
                                />
                                <Autocomplete
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Xã phường" variant="outlined" />}
                                />
                            </Box>
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ nơi ở"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Điện thoại di động"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="ĐT cố định"
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
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Nhật', 'Hàn']}
                                renderInput={(params) => <TextField {...params} label="Muốn đi" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Tú', 'Nghĩa']}
                                renderInput={(params) => <TextField {...params} label="Cán bộ tuyển dụng" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Đang tư vấn', 'Đã ký hợp đồng', 'Đã rút hồ sơ']}
                                renderInput={(params) => <TextField {...params} label="Kết quả sơ tuyển" variant="outlined" />}
                            />
                            <Autocomplete
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Nguồn dài hạn', 'Chỉ thi tuyển']}
                                renderInput={(params) => <TextField {...params} label="Nhóm nguồn" variant="outlined" />}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};