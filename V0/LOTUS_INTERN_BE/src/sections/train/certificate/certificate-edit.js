import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { LocalizationProvider, AdapterDateFns, DatePicker } from "@mui/x-date-pickers";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertificateEdit({ open, onClose, selectedRow }) {
    const [valueMachungchi, setvalueMachungchi] = useState('');
    const [valueTenchungchi, setvalueTenchungchi] = useState('');
    const [valueTendonvicap, setvalueTendonvicap] = useState('');
    const [valueNgaycap, setvalueNgaycap] = useState(null);
    const [valueLogo, setvalueLogo] = useState('');
    const [valueFullname, setvalueFullname] = useState('');
    const [valueChuyennganh, setvalueChuyennganh] = useState('');
    const [valueMota, setvalueMota] = useState('');

    useEffect(() => {
        if (selectedRow) {
            setvalueMachungchi(selectedRow.maChungChi || '');
            setvalueTenchungchi(selectedRow.tenChungChi || '');
            setvalueTendonvicap(selectedRow.tenDVCap || '');
            setvalueNgaycap(selectedRow.ngayCap || null);
            setvalueFullname(selectedRow.fullName || '');
            setvalueLogo(selectedRow.Logo || '');
            setvalueChuyennganh(selectedRow.chuyenNganh || '');
            setvalueMota(selectedRow.Mota || '');
        }
    }, [selectedRow]);

    const handleSave = () => {
        const formData = {
            maphong: valueMachungchi,
            mataisan: valueTenchungchi,
            tenDVCap: valueTendonvicap,
            ngayCap: valueNgaycap,
            fullName: valueFullname,
            Logo: valueLogo,
            chuyenNganh: valueChuyennganh,
            Mota: valueMota,
        }
        console.log("Data is row:", formData)
        onClose();
    }

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: "fixed", backgroundColor: "#1C2536" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <SvgIcon fontSize="small">
                            <XCircleIcon />
                        </SvgIcon>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        SỬA THÔNG TIN
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleAdd}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Stack spacing={3} sx={{ p: 2, marginTop: "64px" }}>
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
                                label="Mã chứng chỉ"
                                fullWidth
                                value={valueMachungchi}
                                onChange={(e) => { setvalueMachungchi(valueMachungchi) }}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên chứng chỉ"
                                fullWidth
                                value={valueTenchungchi}
                                onChange={(e) => { setvalueTenchungchi(valueTenchungchi) }}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên đơn vị cấp"
                                fullWidth
                                value={valueTendonvicap}
                                onChange={(e) => { setvalueTendonvicap(valueTendonvicap) }}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Logo"
                                fullWidth
                                value={valueLogo}
                                onChange={(e) => { setvalueLogo(valueLogo) }}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên học viên"
                                fullWidth
                                value={valueFullname}
                                onChange={(e) => { setvalueFullname(valueFullname) }}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Tên chuyên ngành"
                                fullWidth
                                value={valueChuyennganh}
                                onChange={(e) => { setvalueChuyennganh(valueChuyennganh) }}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Ngày cấp"
                                type="date"
                                value={valueNgaycap}
                                onChange={(e) => setvalueNgaycap(e.target.value)}
                            />
                            <TextField
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Mô tả"
                                fullWidth
                                value={valueMota}
                                onChange={(e) => { setvalueMota(e.target.valueMota) }}
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
                                    }}
                                    onClick={handleSave}
                                >
                                    Thêm
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Dialog>
    );
}
