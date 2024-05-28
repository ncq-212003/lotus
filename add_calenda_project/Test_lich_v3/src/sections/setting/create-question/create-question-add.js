import { XCircleIcon } from "@heroicons/react/24/solid";
import { Add } from "@mui/icons-material";
import {
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  SvgIcon,
  Link,
  Tooltip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CreateQuestionAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isOptionSelect, setIsOptionSelect] = useState(false);

  const handleOpenModal = (params) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

const handleAdd = () => {
  setIsModalOpen(false);
};

  const formik = useFormik({
    initialValues: {
      questionName: "",
      type: "1",
      category: "",
      order: "",
      options: [],
      position: "Thực tập sinh",
      required: "Có",
      description: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      departmentId: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
      deskPhone: Yup.string()
        .matches(/^[0-9]+$/, "Vui lòng nhập số điện thoại")
        .max(15, "Số điện thoại tối đa là 15 số"),
      mainPersonInCharge: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(data);
        setSnackbarSeverity("success");
        setSnackbarMessage("Thêm thành công !");
        setSnackbarOpen(true);
      } catch (err) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Thêm thất bại !");
        setSnackbarOpen(true);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    formik.handleChange(event);

    setIsOptionSelect(selectedType === "2");
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={3}
          sx={{
            margin: "38px 0",
          }}
        >
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item sm={12} xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.order && formik.errors.order)}
                  helperText={formik.touched.order && formik.errors.order}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.order}
                  name="order"
                  required
                  fullWidth
                  label="Thứ tự câu hỏi "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <TextField
                  error={!!(formik.touched.questionName && formik.errors.questionName)}
                  helperText={formik.touched.questionName && formik.errors.questionName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.questionName}
                  name="questionName"
                  required
                  fullWidth
                  label="Tên câu hỏi "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <Box sx={{ margin: "4px", marginTop: "12px", marginLeft: "10px" }}>
                  <FormLabel>Kiểu câu hỏi</FormLabel>
                  <RadioGroup
                    row
                    name="type"
                    value={formik.values.type}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel value="1" control={<Radio size="small" />} label="Tự luận" />
                    <FormControlLabel value="2" control={<Radio size="small" />} label="Lựa chọn" />
                    <FormControlLabel value="3" control={<Radio size="small" />} label="Ngày giờ" />
                  </RadioGroup>
                </Box>
                {isOptionSelect && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      error={!!(formik.touched.options && formik.errors.options)}
                      helperText={formik.touched.options && formik.errors.options}
                      onBlur={formik.handleBlur}
                      onChange={(event, newValue) => formik.setFieldValue("options", newValue)}
                      value={formik.values.options}
                      name="options"
                      sx={{ margin: "4px", marginTop: "12px" }}
                      fullWidth
                      size="small"
                      options={[]}
                      renderInput={(params) => (
                        <TextField {...params} label="Lựa chọn câu trả lời" variant="outlined" />
                      )}
                    />
                    <Tooltip title="Thêm">
                      <IconButton onClick={handleOpenModal}>
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Grid>

              <Grid item sm={12} xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.position && formik.errors.position)}
                  helperText={formik.touched.position && formik.errors.position}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.position}
                  name="position"
                  required
                  fullWidth
                  label="Vị trí câu hỏi"
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
                <Autocomplete
                  error={!!(formik.touched.category && formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                  onBlur={formik.handleBlur}
                  onChange={(event, newValue) => formik.setFieldValue("category", newValue)}
                  value={formik.values.category}
                  name="category"
                  sx={{ margin: "4px", marginTop: "12px" }}
                  size="small"
                  fullWidth
                  disablePortal
                  options={[]}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} label="Nhóm câu hỏi" />
                  )}
                />
                <Box sx={{ margin: "4px", marginTop: "12px", marginLeft: "10px" }}>
                  <FormLabel>Câu hỏi bắt buộc</FormLabel>
                  <RadioGroup
                    row
                    name="required"
                    value={formik.values.required}
                    onChange={(event) => handleChange(event, "required")}
                  >
                    <FormControlLabel value="Có" control={<Radio size="small" />} label="Có" />
                    <FormControlLabel
                      value="Không"
                      control={<Radio size="small" />}
                      label="Không"
                    />
                  </RadioGroup>
                </Box>
                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  fullWidth
                  label="Mô tả "
                  variant="outlined"
                  size="small"
                  sx={{ margin: "4px", marginTop: "12px" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1C2536",
                }}
                type="submit"
              >
                Thêm
              </Button>
            </Box>
          </Box>
        </Stack>
        <BootstrapDialog onClose={closeModal} open={isModalOpen} fullWidth>
          <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1C2536", color: "white" }}>
            Thêm lựa chọn trả lời
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
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
            <Stack sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Câu trả lời"
                variant="outlined"
                sx={{ margin: "4px", marginTop: "12px" }}
              />
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: "#e3e6e6",
            }}
          >
            <Button
              autoFocus
              onClick={handleAdd}
              variant="contained"
              sx={{ background: "#1C2536" }}
            >
              Thêm
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </>
  );
}
