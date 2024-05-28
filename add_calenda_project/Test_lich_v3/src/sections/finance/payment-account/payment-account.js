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
        accountOwner: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        accountNumber: Yup
            .number()
            .typeError('Số tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        accountCode: Yup
            .number()
            .typeError('Mã tài khoản phải là một số')
            .required('Vui lòng nhập thông tin vào trường này'),
        company: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        paymentOptions: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        moneyStarts: Yup
            .number()
            .typeError('Số dư phải là một số')
            .positive('Số dư phải là số dương')
            .nullable()
            .default(null)
            .transform((originalValue, originalObject) => {
                return originalValue === undefined ? null : originalValue;
            }),
    });

    const initialValues = {
        accountOwner: "",
        accountNumber: "",
        accountCode: "",
        company: "",
        paymentOptions: "",
        moneyStarts: "",
        note: "",
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
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>

                        <TextField
                            error={!!(formik.touched.accountOwner && formik.errors.accountOwner)}
                            helperText={formik.touched.accountOwner && formik.errors.accountOwner}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.accountOwner}
                            name="accountOwner"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Chủ tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.accountNumber && formik.errors.accountNumber)}
                            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.accountNumber}
                            name="accountNumber"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.accountCode && formik.errors.accountCode)}
                            helperText={formik.touched.accountCode && formik.errors.accountCode}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.accountCode}
                            name="accountCode"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Mã tài khoản"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
                            value={formik.values.company}
                            name="company"
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
                                    error={!!(formik.touched.company && formik.errors.company)}
                                    helperText={formik.touched.company && formik.errors.company}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Thuộc công ty"
                                    variant="outlined" />}
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("paymentOptions", newValue)}
                            value={formik.values.paymentOptions}
                            name="paymentOptions"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={[
                                "Thanh toán bằng tiền mặt",
                                "Thanh toán không dùng tiền mặt(chuyển khoản, tin dụng, ghi séc,..)",
                            ]}
                            renderInput={(params) =>
                                <TextField
                                    error={!!(formik.touched.paymentOptions && formik.errors.paymentOptions)}
                                    helperText={formik.touched.paymentOptions && formik.errors.paymentOptions}
                                    onBlur={formik.handleBlur}
                                    {...params}
                                    label="Hình thức thanh toán"
                                    variant="outlined" />}
                        />

                        <TextField
                            error={!!(formik.touched.moneyStarts && formik.errors.moneyStarts)}
                            helperText={formik.touched.moneyStarts && formik.errors.moneyStarts}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.moneyStarts}
                            name="moneyStarts"
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Số dư bắt đầu"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.note && formik.errors.note)}
                            helperText={formik.touched.note && formik.errors.note}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.note}
                            name="note"
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
