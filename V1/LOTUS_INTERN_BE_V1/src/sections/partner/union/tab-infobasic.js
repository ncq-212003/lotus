import React, { useState, useEffect } from "react";
import { TextField, Grid, Stack, Box, Autocomplete, Checkbox, Avatar, Button, styled, Typography, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import MultiLanguageComponent from "./multilanguage";
import { HANDLERS_UNION } from "src/contexts/reducer/partner/reducer-union"
import { useApp } from "src/hooks/use-app";

export default function TabInfoBasic({ open, onClose, isSave }) {
    const [formData, setFormData] = useState({
        rows: [],
    });
    const [state, dispatch] = useApp();
    const tab = "basicInfo";
    const { union } = state;
    const { basicInfo } = union;
    const {
        unionCode,
        unionName,
        websiteAddress,
        submissionStatus,
        licenseNumber,
        employee,
        note,
        contractCode,
        contractSigningDate,
        firstMonthAllowance,
        trainingFee,
        market,
        city,
        address,
        phone,
        fax,
        representative,
        role,
        managementFee,
    } = basicInfo;
    const [accountOptions, setAccountOptions] = useState([]);
    const [marketOptions, setMarketOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    // const [statuOptions, setStatusOptions] = useState(["Được cấp phép", "Chưa được cấp phép"]);
    const [selectedFile, setSelectedFile] = useState(null);


    // //Chọn nhiều ngôn ngữ
    const [unionNameValues, setUnionNameValues] = useState([]);
    const [addressValues, setAddressValues] = useState([]);
    const [representativeValues, setRepresentativeValues] = useState([]);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleChange = (event, fieldName) => {
        const newValue = event.target.value;
        dispatch({
            type: HANDLERS_UNION.SET_INPUT_UNION,
            payload: { tab, fieldName, newValue },
        });

    };
    const handleChangeSelect = (event, fieldName, newValue) => {
        dispatch({
            type: HANDLERS_UNION.SET_INPUT_UNION,
            payload: { tab, fieldName, newValue },
        });
    };

    // Tình trạng trình cục
    // const [showLicenseNumberField, setShowLicenseNumberField] = useState(false);

    // const handleStatusChange = (newValue) => {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         category: newValue.value,
    //     }));
    //     if (newValue === 'Được cấp phép') {
    //         setShowLicenseNumberField(true);
    //     } else {
    //         setShowLicenseNumberField(false);
    //     }
    // };


    // const [value, setValue] = useState('1');

    // const handleTabChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // const handleClose = () => {
    //     onClose();
    // };

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const handleFileChange = (event) => {
        const newValue = event.target.files[0];
        const fieldName = "avatar";
        if (newValue) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch({
                    type: HANDLERS_EMPLOYEE.SET_INPUT_EMPLOYEES,
                    payload: { tab, fieldName, newValue },
                });
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(newValue);
        }
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
                            <Grid item container>
                                <Grid item xs={12} md={3} lg={3} style={{ marginBottom: "-20px" }}>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar
                                            sx={{
                                                width: "120px",
                                                height: "120px",
                                            }}
                                            variant="rounded"
                                            src={selectedFile}
                                        ></Avatar>
                                    </Stack>
                                    <Button sx={{ width: "120px" }} component="label">
                                        Tải ảnh
                                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                    </Button>
                                </Grid>
                                <Grid item container xs={12} md={9} lg={9}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Mã số nghiệp đoàn"
                                            fullWidth
                                            required
                                            name="unionCode"
                                            onChange={(event) => handleChange(event, "unionCode")}
                                            variant="outlined"
                                            size="small"
                                            value={unionCode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tên nghiệp đoàn"
                                            fullWidth
                                            required
                                            name="unionName"
                                            onChange={(event) => handleChange(event, "unionName")}
                                            variant="outlined"
                                            size="small"
                                            value={unionName}
                                        />
                                        <MultiLanguageComponent
                                            inputValues={unionNameValues}
                                            setInputValues={setUnionNameValues}
                                            label="Tên nghiệp đoàn"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ website"
                                    fullWidth
                                    name="websiteAddress"
                                    onChange={(event) => handleChange(event, "websiteAddress")}
                                    variant="outlined"
                                    size="small"
                                    value={websiteAddress}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Autocomplete
                                    options={statuOptions}
                                    size="small"
                                    name="submissionStatus"
                                    onChange={(event, newValue) => handleChangeSelect(event, "submissionStatus", newValue)}
                                    renderInput={(params) => <TextField {...params} label="Tình trạng trình cục" variant="outlined" />}
                                // onChange={(newValue) => {
                                //     if (newValue) {
                                //         setFormData((prevFormData) => ({
                                //             ...prevFormData,
                                //             category: newValue.value,
                                //         }));
                                //         handleStatusChange(newValue);
                                //     }
                                // }}
                                /> */}
                                <Autocomplete
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "submissionStatus", newValue)
                                    }
                                    value={submissionStatus}
                                    name="submissionStatus"
                                    fullWidth
                                    size="small"
                                    options={submissionStatuOptions}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Tình trạng trình cục" variant="outlined" />
                                    )}
                                />
                            </Grid>
                            {/* {showLicenseNumberField && ( */}
                            {basicInfo.submissionStatus?.value === 1 && (
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mã số cấp phép"
                                        fullWidth
                                        required
                                        name="licenseNumber"
                                        onChange={(event) => handleChange(event, "licenseNumber")}
                                        variant="outlined"
                                        size="small"
                                        value={licenseNumber}
                                    />
                                </Grid>
                            )}
                            {/* )} */}
                            <Grid item xs={12}>
                                <Autocomplete
                                    size="small"
                                    name="employee"
                                    value={employee}
                                    options={employeeOptions}
                                    onChange={(event, newValue) =>
                                        handleChangeSelect(event, "employee", newValue)
                                    }
                                    renderInput={(params) => <TextField {...params} label="Nhân viên chăm sóc" variant="outlined" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Ghi chú"
                                    fullWidth
                                    required
                                    name="note"
                                    onChange={(event) => handleChange(event, "note")}
                                    variant="outlined"
                                    size="small"
                                    value={note}
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
                                    name="contractCode"
                                    onChange={(event) => handleChange(event, "contractCode")}
                                    variant="outlined"
                                    size="small"
                                    value={contractCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    // value={contractSigningDate}
                                    sx={{ width: "100%" }}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            variant: 'outlined'
                                        }
                                    }}
                                    label="Ngày ký hợp đồng"
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
                                    name="firstMonthAllowance"
                                    onChange={(event) => handleChange(event, "firstMonthAllowance")}
                                    variant="outlined"
                                    size="small"
                                    value={firstMonthAllowance}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phí cấp đào tạo"
                                    fullWidth
                                    required
                                    name="trainingFee"
                                    onChange={(event) => handleChange(event, "trainingFee")}
                                    variant="outlined"
                                    size="small"
                                    value={trainingFee}
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
                                    name="address"
                                    onChange={(event) => handleChange(event, "address")}
                                    variant="outlined"
                                    size="small"
                                    value={address}
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
                                    name="phone"
                                    onChange={(event) => handleChange(event, "phone")}
                                    variant="outlined"
                                    size="small"
                                    value={phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ margin: "4px" }}
                                    label="Số fax"
                                    fullWidth
                                    required
                                    name="fax"
                                    onChange={(event) => handleChange(event, "fax")}
                                    variant="outlined"
                                    size="small"
                                    value={fax}
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
                                    name="representative"
                                    onChange={(event) => handleChange(event, "representative")}
                                    variant="outlined"
                                    size="small"
                                    value={representative}
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
                                    name="role"
                                    onChange={(event) => handleChange(event, "role")}
                                    variant="outlined"
                                    size="small"
                                    value={role}
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
                            name="managementFee"
                            onChange={(event) => handleChange(event, "managementFee")}
                            variant="outlined"
                            size="small"
                            value={managementFee}
                        />

                    </Box>
                </Grid>
            </Grid>
        </Stack>
    );
}


const submissionStatuOptions = [
    { value: 1, label: "Được cấp phép" },
    { value: 2, label: "Chưa được cấp phép" }
];

const employeeOptions = [
    { value: 1, label: "Nguyễn Thành Nam" },
    { value: 2, label: "Đặng Duy Long" },
    { value: 3, label: "Nguyễn Thị Hải Yến" },
    { value: 4, label: "Lê Thanh Nghị" },
    { value: 5, label: "Trần Đức Bo" }
]
