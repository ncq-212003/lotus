import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({

});

const initialValues = {
    congTy: "",
    maKtx: "",
    tenKtx: "",
    diaChi: "",
    status: 1,
};

export default function DormitoryAdd() {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);

                console.log(values);
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <form
                onSubmit={formik.handleSubmit}
            >
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
                                error={!!(formik.touched.congTy && formik.errors.congTy)}
                                helperText={formik.touched.congTy && formik.errors.congTy}
                                onBlur={formik.handleBlur}
                                onChange={(event, newValue) => formik.setFieldValue("congTy", newValue)}
                                value={formik.values.congTy}
                                name="congTy"
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Công ty TNHH Tú', 'Công ty TNHH Nghĩa']}
                                renderInput={(params) => <TextField {...params} label="Thuộc công ty" variant="outlined" />}
                            />
                            <TextField
                                error={!!(formik.touched.maKtx && formik.errors.maKtx)}
                                helperText={formik.touched.maKtx && formik.errors.maKtx}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.maKtx}
                                name="maKtx"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Mã khu KTX"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={!!(formik.touched.tenKtx && formik.errors.tenKtx)}
                                helperText={formik.touched.tenKtx && formik.errors.tenKtx}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.tenKtx}
                                name="tenKtx"
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Tên khu KTX"
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
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                label="Địa chỉ"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                error={!!(formik.touched.status && formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                                onBlur={formik.handleBlur}
                                onChange={(event) => {
                                    formik.handleChange(event);
                                }}
                                value={formik.values.status}
                                name="status"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "12px" }}
                                label="Trạng thái"
                                select
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                <option value={1}>Đang mở</option>
                                <option value={2}>Đã đóng</option>
                                <option value={3}>Chưa mở</option>
                            </TextField>
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
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Stack>
    );
}