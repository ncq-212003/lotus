import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    DialogActions
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactEdit({ open, onClose, rowData }) {
    const validationSchema = Yup.object({
        name: Yup.string().required("Họ và tên không được để trống"),
        position: Yup.string().required("Chức vụ không được để trống"),
        address: Yup.string().required("Địa chỉ không được để trống"),
        email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/gm, "Số điện thoại không hợp lệ")
            .required("Số điện thoại không được để trống"),
        note: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            position: "",
            address: "",
            email: "",
            phone: "",
            note: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Dữ liệu đã chỉnh sửa:", values);
            onClose();
        },
    });

    useEffect(() => {
        if (rowData) {
            formik.setValues({
                name: rowData.name || "",
                position: rowData.position || "",
                address: rowData.address || "",
                email: rowData.email || "",
                phone: rowData.phone || "",
                note: rowData.note || "",
            });
        }
    }, [rowData]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Sửa thông tin
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2 }}>
                <Grid container spacing={2} margin="none" justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Họ và tên"
                            fullWidth
                            required
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Chức vụ"
                            fullWidth
                            required
                            name="position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.position && Boolean(formik.errors.position)}
                            helperText={formik.touched.position && formik.errors.position}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Địa chỉ"
                            fullWidth
                            required
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Email"
                            fullWidth
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Số điện thoại"
                            fullWidth
                            required
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Ghi chú"
                            fullWidth
                            required
                            name="note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.note && Boolean(formik.errors.note)}
                            helperText={formik.touched.note && formik.errors.note}
                            multiline
                            rows={2}
                        />
                    </Grid>
                </Grid>
            </Stack>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={formik.handleSubmit}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
