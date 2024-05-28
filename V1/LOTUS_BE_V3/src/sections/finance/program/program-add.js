import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ProgramRevenue from "./program-revenue";
import ProgramExpenditure from "./program-expenditure";
import { Save } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const ProgramAdd = () => {
    const currentDate = dayjs();

    const validationSchema = Yup.object().shape({
        tenChuongTrinh: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        maChuongTrinh: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        ngayApDung: Yup
            .date()
            .typeError("Vui lòng nhập đúng định dạng"),
        ghiChu: Yup.string(),
    });

    // Sử dụng useFormik để quản lý form
    const formik = useFormik({
        initialValues: {
            tenChuongTrinh: "",
            maChuongTrinh: "",
            ngayApDung: null,
            ghiChu: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Đã nhấn nút Lưu");
            // Xử lý lưu dữ liệu khi form hợp lệ
        },
    });

    const handleSave = () => {
        // Gọi hàm submit của formik để trigger validate và onSubmit
        formik.submitForm();
    };

    return (
        <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Thông tin chương trình
                        </Typography>

                        <TextField
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên chương trình"
                            fullWidth
                            variant="outlined"
                            {...formik.getFieldProps("tenChuongTrinh")}
                            error={formik.touched.tenChuongTrinh && Boolean(formik.errors.tenChuongTrinh)}
                            helperText={formik.touched.tenChuongTrinh && formik.errors.tenChuongTrinh}
                        />

                        <TextField
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Mã chương trình"
                            fullWidth
                            variant="outlined"
                            {...formik.getFieldProps("maChuongTrinh")}
                            error={formik.touched.maChuongTrinh && Boolean(formik.errors.maChuongTrinh)}
                            helperText={formik.touched.maChuongTrinh && formik.errors.maChuongTrinh}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                            <DatePicker
                                onBlur={() => handleBlur("ngayApDung")}
                                onChange={(value) => {
                                    formik.setFieldValue("ngayApDung", value);
                                }}
                                name="ngayApDung"
                                value={formik.values.ngayApDung}
                                minDate={currentDate}
                                sx={{ width: "100%", marginTop: "12px" }}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        variant: "outlined",
                                        error: !!(formik.touched.ngayApDung && formik.errors.ngayApDung),
                                        helperText: formik.touched.ngayApDung && formik.errors.ngayApDung,
                                    },
                                }}
                                label="Ngày áp dụng"
                            />
                        </LocalizationProvider>

                        <TextField
                            fullWidth
                            label="Ghi chú"
                            size="small"
                            multiline
                            rows={2}
                            sx={{ marginTop: "12px" }}
                            variant="outlined"
                            {...formik.getFieldProps("ghiChu")}
                            error={formik.touched.ghiChu && Boolean(formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                        />
                    </Box>
                    {/* Mục thu */}
                    <ProgramRevenue />

                    {/* Mục chi */}
                    <ProgramExpenditure />
                    <Grid sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                            sx={{ marginTop: "16px", backgroundColor: "#1C2536" }}
                        >
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
};
