import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import { EditEducationLevel, ListEducationLevel } from "src/contexts/api/setting/api-educationlevel";
import { HANDLERS_EDUCATIONLEVEL } from "src/contexts/reducer/setting/reducer-educationlevel";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EducationLevelEdit({ open, onClose, id }) {
    const [parentNameOption, setParentNameOption] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { educationLevel } = state;
    const { educationlevels } = educationLevel;

    const dataEdit = Array.isArray(educationlevels) ? educationlevels.find(x => x.educationLevelId == id) : [];
    const validationSchema = Yup.object({
        code: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        name: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        code: '',
        name: '',
        description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    educationLevelId: id,
                    code: values.code,
                    name: values.name,
                    description: values.description,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: 1,
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: 1,
                    lastModifiedByHidden: "1",
                    flag: "A"
                }

                // console.log(formData);

                const response = await EditEducationLevel(formData);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await ListEducationLevel();
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_EDUCATIONLEVEL.LIST_EDUCATIONLEVEL,
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
    })

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // Điền dữ liệu vào formik
                formik.setValues({
                    code: dataEdit.code || "",
                    name: dataEdit.name || "",
                    description: dataEdit.description || "",
                })
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (open && id) {
            fetchCompanyData();
        }
    }, [open, id]);

    const handleClose = () => {
        onClose();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
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
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                                fullWidth
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên Trình Độ Văn Hóa"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                fullWidth
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Mô Tả Chi Tiết"
                                name="description"
                                fullWidth
                                value={formik.values.description}
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
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
    );
}
