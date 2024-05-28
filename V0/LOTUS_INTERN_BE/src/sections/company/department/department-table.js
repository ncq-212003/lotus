import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'congTy',
        headerName: 'Công ty',
        width: 200
    },
    {
        field: 'chiNhanh',
        headerName: 'Chi nhánh',
        width: 150
    },
    {
        field: 'tenPhongBan',
        headerName: 'Tên phòng ban',
        width: 200
    },
    {
        field: 'maPhongBan',
        headerName: 'Mã phòng ban',
        width: 150
    },
    {
        field: 'soDienThoaiBan',
        headerName: 'Số điện thoại bàn',
        width: 180
    },
    {
        field: 'nguoiPhuTrachChinh',
        headerName: 'Người phụ trách chính',
        width: 200
    },
    {
        field: 'tinhTrang',
        headerName: 'Tình trạng',
        width: 150
    },
    {
        field: 'moTa',
        headerName: 'Mô tả',
        width: 200
    },
];

// Dữ liệu mẫu
const rows = [
    { id: 1, congTy: 'Công ty A', chiNhanh: 'Chi nhánh A', tenPhongBan: 'Phòng A1', maPhongBan: 'PA1', soDienThoaiBan: '123456', nguoiPhuTrachChinh: 'Người A1', tinhTrang: 'Hoạt động', moTa: 'Mô tả 1' },
    { id: 2, congTy: 'Công ty A', chiNhanh: 'Chi nhánh A', tenPhongBan: 'Phòng A2', maPhongBan: 'PA2', soDienThoaiBan: '789012', nguoiPhuTrachChinh: 'Người A2', tinhTrang: 'Ngừng hoạt động', moTa: 'Mô tả 2' },
    { id: 3, congTy: 'Công ty B', chiNhanh: 'Chi nhánh B', tenPhongBan: 'Phòng B1', maPhongBan: 'PB1', soDienThoaiBan: '654321', nguoiPhuTrachChinh: 'Người B1', tinhTrang: 'Hoạt động', moTa: 'Mô tả 3' },
    { id: 4, congTy: 'Công ty B', chiNhanh: 'Chi nhánh B', tenPhongBan: 'Phòng B2', maPhongBan: 'PB2', soDienThoaiBan: '987654', nguoiPhuTrachChinh: 'Người B2', tinhTrang: 'Ngừng hoạt động', moTa: 'Mô tả 4' },
    { id: 5, congTy: 'Công ty C', chiNhanh: 'Chi nhánh C', tenPhongBan: 'Phòng C1', maPhongBan: 'PC1', soDienThoaiBan: '111222', nguoiPhuTrachChinh: 'Người C1', tinhTrang: 'Hoạt động', moTa: 'Mô tả 5' },
    { id: 6, congTy: 'Công ty C', chiNhanh: 'Chi nhánh C', tenPhongBan: 'Phòng C2', maPhongBan: 'PC2', soDienThoaiBan: '333444', nguoiPhuTrachChinh: 'Người C2', tinhTrang: 'Ngừng hoạt động', moTa: 'Mô tả 6' },
    { id: 7, congTy: 'Công ty D', chiNhanh: 'Chi nhánh D', tenPhongBan: 'Phòng D1', maPhongBan: 'PD1', soDienThoaiBan: '555666', nguoiPhuTrachChinh: 'Người D1', tinhTrang: 'Hoạt động', moTa: 'Mô tả 7' },
    { id: 8, congTy: 'Công ty D', chiNhanh: 'Chi nhánh D', tenPhongBan: 'Phòng D2', maPhongBan: 'PD2', soDienThoaiBan: '777888', nguoiPhuTrachChinh: 'Người D2', tinhTrang: 'Ngừng hoạt động', moTa: 'Mô tả 8' },
    { id: 9, congTy: 'Công ty E', chiNhanh: 'Chi nhánh E', tenPhongBan: 'Phòng E1', maPhongBan: 'PE1', soDienThoaiBan: '999000', nguoiPhuTrachChinh: 'Người E1', tinhTrang: 'Hoạt động', moTa: 'Mô tả 9' },
    { id: 10, congTy: 'Công ty E', chiNhanh: 'Chi nhánh E', tenPhongBan: 'Phòng E2', maPhongBan: 'PE2', soDienThoaiBan: '121314', nguoiPhuTrachChinh: 'Người E2', tinhTrang: 'Ngừng hoạt động', moTa: 'Mô tả 10' }
];


export default function DepartmentTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    borderColor: 'rgb(224, 224, 224)',
                    '& .MuiDataGrid-row': {
                        border: '0.1px solid rgb(224, 224, 224) !important',
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
        </div>
    );
}
