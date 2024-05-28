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
import styles from '../../../style/index.module.scss'

export default function ItemAdd() {

    const validationSchema = Yup.object({
        maphong: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'), 
        mataisan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tentaisan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    })

    const initialValues = {
        maphong: "",
        mataisan: "",
        tentaisan: "",
    }

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
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Mã phòng"
                            fullWidth
                            error={!!(formik.touched.maphong && formik.errors.maphong)}
                            helperText={formik.touched.maphong && formik.errors.maphong}
                            onBlur={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('maphong', value.target.value);
                              }}
                            value={formik.values.maphong}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            variant="outlined"
                            size="small"
                            label="Mã tài sản vật dụng"
                            fullWidth
                            error={!!(formik.touched.mataisan && formik.errors.mataisan)}
                            helperText={formik.touched.mataisan && formik.errors.mataisan}
                            onBlur={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('mataisan', value.target.value);
                              }}
                            value={formik.values.mataisan}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên tài sản vật dụng"
                            fullWidth
                            error={!!(formik.touched.tentaisan && formik.errors.tentaisan)}
                            helperText={formik.touched.tentaisan && formik.errors.tentaisan}
                            onBlur={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('tentaisan', value.target.value);
                              }}
                            value={formik.values.tentaisan}
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
                                className ={styles.btn}
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
