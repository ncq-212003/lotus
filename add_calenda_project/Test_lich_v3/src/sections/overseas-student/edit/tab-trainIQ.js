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
import { DatePicker } from "@mui/x-date-pickers";
import { HANDLERS_OVERSEAS_STUDENT } from "src/contexts/reducer/overseas-student/reducer-overseas-student";
import { useApp } from "src/hooks/use-app";

export default function TabTrainIQ() {
    const tab = "daoTao";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { daoTao } = overseasStudent;
    const {
        danhSachLopId,
        chuNhiemLop,
        soDienThoaiChuNhiemLop,
        ngayKhaiGiang,
        ngayKetThuc,
        ghiChu,
    } = daoTao;

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
                                Thông tin đào tạo
                            </Typography>
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "danhSachLopId", newValue)}
                                value={danhSachLopId}
                                name="danhSachLopId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'A', 'B']}
                                renderInput={(params) => <TextField {...params} label="Danh sách lớp" variant="outlined" />}
                            />
                            <TextField
                                value={chuNhiemLop}
                                name="chuNhiemLop"
                                disabled
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Chủ nhiệm"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={soDienThoaiChuNhiemLop}
                                name="soDienThoaiChuNhiemLop"
                                disabled
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="SĐT chủ nhiệm"
                                fullWidth
                                variant="outlined"
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <DatePicker
                                    disabled
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày khai giảng"
                                />
                                <DatePicker
                                    disabled
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày kết thúc"
                                />
                            </Box>
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
                </Grid>
            </Stack>
        </>
    )
};