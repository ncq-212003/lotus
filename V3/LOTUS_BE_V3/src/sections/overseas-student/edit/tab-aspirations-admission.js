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
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";

export default function TabaSpirationsAdmission() {
    const tab = "nguyenVongTrungTuyen";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { nguyenVongTrungTuyen } = overseasStudent;
    const {
        muonVaoTruongId,
        truongTrungTuyenId,
        chuyenNganhHocId,
        soHocKy,
        capHoc,
        ghiChu,
    } = nguyenVongTrungTuyen;

    const handleChange = (event, fieldName) => {
        const newValue = event.target.value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeSelect = (event, fieldName, newValue) => {
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT,
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
                            >
                                Thông tin trường học
                            </Typography>
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "muonVaoTruongId", newValue)}
                                value={muonVaoTruongId}
                                name="muonVaoTruongId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Aptech']}
                                renderInput={(params) => <TextField {...params} label="Muốn vào trường" variant="outlined" />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "truongTrungTuyenId", newValue)}
                                value={truongTrungTuyenId}
                                name="truongTrungTuyenId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'Aptech']}
                                renderInput={(params) => <TextField {...params} label="Trường trúng tuyển" variant="outlined" />}
                            />
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "chuyenNganhHocId", newValue)}
                                value={chuyenNganhHocId}
                                name="chuyenNganhHocId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'IT', 'Cơ khí']}
                                renderInput={(params) => <TextField {...params} label="Chuyên ngành học" variant="outlined" />}
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "soHocKy")}
                                value={soHocKy}
                                name="soHocKy"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Số kỳ học"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                onChange={(event) => handleChange(event, "capHoc")}
                                value={capHoc}
                                name="capHoc"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Cấp học"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value="Không lựa chọn">Không lựa chọn</option>
                                <option value="Du học nghề">Du học nghề</option>
                                <option value="Đại học">Đại học</option>
                                <option value="Thạc sĩ">Thạc sĩ</option>
                            </TextField>
                            {/* <TextField
                                onChange={(event) => handleChange(event, "ghiChu")}
                                value={ghiChu}
                                name="ghiChu"
                                multiline
                                rows={2}
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Ghi chú"
                                fullWidth
                                variant="outlined"
                            /> */}
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