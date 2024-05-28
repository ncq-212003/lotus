import React, { useState, useEffect } from "react";
import { Stack, TextField, Button, Autocomplete, Grid, Dialog, Typography, styled, IconButton, SvgIcon, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const TypeAddress = ({ openType, closeType }) => {
  const closeDialog = () => {
    closeType();
  };

  return (
    <>
      <BootstrapDialog
        onClose={closeDialog}
        open={openType}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
          Loại địa điểm
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={closeDialog}
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
          <Grid container>
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Tên địa điểm"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              sx={{ margin: "4px", marginTop: "12px" }}
              size="small"
              label="Ghi chú"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Box style={{ marginTop: "20px" }}>
            <Button
              onClick={closeDialog}
              variant="contained"
              sx={{
                width: "150px",
                backgroundColor: "#1C2536",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              Lưu
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
