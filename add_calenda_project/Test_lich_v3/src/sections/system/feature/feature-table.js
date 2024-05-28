import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Delete, Edit, GroupAdd, Visibility } from '@mui/icons-material';
import FeatureDetail from './feature-edit';
import ModalDetail from 'src/components/modal-detail';
import FeatureEdit from './feature-edit';
import ActionColumn from 'src/components/action-column ';

export default function FeatureTable() {
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
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'featureName', headerName: 'Tên chức năng ', width: 150 },
        { field: 'module', headerName: 'Tên Module ', width: 150 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            renderCell: (params) => (
                <>
                    <ActionColumn
                        handleViewDetail={handleViewDetail}
                        openDialogEdit={openDialogEdit}
                        params={params}
                    />
                </>
            ),
        }

    ];

    // Dữ liệu mẫu
    const rows = [
        {
            id: 1,
            module: 'Lịch công tác',
            featureName: 'Lịch',
            description: 'Mô đun quản lý thời gian'
        },
        {
            id: 2,
            module: 'Lịch công tác',
            featureName: 'Địa điểm',
            description: 'Thông tin về địa điểm'
        },
        {
            id: 3,
            module: 'Lịch công tác',
            featureName: 'Xe',
            description: 'Quản lý thông tin về xe'
        },
        {
            id: 4,
            module: 'Lịch công tác',
            featureName: 'Quà tặng',
            description: 'Quản lý thông tin về quà tặng'
        },
        {
            id: 5,
            module: 'Lịch công tác',
            featureName: 'Tiến trình',
            description: 'Theo dõi tiến trình'
        },
        {
            id: 6,
            module: 'TTS/DHS',
            featureName: 'Thực tập sinh',
            description: 'Quản lý thông tin về thực tập sinh'
        },
        {
            id: 7,
            module: 'TTS/DHS',
            featureName: 'Du học sinh',
            description: 'Quản lý thông tin về du học sinh'
        },
        // Các items khác tương tự
        // ...
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "8px 0px", width: '50%', padding: '4px ' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                />
                <Button
                    variant="contained"
                    sx={{
                        margin: '8px',
                        backgroundColor: "#1C2536",
                    }}
                >
                    Tìm kiếm
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader': {
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                        outline: 'none !important',
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <FeatureEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
                rowData={selectedRow}
            />

        </div>
    );
}