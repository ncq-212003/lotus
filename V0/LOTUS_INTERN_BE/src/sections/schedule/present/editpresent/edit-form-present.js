import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Stack,
    Button,
    Dialog,
    IconButton,
    styled,
    DialogTitle,
    DialogContent,
    Box,
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

export default function EditFormPresent({ openEditFormPresent, closeEditFormPresent, rowData }) {
    const handleClose = () => {
        closeEditFormPresent();
    };

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

    const validationSchema = Yup.object({
        gift_name: Yup
            .string()
            .required('Quà tặng không được để trống'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            gift_name: rowData?.gift_name || "",
            note: rowData?.note || "",
            submit: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                console.log(data);
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
            open={openEditFormPresent}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa quà tặng
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
                    <TextField
                        error={!!(formik.touched.gift_name && formik.errors.gift_name)}
                        helperText={formik.touched.gift_name && formik.errors.gift_name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.gift_name}
                        name="gift_name"
                        sx={{ marginTop: "12px" }}
                        size="small"
                        label="Tên quà tặng"
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
                        sx={{ marginTop: "12px" }}
                        size="small"
                        label="Ghi chú"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                    />
                    <Stack direction="column" spacing={1} mt={2}>
                        <Avatar
                            sx={{
                                width: "110px",
                                height: "140px",
                                marginLeft: "5px"
                            }}
                            variant="rounded"
                            src={selectedFile}
                        ></Avatar>
                        <Button
                            sx={{ width: "120px", padding: "5px 0px 5px 0px", fontSize: "12px" }}
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
                                    marginTop: "15px",
                                    backgroundColor: "#1C2536",
                                }}
                            >
                                Lưu
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </DialogContent>
        </BootstrapDialog>
    );
}
