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
import { actionSetTouched } from "./tab-infobasic";
import * as Yup from "yup";

export function validateFieldTrainIQ(dispatch, tab, fieldName, fieldValue) {
    const validationSchema = Yup.object().shape({
        danhSachLopId: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    });

    let newValue;
    validationSchema
        .validateAt(fieldName, { [fieldName]: fieldValue })
        .then(() => {
            newValue = null;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        })
        .catch((error) => {
            newValue = error.message;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_ERRORS_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        });
}

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
        touched,
        errors,
    } = daoTao;

    const handleChange = (event, fieldName) => {
        const newValue = event.target.value;
        dispatch({
            type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT,
            payload: { tab, fieldName, newValue },
        });
    };

    const handleChangeSelect = (event, fieldName, newValueSelect) => {
        actionSetTouched(dispatch, tab, fieldName);

        let newValue;

        if (newValueSelect !== null) {
            newValue = newValueSelect;
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        } else {
            newValue = "";
            dispatch({
                type: HANDLERS_OVERSEAS_STUDENT.SET_INPUT_OVERSEAS_STUDENT,
                payload: { tab, fieldName, newValue },
            });
        }

        validateFieldTrainIQ(dispatch, tab, fieldName, newValue);
    };

    const handleBlur = (fieldName) => {
        actionSetTouched(dispatch, tab, fieldName);
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
                                onBlur={() => handleBlur("danhSachLopId")}
                                onChange={(event, newValue) => handleChangeSelect(event, "danhSachLopId", newValue)}
                                value={danhSachLopId}
                                name="danhSachLopId"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Không lựa chọn', 'A', 'B']}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Danh sách lớp"
                                    variant="outlined"
                                    error={!!(touched.danhSachLopId && errors.danhSachLopId)}
                                    helperText={touched.danhSachLopId && errors.danhSachLopId}
                                />}
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
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
};