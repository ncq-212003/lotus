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

export default function EditFormProcess({ openEditFormProcess, closeEditFormProcess, rowData }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFile(fileUrl);
    };

    const colorOptions = [
        { label: 'Red', color: 'red' },
        { label: 'Blue', color: 'blue' },
        { label: 'Green', color: 'green' },
        { label: 'Yellow', color: 'Yellow' },
        { label: 'Orange', color: 'Orange' },
        { label: 'Purple', color: 'Purple' },
        // Thêm các đối tượng màu sắc khác tại đây
    ];

    const handleClose = () => {
        closeEditFormProcess();
    };

    const validationSchema = Yup.object({
        title: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        progress: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        color: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: rowData?.title || "",
            progress: rowData?.progress || "",
            color: rowData?.color || "",
            image: rowData?.image || "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                values.image = selectedFile;
                const data = JSON.stringify(values);
                alert("thanh ocng")
                console.log(data)
                handleClose();
                return data;
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
            open={openEditFormProcess}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa tiến trình
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
                        <TextField
                            error={!!(formik.touched.title && formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            name="title"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tiêu đề"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("progress", newValue || "")}
                            value={formik.values.progress}
                            name="progress"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "10%", "20%", "30%", "40%", "60%", "70%", "90%", "100%"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.progress && formik.errors.progress)}
                                helperText={formik.touched.progress && formik.errors.progress}
                                {...params} label="Tiến trình" variant="outlined" />}
                        />

                        <Autocomplete
                            id="color-select-demo"
                            fullWidth
                            sx={{ marginTop: "12px" }}
                            size="small"
                            options={colorOptions}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            value={colorOptions.find((option) => option.label === formik.values.color) || '12345'}
                            onChange={(event, value) => formik.setFieldValue('color', value ? value.label : '')}
                            renderOption={(props, option) => (
                                <Box
                                    component="li"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        '& > div': {
                                            display: 'flex',
                                            alignItems: 'center',
                                            mr: 2,
                                            flexShrink: 0,
                                        },
                                    }}
                                    {...props}
                                >
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            backgroundColor: option.color,
                                        }}
                                    />
                                    <span>{option.label}</span>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.color && formik.errors.color)}
                                    helperText={formik.touched.color && formik.errors.color}
                                    {...params}
                                    variant="outlined"
                                    label="Màu sắc"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "12px", fontSize: "14px" }}>
                                Ảnh icons
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "115px",
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
        </BootstrapDialog>
    );
}
