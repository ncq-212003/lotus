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
    Autocomplete,
    Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_AIRPORT } from "src/contexts/reducer/setting/reducer-airport";
import { updateAirPortApi, listAirPortApi } from "src/contexts/api/setting/api-airport";
import SnackbarAlert from "src/components/action-notification";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function EditAirport({ openEditAirport, closeEditFormAirport, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { airport } = state;
    const { airports } = airport;

    const airportEdit = Array.isArray(airports[0]) ? airports[0].find(air => air.airportId == id) : []

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        closeEditFormAirport();
    };

    const countries = [
        { code: 'VN', label: 'Việt Nam' },
        { code: 'KP', label: 'Hàn Quốc' },
        { code: 'JP', label: 'Nhật Bản' },
        { code: 'CN', label: 'China' },
        { code: 'TH', label: 'Thái Lan' },
    ]

    const validationSchema = Yup.object({
        tenNuoc: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        tenSanBay: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const formik = useFormik({
        initialValues: {
            tenNuoc: "",
            tenSanBay: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    AirportId: id,
                    AirportName: values.tenSanBay,
                    CountryCode: values.tenNuoc,
                    CityId: "1", // để mặc định là 1
                    CityIdHidden: "1",
                    Description: "Không vấn đề",
                    Field1: "1",
                    Field2: "2",
                    Field3: "3",
                    Field4: "4",
                    Field5: "5",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    LastModifiedByHidden: "1",
                    Flag: "1"
                }
                const response = await updateAirPortApi(formData);
                if (response.statusText === "OK") {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Chỉnh sửa dữ liệu thành công.");
                    setSnackbarOpen(true);
                    formik.resetForm();

                    const listData = await listAirPortApi();
                    dispatch({
                        type: HANDLERS_AIRPORT.LIST_AIRPORT,
                        payload: listData.data
                    })
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    useEffect(() => {
        const fetchAirportData = () => {
            try {
                formik.setValues({
                    tenNuoc: airportEdit.countryCode,
                    tenSanBay: airportEdit.airportName,
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (openEditAirport && id) {
            fetchAirportData();
        }
    }, [openEditAirport, id])

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditAirport}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa thông tin
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
                        <Autocomplete
                            id="country-select-demo"
                            sx={{ marginTop: "12px" }}
                            options={countries}
                            autoHighlight
                            fullWidth
                            size="small"
                            getOptionLabel={(option) => option.label}
                            value={countries.find((option) => option.code === formik.values.tenNuoc) || null}
                            onChange={(event, value) => formik.setFieldValue('tenNuoc', value ? value.code : '')}
                            renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading="lazy"
                                        width="20"
                                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                        alt=""
                                    />
                                    {option.label}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.tenNuoc && formik.errors.tenNuoc)}
                                    helperText={formik.touched.tenNuoc && formik.errors.tenNuoc}
                                    {...params}
                                    label="Tên nước"
                                    variant='outlined'
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password',
                                    }}
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenSanBay && formik.errors.tenSanBay)}
                            helperText={formik.touched.tenSanBay && formik.errors.tenSanBay}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenSanBay}
                            name="tenSanBay"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Tên sân bay"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
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
            </DialogContent>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </BootstrapDialog>
    );
}
