import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import styles from '../../../style/index.module.scss';
import { useFormik } from "formik";
import * as Yup from "yup";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField, Autocomplete } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SystemEdit({ open, onClose, selectedRow }) {
    const [valueGroup, setvalueGroup] = useState(null);
    const validationSchema = Yup.object({
        tencauhinh: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
        alias: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        key: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        value: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
        group: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    })

    const formik = useFormik({
        initialValues: {
            tencauhinh: '',
            alias: '',
            key: '',
            value: '',
            group: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            onClose();
        }
    })
    useEffect(() => {
        if (selectedRow) {
            formik.setValues({
                tencauhinh: selectedRow.tencauhinh || "",
                alias: selectedRow.alias || "",
                key: selectedRow.key || "",
                value: selectedRow.value || "",
                group: selectedRow.group || "",
            })
            setvalueGroup(selectedRow.group || null);
        }
    }, [selectedRow]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <Stack sx={{ p: 2, marginTop: "20px" }}>
                <Typography sx={{ marginBottom: '20px' }} variant="h6" component="div">
                    SỬA THÔNG TIN
                </Typography>
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
                                value={formik.values.tencauhinh}
                                onChange={formik.handleChange}
                                error={formik.touched.tencauhinh && Boolean(formik.errors.tencauhinh)}
                                helperText={formik.touched.tencauhinh && formik.errors.tencauhinh}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Alias"
                                fullWidth
                                name="alias"
                                value={formik.values.alias}
                                onChange={formik.handleChange}
                                error={formik.touched.alias && Boolean(formik.errors.alias)}
                                helperText={formik.touched.alias && formik.errors.alias}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Key"
                                fullWidth
                                name="key"
                                value={formik.values.key}
                                onChange={formik.handleChange}
                                error={formik.touched.key && Boolean(formik.errors.key)}
                                helperText={formik.touched.key && formik.errors.key}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Value"
                                fullWidth
                                name="value"
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                error={formik.touched.value && Boolean(formik.errors.value)}
                                helperText={formik.touched.value && formik.errors.value}
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
                                    display: 'flex',
                                    justifyContent: 'end',
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
        </Dialog>
    );
}
