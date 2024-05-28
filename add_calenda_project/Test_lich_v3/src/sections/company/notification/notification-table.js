import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import NotificationEdit from './notification-edit';
import ModalDetail from 'src/components/modal-detail';

const rows = [
    { id: 1, stt: 1, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '05/12/2023', mucdo: 'Ưu tiên cao' },
    { id: 2, stt: 2, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1995-02-20', mucdo: 'Bình thường' },
    { id: 3, stt: 3, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1987-11-10', mucdo: 'Ưu tiên cao' },
    { id: 4, stt: 4, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1998-09-05', mucdo: 'Ưu tiên cao' },
    { id: 5, stt: 5, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '2001-03-25', mucdo: 'Ưu tiên thấp' },
    { id: 6, stt: 6, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1996-07-14', mucdo: 'Ưu tiên cao' },
    { id: 7, stt: 7, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '2000-01-30', mucdo: 'Ưu tiên thấp' },
    { id: 8, stt: 8, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1993-04-19', mucdo: 'Ưu tiên cao' },
    { id: 9, stt: 9, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1991-08-09', mucdo: 'Bình thường' },
    { id: 10, stt: 10, tieude: 'Về việc lịch bay', noidung: 'Lao động xuất khẩu Nhật Bản', nguoitao: 'ThangDV', ngaythongbao: '1997-12-28', mucdo: 'Ưu tiên cao' },
];

export default function NotificationTable({ }) {

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

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = rows.filter(
            (row) =>
                row.maphong.toString().toLowerCase().includes(searchTerm) ||
                row.mataisan.toLowerCase().includes(searchTerm) ||
                (row.tentaisan && row.tentaisan.toLowerCase().includes(searchTerm))
        );
        setFilteredRows(filteredData);
    };


    const columns = [
        {
            field: 'stt',
            headerName: 'STT',
            width: 70
        },
        {
            field: 'tieuDe',
            headerName: 'Tiêu đề',
            width: 130
        },
        {
            field: 'noidung',
            headerName: 'Nội dung',
            width: 130
        },
        {
            field: 'nguoitao',
            headerName: 'Người tạo thông báo',
            width: 150
        },
        {
            field: 'ngaythongbao',
            headerName: 'Ngày thông báo',
            width: 150,
        },
        {
            field: 'mucDo',
            headerName: 'Mức độ',
            width: 100,
        },
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={openDialogEdit}
                    params={params}
                />
            ),
        },
    ];

    return (
        <div style={{ height: 415, width: '100%', marginTop: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                }}
            >
                <TextField
                    sx={{ margin: "12px 0px", width: '50%' }}
                    variant="outlined"
                    size='small'
                    label="Nhập nội dung tìm kiếm"
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
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                    },
                }}
                rows={rows}
                columns={columns}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <NotificationEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                selectedRow={selectedRow}
            />
        </div>
    );
}