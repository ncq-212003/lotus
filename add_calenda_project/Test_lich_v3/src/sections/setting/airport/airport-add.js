import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AirportAdd() {
    const countries = [
        { code: 'KP', label: 'Korea' },
        { code: 'AI', label: 'Anguilla' },
        { code: 'JP', label: 'Japan' },
        { code: 'CN', label: 'China' },
        { code: 'FR', label: 'France' },
    ]

    const validationSchema = Yup.object({
        tenNuoc: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        tenSanBay: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        diaChi: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        thanhPho: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        quanHuyen: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        xaPhuong: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const initialValues = {
        tenNuoc: "",
        tenSanBay: "",
        diaChi: "",
        thanhPho: "",
        quanHuyen: "",
        xaPhuong: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.log(values)
                formik.resetForm();
                // return data;
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

                        <Autocomplete
                            id="country-select-demo"
                            sx={{ marginTop: "12px", }}
                            options={countries}
                            autoHighlight
                            size="small"
                            getOptionLabel={(option) => option.label}
                            value={countries.find((option) => option.label === formik.values.tenNuoc) || null}
                            onChange={(event, value) => formik.setFieldValue('tenNuoc', value ? value.label : '')}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.tenNuoc && formik.errors.tenNuoc)}
                                    helperText={formik.touched.tenNuoc && formik.errors.tenNuoc}
                                    {...params}
                                    label="Tên nước"
                                    variant='outlined'
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenSanBay && formik.errors.tenSanBay)}
                            helperText={formik.touched.tenSanBay && formik.errors.tenSanBay}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenSanBay}
                            name="tenSanBay"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên sân bay"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.diaChi && formik.errors.diaChi)}
                            helperText={formik.touched.diaChi && formik.errors.diaChi}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.diaChi}
                            name="diaChi"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Địa chỉ chi tiết"
                            fullWidth
                            variant="outlined"
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("quanHuyen", newValue || "")}
                                    value={formik.values.quanHuyen}
                                    name="quanHuyen"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Hà nội", "Tokio", "Thái bình"]}
                                    renderInput={(params) => <TextField
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.quanHuyen && formik.errors.quanHuyen)}
                                        helperText={formik.touched.quanHuyen && formik.errors.quanHuyen}
                                        {...params} label="Tỉnh/ Thành phố" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("thanhPho", newValue || "")}
                                    value={formik.values.thanhPho}
                                    name="thanhPho"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Thanh Xuân", "Đống Đa", "Hai Bà Trưng", "Vĩnh Tường"]}
                                    renderInput={(params) => <TextField
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.thanhPho && formik.errors.thanhPho)}
                                        helperText={formik.touched.thanhPho && formik.errors.thanhPho}
                                        {...params} label="Quận/ Huyện" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("xaPhuong", newValue || "")}
                                    value={formik.values.xaPhuong}
                                    name="xaPhuong"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Hoàng Liệt", "Láng Thượng", "Trung Hòa", "Tân Tiến"]}
                                    renderInput={(params) => <TextField
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.xaPhuong && formik.errors.xaPhuong)}
                                        helperText={formik.touched.xaPhuong && formik.errors.xaPhuong}
                                        {...params} label="Xã/ Phường" variant="outlined" />}
                                />
                            </Grid>
                        </Grid>
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
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}
