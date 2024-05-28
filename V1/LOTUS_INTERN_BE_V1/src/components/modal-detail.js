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
    Avatar
} from "@mui/material";
import InfoRecord from "./info-record";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ModalDetail({ open, onClose, rowData, columns }) {

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
                Thông tin chi tiết
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
                    {columns
                        .filter(column => column.field !== 'stt' && column.field !== 'action')
                        .map(column => (
                            <Grid container spacing={2} key={column.field} sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>{column.headerName}:</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {column.field.includes('_img') ? (
                                        <Avatar
                                            src={rowData && rowData[column.field] ? rowData[column.field] : ''}
                                            alt={column.headerName}
                                            sx={{ width: 50, height: 50 }}
                                        >Trống</Avatar>
                                    ) : (
                                        <Typography variant="body1">
                                            {rowData && rowData[column.field] ? rowData[column.field] : ''}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#e3e6e6'
                }}
            >
                <InfoRecord />
                <Button autoFocus
                    onClick={handleAdd}
                    variant="contained"
                    sx={{ background: '#1C2536' }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
