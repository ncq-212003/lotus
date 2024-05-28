import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import {
    TextField,
    Grid,
    Stack,
    Box,
    Autocomplete,
} from "@mui/material";
import MultiLanguageComponent from "./multilanguage";
import { DatePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AutoComplementSelector = ({ label, options, value, onChange }) => {
    return (
        <Autocomplete
            fullWidth
            required
            value={value}
            autoHighlight
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputLabelProps={{
                        htmlFor: "demo-customized-select-native",
                        shrink: true,
                    }}
                />
            )}
        />
    );
};

export default function TabInfoBasic({ open, onClose, isSave }) {
    const [formData, setFormData] = useState({
        rows: [],
    });
    const [accountOptions, setAccountOptions] = useState([]);
    const [marketOptions, setMarketOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [statuOptions, setStatusOptions] = useState(["Được cấp phép", "Chưa được cấp phép"]);

    const handleAddRow = () => {
        const newRow = {

        };

        setFormData({
            ...formData,
            rows: [...formData.rows, newRow],
        });
    };

    // //Chọn nhiều ngôn ngữ

    const [unionNameValues, setUnionNameValues] = useState([]);
    const [addressValues, setAddressValues] = useState([]);
    const [representativeValues, setRepresentativeValues] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = [...formData.rows];
        updatedRows[index][field] = value;

        setFormData({
            ...formData,
            rows: updatedRows,
        });
    };

    const handleDeleteRow = (index) => {
        const updatedRows = [...formData.rows];
        updatedRows.splice(index, 1);

        setFormData({
            ...formData,
            rows: updatedRows,
        });
    };

    // Tình trạng trình cục
    const [showLicenseNumberField, setShowLicenseNumberField] = useState(false);

    const handleStatusChange = (newValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            category: newValue.value,
        }));
        if (newValue === 'Được cấp phép') {
            setShowLicenseNumberField(true);
        } else {
            setShowLicenseNumberField(false);
        }
    };


    const [value, setValue] = useState('1');

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Stack spacing={2} sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Thông tin cơ bản
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Mã số nghiệp đoàn"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tên nghiệp đoàn"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />

                                <MultiLanguageComponent
                                    inputValues={unionNameValues}
                                    setInputValues={setUnionNameValues}
                                    label="Tên nghiệp đoàn"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ website"
                                    fullWidth
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={statuOptions}
                                    size="small"
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                category: newValue.value,
                                            }));
                                            handleStatusChange(newValue);
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tình trạng trình cục" variant="outlined" />}
                                />
                            </Grid>
                            {showLicenseNumberField && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mã số cấp phép"
                                        name="licenseNumber"
                                        fullWidth
                                        required
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"

                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    options={accountOptions}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                unit: newValue.value,
                                            }));
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Nhân viên chăm sóc" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Hợp đồng
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Số hợp đồng"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* <FormControl
                                    size="small"
                                    fullWidth
                                >
                                    <InputLabel>Ngày đăng ký</InputLabel>
                                    <TextField
                                        type="date"
                                        sx={{ marginTop: "12px" }}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                    />
                                </FormControl> */}
                                <DatePicker
                                    sx={{ width: "100%", margin: "4px", marginTop: "12px" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày sinh"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí hỗ trợ thực tập sinh / người lao động
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Trợ cấp tháng đầu"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phí cấp đào tạo"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Địa chỉ nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={marketOptions}
                                    size="small"
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                category: newValue.value,
                                            }));
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Thị trường" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    options={cityOptions}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                tags: newValue.value,
                                            }));
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Thuộc tỉnh/ Thành phố" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />

                                <MultiLanguageComponent
                                    inputValues={addressValues}
                                    setInputValues={setAddressValues}
                                    label="Địa chỉ"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ margin: "4px" }}
                                    label="Số điện thoại"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ margin: "4px" }}
                                    label="Số fax"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            marginBottom: "16px",
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Đại diện nghiệp đoàn
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Họ và tên người đại diện"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                                <MultiLanguageComponent
                                    inputValues={representativeValues}
                                    setInputValues={setRepresentativeValues}
                                    label="Họ và tên người đại diện"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Chức vụ"
                                    fullWidth
                                    required
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ marginBottom: "16px" }}>
                            Phí quản lý
                        </Typography>
                        <TextField
                            sx={{ margin: "4px" }}
                            label="Phí quản lý"
                            fullWidth
                            required
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                        />

                    </Box>
                </Grid>
            </Grid>
            {/* <Grid spacing={3}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            padding: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    >
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Danh sách liên hệ" value="1" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>STT</TableCell>
                                                    <TableCell>Họ và tên</TableCell>
                                                    <TableCell>Chức vụ</TableCell>
                                                    <TableCell>Địa chỉ</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>SĐT</TableCell>
                                                    <TableCell>Ghi chú</TableCell>
                                                    <TableCell>Hành động</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {formData.rows.map((row, rowIndex) => (
                                                    <TableRow key={rowIndex}>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.id}
                                                                onChange={(e) => handleRowChange(rowIndex, "id", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.fullName}
                                                                onChange={(e) => handleRowChange(rowIndex, "fullName", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.regency}
                                                                onChange={(e) => handleRowChange(rowIndex, "regency", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.address}
                                                                onChange={(e) => handleRowChange(rowIndex, "address", e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.email}
                                                                onChange={(e) =>
                                                                    handleRowChange(rowIndex, "email", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.phone}
                                                                onChange={(e) =>
                                                                    handleRowChange(rowIndex, "phone", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                value={row.description}
                                                                onChange={(e) =>
                                                                    handleRowChange(rowIndex, "description", e.target.value)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="outlined" onClick={() => handleDeleteRow(rowIndex)}>
                                                                Xóa
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={10}>
                                                        <Button sx={{ margin: "4px" }} variant="text" onClick={handleAddRow}>+</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </Box>
                </Grid>
            </Grid> */}
        </Stack>
    );
}
