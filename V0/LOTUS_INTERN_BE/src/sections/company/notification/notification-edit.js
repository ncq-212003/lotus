import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon, Stack, Box, Grid, AppBar, TextField, Autocomplete } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationEdit({ open, onClose, selectedRow }) {
    const [valueTieude, setvalueTieude] = useState('');
    const [valueNoidung, setvalueNoidung] = useState('');
    const [valueNguoitao, setvalueNguoitao] = useState('');
    const [valueNgaytao, setvalueNgaytao] = useState('');
    const [valueMucdo, setvalueMucdo] = useState('');
    useEffect(() => {
        if (selectedRow) {
            setvalueTieude(selectedRow.tieuDe || '');
            setvalueNoidung(selectedRow.noidung || '');
            setvalueNguoitao(selectedRow.nguoitao || '');
            setvalueNgaytao(selectedRow.ngayThongBao || '');
            setvalueMucdo(selectedRow.mucDo || '');
        }
    }, [selectedRow]);

    const handleSave = () => {
        const formData = {
            tieuDe: valueTieude,
            noidung: valueNoidung,
            nguoitao: valueNguoitao,
            ngayThongBao: valueNgaytao,
            mucDo: valueMucdo,
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
                                label="Tiêu đề"
                                fullWidth
                                value={valueTieude}
                                onChange={(e) => { setvalueTieude(valueTieude) }}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                variant="outlined"
                                size="small"
                                label="Nội dung"
                                fullWidth
                                value={valueNoidung}
                                onChange={(e) => { setvalueTieude(valueNoidung) }}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Người tạo thông báo"
                                fullWidth
                                value={valueNguoitao}
                                onChange={(e) => { setvalueTieude(valueNguoitao) }}
                            />
                            <TextField
                                sx={{ margin: "4px", marginTop: "12px" }}
                                size="small"
                                variant="outlined"
                                label="Ngày thông báo"
                                fullWidth
                                type="date"
                                value={valueNgaytao}
                                onChange={(e) => setvalueNgaytao(e.target.value)}
                            />
                            <Autocomplete
                                required
                                sx={{ margin: "4px", marginTop: "12px" }}
                                fullWidth
                                size="small"
                                options={['Ưu tiên cao', 'Bình thường', 'Ưu tiên thấp']}
                                renderInput={(params) => <TextField {...params} label="Mức độ" />}
                                value={valueMucdo}
                                onChange={(e, newValue) => setvalueMucdo(newValue)}
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
