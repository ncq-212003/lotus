import { XCircleIcon } from "@heroicons/react/24/solid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { AppBar, Button, Dialog, IconButton, Stack, SvgIcon, Toolbar, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import ModalDetail from "src/components/modal-detail";
import ContactEdit from "./contact-edit";


export default function ContactTable({ open, onClose }) {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        console.log(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const handleViewDetail = (params) => {
        setSelectedRow(params.row);
        setIsModalDetailOpen(true);
    };

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

    const columns = [
        { field: "name", headerName: "Họ và tên", width: 150 },
        { field: "position", headerName: "Chức vụ", width: 100 },
        { field: "address", headerName: "Địa chỉ", width: 200 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "phone", headerName: "Số điện thoại", width: 150 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title="Chi tiết">
                        <IconButton color="primary"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleViewDetail(params);
                            }}>
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                openDialogEdit(params);
                            }}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton sx={{ color: "black" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleDelete(params.id);
                            }}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            position: "Quản lý",
            address: "Số 123, Đường ABC",
            email: "example@example.com",
            phone: "0123456789",
        },
        {
            id: 2,
            name: "Trần Thị B",
            position: "Nhân viên",
            address: "Số 456, Đường XYZ",
            email: "test@test.com",
            phone: "0987654321",
        },
        // Thêm thông tin của người liên hệ khác nếu cần
    ];

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                maxWidth={"xl"}
            >
                <AppBar sx={{ position: "relative", backgroundColor: "#1C2536" }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Thông tin người liên hệ
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <SvgIcon fontSize="small">
                                <XCircleIcon />
                            </SvgIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack spacing={3} sx={{ p: 2 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        onSelectionModelChange={(newSelection) => {
                            setSelectedContact(rows[newSelection.selectionModel[0]]);
                        }}
                    />
                </Stack>
                <Stack sx={{ p: 2, pt: 0, justifyContent: "flex-end", alignItems: "end" }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{ background: '#1C2536' }}
                    >
                        Lưu
                    </Button>
                </Stack>
            </Dialog>
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />

            <ContactEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
                rowData={selectedRow}
            />
        </>
    );
}
