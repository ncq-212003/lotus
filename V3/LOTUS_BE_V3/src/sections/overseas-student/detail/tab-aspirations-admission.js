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
import { styled } from '@mui/material/styles';

export default function TabaSpirationsAdmission() {
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
                                Thông tin trường học
                            </Typography>

                            {/* Muốn vào trường */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Muốn vào trường:</span> Aptech
                            </Typography>

                            {/* Trường trúng tuyển */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Trường trúng tuyển:</span> Aptech
                            </Typography>

                            {/* Chuyên ngành học */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chuyên ngành học:</span> IT
                            </Typography>

                            {/* Học kỳ */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Số học kỳ:</span> 1
                            </Typography>

                            {/* Cấp học */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Cấp học:</span> Đại học
                            </Typography>

                            {/* Nhóm xuất cảnh */}
                            <Typography variant="body1" 
                            sx={{ marginBottom: '16px' }}>
                                <span style={{ fontWeight: 'bold' }}>Nhóm xuất cảnh:</span> Nhóm A
                            </Typography>
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
    )
};