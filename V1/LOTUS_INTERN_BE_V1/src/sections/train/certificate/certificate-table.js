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
import styles from '../../../style/index.module.scss'

const rows = [
    { id: 1, stt: 1, machungchi: 'HS001', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1990-05-15', fullname: 'Nguyen Van A', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'CNTT', mota: 'Description' },
    { id: 2, stt: 2, machungchi: 'HS002', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1995-02-20', fullname: 'Nguyen Van B', logo: 'https://aptechvietnam.com.vn/360/binhthanh/images/logo.jpeg', chuyennganh: 'Quản trị hệ thống', mota: 'Description' },
    { id: 3, stt: 3, machungchi: 'HS003', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1987-11-10', fullname: 'Nguyen Van C', logo: 'https://inkythuatso.com/uploads/thumbnails/800/2021/12/hnue-logo-inkythuatso-14-13-52-22.jpg', chuyennganh: 'CNTT', mota: 'Description' },
    { id: 4, stt: 4, machungchi: 'HS004', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1998-09-05', fullname: 'Nguyen Van D', logo: 'https://inhoangkien.vn/wp-content/uploads/2023/04/logo-DH-Bach-Khoa-HN-HUST-anh-bia-01.jpg', chuyennganh: 'Quản trị hệ thống', mota: 'Description' },
    { id: 5, stt: 5, machungchi: 'HS005', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '2001-03-25', fullname: 'Nguyen Van E', logo: 'https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-quoc-gia-ha-noi-inkythuatso-01-23-15-25-01.jpg', chuyennganh: 'CNTT', mota: 'Description' },
    { id: 6, stt: 6, machungchi: 'HS006', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1996-07-14', fullname: 'Nguyen Van F', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'Quản trị hệ thống', mota: 'Description' },
    { id: 7, stt: 7, machungchi: 'HS007', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '2000-01-30', fullname: 'Nguyen Van G', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'CNTT', mota: 'Description' },
    { id: 8, stt: 8, machungchi: 'HS008', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1993-04-19', fullname: 'Nguyen Van H', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'Quản trị hệ thống', mota: 'Description' },
    { id: 9, stt: 9, machungchi: 'HS009', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1991-08-09', fullname: 'Nguyen Van I', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'CNTT', mota: 'Description' },
    { id: 10, stt: 10, machungchi: 'HS010', tenchungchi: 'Certificate in information system administration', tendvcap: 'Aptech', ngaycap: '1997-12-28', fullname: 'Nguyen Van K', logo: 'https://www.vnu.edu.vn/upload/2019/06/24238/image/VNU-UET%20logo.jpg', chuyennganh: 'Quản trị hệ thống', mota: 'Description' },
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
            field: 'machungchi',
            headerName: 'Mã chứng chỉ',
            width: 130
        },
        {
            field: 'tenchungchi',
            headerName: 'Tên chứng chỉ',
            width: 130
        },
        {
            field: 'tendvcap',
            headerName: 'Tên đơn vị cấp',
            width: 130,
        },
        {
            field: 'fullname',
            headerName: 'Tên học viên',
            width: 150,
        },
        {
            field: 'chuyennganh',
            headerName: 'Chuyên ngành',
            width: 150,
        },
        {
            field: 'logo',
            headerName: 'Logo',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.row.logo}
                    alt="Logo"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
            ),
        },
        {
            field: 'ngaycap',
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
                    className={styles.btn}
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