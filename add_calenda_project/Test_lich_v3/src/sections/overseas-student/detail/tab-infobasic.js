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
    Divider,

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
                                textAlign='center'
                            >
                                Thông tin cơ bản
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Mã hồ sơ:</span> PRTTS000001
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Mã du học sinh:</span> ABC000001
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Ngày nhập học:</span> 01/01/2023
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Họ:</span> Nguyễn
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Tên đệm:</span> Văn
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Tên:</span> A
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày sinh:</span> 05/10/1990
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Giới tính:</span> Nam
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Hôn nhân:</span> Đã kết hôn
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trình độ văn hóa:</span> ĐH
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Dân tộc:</span> Kinh
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tôn giáo:</span> Phật
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tiến độ hồ sơ:</span> Chưa xác định
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chương trình tham gia:</span> Không xác định
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginBottom: "16px"
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>Ngày nhập học:</span> 01/01/2023
                            </Typography>
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
                                textAlign='center'
                            >
                                Căn cước công dân / CMND
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số CCCD:</span> 123456789
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày cấp:</span> 01/02/2022
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nơi cấp:</span> Hà Nội
                            </Typography>
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
                                textAlign='center'
                            >
                                Hộ chiếu
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nơi cấp hộ chiếu:</span> Cục CS XNC
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số hộ chiếu:</span> ABC123456
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày cấp:</span> 01/02/2022
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày hết hạn:</span> 01/02/2032
                            </Typography>
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
                                textAlign='center'
                            >
                                Thông tin visa
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số hồ sơ:</span> ABC789
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày cấp:</span> 01/03/2022
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày hết hạn:</span> 01/03/2023
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày nhận TCLT:</span> 01/04/2022
                            </Typography>
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
                                textAlign='center'
                            >
                                Địa chỉ
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số nhà, đường phố/Thôn:</span> 123 Đường ABC, Thôn XYZ
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Tỉnh, thành phố:</span> Hồ Chí Minh
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Quận / huyện:</span> Quận 1
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Xã phường:</span> Phường 2
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Địa chỉ nơi ở:</span> 456 Đường XYZ, Quận 2
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Điện thoại di động:</span> 0987654321
                            </Typography>
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
                                textAlign='center'
                            >
                                Thông tin nộp hồ sơ
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Muốn đi:</span> Nhật, Hàn
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Cán bộ tuyển dụng:</span> Tú
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Kết quả sơ tuyển:</span> Đang tư vấn
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Kinh nghiệm:</span> IT, Cơ khí
                            </Typography>
                            <Typography variant="body1"
                                sx={{ marginBottom: '12px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nhóm nguồn cung ứng:</span> Nguồn dài hạn
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};