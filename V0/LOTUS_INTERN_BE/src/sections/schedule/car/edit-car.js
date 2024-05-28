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
import Avatar from "@mui/material/Avatar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditCar({ openEditCar, closeEditCar, rowData }) {
    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        closeEditCar();
    };
    const validationSchema = Yup.object({
        companies: Yup
            .string()
            .required('Công ty không được để trống'),
        carName: Yup
            .string()
            .required('Tên xe không được để trống'),
        numberOfSeats: Yup
            .string()
            .required('Số ghế không được để trống'),
        licensePlate: Yup
            .string()
            .required('Biển số xe không được để trống'),
        mainSupervisor: Yup
            .string()
            .required("Người phụ trách không được để trống"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companies: rowData?.companies || "",
            carName: rowData?.carName || "",
            numberOfSeats: rowData?.numberOfSeats || "",
            licensePlate: rowData?.licensePlate || "",
            mainSupervisor: rowData?.mainSupervisor || "",
            submit: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.log(values)
                formik.resetForm();
                handleClose();
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
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <Stack
                        spacing={3}
                    >
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

                        <Stack direction="column" spacing={1} mt={2}>
                            <Avatar
                                sx={{
                                    width: "110px",
                                    height: "140px",
                                    marginLeft: "8px"
                                }}
                                variant="rounded"
                                src={selectedFile}
                            ></Avatar>
                            <Button
                                sx={{ width: "130px", padding: "5px 10px 5px 0px " }}
                                component="label"
                            >
                                Tải hình ảnh
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                        </Stack>
                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        marginTop: "10px",
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
