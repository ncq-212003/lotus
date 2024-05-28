import { useEffect, useState } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Typography, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

export const AddFlightSchedules = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const [person, setPerson] = useState([
        { id: 1, name: "Nguyễn Văn Thành" },
        { id: 2, name: "Phạm Quốc Tuấn" },
        { id: 3, name: "Nguyễn Hoàng Nam" },
        { id: 4, name: "Trần Xuân Diệu" },
        { id: 5, name: "Minh Hải Phượng" }
    ]);

    const [flight, setFlight] = useState([
        { id: 1, name: "Sân bay 1" },
        { id: 2, name: "Sân bay 2" },
        { id: 3, name: "Sân bay 3" },
        { id: 4, name: "Sân bay 4" },
        { id: 5, name: "Sân bay 5" }
    ]);

    const validationSchema = Yup.object({
        hoVaTen: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayBay: Yup
            .date()
            .required('Vui lòng nhập thông tin vào trường này'),
        ngayDen: Yup
            .date()
            .required('Vui lòng nhập thông tin vào trường này'),
        nguoiPhuTrach: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        sanBayDi: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        sanBayDen: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const initialValues = {
        hoVaTen: "",
        ngayBay: "",
        ngayDen: "",
        nguoiPhuTrach: "",
        sanBayDi: "",
        sanBayDen: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                console.log("checkkk values", values)
                setSnackbarSeverity("success");
                setSnackbarMessage("Dữ liệu đã được thêm thành công.");
                setSnackbarOpen(true);
                formik.resetForm();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>

                        <TextField
                            error={!!(formik.touched.hoVaTen && formik.errors.hoVaTen)}
                            helperText={formik.touched.hoVaTen && formik.errors.hoVaTen}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.hoVaTen}
                            name="hoVaTen"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Họ và tên"
                            fullWidth
                            variant="outlined"
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // disableFuture
                                label="Ngày bay dự kiến"
                                // ampm={false} // 
                                format="DD/MM/YYYY"
                                onBlur={formik.handleBlur}
                                value={formik.values.ngayBay}
                                sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                                onChange={(value) => {
                                    // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                                    formik.setFieldValue("ngayBay", value);
                                }}
                                slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        onBlur: formik.handleBlur,
                                        error: !!(formik.touched.ngayBay && formik.errors.ngayBay),
                                        helperText: formik.touched.ngayBay && formik.errors.ngayBay,
                                    },
                                }}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // disableFuture
                                label="Ngày đến dự kiến"
                                // ampm={false} // 
                                format="DD/MM/YYYY"
                                onBlur={formik.handleBlur}
                                value={formik.values.ngayDen}
                                sx={{ width: "100%", margin: "4px 0px 0px 0px ", marginTop: "12px" }}
                                onChange={(value) => {
                                    // const formattedDate = dayjs(value).format("YYYY-MM-DD HH:mm");
                                    formik.setFieldValue("ngayDen", value);
                                }}
                                slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        onBlur: formik.handleBlur,
                                        error: !!(formik.touched.ngayDen && formik.errors.ngayDen),
                                        helperText: formik.touched.ngayDen && formik.errors.ngayDen,
                                    },
                                }}
                            />
                        </LocalizationProvider>

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={person}
                            value={person.find((item) => item.id === formik.values.nguoiPhuTrach) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('nguoiPhuTrach', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Người phụ trách"
                                    name="nguoiPhuTrach"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nguoiPhuTrach && Boolean(formik.errors.nguoiPhuTrach)}
                                    helperText={formik.touched.nguoiPhuTrach && formik.errors.nguoiPhuTrach}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={flight}
                            value={flight.find((item) => item.id === formik.values.sanBayDi) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('sanBayDi', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Sân bay đi"
                                    name="sanBayDi"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sanBayDi && Boolean(formik.errors.sanBayDi)}
                                    helperText={formik.touched.sanBayDi && formik.errors.sanBayDi}
                                />
                            )}
                        />

                        <Autocomplete
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={flight}
                            value={flight.find((item) => item.id === formik.values.sanBayDen) || null}
                            onChange={(_, newValue) => {
                                formik.setFieldValue('sanBayDen', newValue ? newValue.id : null);
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    variant="outlined"
                                    {...params}
                                    label="Sân bay đến"
                                    name="sanBayDen"
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sanBayDen && Boolean(formik.errors.sanBayDen)}
                                    helperText={formik.touched.sanBayDen && formik.errors.sanBayDen}
                                />
                            )}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                width: '100%',
                                marginTop: '20px'
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                    width: "100px",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
};
