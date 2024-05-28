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

export default function TabHealthCondition() {
    const tab = "tinhTrangSucKhoe";
    const [state, dispatch] = useApp();
    const { overseasStudent } = state;
    const { tinhTrangSucKhoe } = overseasStudent;
    const {
        nhomMau,
        canNang,
        chieuCao,
        uongRuou,
        hutThuoc,
        thiLucTrai,
        thiLucPhai,
        tayThuan,
        ghiChu,
    } = tinhTrangSucKhoe;

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
                                Tình trạng sức khỏe
                            </Typography>
                            <Autocomplete
                                onChange={(event, newValue) => handleChangeSelect(event, "nhomMau", newValue)}
                                value={nhomMau}
                                name="nhomMau"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'A', 'B', 'O', 'AB']}
                                renderInput={(params) => <TextField {...params} label="Nhóm máu" variant="outlined" />}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    onChange={(event) => handleChange(event, "canNang")}
                                    value={canNang}
                                    name="canNang"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Cân nặng"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={(event) => handleChange(event, "chieuCao")}
                                    value={chieuCao}
                                    name="chieuCao"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Chiều cao"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    onChange={(event) => handleChange(event, "uongRuou")}
                                    value={uongRuou}
                                    name="uongRuou"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Uống rượu"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="Không lựa chọn">Không lựa chọn</option>
                                    <option value="Không">Không</option>
                                    <option value="Có">Có</option>
                                </TextField>
                                <TextField
                                    onChange={(event) => handleChange(event, "hutThuoc")}
                                    value={hutThuoc}
                                    name="hutThuoc"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Hút thuốc"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="Không lựa chọn">Không lựa chọn</option>
                                    <option value="Không">Không</option>
                                    <option value="Có">Có</option>
                                </TextField>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    onChange={(event) => handleChange(event, "thiLucTrai")}
                                    value={thiLucTrai}
                                    name="thiLucTrai"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Thị lực (trái)"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    onChange={(event) => handleChange(event, "thiLucPhai")}
                                    value={thiLucPhai}
                                    name="thiLucPhai"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Thị lực (phải)"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Box>
                            <TextField
                                onChange={(event) => handleChange(event, "tayThuan")}
                                value={tayThuan}
                                name="tayThuan"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Tay thuận"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value="Không lựa chọn">Không lựa chọn</option>
                                <option value="Trái">Trái</option>
                                <option value="Phải">Phải</option>
                                <option value="Hai tay">Hai tay</option>
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
                </Grid>
            </Stack>
        </>
    )
};