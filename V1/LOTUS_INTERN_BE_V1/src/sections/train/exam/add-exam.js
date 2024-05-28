import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Box, Typography } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const syndication = [
  { id: 1, title: "Nghiệp đoàn 1" },
  { id: 2, title: "Nghiệp đoàn 2" },
  { id: 3, title: "Nghiệp đoàn 3" },
  { id: 4, title: "Nghiệp đoàn 4" },
];
const career = [
  { id: 1, title: "Y Tế" },
  { id: 2, title: "Xây dựng và công trình" },
  { id: 3, title: "Công nghiệp chế biến" },
  { id: 4, title: "Dịch vụ khách sạn và nhà hàng" },
  { id: 5, title: "Nông nghiệp" },
];
export const AddExam = (props) => {
  const [examDuration, setExamDuration] = useState(""); // State để lưu thời gian thi (số phút)
  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectAll = () => {
    const isAllSelected = selectedValues.some((value) => value.title === "Tất cả");

    if (isAllSelected) {
      setSelectedValues([]);
    } else {
      setSelectedValues(career);
    }
  };

  const validationSchema = Yup.object({
    documentNumber: Yup
      .string()
      .required('Số tài liệu không được để trống'),
    union: Yup
      .array()
      .required('Nghiệp đoàn không được để trống'),
    examName: Yup
      .string()
      .required('Tên bài thi không được để trống'),
    industry: Yup
      .array()
      .required('Ngành nghề không được để trống'),
    examTime: Yup
      .number()
      .typeError('Thời gian thi phải là một số')
      .integer('Thời gian thi phải là số nguyên')
      .positive('Thời gian thi phải là số nguyên dương')
      .required('Thời gian thi không được để trống'),
    examType: Yup
      .string()
      .required('Loại bài thi không được để trống'),
    examStatus: Yup
      .string()
      .required('Trạng thái bài thi không được để trống'),
  });

  const initialValues = {
    documentNumber: "",
    union: [],
    examName: "",
    industry: [], //ngành nghề
    note: "",
    examTime: "",
    examType: "",
    examStatus: "",
    submit: null
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const data = JSON.stringify(values);
        console.log(data);
        alert("thanh")
        return data;
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <>
      <Stack
        spacing={3}
        sx={{
          margin: "30px 0px",
        }}
      >
        <Box
          sx={{
            border: "1px solid rgb(224, 224, 224) !important",
            padding: "10px 10px 15px 10px",
          }}
        >
          <Grid container>
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "10px" }}
            >
              Thông tin cơ bản
            </Typography>
            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("documentNumber", newValue)}
              value={formik.values.documentNumber}
              name="documentNumber"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["LotusBT01", "LotusBT02", "LotusBT03", "LotusBT04", "LotusBT05"]}
              renderInput={(params) => <TextField
                error={!!(formik.touched.documentNumber && formik.errors.documentNumber)}
                helperText={formik.touched.documentNumber && formik.errors.documentNumber}
                onBlur={formik.handleBlur}
                {...params}
                label="Số tài liệu"
                variant="outlined" />}
            />

            <Autocomplete
              onChange={(event, newValues) => {
                const selectedTitles = newValues.map((value) => value.title);
                formik.setFieldValue("union", selectedTitles);
              }}
              name="union"
              sx={{ margin: "4px", marginTop: "12px" }}
              multiple
              id="checkboxes-tags-demo"
              fullWidth
              size="small"
              options={Array.isArray(syndication) ? syndication : []}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  error={!!(formik.touched.union && formik.errors.union)}
                  helperText={formik.touched.union && formik.errors.union}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Nghiệp đoàn"
                  variant="outlined"
                />
              )}
            />

            <TextField
              error={!!(formik.touched.examName && formik.errors.examName)}
              helperText={formik.touched.examName && formik.errors.examName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.examName}
              name="examName"
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên bài thi"
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValues) => {
                const selectedTitles = newValues.map((value) => value.title);
                formik.setFieldValue("industry", selectedTitles);
              }}
              name="industry"
              sx={{ margin: "4px", marginTop: "12px" }}
              multiple
              id="checkboxes-tags-demo"
              fullWidth
              size="small"
              options={Array.isArray(career) ? career : []}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  error={!!(formik.touched.industry && formik.errors.industry)}
                  helperText={formik.touched.industry && formik.errors.industry}
                  onBlur={formik.handleBlur}
                  {...params}
                  label="Ngành nghề"
                  variant="outlined"
                />
              )}
            />

            <TextField
              error={!!(formik.touched.examTime && formik.errors.examTime)}
              helperText={formik.touched.examTime && formik.errors.examTime}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.examTime}
              name="examTime"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Thời gian thi(phút)"
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("examType", newValue)}
              value={formik.values.examType}
              name="examType"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Trắc nghiệm", "Tự luận"]}
              renderInput={(params) => <TextField
                error={!!(formik.touched.examType && formik.errors.examType)}
                helperText={formik.touched.examType && formik.errors.examType}
                onBlur={formik.handleBlur}
                {...params}
                label="Loại bài thi"
                variant="outlined" />}
            />

            <Autocomplete
              onChange={(event, newValue) => formik.setFieldValue("examStatus", newValue)}
              value={formik.values.examStatus}
              name="examStatus"
              sx={{ margin: "4px", marginTop: "12px" }}
              fullWidth
              size="small"
              options={["Chưa Bắt Đầu", "Đang Diễn Ra", "Đã Kết Thúc"]}
              renderInput={(params) => <TextField
                error={!!(formik.touched.examStatus && formik.errors.examStatus)}
                helperText={formik.touched.examStatus && formik.errors.examStatus}
                onBlur={formik.handleBlur}
                {...params}
                label="Trạng thái bài thi"
                variant="outlined" />}
            />

            <TextField
              error={!!(formik.touched.ghichu && formik.errors.ghichu)}
              helperText={formik.touched.ghichu && formik.errors.ghichu}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ghichu}
              name="ghichu"
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Stack display="flex">
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
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
