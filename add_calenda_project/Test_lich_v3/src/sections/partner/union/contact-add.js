import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
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
    DialogActions,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactAdd({ open, onClose }) {
    const validationSchema = Yup.object({
        accountName: Yup.string().required("Họ và tên không được để trống"),
        accountCode: Yup.string().required("Chức vụ không được để trống"),
        moneyStart: Yup.string().required("Địa chỉ không được để trống"),
        email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/gm, "Số điện thoại không hợp lệ")
            .required("Số điện thoại không được để trống"),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            accountName: "",
            accountCode: "",
            moneyStart: "",
            email: "",
            phone: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Dữ liệu đã nhập:", values);
            onClose();
        },
    });

    const handleClose = () => {
        onClose();
    };

    const formatPhoneNumber = (value) => {
        // Logic định dạng số điện thoại ở đây, ví dụ: chèn dấu "-" sau 3 và 7 ký tự
        return value.replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3");
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
                        Thêm người liên hệ
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
                            name="accountName"
                            value={formik.values.accountName}
                            onChange={formik.handleChange}
                            error={formik.touched.accountName && Boolean(formik.errors.accountName)}
                            helperText={formik.touched.accountName && formik.errors.accountName}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Chức vụ"
                            fullWidth
                            required
                            name="accountCode"
                            value={formik.values.accountCode}
                            onChange={formik.handleChange}
                            error={formik.touched.accountCode && Boolean(formik.errors.accountCode)}
                            helperText={formik.touched.accountCode && formik.errors.accountCode}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Địa chỉ"
                            fullWidth
                            required
                            name="moneyStart"
                            value={formik.values.moneyStart}
                            onChange={formik.handleChange}
                            error={formik.touched.moneyStart && Boolean(formik.errors.moneyStart)}
                            helperText={formik.touched.moneyStart && formik.errors.moneyStart}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Email"
                            fullWidth
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Số điện thoại"
                            fullWidth
                            required
                            name="phone"
                            value={formatPhoneNumber(formik.values.phone)}
                            onChange={(e) => {
                                const formattedValue = e.target.value.replace(/[^\d]/g, "");
                                formik.handleChange({
                                    target: { name: "phone", value: formattedValue },
                                });
                            }}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Ghi chú"
                            fullWidth
                            required
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            multiline
                            rows={2}
                            size="small"
                            variant="outlined"
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
