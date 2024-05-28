import React, { useState, useEffect } from "react";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Button,
    Typography,
    Slide,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { useFormik } from "formik";
import * as Yup from "yup";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertificateAdd({ open, onClose, selectedRow }) {
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);

    const validationSchema = Yup.object({
        machungchi: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        tenchungchi: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        tendvcap: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        logo: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        chuyennganh: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        machungchi: '',
        tenchungchi: '',
        tendvcap: '',
        logo: '',
        chuyennganh: '',
        mota: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            onClose();
        }
    })
    useEffect(() => {
        if (selectedRow) {
            formik.setValues({
                machungchi: selectedRow.machungchi || "",
                tenchungchi: selectedRow.tenchungchi || "",
                tendvcap: selectedRow.tendvcap || "",
                logo: selectedRow.logo || "",
                chuyennganh: selectedRow.chuyennganh || "",
                mota: selectedRow.mota || "",
            })
        }
    }, [selectedRow]);
    const handleClose = () => {
        onClose();
    };
    return (
        <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    sm={12}
                    md={12}
                    xs={12}
                >
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ marginBottom: "16px" }}
                        >
                            Thông tin cơ bản
                        </Typography>
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Mã chứng chỉ"
                            fullWidth
                            name="machungchi"
                            error={!!(formik.touched.machungchi && formik.errors.machungchi)}
                            helperText={formik.touched.machungchi && formik.errors.machungchi}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('machungchi', e.target.value)}
                            value={formik.values.machungchi}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên chứng chỉ"
                            fullWidth
                            name="tenchungchi"
                            error={!!(formik.touched.tenchungchi && formik.errors.tenchungchi)}
                            helperText={formik.touched.tenchungchi && formik.errors.tenchungchi}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tenchungchi', e.target.value)}
                            value={formik.values.tenchungchi}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên đơn vị cấp"
                            fullWidth
                            name="tendvcap"
                            error={!!(formik.touched.tendvcap && formik.errors.tendvcap)}
                            helperText={formik.touched.tendvcap && formik.errors.tendvcap}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tendvcap', e.target.value)}
                            value={formik.values.tendvcap}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Chuyên ngành"
                            fullWidth
                            name="chuyennganh"
                            error={!!(formik.touched.chuyennganh && formik.errors.chuyennganh)}
                            helperText={formik.touched.chuyennganh && formik.errors.chuyennganh}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('chuyennganh', e.target.value)}
                            value={formik.values.chuyennganh}
                        />
                        <Button size="small"
                            component="label"
                            fullWidth
                            sx={{ margin: "4px", marginTop: "14px",border:'1px solid #e5e7eb' }}>
                            {selectedFileLogo ? (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    {`Logo: ${selectedFileLogo.name}`}
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    Upload Logo
                                </>
                            )}
                            <VisuallyHiddenInput type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];

                                    if (file && file.type.startsWith('image/')) {
                                        setSelectedFileLogo(file);
                                        formik.setFieldValue('logo', file.name);
                                    } else {
                                        setSnackbarSeverity("warning");
                                        setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                                        setSnackbarOpen(true);
                                        setSelectedFileLogo(null);
                                    }
                                }}
                            />
                        </Button>
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Thông Tin Chi Tiết"
                            fullWidth
                            value={formik.values.mota}
                            onChange={(e) => { formik.setFieldValue('gioithieu', e.target.value) }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                width: '100%',
                                marginTop: '20px'
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1C2536',
                                    '&:hover': {
                                        backgroundColor: '#0c4da2',
                                    },
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}
