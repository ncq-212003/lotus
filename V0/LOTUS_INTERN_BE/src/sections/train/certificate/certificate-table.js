import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import ActionColumn from 'src/components/action-column ';
import CertificateEdit from './certificate-edit';
import ModalDetail from 'src/components/modal-detail';

const rows = [
    { id: 1, stt: 1, maChungChi: 'HS001', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1990-05-15', fullName: 'Nguyen Van A', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'CNTT', Mota: 'Description' },
    { id: 2, stt: 2, maChungChi: 'HS002', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1995-02-20', fullName: 'Nguyen Van B', Logo: 'https://aptechvietnam.com.vn/360/binhthanh/images/logo.jpeg', chuyenNganh: 'Quản trị hệ thống', Mota: 'Description' },
    { id: 3, stt: 3, maChungChi: 'HS003', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1987-11-10', fullName: 'Nguyen Van C', Logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/12/hnue-logo-inkythuatso-14-13-52-22.jpg', chuyenNganh: 'CNTT', Mota: 'Description' },
    { id: 4, stt: 4, maChungChi: 'HS004', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1998-09-05', fullName: 'Nguyen Van D', Logo: 'https://inhoangkien.vn/wp-content/uploads/2023/04/Logo-DH-Bach-Khoa-HN-HUST-anh-bia-01.jpg', chuyenNganh: 'Quản trị hệ thống', Mota: 'Description' },
    { id: 5, stt: 5, maChungChi: 'HS005', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '2001-03-25', fullName: 'Nguyen Van E', Logo: 'https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-quoc-gia-ha-noi-inkythuatso-01-23-15-25-01.jpg', chuyenNganh: 'CNTT', Mota: 'Description' },
    { id: 6, stt: 6, maChungChi: 'HS006', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1996-07-14', fullName: 'Nguyen Van F', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'Quản trị hệ thống', Mota: 'Description' },
    { id: 7, stt: 7, maChungChi: 'HS007', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '2000-01-30', fullName: 'Nguyen Van G', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'CNTT', Mota: 'Description' },
    { id: 8, stt: 8, maChungChi: 'HS008', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1993-04-19', fullName: 'Nguyen Van H', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'Quản trị hệ thống', Mota: 'Description' },
    { id: 9, stt: 9, maChungChi: 'HS009', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1991-08-09', fullName: 'Nguyen Van I', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'CNTT', Mota: 'Description' },
    { id: 10, stt: 10, maChungChi: 'HS010', tenChungChi: 'Certificate in information system administration', tenDVCap: 'Aptech', ngayCap: '1997-12-28', fullName: 'Nguyen Van K', Logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyenNganh: 'Quản trị hệ thống', Mota: 'Description' },
];


export default function CertificateTable() {
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
        {
            field: 'stt',
            headerName: 'STT',
            width: 70
        },
        {
            field: 'maChungChi',
            headerName: 'Mã chứng chỉ',
            width: 130
        },
        {
            field: 'tenChungChi',
            headerName: 'Tên chứng chỉ',
            width: 130
        },
        {
            field: 'tenDVCap',
            headerName: 'Tên đơn vị cấp',
            width: 130,
        },
        {
            field: 'fullName',
            headerName: 'Tên học viên',
            width: 150,
        },
        {
            field: 'chuyenNganh',
            headerName: 'Chuyên ngành',
            width: 150,
        },
        {
            field: 'Logo',
            headerName: 'Logo',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.row.Logo}
                    alt="Logo"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
            ),
        },
        {
            field: 'ngayCap',
            headerName: 'Ngày cấp',
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
                rows={rows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
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
            <CertificateEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                selectedRow={selectedRow}
            />
        </div>
    );
}