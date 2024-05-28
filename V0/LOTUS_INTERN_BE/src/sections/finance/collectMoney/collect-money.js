import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  Checkbox,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from "next/router";
import { AddPartner } from "../add-partner";

export const CollectMoney = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const handleAddCollect = () => {
    router.push("/finance/revenue-expenditure/add");
  }
  // Open add partner
  const [openPartner, setOpenPartner] = useState(false);

  const handleOpen = () => {
    setOpenPartner(true);
  }
  const handleClose = () => {
    setOpenPartner(false);
  }
  // Close add partner
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const validationSchema = Yup.object({
    dateTime: Yup
      .string()
      .required('Ngày giờ không được để trống'),
    votes: Yup
      .number()
      .typeError('Số phiếu phải là một số')
      .integer('Số phiếu phải là số nguyên')
      .positive('Số phiếu phải là số nguyên dương')
      .required('Số phiếu không được để trống'),
    content: Yup
      .string()
      .required('Nội dung không được để trống'),
    collectCategories: Yup
      .string()
      .required('Hạng mục thu không được để trống'),
    account: Yup
      .string()
      .required('Tài khoản không được để trống'),
    money: Yup
      .number()
      .typeError('Số tiền phải là một số')
      .integer('Số tiền phải là số nguyên')
      .positive('Số tiền phải là số nguyên dương')
      .required('Số tiền không được để trống'),
    partner: Yup
      .string()
      .required('Đối tác không được để trống'),
    company: Yup
      .string()
      .required('Công ty không được để trống'),
    employeeName: Yup
      .string()
      .required('Nhân viên không được để trống'),
    payer: Yup
      .string()
      .required('Người nộp tiền không được để trống'),
    payerAddress: Yup
      .string()
      .required('Địa chỉ người nộp tiền không được để trống'),
    accompanyingDocument: Yup
      .string()
      .required('Chứng từ kèm theo không được để trống'),
  });

  const initialValues = {
    dateTime: Date.now(),
    votes: "",
    content: "",
    collectCategories: "",
    account: "",
    money: "",
    partner: "",
    company: "",
    employeeName: "",
    payer: "",
    payerAddress: "",
    accompanyingDocument: "",
    note: "",
    uploadfile: "",
    image: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        alert("Thành côcng")
        console.log(data);
        handleClose();
        return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <Stack spacing={2} sx={{ p: 2, marginTop: "5px" }}>
      {/* <Box
        sx={{
          border: "2px solid rgb(224, 224, 224) !important",
          padding: "10px 10px 15px 10px",
        }}
      > */}
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={12}> */}
        <Grid item xs={7}>
          <Box
            sx={{
              marginBottom: "16px",
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "4px"
            }}
          >
            <DateTimePicker
              error={!!(formik.touched.dateTime && formik.errors.dateTime)}
              helperText={formik.touched.dateTime && formik.errors.dateTime}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('dateTime', Date.parse(value));
              }}
              value={formik.values.dateTime}
              name="dateTime"
              sx={{ width: "100%", margin: "4px" }}
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined'
                }
              }}
              label="Ngày& Giờ"
              ampm={false} // Đặt ampm thành false để hiển thị giờ 24h
              format="dd/MM/yyyy HH:mm" // Định dạng để hiển thị ngày, tháng, năm, giờ và phút
            />

            <TextField
              error={!!(formik.touched.votes && formik.errors.votes)}
              helperText={formik.touched.votes && formik.errors.votes}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.votes}
              name="votes"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số phiếu"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.content && formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Nội dung"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center'
              }}
            >
              <Autocomplete
                onChange={(event, newValue) => formik.setFieldValue("collectCategories", newValue)}
                value={formik.values.collectCategories}
                name="collectCategories"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={["Cho thuê tài sản", "Hợp đồng thầu", "Hoa hồng"]}
                renderInput={(params) => <TextField
                  error={!!(formik.touched.collectCategories && formik.errors.collectCategories)}
                  helperText={formik.touched.collectCategories && formik.errors.collectCategories}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Hạng mục thu"
                  variant="outlined" />}
              />
              <Tooltip title="Thêm">
                <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                  onClick={handleAddCollect}
                // size="large"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("account", newValue)}
              value={formik.values.account}
              name="account"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={[
                "Vietcombank",
                "Agribank",
                "VietinBank",
                "Momo",
                "BIDV",
                "Tiền mặt"
              ]}
              renderInput={(params) => <TextField
                error={!!(formik.touched.account && formik.errors.account)}
                helperText={formik.touched.account && formik.errors.account}
                onBlur={formik.handleBlur}
                {...params}
                label="Tài khoản/ Quỹ"
                variant="outlined" />}
            />

            <TextField
              error={!!(formik.touched.money && formik.errors.money)}
              helperText={formik.touched.money && formik.errors.money}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.money}
              name="money"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Số tiền"
              fullWidth
              variant="outlined"
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center'
              }}
            >
              <Autocomplete
                onChange={(event, newValue) => formik.setFieldValue("partner", newValue)}
                value={formik.values.partner}
                name="partner"
                sx={{ margin: "4px", marginTop: "12px" }}
                fullWidth
                size="small"
                options={[
                  "Nhà cung cấp",
                  "Nhà phân phối",
                  "Đơn vị vận chuyển",
                  "Nhà đầu tư",
                  "Nhà thầu"
                ]}
                renderInput={(params) =>
                  <TextField
                    error={!!(formik.touched.partner && formik.errors.partner)}
                    helperText={formik.touched.partner && formik.errors.partner}
                    onBlur={formik.handleBlur}
                    {...params}
                    label="Thu tiền đối tác"
                    variant="outlined" />}
              />
              <Tooltip title="Thêm">
                <IconButton aria-label="add" style={{ color: "#000000", fontSize: "27px", marginTop: "10px" }}
                  onClick={handleOpen}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("company", newValue)}
              value={formik.values.company}
              name="company"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={[
                "Cty An Nghĩa",
                "Cty Bình An",
                "Cty An Trạch",
                "Cty Thành Công",
                "Cty Bình Dương"
              ]}
              renderInput={(params) =>
                <TextField
                  error={!!(formik.touched.company && formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Thu về công ty"
                  variant="outlined"
                />}
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("employeeName", newValue)}
              value={formik.values.employeeName}
              name="employeeName"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={[
                "Phạm Hoàng Minh",
                "Phan Tuấn Bình",
                "Hải Văn Can",
                "Giàng A Phò",
                "Trần Văn Bình"
              ]}
              renderInput={(params) =>
                <TextField
                  error={!!(formik.touched.employeeName && formik.errors.employeeName)}
                  helperText={formik.touched.employeeName && formik.errors.employeeName}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Tên nhân viên"
                  variant="outlined" />}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              marginBottom: "16px",
              bgcolor: "#fff",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "4px"
            }}
          >
            <TextField
              error={!!(formik.touched.payer && formik.errors.payer)}
              helperText={formik.touched.payer && formik.errors.payer}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payer}
              name="payer"
              sx={{ margin: "4px" }}
              size="small"
              label="Người nộp tiền"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.payerAddress && formik.errors.payerAddress)}
              helperText={formik.touched.payerAddress && formik.errors.payerAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payerAddress}
              name="payerAddress"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Địa chỉ người nộp tiền"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.accompanyingDocument && formik.errors.accompanyingDocument)}
              helperText={formik.touched.accompanyingDocument && formik.errors.accompanyingDocument}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.accompanyingDocument}
              name="accompanyingDocument"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Chứng từ kèm theo (Số hợp đồng/...)"
              fullWidth
              variant="outlined"
            />

            <TextField
              error={!!(formik.touched.note && formik.errors.note)}
              helperText={formik.touched.note && formik.errors.note}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.note}
              name="note"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
            sx={{
              backgroundColor: "#F8F8FF",
              margin: "0px 10px",
              color: "#000000",
              '&:hover': {
                backgroundColor: "#F8F8FF",
              },
            }}>
            Thêm file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Stack direction="column" spacing={1} mt={3}>
            <Avatar
              sx={{
                width: "110px",
                height: "130px",
                marginLeft: "10px"
              }}
              variant="rounded"
              src={selectedFile}
            ></Avatar>
            <Button
              sx={{ width: "130px", padding: "9px 0px 10px 0px ", fontSize: "13px" }}
              component="label"
            >
              Tải ảnh hóa đơn
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </Stack>
        </Grid>
        <Box marginLeft="auto">
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            sx={{
              marginTop: "30px",
              backgroundColor: "#1C2536",
              width: "150px",
            }}
          >
            Lưu
          </Button>
        </Box>
      </Grid>
      <AddPartner openAddPartner={openPartner} closeAddPartner={handleClose} />
    </Stack>
  );
};
