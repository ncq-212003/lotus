import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationAdd() {
    const validationSchema = Yup.object({
        tieude: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        noidung: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        nguoitao: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        ngaythongbao: Yup.date()
            .required('Vui lòng nhập ngày thông báo')
            .min(new Date(), 'Ngày thông báo phải từ ngày hôm nay trở đi')
            .typeError("Vui lòng nhập đúng định dạng"),
        mucdo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        tieude: '',
        noidung: '',
        nguoitao: '',
        ngaythongbao: '',
        mucdo: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                alert('Thêm thành công!');
                console.log(data);
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

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
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tiêu đề"
                            fullWidth
                            name="tieude"
                            error={!!(formik.touched.tieude && formik.errors.tieude)}
                            helperText={formik.touched.tieude && formik.errors.tieude}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tieude', e.target.value)}
                            value={formik.values.tieude}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            variant="outlined"
                            size="small"
                            label="Nội dung"
                            fullWidth
                            name="noidung"
                            error={!!(formik.touched.noidung && formik.errors.noidung)}
                            helperText={formik.touched.noidung && formik.errors.noidung}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('noidung', e.target.value)}
                            value={formik.values.noidung}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Người tạo thông báo"
                            fullWidth
                            name="nguoitao"
                            error={!!(formik.touched.nguoitao && formik.errors.nguoitao)}
                            helperText={formik.touched.nguoitao && formik.errors.nguoitao}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('nguoitao', e.target.value)}
                            value={formik.values.nguoitao}
                        />
                        <DatePicker
                            sx={{ margin: "4px", marginTop: "12px",width:"100%" }}
                            size="small"
                            variant="outlined"
                            label="Ngày thông báo"
                            name="ngaythongbao"
                            error={!!(formik.touched.ngaythongbao && formik.errors.ngaythongbao)}
                            helperText={formik.touched.ngaythongbao && formik.errors.ngaythongbao}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('ngaythongbao', e.target.value)}
                            value={formik.values.ngaythongbao || null}
                        />
                        <Autocomplete
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={['Nhật Bản', 'Hàn Quốc', 'Việt Nam']}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Mức độ"
                                    error={!!(formik.touched.mucdo && formik.errors.mucdo)}
                                    helperText={formik.touched.mucdo && formik.errors.mucdo}
                                />
                            )}
                            value={formik.values.mucdo}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('mucdo', newValue);
                            }}
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
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}
