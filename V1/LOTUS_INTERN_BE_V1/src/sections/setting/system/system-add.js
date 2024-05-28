import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from "@mui/material";
import styles from '../../../style/index.module.scss';
import { useFormik } from "formik";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SystemAdd() {
    const [valueGroup, setvalueGroup] = useState(null)

    const validationSchema = Yup.object({
        tencauhinh: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        alias: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        key: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        value:Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        group:Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        tencauhinh: '',
        alias: '',
        key: '',
        value:'',
        group:'',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = JSON.stringify(values);
                alert('Thêm thành công!');
                console.log(data);
                return data;
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });
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
                            label="Tên Cấu Hình"
                            fullWidth
                            name="tencauhinh"
                            error={!!(formik.touched.tencauhinh && formik.errors.tencauhinh)}
                            helperText={formik.touched.tencauhinh && formik.errors.tencauhinh}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('tencauhinh', e.target.value)}
                            value={formik.values.tencauhinh}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Alias"
                            fullWidth
                            name="alias"
                            error={!!(formik.touched.alias && formik.errors.alias)}
                            helperText={formik.touched.alias && formik.errors.alias}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('alias', e.target.value)}
                            value={formik.values.alias}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Key"
                            fullWidth
                            name="key"
                            error={!!(formik.touched.key && formik.errors.key)}
                            helperText={formik.touched.key && formik.errors.key}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('key', e.target.value)}
                            value={formik.values.key}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Value"
                            fullWidth
                            name="value"
                            error={!!(formik.touched.value && formik.errors.value)}
                            helperText={formik.touched.value && formik.errors.value}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('value', e.target.value)}
                            value={formik.values.value}
                        />
                        <Autocomplete
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={['Nhật Bản', 'Hàn Quốc', 'Việt Nam']}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Group"
                                    error={!!(formik.touched.group && formik.errors.group)}
                                    helperText={formik.touched.group && formik.errors.group}
                                />
                            )}
                            value={valueGroup}
                            onChange={(event, newValue) => {
                                formik.setFieldValue('group', newValue);
                                setvalueGroup(newValue);
                            }}
                        />
                        <Box 
                            sx={{
                                display:'flex',
                                justifyContent:'end',
                                width: '100%',
                                marginTop: '20px'
                            }}
                        >
                            <Button
                                variant="contained"
                                className={styles.btn}
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
