import { XCircleIcon } from "@heroicons/react/24/solid";
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, SvgIcon, TextField, styled } from "@mui/material";
import { Box } from "@mui/system";

export default function RevenueExpenditureEdit(props) {
    const { open, onClose, titleEdit, options } = props;
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    return (
        <>
            <BootstrapDialog
                onClose={onClose}
                open={open}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1C2536', color: 'white' }}>
                    Chỉnh sửa nhóm {titleEdit}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                        <Autocomplete
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            options={options}
                            renderInput={(params) => <TextField variant="outlined" {...params} label={`Nhóm ${titleEdit}`} />}
                        />
                        <TextField
                            sx={{ margin: "4px", marginTop: "12px" }}
                            fullWidth
                            size="small"
                            label="Tên mới"
                            variant="outlined"
                        />
                        <Grid item sm={12} md={12} lg={12}
                            sx={{ display: 'flex', justifyContent: 'end', margin: "4px", marginTop: "12px" }}
                        >
                            <Button
                                onClick={onClose}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#1C2536",
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>

                    <Box style={{ marginTop: "20px" }}>

                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    )
}