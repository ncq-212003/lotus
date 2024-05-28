import {
  Autocomplete,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DropzoneArea } from "mui-file-dropzone";

export const PaymentMoneyAdd = () => {
  const [showInternName, setShowInternName] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showAccountField, setShowAccountField] = useState(false);
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
      .string(),
    collectCategories: Yup
      .string()
      .required('Hạng mục chi không được để trống'),
    account: Yup
      .string()
      .required('Tài khoản không được để trống'),
    money: Yup
      .number()
      .typeError('Số tiền phải là một số')
      .integer('Số tiền phải là số nguyên')
      .positive('Số tiền phải là số nguyên dương')
      .required('Số tiền không được để trống'),
    internName: Yup
      .string()
      .required('Thực tập sinh không được để trống'),
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
    profileCode: '',
    internName: "",
    collectCategories: "",
    money: "",
    account: "",
    dateTime: Date.now(),
    content: "",
    votes: "",
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
        console.log(data);
        return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  const handlePaymentMethodChange = (event, newValue) => {
    setSelectedPaymentMethod(newValue);
    setShowAccountField(newValue !== "Tiền mặt");
  };

  //Display partner name
  useEffect(() => {
    if (formik.values.profileCode && internProfiles[formik.values.profileCode]) {
      const profile = internProfiles[formik.values.profileCode];
      formik.setFieldValue("internName", profile.internName);
      setShowInternName(true);
    } else {
      formik.setFieldValue("internName", "");
      setShowInternName(false);
    }
  }, [formik.values.profileCode]);

  //Chứng từ kèm theo
  const [files, setFiles] = useState([]);

  const handleChange = (files) => {
    setFiles(files);
  };

  useEffect(() => {
    const tagContentDrop = document.querySelector('.css-1gqpucm-MuiTypography-root');
    if (tagContentDrop) {
      tagContentDrop.textContent = "Kéo và thả tệp vào đây hoặc nhấp vào";
    }
  }, [])

  //InternProfile
  const internProfiles = {
    PRND000001: {
      internName: "Nguyễn Văn A"
    },
    PRND000002: {
      internName: "Nguyễn Văn B",
    },
  };
  const optionCategoies = ["Phí ăn ở", "Phí đào tạo", "Bảo hiểm y tế", "Chi phí hỗ trợ tư pháp"]
  const paymentMethods = ["Tiền mặt", "Chuyển khoản ngân hàng", "Thẻ tín dụng/Thẻ ghi nợ ", "Cổng thanh toán trực tuyến"]


  return (
    <Stack spacing={2} sx={{ p: 2, marginTop: "5px" }}>

      <Grid container spacing={2}>
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
              label="Mã số phiếu"
              fullWidth
              variant="outlined"
            />
            <TextField
              error={!!(formik.touched.profileCode && formik.errors.profileCode)}
              helperText={formik.touched.profileCode && formik.errors.profileCode}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.profileCode}
              name="profileCode"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Mã đối tác"
              fullWidth
              variant="outlined"
            />
            {showInternName &&
              <TextField
                error={!!(formik.touched.internName && formik.errors.internName)}
                helperText={formik.touched.internName && formik.errors.internName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.internName}
                name="internName"
                required
                sx={{ margin: "4px", marginTop: "12px" }}
                size="small"
                label="Tên thực tập sinh"
                fullWidth
                variant="outlined"
                // disabled
                InputProps={{ readOnly: true }}
              />
            }
            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("collectCategories", newValue)}
              value={formik.values.collectCategories}
              name="collectCategories"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={optionCategoies}
              renderInput={(params) => <TextField
                error={!!(formik.touched.collectCategories && formik.errors.collectCategories)}
                helperText={formik.touched.collectCategories && formik.errors.collectCategories}
                onBlur={formik.handleBlur}
                {...params}
                label="Hạng mục chi"
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
              label="Số tiền(VND)"
              fullWidth
              variant="outlined"
            />
            <Autocomplete
              onChange={handlePaymentMethodChange}
              value={selectedPaymentMethod}
              name="paymentMethod"
              fullWidth
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              options={paymentMethods}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hình thức thanh toán"
                  variant="outlined"
                />
              )}
            />
            {showAccountField && (
              <Autocomplete
                onChange={(event, newValue) => console.log(newValue)}  // Handle account change here
                value=""  // Provide the value you want to set for the account
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
                  // Add other accounts if needed
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tài khoản/Quỹ"
                    variant="outlined"
                  />
                )}
              />
            )}

            <DateTimePicker
              error={!!(formik.touched.dateTime && formik.errors.dateTime)}
              helperText={formik.touched.dateTime && formik.errors.dateTime}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('dateTime', Date.parse(value));
              }}
              value={formik.values.dateTime}
              name="dateTime"
              sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
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
            {/* <TextField
              error={!!(formik.touched.payer && formik.errors.payer)}
              helperText={formik.touched.payer && formik.errors.payer}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payer}
              name="payer"
              sx={{ margin: "4px" }}
              size="small"
              label="Người chi tiền"
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
              label="Địa chỉ người chi tiền"
              fullWidth
              variant="outlined"
            /> */}

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
            <Box
              sx={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                margin: "4px",
                marginTop: "12px",
                "& .css-1gqpucm-MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: "16px" }}
              >
                File chứng từ kèm theo
              </Typography>
              <Typography
                variant="span"
                component="span"
                sx={{ marginBottom: "16px" }}
              >
                Chọn nhiều file
              </Typography>
              <DropzoneArea
                onChange={handleChange}
              />
            </Box>

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
    </Stack>
  );
};