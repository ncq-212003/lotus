import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField, Autocomplete } from "@mui/material";
import MarketSelect from "./profession-market";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfessionEdit({ open, onClose, selectedRow }) {
    const [valueThitruong, setvalueThitruong] = useState(null);
    const validationSchema = Yup.object({
        manganhnghe: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        tennganhnghe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        linhvuc: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        thitruong: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    })

    const formik = useFormik({
        initialValues: {
            manganhnghe: '',
            tennganhnghe: '',
            linhvuc: '',
            thitruong: '',
            thongtinkhac: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            onClose();
        }
    })
    useEffect(() => {
        if (selectedRow) {
            console.log(selectedRow)
            formik.setValues({
                manganhnghe: selectedRow.manganhnghe || "",
                tennganhnghe: selectedRow.tennganhnghe || "",
                linhvuc: selectedRow.linhvuc || "",
                thitruong: selectedRow.thitruong || "",
                thongtinkhac: selectedRow.thongtinkhac || "",
            })
            setvalueThitruong(selectedRow.thitruong || null);
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
                                label="Mã Ngành Nghề"
                                name="manganhnghe"
                                value={formik.values.manganhnghe}
                                onChange={formik.handleChange}
                                error={formik.touched.manganhnghe && Boolean(formik.errors.manganhnghe)}
                                helperText={formik.touched.manganhnghe && formik.errors.manganhnghe}
                                fullWidth
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên Ngành Nghề"
                                name="tennganhnghe"
                                value={formik.values.tennganhnghe}
                                onChange={formik.handleChange}
                                error={formik.touched.tennganhnghe && Boolean(formik.errors.tennganhnghe)}
                                helperText={formik.touched.tennganhnghe && formik.errors.tennganhnghe}
                                fullWidth
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Lĩnh Vực"
                                name="linhvuc"
                                value={formik.values.linhvuc}
                                onChange={formik.handleChange}
                                error={formik.touched.linhvuc && Boolean(formik.errors.linhvuc)}
                                helperText={formik.touched.linhvuc && formik.errors.linhvuc}
                                fullWidth
                            />
                            <MarketSelect value={valueThitruong} onChange={(event, newValue) => setvalueThitruong(newValue === '' ? null : newValue)} />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Thông Tin Khác"
                                fullWidth
                                name="thongtinkhac"
                                value={formik.values.thongtinkhac}
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
                                    Lưu
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Dialog>
    );
}
