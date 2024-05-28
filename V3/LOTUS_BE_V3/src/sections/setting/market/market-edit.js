import React, { useState, useEffect } from "react";
import { useApp } from "src/hooks/use-app";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import SnackbarAlert from "src/components/action-notification";
import { SvgIcon, Stack, Box, Grid, TextField } from "@mui/material";
import { EditMarket, ListMarket } from "src/contexts/api/setting/api-market";
import { HANDLERS_MARKET } from "src/contexts/reducer/setting/reducer-market";
import { uploadSingleFile } from "src/contexts/api/upload-api";
import { getPathFromUrl } from "src/components/functions";
import {Avatar} from "@mui/material";
import { Add, CloudUpload } from "@mui/icons-material";

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

  const validationSchema = Yup.object({
    field1: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    marketName: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
    avatar: Yup.string().required('Vui lòng nhập thông tin vào trường này'),
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      try {
        const response = await uploadSingleFile("Market", file);

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Tải file lên thành công.");
          setSnackbarOpen(true);

          const imagePath = getPathFromUrl(response.data);

          setSelectedFileLogo(file);
          formik.setFieldValue('avatar', imagePath);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Thêm ảnh thất bại.");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setSnackbarSeverity("warning");
      setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
      setSnackbarOpen(true);
      setSelectedFileLogo(null);
    }
  };

  const initialValues = {
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
          marketId: dataEdit.marketId || '',
          marketName: values.marketName,
          avatar: values.avatar,
          status: "Đang hoạt động",
          description: values.description,
          field1: values.field1,
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
          flag: "D"
        };

        const response = await EditMarket(formData);

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Sửa thành công !");
          setSnackbarOpen(true);

          // call api list after add success
          const res = await ListMarket();

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

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Điền dữ liệu vào formik
        formik.setValues({
          field1: dataEdit.field1 || '',
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
      fetchMarketData();
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
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12}>
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
                name="field1"
                error={!!(formik.touched.field1 && formik.errors.field1)}
                helperText={formik.touched.field1 && formik.errors.field1}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue('field1', e.target.value)}
                value={formik.values.field1}
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
                sx={{ margin: "4px", marginTop: "14px" }}>
                {selectedFileLogo ? (
                  <>
                    <CloudUpload sx={{ marginRight: 1 }} />
                    {`Logo: ${selectedFileLogo.name}`}
                  </>
                ) : (
                  <>
                    <CloudUpload sx={{ marginRight: 1 }} />
                    Thay logo
                  </>
                )}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Avatar
                  src={'https://lotus.i.tisbase.online' + formik.values.avatar}
                  alt="Avatar"
                  sx={{ width: 40, height: 40, textAlign: 'center',marginLeft:'15px'}}
                >Avatar</Avatar>
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
