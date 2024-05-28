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

export default function EditFormProcess({ openEditFormProcess, closeEditFormProcess, rowData }) {
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
        closeEditFormProcess();
    };

    const validationSchema = Yup.object({
        title: Yup
            .string()
            .required('Tiêu đề không được để trống'),
        progress: Yup
            .string()
            .required('Tiến trình không được để trống'),
        color: Yup
            .string()
            .required('Màu sắc không được để trống'),
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
        // validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
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
            maxWidth="md"
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
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
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
                                onChange={(event, newValue) => formik.setFieldValue("color", newValue || "")}
                                value={formik.values.color}
                                name="color"
                                sx={{ marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={["", "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Brown", "Pink"]}
                                renderInput={(params) => <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.color && formik.errors.color)}
                                    helperText={formik.touched.color && formik.errors.color}
                                    {...params} label="Màu sắc" variant="outlined" />}
                            />
                            <Stack direction="column" spacing={1} mt={2}>
                                <Avatar
                                    sx={{
                                        width: "110px",
                                        height: "140px",
                                        marginLeft: "3px"
                                    }}
                                    variant="rounded"
                                    src={selectedFile}
                                ></Avatar>
                                <Button
                                    sx={{ width: "100px", padding: "5px 10px 5px 0px " }}
                                    component="label"
                                >
                                    Tải icons
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
                                            marginTop: "15px",
                                            backgroundColor: "#1C2536",
                                            // width: "150px",
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
}
