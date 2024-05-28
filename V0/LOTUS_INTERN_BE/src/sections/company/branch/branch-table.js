import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'tenCongTy',
        headerName: 'Tên công ty',
        width: 200
    },
    {
        field: 'tenPhongBan',
        headerName: 'Tên phòng ban',
        width: 200
    },
    {
        field: 'diaChi',
        headerName: 'Địa chỉ',
        width: 200
    },
    {
        field: 'soDienThoai',
        headerName: 'Số điện thoại',
        width: 150
    },
    {
        field: 'nguoiPhuTrach',
        headerName: 'Người phụ trách chính',
        width: 200
    },
    {
        field: 'quocGia',
        headerName: 'Quốc gia',
        width: 150
    },
];

// Dữ liệu mẫu
const rows = [
    { id: 1, tenCongTy: 'Công ty A', tenPhongBan: 'Phòng A1', diaChi: 'Địa chỉ A1', soDienThoai: '123456789', nguoiPhuTrach: 'Người A1', quocGia: 'Việt Nam' },
    { id: 2, tenCongTy: 'Công ty A', tenPhongBan: 'Phòng A2', diaChi: 'Địa chỉ A2', soDienThoai: '987654321', nguoiPhuTrach: 'Người A2', quocGia: 'Việt Nam' },
    { id: 3, tenCongTy: 'Công ty B', tenPhongBan: 'Phòng B1', diaChi: 'Địa chỉ B1', soDienThoai: '111222333', nguoiPhuTrach: 'Người B1', quocGia: 'Việt Nam' },
    { id: 4, tenCongTy: 'Công ty B', tenPhongBan: 'Phòng B2', diaChi: 'Địa chỉ B2', soDienThoai: '444555666', nguoiPhuTrach: 'Người B2', quocGia: 'Việt Nam' },
    { id: 5, tenCongTy: 'Công ty C', tenPhongBan: 'Phòng C1', diaChi: 'Địa chỉ C1', soDienThoai: '777888999', nguoiPhuTrach: 'Người C1', quocGia: 'Việt Nam' },
    { id: 6, tenCongTy: 'Công ty C', tenPhongBan: 'Phòng C2', diaChi: 'Địa chỉ C2', soDienThoai: '123123123', nguoiPhuTrach: 'Người C2', quocGia: 'Việt Nam' },
    { id: 7, tenCongTy: 'Công ty D', tenPhongBan: 'Phòng D1', diaChi: 'Địa chỉ D1', soDienThoai: '456456456', nguoiPhuTrach: 'Người D1', quocGia: 'Việt Nam' },
    { id: 8, tenCongTy: 'Công ty D', tenPhongBan: 'Phòng D2', diaChi: 'Địa chỉ D2', soDienThoai: '789789789', nguoiPhuTrach: 'Người D2', quocGia: 'Việt Nam' },
    { id: 9, tenCongTy: 'Công ty E', tenPhongBan: 'Phòng E1', diaChi: 'Địa chỉ E1', soDienThoai: '111111111', nguoiPhuTrach: 'Người E1', quocGia: 'Việt Nam' },
    { id: 10, tenCongTy: 'Công ty E', tenPhongBan: 'Phòng E2', diaChi: 'Địa chỉ E2', soDienThoai: '222222222', nguoiPhuTrach: 'Người E2', quocGia: 'Việt Nam' }
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
