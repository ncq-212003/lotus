import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stack, Box, Grid, TextField } from "@mui/material";
import SnackbarAlert from "src/components/action-notification";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_PROFESSION } from "src/contexts/reducer/setting/reducer-profession";
import { EditProfession, ListProfession } from "src/contexts/api/setting/api-profession";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfessionEdit({ open, onClose, id }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [state, dispatch] = useApp();
    const { profession } = state;
    const { professions } = profession;

    const dataEdit = Array.isArray(professions) ? professions.find(x => x.jobId == id) : [];

    const validationSchema = Yup.object({
        code: Yup
            .string()
            .max(6)
            .required('Vui lòng nhập thông tin vào trường này'),
        jobName: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
        fieldMarket: Yup
            .string()
            .required('Vui lòng nhập thông tin vào trường này'),
    });

    const initialValues = {
        code: '',
        jobName: '',
        fieldMarket: '',
        description: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    jobId: id,
                    marketId: "1         ",
                    jobName: values.jobName,
                    code: values.code,
                    fieldMarket: values.fieldMarket,
                    description: values.description,
                    field1: "1",
                    field2: "1",
                    field3: "1",
                    field4: "1",
                    field5: "1",
                    timeStamp: Math.floor(new Date().getTime() / 1000),
                    createdAt: new Date().toISOString(),
                    createdBy: "1",
                    createdByHidden: "1",
                    lastModifiedAt: new Date().toISOString(),
                    lastModifiedBy: "1",
                    lastModifiedByHidden: "1",
                    flag: "E"
                };
                // console.log(formData);

                const response = await EditProfession(formData);
                if (response.status === 200) {
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Sửa thành công !");
                    setSnackbarOpen(true);

                    // call api list after add success
                    const res = await ListProfession();
                    console.log(res);
                    // dispatch list data
                    dispatch({
                        type: HANDLERS_PROFESSION.LIST_PROFESSION,
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
                    jobId: dataEdit.jobId || '',
                    code: dataEdit.code || '',
                    jobName: dataEdit.jobName || '',
                    fieldMarket: dataEdit.fieldMarket || '',
                    description: dataEdit.description || '',
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
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <Stack sx={{ p: 2, marginTop: "20px" }}>
        <Typography sx={{ marginBottom: "20px" }} variant="h6" component="div">
          SỬA THÔNG TIN
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                Thông tin cơ bản
              </Typography>
              <TextField
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Mã Ngành Nghề"
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
                label="Tên Ngành Nghề"
                name="jobName"
                value={formik.values.jobName}
                onChange={formik.handleChange}
                error={formik.touched.jobName && Boolean(formik.errors.jobName)}
                helperText={formik.touched.jobName && formik.errors.jobName}
                fullWidth
              />
              <TextField
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Lĩnh Vực"
                name="fieldMarket"
                value={formik.values.fieldMarket}
                onChange={formik.handleChange}
                error={formik.touched.fieldMarket && Boolean(formik.errors.fieldMarket)}
                helperText={formik.touched.fieldMarket && formik.errors.fieldMarket}
                fullWidth
              />
              <TextField
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                variant="outlined"
                label="Thông Tin Khác"
                fullWidth
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1C2536",
                  }}
                  onClick={formik.handleSubmit}
                >
                  Lưu
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <SnackbarAlert open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
      </Stack>
    </Dialog>
  );
}
