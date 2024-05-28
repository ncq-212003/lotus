import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApp } from "src/hooks/use-app";
import styled from "@emotion/styled";
import SnackbarAlert from "src/components/action-notification";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";
import { EditMarket, ListMarket } from "src/contexts/api/setting/api-market";
import { HANDLERS_MARKET } from "src/contexts/reducer/setting/reducer-market";

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

export default function MarketEdit({ open, onClose, id }) {
  const [selectedFileLogo, setSelectedFileLogo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [state, dispatch] = useApp();
  const { market } = state;
  const { markets } = market;

  const dataEdit = Array.isArray(markets) ? markets.find(x => x.marketId == id) : [];
 console.log(dataEdit)
  const validationSchema = Yup.object({
    country: Yup.string().max(6).required('Vui lòng nhập thông tin vào trường này'),
    marketName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
  })


  const initialValues = {
    country: '',
    marketName: '',
    avatar: '',
    description: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          marketId: id,
          marketName: values.marketName,
          country: values.country,
          avatar: values.avatar,
          status: 'Test update',
          description: values.description,
          isVisible: "1",
          field1: "1",
          field2: "1",
          field3: "1",
          field4: "1",
          field5: "1",
          createdAt: new Date().toISOString(),
          createBy: "1",
          createByHidden: "1",
          lastModifedAt: new Date().toISOString(),
          lastModifedBy: "1",
          lastModifedByHidden: "1",
          flag: "A"
        };
        console.log(formData);

        const response = await EditMarket(formData);
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Sửa thành công !");
          setSnackbarOpen(true);

          // call api list after add success
          const res = await ListMarket();
          console.log(res);
          // dispatch list data
          dispatch({
            type: HANDLERS_MARKET.LIST_MARKET,
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (file && file.type.startsWith('image/')) {
        setSelectedFileLogo(file);
        formik.setFieldValue('avatar', file.name);
    } else {
        handleSnackbar("warning", "File không hợp lệ. Vui lòng chọn hình ảnh.");
    }
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          marketId: dataEdit.marketId || '',
          country: dataEdit.country || '',
          avatar: dataEdit.avatar || '',
          marketName: dataEdit.marketName || '',
          description: dataEdit.description || '',
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    // Gọi hàm lấy dữ liệu khi mở dialog và có ID
    if (open && id) {
      fetchCompanyData();
    }
  }, [open, id]);

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
                margin: '5px',
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
                            label="Mã Nước"
                            fullWidth
                            name="marketId"
                            error={!!(formik.touched.marketId && formik.errors.marketId)}
                            helperText={formik.touched.marketId && formik.errors.marketId}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('marketId', e.target.value)}
                            value={formik.values.marketId}
                        />
                        <TextField
                            required
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Tên Nước"
                            fullWidth
                            name="marketName"
                            error={!!(formik.touched.marketName && formik.errors.marketName)}
                            helperText={formik.touched.marketName && formik.errors.marketName}
                            onBlur={formik.handleBlur}
                            onChange={(e) => formik.setFieldValue('marketName', e.target.value)}
                            value={formik.values.marketName}
                        />
                        <Button size="small"
                            component="label"
                            fullWidth
                            name="avatar"
                            sx={{ margin: "4px", marginTop: "14px", border: '1px solid #e5e7eb' }}>
                            {selectedFileLogo ? (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    {`avatar: ${selectedFileLogo.name}`}
                                </>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ marginRight: 1 }} />
                                    Upload Avatar
                                </>
                            )}
                            <VisuallyHiddenInput type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            size="small"
                            variant="outlined"
                            label="Giới Thiệu Chi Tiết"
                            fullWidth
                            value={formik.values.description}
                            onChange={(e) => { formik.setFieldValue('description', e.target.value) }}
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
      <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Dialog>
  );
}
