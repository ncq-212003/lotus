import React, { useState, useEffect } from "react";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import {
    SvgIcon,
    TextField,
    Grid,
    Stack,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    DialogActions,
    styled,
    DialogTitle,
    DialogContent,
    Divider,
    Autocomplete
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const companies = [
    { value: 1, label: "Công ty Apple" },
    { value: 2, label: "Công ty Apple" },
    { value: 3, label: "Công ty Apple " },
    { value: 4, label: "Công ty Samsung" },
    { value: 5, label: "Công ty Samsung " },
    { value: 6, label: "Công ty Game" },
];

const location = [
    { value: 1, label: "Trong nước" },
    { value: 2, label: "Nhật Bản" },
    { value: 3, label: "Hàn Quốc" }
];

export default function ModalAddBranch({ open, onClose }) {

    const handleClose = () => {
        onClose();
    };

    const handleAdd = () => {
        onClose();
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                Thêm chi nhánh
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
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
                <Stack
                    sx={{ p: 2 }}
                >
                    <Autocomplete
                        size="small"
                        options={companies}
                        renderInput={(params) => <TextField {...params} label="Tên công ty" variant="outlined"/>}
                    />
                    <TextField
                        fullWidth
                        label="Tên phòng ban"
                        variant="outlined"
                        sx={{ margin: "4px", marginTop: "12px" }}
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        variant="outlined"
                        sx={{ margin: "4px", marginTop: "12px" }}
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại "
                        variant="outlined"
                        sx={{ margin: "4px", marginTop: "12px" }}
                    />
                    <TextField
                        fullWidth
                        label="Người phụ trách chính "
                        variant="outlined"
                        sx={{ margin: "4px", marginTop: "12px" }}
                    />
                    <Autocomplete
                        size="small"
                        sx={{ margin: "4px", marginTop: "12px" }}
                        options={location}
                        renderInput={(params) => <TextField {...params} label="Chọn quốc gia" variant="outlined"/>}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus
                    onClick={handleAdd}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Thêm
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
