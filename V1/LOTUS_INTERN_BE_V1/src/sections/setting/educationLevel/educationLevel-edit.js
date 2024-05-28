import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationLevelEdit({ open, onClose, selectedRow }) {
    const validationSchema = Yup.object({
        matrinhdo: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        tentrinhdo: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    })

    const formik = useFormik({
        initialValues: {
            matrinhdo: '',
            tentrinhdo: '',
            motachitiet: '',
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
                matrinhdo: selectedRow.matrinhdo || "",
                tentrinhdo: selectedRow.tentrinhdo || "",
                motachitiet: selectedRow.motachitiet || "",
            })
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
                                label="Mã Trình Độ Văn Hóa"
                                name="matrinhdo"
                                value={formik.values.matrinhdo}
                                onChange={formik.handleChange}
                                error={formik.touched.matrinhdo && Boolean(formik.errors.matrinhdo)}
                                helperText={formik.touched.matrinhdo && formik.errors.matrinhdo}
                                fullWidth
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên Trình Độ Văn Hóa"
                                name="tentrinhdo"
                                value={formik.values.tentrinhdo}
                                onChange={formik.handleChange}
                                error={formik.touched.tentrinhdo && Boolean(formik.errors.tentrinhdo)}
                                helperText={formik.touched.tentrinhdo && formik.errors.tentrinhdo}
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Mô Tả Chi Tiết"
                                name="motachitiet"
                                fullWidth
                                value={formik.values.motachitiet}
                                onChange={formik.handleChange}
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
        </Dialog>
    );
}
