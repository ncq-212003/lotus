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
import AddIcon from "@mui/icons-material/Add";
import { TypeAddress } from "../type-address";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditFormAddress({ openEditFormAdress, closeEditFormAdress, rowData }) {
    const handleClose = () => {
        closeEditFormAdress();
    };
    //Mở thêm loại địa điểm
    const [isOpenType, setIsOpenType] = useState(false);

    const handleOpenType = () => {
        setIsOpenType(true);
    }

    const handleCloseType = () => {
        setIsOpenType(false);
    };
    //Đóng thêm loại địa điểm
    const validationSchema = Yup.object({
        locationName: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        contactPerson: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        phoneNumber: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
            .max(15, "Số điện thoại tối đa là 15 số"),
        mobileNumber: Yup
            .string()
            .required("Vui lòng nhập thông tin vào trường này")
            .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
            .max(15, "Số điện thoại tối đa là 15 số"),
        cityProvince: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        district: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        ward: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        type: Yup.string()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            locationName: rowData?.locationName || "",
            contactPerson: rowData?.contactPerson || "",
            phoneNumber: rowData?.phoneNumber || "",
            mobileNumber: rowData?.mobileNumber || "",
            cityProvince: rowData?.cityProvince || "",
            district: rowData?.district || "",
            ward: rowData?.ward || "",
            longitude: rowData?.longitude || "",
            latitude: rowData?.latitude || "",
            type: rowData?.type || "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                alert("thanh cong")
                const data = JSON.stringify(values);
                console.log(values)
                formik.resetForm();
                // return data;
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
            open={openEditFormAdress}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa địa điểm
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
                <Stack
                    spacing={3}
                >
                    <Box
                        sx={{
                            border: "1px solid rgb(224, 224, 224) !important",
                            padding: "2px 10px 15px 5px",
                        }}
                    >
                        <TextField
                            error={!!(formik.touched.locationName && formik.errors.locationName)}
                            helperText={formik.touched.locationName && formik.errors.locationName}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.locationName}
                            name="locationName"
                            required
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên địa điểm"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.contactPerson && formik.errors.contactPerson)}
                            helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.contactPerson}
                            name="contactPerson"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Người liên hệ"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            name="phoneNumber"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Số điện thoại bàn"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.mobileNumber && formik.errors.mobileNumber)}
                            helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.mobileNumber}
                            name="mobileNumber"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Số điện thoại di động"
                            fullWidth
                            variant="outlined"
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("cityProvince", newValue || "")}
                                    value={formik.values.cityProvince}
                                    name="cityProvince"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Hà Nội", "Vĩnh phúc", "Thái bình"]}
                                    renderInput={(params) => <TextField
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.cityProvince && formik.errors.cityProvince)}
                                        helperText={formik.touched.cityProvince && formik.errors.cityProvince}
                                        {...params} label="Tỉnh/ Thành phố" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onBlur={formik.handleBlur}
                                    onChange={(event, newValue) => formik.setFieldValue("district", newValue || "")}
                                    value={formik.values.district}
                                    name="district"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Thanh Xuân", "Đống Đa", "Hai Bà Trưng", "Vĩnh Tường"]}
                                    renderInput={(params) => <TextField
                                        error={!!(formik.touched.district && formik.errors.district)}
                                        helperText={formik.touched.district && formik.errors.district}
                                        {...params} label="Quận/ Huyện" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    onChange={(event, newValue) => formik.setFieldValue("ward", newValue || "")}
                                    value={formik.values.ward}
                                    name="ward"
                                    sx={{ marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={["", "Hoàng Liệt", "Láng Thượng", "Trung Hòa", "Tân Tiến"]}
                                    renderInput={(params) => <TextField
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.ward && formik.errors.ward)}
                                        helperText={formik.touched.ward && formik.errors.ward}
                                        {...params} label="Xã/ Phường" variant="outlined" />}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            error={!!(formik.touched.longitude && formik.errors.longitude)}
                            helperText={formik.touched.longitude && formik.errors.longitude}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.longitude}
                            name="longitude"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Kinh độ"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.latitude && formik.errors.latitude)}
                            helperText={formik.touched.latitude && formik.errors.latitude}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.latitude}
                            name="latitude"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Vĩ độ"
                            fullWidth
                            variant="outlined"
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                width: "100%"
                            }}
                        >
                            <Autocomplete
                                onChange={(event, newValue) => formik.setFieldValue("type", newValue || "")}
                                value={formik.values.type}
                                name="type"
                                sx={{ marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["", "Nhà Hàng", "Sân Bay", "Quán cafe", "Tân Tiến"]}
                                renderInput={(params) => <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.type && formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                    {...params} label="Loại" variant="outlined" />}
                            />

                            <Tooltip title="Thêm">
                                <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                                    onClick={handleOpenType}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Stack display="flex">
                            <Box marginLeft="auto">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    // onClick={closeAddress}
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
                </Stack>
            </DialogContent>
            <TypeAddress openType={isOpenType} closeType={handleCloseType} />
        </BootstrapDialog>
    );
}
