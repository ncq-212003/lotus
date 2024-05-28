import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import ClassroomEdit from './province-edit';
import ActionColumn from 'src/components/action-column ';
import OrganEdit from './province-edit';

const rows = [
    { id: 1, country: 'Korea', region: 'Seoul', name: 'Gyeonggi', nickName: '경기도' },
    { id: 2, country: 'Japan', region: 'Kanto', name: 'Tokyo', nickName: '東京都' },
    { id: 3, country: 'France', region: 'Île-de-France', name: 'Paris', nickName: 'Ville lumière' },
    { id: 4, country: 'Japan', region: 'Kansai', name: 'Osaka', nickName: '大阪市' },
    { id: 5, country: 'Japan', region: 'Chubu', name: 'Nagoya', nickName: '名古屋' },
    { id: 6, country: 'Japan', region: 'Tohoku', name: 'Sendai', nickName: 'Province 6' },
    { id: 7, country: 'Japan', region: 'Shikoku', name: 'Matsuyama', nickName: 'Province 7' },
    { id: 8, country: 'Japan', region: 'Kyushu', name: 'Fukuoka', nickName: 'Province 8' },
    { id: 9, country: 'Japan', region: 'Hokkaido', name: 'Sapporo', nickName: 'Province 9' },
    // Add more rows as needed
];

export default function ProvinceTable() {
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
        { field: 'country', headerName: 'Quốc gia', width: 350 },
        { field: 'region', headerName: 'Vùng', width: 130 },
        { field: 'name', headerName: 'Tên', width: 200 },
        { field: 'nickName', headerName: 'Tên riêng', width: 200 },
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