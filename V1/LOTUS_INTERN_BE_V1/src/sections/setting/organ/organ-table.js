import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ClassroomEdit from './organ-edit';
import ActionColumn from 'src/components/action-column ';
import OrganEdit from './organ-edit';

const rows = [
    { id: 1, organName: 'Cục Quản lý Xuất nhập cảnh (Quản lý hộ chiếu) - Bộ Công an', documentType: 'Hộ chiếu', address: '16 Cao Bá Quát, Ba Đình, Hà Nội.', description: 'Website: https://www.xuatnhapcanh.gov.vn/' },
    { id: 2, organName: 'Công an tỉnh, thành phố', documentType: 'Hộ chiếu', address: 'Công an tỉnh, thành phố', description: '' },
    { id: 3, organName: 'Cục Cảnh sát đăng ký quản lý cư trú và dữ liệu Quốc gia về dân cư', documentType: 'CCCD', address: '47, Phạm Văn Đồng, Hà Nội', description: '' },
    { id: 4, organName: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội', documentType: 'CCCD', address: '90 P. Nguyễn Du, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội', description: '' },
];

export default function OrganTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
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

    const columns = [
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'organName', headerName: 'Tên cơ quan', width: 350 },
        { field: 'documentType', headerName: 'Loại giấy tờ', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'description', headerName: 'Mô tả', width: 200 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
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
    console.log(selectedRow);

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
                    sx={{ margin: "12px 0px", width: '50%' }}
                    size="small"
                    label="Nhập nội dung tìm kiếm"
                    variant="outlined"
                />
                <Button
                    sx={{
                        margin: '8px',
                        backgroundColor: '#1C2536',
                        color: 'white'
                    }}
                    size='small'
                    variant="contained"
                >Tìm kiếm</Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight

                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        borderBottom: '1px solid #ccc '
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <OrganEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
                rowData={selectedRow}
            />
        </div>
    );
}
