import React, { useState, useEffect } from "react";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Typography,
    Button
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfessionAdd() {
    const validationSchema = Yup.object({
        manganhnghe: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        tennganhnghe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        linhvuc: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        manganhnghe: '',
        tennganhnghe: '',
        linhvuc: '',
        thitruong: '',
        thongtinkhac: '',
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
                            label="Mã Ngành Nghề"
                            fullWidth
                            name="manganhnghe"
                            error={!!(formik.touched.manganhnghe && formik.errors.manganhnghe)}
                            helperText={formik.touched.manganhnghe && formik.errors.manganhnghe}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('manganhnghe', e.target.value)}
                            value={formik.values.manganhnghe}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên Ngành Nghề"
                            name="tennganhnghe"
                            fullWidth
                            error={!!(formik.touched.tennganhnghe && formik.errors.tennganhnghe)}
                            helperText={formik.touched.tennganhnghe && formik.errors.tennganhnghe}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tennganhnghe', e.target.value)}
                            value={formik.values.tennganhnghe}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Loại Ngành Nghề"
                            name="linhvuc"
                            fullWidth
                            error={!!(formik.touched.linhvuc && formik.errors.linhvuc)}
                            helperText={formik.touched.linhvuc && formik.errors.linhvuc}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('linhvuc', e.target.value)}
                            value={formik.values.linhvuc}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Thông Tin Khác"
                            name="thongtinkhac"
                            fullWidth
                            value={formik.values.thongtinkhac}
                            onChange={(e) => formik.setFieldValue('thongtinkhac', e.target.value)}
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
