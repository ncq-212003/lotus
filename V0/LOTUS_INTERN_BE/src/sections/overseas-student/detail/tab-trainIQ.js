import {
    Box,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';

export default function TabTrainIQ() {
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
                        md={12}
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
                                Thông tin đào tạo
                            </Typography>
                            {/* Danh sách lớp */}
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Danh sách lớp:</span> A
                            </Typography>

                            {/* Chủ nhiệm */}
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chủ nhiệm:</span> A
                            </Typography>
                            {/* Số điện thoại chủ nhiệm */}
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>SĐT chủ nhiệm:</span> 0123456789
                            </Typography>
                            {/* Ngày khai giảng và Ngày kết thúc */}
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày khai giảng:</span> 01/01/2023
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ngày kết thúc:</span> 31/12/2023
                            </Typography>
                            {/* Ghi chú */}
                            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Ghi chú:</span> Ghi chú về đào tạo
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};