import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Autocomplete, SvgIcon, Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ModalAddBranch from "../../../components/modal-add-branch";
import { useState } from "react";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_COMPANY_RECEIVING } from "src/contexts/reducer/partner/reducer-company-receiving";
import styled from "@emotion/styled";
import { CloudUpload } from "@mui/icons-material";
import SnackbarAlert from "src/components/action-notification";

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

export default function AddCompanyReceiving() {
    const [state, dispatch] = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFileGiayKinhDoanh, setSelectedFileGiayKinhDoanh] = useState(null);
    const [selectedFileLogo, setSelectedFileLogo] = useState(null);
    // alert
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenModal = (params) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            tenCTy: '',
            maCty: '',
            diaChi: '',
            email: '',
            sdt: '',
            website: '',
            masothue: '',
            loaiCty: 'Công ty',
            fileThongTin: '',
            logo: '',
            nguoiDaiDien: '',
            chucVu: '',
            chiNhanh: '',
            ngayThanhLap: Date.now(),
            pageCty: '',
            ghiChu: '',
            trangThai: 1,
            nghiepDoan: '',
            submit: null
        },
        validationSchema: Yup.object({
            tenCTy: Yup.string().max(4000).required("Cần cung cấp tên công ty"),
            maCty: Yup.string().max(4000).required("Cần cung cấp mã công ty"),
            nguoiDaiDien: Yup.string().max(4000).required("Cần cung cấp người đại diện"),
            chucVu: Yup.string().max(4000).required("Cần cung cấp chức vụ"),
            sdt: Yup.string().matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số").max(15, "Số điện thoại tối đa là 15 số"),
            email: Yup.string().email("Địa chỉ email không hợp lệ"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    ...values,
                    ngayThanhLap: format(new Date(values.ngayThanhLap), 'dd/MM/yyyy'),
                };

                const data = JSON.stringify(formData);
                console.log(formData);

                // call api
                const response = addCompanyReceivingApi(data);

                // dispatch
                dispatch({
                    type: HANDLERS_COMPANY_RECEIVING.ADD_COMPANY_RECEIVING,
                    payload: response.data,
                });
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
            >
                <Stack
                    spacing={3}
                    sx={{
                        margin: '38px 0'
                    }}
                >
                    <Box
                        sx={{
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={!!(formik.touched.tenCTy && formik.errors.tenCTy)}
                                    helperText={formik.touched.tenCTy && formik.errors.tenCTy}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.tenCTy}
                                    name="tenCTy"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Tên công ty"
                                    fullWidth
                                    variant="outlined"
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
                                            Tải Logo
                                        </>
                                    )}
                                    <VisuallyHiddenInput type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files[0];

                                            if (file && file.type.startsWith('image/')) {
                                                setSelectedFileLogo(file);
                                                formik.setFieldValue('logo', file.name);
                                            } else {
                                                setSnackbarSeverity("warning");
                                                setSnackbarMessage("File không hợp lệ. Vui lòng chọn hình ảnh.");
                                                setSnackbarOpen(true);
                                                setSelectedFileLogo(null);
                                            }
                                        }}
                                    />
                                </Button>
                                <TextField
                                    error={!!(formik.touched.maCty && formik.errors.maCty)}
                                    helperText={formik.touched.maCty && formik.errors.maCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.maCty}
                                    name="maCty"
                                    required
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.diaChi && formik.errors.diaChi)}
                                    helperText={formik.touched.diaChi && formik.errors.diaChi}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.diaChi}
                                    name="diaChi"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Địa chỉ"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.sdt && formik.errors.sdt)}
                                    helperText={formik.touched.sdt && formik.errors.sdt}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.sdt}
                                    name="sdt"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Số điện thoại"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.website && formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.website}
                                    name="website"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Website"
                                    fullWidth
                                    variant="outlined"
                                />
                                <DatePicker
                                    error={!!(formik.touched.ngayThanhLap && formik.errors.ngayThanhLap)}
                                    helperText={formik.touched.ngayThanhLap && formik.errors.ngayThanhLap}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => {
                                        formik.setFieldValue('ngayThanhLap', Date.parse(value));
                                    }}
                                    value={formik.values.ngayThanhLap}
                                    name="ngayThanhLap"
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày thành lập"
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                xs={12}
                                md={6}
                            >
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <TextField
                                        error={!!(formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien)}
                                        helperText={formik.touched.nguoiDaiDien && formik.errors.nguoiDaiDien}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.nguoiDaiDien}
                                        name="nguoiDaiDien"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={!!(formik.touched.chucVu && formik.errors.chucVu)}
                                        helperText={formik.touched.chucVu && formik.errors.chucVu}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.chucVu}
                                        name="chucVu"
                                        required
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        size="small"
                                        label="Chức vụ người đại diện"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '3px',
                                    }}
                                >
                                    <Autocomplete
                                        error={!!(formik.touched.chiNhanh && formik.errors.chiNhanh)}
                                        helperText={formik.touched.chiNhanh && formik.errors.chiNhanh}
                                        onBlur={formik.handleBlur}
                                        onChange={(event, newValue) => formik.setFieldValue("chiNhanh", newValue)}
                                        value={formik.values.chiNhanh}
                                        name="chiNhanh"
                                        sx={{ margin: "4px", marginTop: "12px" }}
                                        fullWidth
                                        size="small"
                                        options={['A', 'B']}
                                        renderInput={(params) => <TextField {...params}
                                            label="Chi nhánh"
                                            variant="outlined" />}
                                    />
                                    <Tooltip title="Thêm">
                                        <IconButton
                                            onClick={handleOpenModal}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <TextField
                                    error={!!(formik.touched.pageCty && formik.errors.pageCty)}
                                    helperText={formik.touched.pageCty && formik.errors.pageCty}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.pageCty}
                                    name="pageCty"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Fanpage công ty"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.masothue && formik.errors.masothue)}
                                    helperText={formik.touched.masothue && formik.errors.masothue}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.masothue}
                                    name="masothue"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Mã số thuế"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.loaiCty && formik.errors.loaiCty)}
                                    helperText={formik.touched.loaiCty && formik.errors.loaiCty}
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                    }}
                                    value={formik.values.loaiCty}
                                    name="loaiCty"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Loại công ty"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="Tổng công ty">Tổng công ty</option>
                                    <option value="Công ty">Công ty</option>
                                </TextField>
                                <TextField
                                    error={!!(formik.touched.ghiChu && formik.errors.ghiChu)}
                                    helperText={formik.touched.ghiChu && formik.errors.ghiChu}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.ghiChu}
                                    name="ghiChu"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    size="small"
                                    label="Ghi chú"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    error={!!(formik.touched.trangThai && formik.errors.trangThai)}
                                    helperText={formik.touched.trangThai && formik.errors.trangThai}
                                    onBlur={formik.handleBlur}
                                    onChange={(event) => {
                                        formik.handleChange(event);
                                    }}
                                    value={formik.values.trangThai}
                                    name="trangThai"
                                    fullWidth
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    label="Trạng thái"
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value={1}>Hoạt động</option>
                                    <option value={2}>Chưa hoạt động</option>
                                </TextField>
                                <Autocomplete
                                    error={!!(formik.touched.nghiepDoan && formik.errors.nghiepDoan)}
                                    helperText={formik.touched.nghiepDoan && formik.errors.nghiepDoan}
                                    onBlur={formik.handleBlur}
                                    onChange={(event, newValue) => formik.setFieldValue("nghiepDoan", newValue)}
                                    value={formik.values.nghiepDoan}
                                    name="nghiepDoan"
                                    sx={{ margin: "4px", marginTop: "12px" }}
                                    fullWidth
                                    size="small"
                                    options={['A', 'B']}
                                    renderInput={(params) => <TextField {...params}
                                        label="Nghiệp đoàn"
                                        variant="outlined" />}
                                />
                            </Grid>
                            <Button size="small"
                                component="label"
                                fullWidth
                                sx={{ margin: "4px", marginTop: "14px" }}>
                                {selectedFileGiayKinhDoanh ? (
                                    <>
                                        <CloudUpload sx={{ marginRight: 1 }} />
                                        {`File thông tin: ${selectedFileGiayKinhDoanh.name}`}
                                    </>
                                ) : (
                                    <>
                                        <CloudUpload sx={{ marginRight: 1 }} />
                                        Tải file thông tin
                                    </>
                                )}
                                <VisuallyHiddenInput type="file"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        setSelectedFileGiayKinhDoanh(file);
                                        formik.setFieldValue('fileThongTin', file.name);
                                    }}
                                />
                            </Button>
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
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Stack>
                <ModalAddBranch
                    open={isModalOpen}
                    onClose={closeModal}
                />
                <SnackbarAlert
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                />
            </form>
        </>
    )
}