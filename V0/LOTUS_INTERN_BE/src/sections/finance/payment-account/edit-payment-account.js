import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
    Autocomplete,
    Tooltip
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditPaymentAccount({ openEditPaymentAccount, closeEditPaymentAccount, rowData }) {
    const handleClose = () => {
        closeEditPaymentAccount();
    };

    const validationSchema = Yup.object({
        //khai bao gia trị validate trong này
        name: Yup
            .string()
            .required('Tên tài khoản không được để trống'),
        accountNumber: Yup
            .number()
            .typeError('Số tài khoản phải là một số')
            .required('Số tài khoản không được để trống'),
        accountCode: Yup
            .number()
            .typeError('Mã tài khoản phải là một số')
            .required('Mã tài khoản không được để trống'),
        company: Yup
            .string()
            .required('Tên công ty không được để trống'),
        accountOwner: Yup
            .string()
            .required('Chủ tài khoản không được để trống'),
        moneyStarts: Yup
            .number()
            .typeError('Số dư phải là một số')
            .required('Số dư không được để trống'),
        systemCode: Yup
            .number()
            .typeError('Mã hệ thống phải là một số')
            .required('Mã hệ thống không được để trống'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: rowData?.name || "",
            accountNumber: rowData?.accountNumber || "",
            accountCode: rowData?.accountCode || "",
            company: rowData?.company || "",
            accountOwner: rowData?.accountOwner || "",
            moneyStarts: rowData?.moneyStarts || "",
            note: rowData?.note || "",
            systemCode: rowData?.systemCode || "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.log(data)
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    console.log(rowData)
    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditPaymentAccount}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa tài khoản
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <SvgIcon fontSize="inherit">
                    <XCircleIcon />
                </SvgIcon>
            </IconButton>
            <DialogContent dividers>
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Stack
                        spacing={3}
                    >
                        <TextField
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Tên tài khoản"
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
                            error={!!(formik.touched.accountNumber && formik.errors.accountNumber)}
                            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.accountNumber}
                            name="accountNumber"
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
                            error={!!(formik.touched.systemCode && formik.errors.systemCode)}
                            helperText={formik.touched.systemCode && formik.errors.systemCode}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
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
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        marginTop: "30px",
                                        backgroundColor: "#1C2536",
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
}
