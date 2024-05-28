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
    Typography,
    FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import SnackbarAlert from "src/components/action-notification";
import { HANDLERS_CAR } from "src/contexts/reducer/schedule/reducer-car";
import { useApp } from "src/hooks/use-app";
import { updateCarApi, listCarApi } from "src/contexts/api/schedule/api-car";
import { listCompanyApi } from "src/contexts/api/company/api-company";
import { HANDLERS_COMPANY } from "src/contexts/reducer/company/reducer-company";

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

export default function EditCar({ openEditCar, closeEditCar, rowData }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [state, dispatch] = useApp();
    const { car, company } = state;
    const { cars } = car;
    const { companies } = company;

    // lấy dữ liệu từ id khi chỉnh sửa 
    const carEdit = Array.isArray(cars[0]) ? cars[0].find(ca => ca.carId == rowData?.id) : [];

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                formik.setFieldValue('hinhAnh', URL.createObjectURL(file));
                formik.setFieldError('hinhAnh', ''); // Xóa lỗi file
            } else {
                formik.setFieldError('hinhAnh', 'File đã chọn không phải là hình ảnh.');
            }
        }
    };

    const handleClose = () => {
        closeEditCar();
    };

    const validationSchema = Yup.object({
        tenCongTy: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        tenXe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        soGhe: Yup
            .number()
            .positive(' Vui lòng nhập một số lớn hơn 0')
            .typeError('Vui lòng nhập số vào trường này')
            .required('Vui lòng nhập thông tin vào trường này'),
        bienSoXe: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        nhanVienPhuTrach: Yup
            .string()
            .required('Vui lòng chọn thông tin vào trường này'),
        hinhAnh: Yup
            .mixed()
            .test('required', 'Vui lòng chọn một ảnh.', function (value) {
                return !!value;
            }),
    });
    const formik = useFormik({
        initialValues: {
            tenCongTy: "",
            tenXe: "",
            soGhe: "",
            bienSoXe: "",
            nhanVienPhuTrach: "",
            hinhAnh: "",
            submit: null
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    CarId: "1",
                    CompanyId: 1,
                    CompanyIdHidden: "1",
                    CarName: values.tenXe,
                    NumberSeats: values.soGhe,
                    CarNumber: values.bienSoXe,
                    NumberSeatsHidden: "1",
                    EmployeeIdMain: 2,
                    EmployeeIdMainHidden: "1",
                    Avatar: "1",
                    Description: "Lưu ý khi chọn",
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    Field4: "1",
                    Field5: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    CreatedAt: new Date().toISOString(),
                    CreatedBy: 1,
                    CreatedByHidden: "1",
                    LastModifedAt: new Date().toISOString(),
                    LastModifedByHidden: "1",
                    Flag: "1"
                }
                const response = await updateCarApi(formData);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Chỉnh sửa dữ liệu thành công !");
                    setSnackbarOpen(true);
                    formik.resetForm();

                    const list = await listCarApi();
                    dispatch({
                        type: HANDLERS_CAR.LIST_CAR,
                        payload: list.data,
                    });
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    })

    useEffect(() => {
        const fetchCarData = () => {
            try {
                formik.setValues({
                    tenCongTy: carEdit.companyId || "",
                    tenXe: carEdit.carName || "",
                    soGhe: carEdit.numberSeats || "",
                    bienSoXe: carEdit.carNumber || "",
                    nhanVienPhuTrach: carEdit.employeeIdMain || "",
                    hinhAnh: EditCar.avatar || ""
                })
            } catch (error) {
                console.error("Đã xảy ra lỗi . Vui lòng kiểm tra lại !!!", error);
            }
        }
        if (openEditCar && rowData) {
            fetchCarData();
        }
    }, [openEditCar, rowData])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listCompanyApi();
            dispatch({
                type: HANDLERS_COMPANY.LIST_COMPANY,
                payload: response.data
            })
        }
        fetchData()
    }, [])

    const companyWithSTT = Array.isArray(companies[0]) ? companies[0].map((company, index) => ({
        id: company.companyId,
        name: company.companyName
    })) : [];

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={openEditCar}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Chỉnh sửa Xe
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
                        {/* <Autocomplete
                            name="companies"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.companies && formik.errors.companies)}
                                helperText={formik.touched.companies && formik.errors.companies}
                                {...params} label="Thuộc công ty" variant="outlined" />}
                        /> */}

                        <Autocomplete
                            name="tenCongTy"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={companyWithSTT}
                            getOptionLabel={(option) => option.name}
                            getOptionSelected={(option, value) => option.id === value.id}
                            onChange={(event, newValue) => formik.setFieldValue('tenCongTy', newValue?.id || '')}
                            value={companyWithSTT.find(congTy => congTy.id === formik.values.tenCongTy) || null}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.tenCongTy && formik.errors.tenCongTy)}
                                    helperText={formik.touched.tenCongTy && formik.errors.tenCongTy}
                                    {...params}
                                    label="Thuộc công ty"
                                    variant="outlined"
                                />
                            )}
                        />

                        <TextField
                            error={!!(formik.touched.tenXe && formik.errors.tenXe)}
                            helperText={formik.touched.tenXe && formik.errors.tenXe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.tenXe}
                            name="tenXe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Xe"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            error={!!(formik.touched.soGhe && formik.errors.soGhe)}
                            helperText={formik.touched.soGhe && formik.errors.soGhe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soGhe}
                            name="soGhe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Số ghế"
                            fullWidth
                            variant="outlined"
                        />

                        {/* <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("licensePlate", newValue || "")}
                            value={formik.values.licensePlate}
                            name="licensePlate"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "30A-12345", "51B-67890", "92C-45678", "43H-98765"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.licensePlate && formik.errors.licensePlate)}
                                helperText={formik.touched.licensePlate && formik.errors.licensePlate}
                                {...params} label="Biển số xe" variant="outlined" />}
                        /> */}

                        <TextField
                            error={!!(formik.touched.bienSoXe && formik.errors.bienSoXe)}
                            helperText={formik.touched.bienSoXe && formik.errors.bienSoXe}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.bienSoXe}
                            name="bienSoXe"
                            sx={{ marginTop: "12px" }}
                            size="small"
                            label="Biển số xe"
                            fullWidth
                            variant="outlined"
                        />

                        <Autocomplete
                            onChange={(event, newValue) => formik.setFieldValue("mainSupervisor", newValue || "")}
                            value={formik.values.mainSupervisor}
                            name="mainSupervisor"
                            sx={{ marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={["", "Nguyễn Văn Thảo", "Phạm Danh Nam", "Nguyễn Công Quyết", "Phùng Văn Tiến"]}
                            renderInput={(params) => <TextField
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.mainSupervisor && formik.errors.mainSupervisor)}
                                helperText={formik.touched.mainSupervisor && formik.errors.mainSupervisor}
                                {...params} label="Phụ trách chính" variant="outlined" />}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography variant="b" component="b" sx={{ margin: "11px 29px", fontSize: "14px" }}>
                                Ảnh Xe
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    sx={{
                                        width: "110px",
                                        height: "135px",
                                    }}
                                    variant="rounded"
                                    src={formik.values.hinhAnh}
                                ></Avatar>
                            </Stack>
                            <Button size="small" component="label" sx={{ marginLeft: "14px" }}>
                                Tải ảnh lên
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <FormHelperText sx={{ color: 'red' }}>
                                {formik.touched.hinhAnh && formik.errors.hinhAnh}
                            </FormHelperText>
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

            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </BootstrapDialog>
    );
}
