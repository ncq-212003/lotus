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
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import SnackbarAlert from "src/components/action-notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function EditCar({ openEditCar, closeEditCar, rowData }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFile(fileUrl);
    };

    const handleClose = () => {
        closeEditCar();
    };

    const validationSchema = Yup.object({
        companies: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        carName: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        numberOfSeats: Yup
            .number()
            .positive(' Vui lòng nhập một số lớn hơn 0')
            .typeError('Vui lòng nhập số vào trường này')
            .required('Vui lòng nhập thông tin vào trường này'),
        licensePlate: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        mainSupervisor: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companies: rowData?.companies || "",
            carName: rowData?.carName || "",
            numberOfSeats: rowData?.numberOfSeats || "",
            licensePlate: rowData?.licensePlate || "",
            mainSupervisor: rowData?.mainSupervisor || "",
            linkImage: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                values.linkImage = selectedFile;
                const data = JSON.stringify(values);
                console.log(values)
                setSnackbarSeverity("info");
                setSnackbarMessage("Cập nhật dữ liệu thành công.");
                setSnackbarOpen(true);
                alert("thanh cong")
                formik.resetForm();
                // handleClose();
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditCar}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa Xe
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
                <Box sx={{ typography: "body1" }}>
                    <Grid container>
                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("companies", newValue || "")}
                            value={formik.values.companies}
                            name="companies"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "Công ty Hưng Thịnh", "Công ty Hoàng Lâm", "Công ty Sơn Hà", "Công ty Minh Tâm", "Công ty Đại Phát"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.companies && formik.errors.companies)}
                                helperText={formik.touched.companies && formik.errors.companies}
                                {...params} label="Thuộc công ty" variant="outlined" />}
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("carName", newValue || "")}
                            value={formik.values.carName}
                            name="carName"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "Lamborghini Veneno", "McLaren Speedtail", "Pagani Zonda HP Barchetta", "Bugatti La Voiture Noire"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.carName && formik.errors.carName)}
                                helperText={formik.touched.carName && formik.errors.carName}
                                {...params} label="Xe" variant="outlined" />}
                        />

                        <TextField
                            error={!!(formik.touched.numberOfSeats && formik.errors.numberOfSeats)}
                            helperText={formik.touched.numberOfSeats && formik.errors.numberOfSeats}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.numberOfSeats}
                            name="numberOfSeats"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Số ghế"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("licensePlate", newValue || "")}
                            value={formik.values.licensePlate}
                            name="licensePlate"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "30A-12345", "51B-67890", "92C-45678", "43H-98765"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.licensePlate && formik.errors.licensePlate)}
                                helperText={formik.touched.licensePlate && formik.errors.licensePlate}
                                {...params} label="Biển số xe" variant="outlined" />}
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("mainSupervisor", newValue || "")}
                            value={formik.values.mainSupervisor}
                            name="mainSupervisor"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "Nguyễn Văn Thảo", "Phạm Danh Nam", "Nguyễn Công Quyết", "Phùng Văn Tiến"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.mainSupervisor && formik.errors.mainSupervisor)}
                                helperText={formik.touched.mainSupervisor && formik.errors.mainSupervisor}
                                {...params} label="Phụ trách chính" variant="outlined" />}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "11px", fontSize: "14px" }}>
                                Ảnh xe
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "110px",
                                        height: "135px",
                                    }}
                                    variant="rounded"
                                    src={selectedFile}
                                ></Avatar>
                            </Stack>
                            <Button size="small" component="label">
                                Tải ảnh lên
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                        </Box>
                    </Grid>
                    <Box style={{ marginTop: "20px" }}>
                        <Button
                            onClick={formik.handleSubmit}
                            variant="contained"
                            sx={{
                                width: "130px",
                                backgroundColor: "#1C2536",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                            }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </DialogContent>

            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />

        </BootstrapDialog>
    );
}
