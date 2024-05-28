import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Slide
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { listEthnicApi, updateEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EthnicEdit({ open, onClose, id }) {
    // state
    const [parentNameOption, setParentNameOption] = useState([]);
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // context
    const [state, dispatch] = useApp();
    const { ethnic } = state;
    const { ethnics } = ethnic;

    const dataEdit = Array.isArray(ethnics) ? ethnics.find(x => x.ethnicId == id) : [];

    const validationSchema = Yup.object({
        nameEthnicity: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        codeEthnicity: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
        description: Yup.string().required("Vui lòng nhập thông tin vào trường này."),
    });

    const initialValues = {
        nameEthnicity: "",
        codeEthnicity: "",
        description: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    LastModifiedByHidden: "1",
                    MarketIdHidden: "1",
                    CreatedByHidden: "1",
                    EthnicId: id,
                    Flag: "1",
                    Code: values.codeEthnicity.trim(),
                    LastModifiedAt: new Date().toISOString(),
                    LastModifiedBy: "1",
                    TimeStamp: Math.floor(new Date().getTime() / 1000),
                    MarketId: "1",
                    Field1: "1",
                    Field2: "1",
                    Field3: "1",
                    EthnicName: values.nameEthnicity.trim(),
                    Field4: "1",
                    CreatedAt: dataEdit.createdAt,
                    Field5: "1",
                    Description: values.description.trim(),
                    CreatedBy: "1",
                };                

                // console.log(formData);

                const response = await updateEthnicApi(formData);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await listEthnicApi();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_ETHNIC.LIST_ETHNIC,
                        payload: res.data,
                    });
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Có lỗi xảy ra !");
                    setSnackbarOpen(true);
                }
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    const handleClose = () => {
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    nameEthnicity: dataEdit.ethnicName || "",
                    codeEthnicity: dataEdit.code || "",
                    description: dataEdit.description || "",
                });
            } catch (error) {
                console.error("Error fetching company data:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        // Gọi hàm lấy dữ liệu khi mở dialog và có ID
        if (open && id) {
            fetchCompanyData();
        }
    }, [open, id]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            PaperProps={{ sx: { backgroundColor: "#eae7e7" } }}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: '#1C2536' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button
                        autoFocus
                        color="inherit"
                        onClick={formik.submitForm}
                    >
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} xs={12}>
                            <Box
                                sx={{
                                    bgcolor: "#f5f5f5",
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
                                    Thông tin
                                </Typography>
                                <TextField
                                    error={!!(formik.touched.nameEthnicity && formik.errors.nameEthnicity)}
                                    helperText={formik.touched.nameEthnicity && formik.errors.nameEthnicity}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    value={formik.values.nameEthnicity}
                                    name="nameEthnicity"
                                    variant="outlined"
                                    required
                                    size="small"
                                    label="Dân tộc"
                                    fullWidth
                                />
                                <TextField
                                    error={!!(formik.touched.codeEthnicity && formik.errors.codeEthnicity)}
                                    helperText={formik.touched.codeEthnicity && formik.errors.codeEthnicity}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    value={formik.values.codeEthnicity}
                                    name="codeEthnicity"
                                    variant="outlined"
                                    required
                                    size="small"
                                    label="Mã ( phân biệt )"
                                    fullWidth
                                />
                                <TextField
                                    error={!!(formik.touched.description && formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    value={formik.values.description}
                                    name="description"
                                    variant="outlined"
                                    size="small"
                                    label="Ghi chú"
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
    );
}
