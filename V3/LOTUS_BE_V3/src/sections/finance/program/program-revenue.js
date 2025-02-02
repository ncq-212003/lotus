import { Add, FilterList } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function ProgramRevenue() {
    const [revenues, setRevenues] = useState([]);

    const categories = [
        { id: "1", name: "Tiền ăn" },
        { id: "2", name: "Tiền học tập" },
        { id: "3", name: "Tiền hợp đồng" },
    ];

    const applicationTimes = [
        { id: "1", name: "Ngày nhập học" },
        { id: "2", name: "Ngày trúng tuyển" },
    ];

    const validationSchema = Yup.object().shape({
        hangMucThu: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        soTien: Yup.number().required("Vui lòng nhập thông tin vào trường này").positive("Số tiền phải là số dương"),
        thoiDiemApDung: Yup.string().required("Vui lòng nhập thông tin vào trường này"),
        soNgayDenHan: Yup.number().required("Vui lòng nhập thông tin vào trường này").positive("Số ngày đến hạn phải là số dương"),
        ghiChu: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            hangMucThu: "",
            soTien: "",
            thoiDiemApDung: "",
            soNgayDenHan: "",
            ghiChu: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setRevenues((prevRevenues) => [...prevRevenues, values]);
            formik.resetForm();
        },
    });

    const getCategoryName = (categoryId) => {
        const selectedCategory = categories.find((cat) => cat.id === categoryId);
        return selectedCategory ? selectedCategory.name : "";
    };

    const getApplicationTimeName = (id) => {
        const selectedApplicationTime = applicationTimes.find((at) => at.id === id);
        return selectedApplicationTime ? selectedApplicationTime.name : "";
    };


    return (
        <Box
            sx={{
                marginBottom: "16px",
                bgcolor: "#fff",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}
        >
            <Typography variant="h6" component="h2" sx={{ margin: "20px 16px 10px 16px" }}>
                Mục thu
            </Typography>

            <FormControl size="small" sx={{ marginTop: "12px" }} fullWidth>
                <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    value={categories.find((cat) => cat.id === formik.values.hangMucThu)}
                    onChange={(e, value) => formik.setFieldValue("hangMucThu", value?.id || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={formik.touched.hangMucThu && Boolean(formik.errors.hangMucThu)}
                            helperText={formik.touched.hangMucThu && formik.errors.hangMucThu}
                            size="small"
                            fullWidth
                            variant="outlined"
                            label="Hạng mục thu"
                        />
                    )}
                />
            </FormControl>

            <TextField
                required
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số tiền  "
                fullWidth
                value={formik.values.soTien}
                variant="outlined"
                onChange={(e) => formik.setFieldValue("soTien", e.target.value)}
                error={formik.touched.soTien && Boolean(formik.errors.soTien)}
                helperText={formik.touched.soTien && formik.errors.soTien}
            />

            <FormControl sx={{ marginTop: "12px" }} size="small" fullWidth>
                <InputLabel id="condition-select-label">Thời điểm áp dụng từ ngày</InputLabel>
                <Autocomplete
                    options={applicationTimes}
                    getOptionLabel={(option) => option.name}
                    value={applicationTimes.find((at) => at.id === formik.values.thoiDiemApDung)}
                    onChange={(e, value) => formik.setFieldValue("thoiDiemApDung", value?.id || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={formik.touched.thoiDiemApDung && Boolean(formik.errors.thoiDiemApDung)}
                            helperText={formik.touched.thoiDiemApDung && formik.errors.thoiDiemApDung}
                            size="small"
                            fullWidth
                            variant="outlined"
                        />
                    )}
                />
            </FormControl>

            <TextField
                required
                sx={{ marginTop: "12px" }}
                size="small"
                label="Số ngày đến hạn"
                fullWidth
                value={formik.values.soNgayDenHan}
                variant="outlined"
                onChange={(e) => formik.setFieldValue("soNgayDenHan", e.target.value)}
                error={formik.touched.soNgayDenHan && Boolean(formik.errors.soNgayDenHan)}
                helperText={formik.touched.soNgayDenHan && formik.errors.soNgayDenHan}
            />

            <TextField
                fullWidth
                label="Ghi chú"
                size="small"
                multiline
                rows={2}
                sx={{ marginTop: "12px" }}
                variant="outlined"
                value={formik.values.ghiChu}
                onChange={(e) => formik.setFieldValue("ghiChu", e.target.value)}
            />

            <Button
                type="button"
                variant="contained"
                startIcon={<Add />}
                onClick={formik.handleSubmit}
                sx={{ marginTop: "12px", alignSelf: "flex-end", backgroundColor: "#1C2536" }}
            >
                Thêm
            </Button>

            {revenues.length > 0 && (
                <TableContainer sx={{ marginTop: "16px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Hạng mục thu</TableCell>
                                <TableCell>Số tiền</TableCell>
                                <TableCell>Thời điểm áp dụng từ ngày</TableCell>
                                <TableCell>Số ngày đến hạn</TableCell>
                                <TableCell>Ghi chú</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {revenues.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{getCategoryName(item.hangMucThu)}</TableCell>
                                    <TableCell>{item.soTien}</TableCell>
                                    <TableCell>{getApplicationTimeName(item.thoiDiemApDung)}</TableCell>
                                    <TableCell>{item.soNgayDenHan}</TableCell>
                                    <TableCell>{item.ghiChu}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}


