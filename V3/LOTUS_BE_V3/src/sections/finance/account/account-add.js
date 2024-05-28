import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Stack,
    TextField,
    Autocomplete,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";

// Tạo mã radom code 
const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
};

export const PaymentAccount = () => {
    // add code in formik 
    useEffect(() => {
        const handleCodeChange = () => {
            const newCode = generateRandomCode();
            formik.setFieldValue('systemCode', newCode);
        };
        handleCodeChange();
    }, []);

    // sử dụng formik để validate dữ liệu
    const validationSchema = Yup.object({
        chuTaiKhoan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soTaiKhoan: Yup
            .number()
            .typeError('Số tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        maTaiKhoan: Yup
            .number()
            .typeError('Mã tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        congTy: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        hinhThucThanhToan: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soDuBatDau: Yup
            .number()
            .typeError('Số dư phải là một số')
            .positive('Số dư phải là số lớn hơn 0')
            .nullable()
            .default(null)
            .transform((originalValue, originalObject) => {
                return originalValue === undefined ? null : originalValue;
            }),
    });

    const initialValues = {
        chuTaiKhoan: "",
        soTaiKhoan: "",
        maTaiKhoan: "",
        congTy: "",
        hinhThucThanhToan: "",
        soDuBatDau: "",
        ghiChu: "",
        systemCode: "",
        submit: null
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                alert("Thành côcng")
                console.log(data);
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })
    // end

    return (
        <Stack spacing={2} sx={{ p: 2, marginTop: "64px" }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                >
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <TextField
                            error={!!(formik.touched.chuTaiKhoan && formik.errors.chuTaiKhoan)}
                            helperText={formik.touched.chuTaiKhoan && formik.errors.chuTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.chuTaiKhoan}
                            name="chuTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Chủ tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.soTaiKhoan && formik.errors.soTaiKhoan)}
                            helperText={formik.touched.soTaiKhoan && formik.errors.soTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soTaiKhoan}
                            name="soTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.maTaiKhoan && formik.errors.maTaiKhoan)}
                            helperText={formik.touched.maTaiKhoan && formik.errors.maTaiKhoan}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maTaiKhoan}
                            name="maTaiKhoan"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("congTy", newValue)}
                            value={formik.values.congTy}
                            name="congTy"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={[
                                "Cty An Nghĩa",
                                "Cty Bình An",
                                "Cty An Trạch",
                                "Cty Thành Công",
                                "Cty Bình Dương"
                            ]}
                            renderInput={(params) =>
                                <TextField
                                    error={!!(formik.touched.congTy && formik.errors.congTy)}
                                    helperText={formik.touched.congTy && formik.errors.congTy}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Thuộc công ty"
                                    variant="outlined" />}
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("hinhThucThanhToan", newValue)}
                            value={formik.values.hinhThucThanhToan}
                            name="hinhThucThanhToan"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={[
                                "Thanh toán bằng tiền mặt",
                                "Thanh toán không dùng tiền mặt(chuyển khoản, tin dụng, ghi séc,..)",
                            ]}
                            renderInput={(params) =>
                                <TextField
                                    error={!!(formik.touched.hinhThucThanhToan && formik.errors.hinhThucThanhToan)}
                                    helperText={formik.touched.hinhThucThanhToan && formik.errors.hinhThucThanhToan}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Hình thức thanh toán"
                                    variant="outlined" />}
                        />

                        <TextField
                            error={!!(formik.touched.soDuBatDau && formik.errors.soDuBatDau)}
                            helperText={formik.touched.soDuBatDau && formik.errors.soDuBatDau}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soDuBatDau}
                            name="soDuBatDau"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số dư bắt đầu"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                            helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ghiChu}
                            name="ghiChu"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />

                        <TextField
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            InputProps={{
                                readOnly: true, // Prevents user input
                            }}
                            value={formik.values.systemCode}
                            name="systemCode"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã hệ thống"
                            fullWidth
                            variant="outlined"
                        />
                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        marginTop: "30px",
                                        backgroundColor: "#1C2536",
                                        width: "100px",
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
};
