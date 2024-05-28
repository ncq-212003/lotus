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
    Typography,
    Grid,
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

export default function EditFormPresent({ openEditFormPresent, closeEditFormPresent, rowData }) {
    const handleClose = () => {
        closeEditFormPresent();
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFile(fileUrl);
    };

    const validationSchema = Yup.object({
        gift_name: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            gift_name: rowData?.gift_name || "",
            note: rowData?.note || "",
            linkImage: "",
            submit: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                values.linkImage = selectedFile;
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
    });

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
                <Box sx={{ typography: "body1" }}>
                    <Grid container>
                        <TextField
                            error={!!(formik.touched.gift_name && formik.errors.gift_name)}
                            helperText={formik.touched.gift_name && formik.errors.gift_name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.gift_name}
                            name="gift_name"
                            sx={{ margin: "4px", marginTop: "12px" }}
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
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            label="Ghi chú"
                            multiline
                            rows={2}
                            fullWidth
                            variant="outlined"
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "12px", fontSize: "14px" }}>
                                Ảnh quà tặng
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
        </BootstrapDialog>
    );
};