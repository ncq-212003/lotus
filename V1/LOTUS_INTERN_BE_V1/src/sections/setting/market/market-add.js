import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MarketAdd({ open, onClose }) {
    const validationSchema = Yup.object({
        manuoc: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        tennuoc: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        manuoc: '',
        tennuoc: '',
        gioithieu: '',
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
                            label="Mã Nước"
                            fullWidth
                            name="manuoc"
                            error={!!(formik.touched.manuoc && formik.errors.manuoc)}
                            helperText={formik.touched.manuoc && formik.errors.manuoc}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('manuoc', e.target.value)}
                            value={formik.values.manuoc}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên Nước"
                            fullWidth
                            name="tennuoc"
                            error={!!(formik.touched.tennuoc && formik.errors.tennuoc)}
                            helperText={formik.touched.tennuoc && formik.errors.tennuoc}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tennuoc', e.target.value)}
                            value={formik.values.tennuoc}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Giới Thiệu Chi Tiết"
                            fullWidth
                            value={formik.values.gioithieu}
                            onChange={(e) => { formik.setFieldValue('gioithieu',e.target.value)}}
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
                                    '&:hover': {
                                        backgroundColor: '#0c4da2',
                                    },
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
