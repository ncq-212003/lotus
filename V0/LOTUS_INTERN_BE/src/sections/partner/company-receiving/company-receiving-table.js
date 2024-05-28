import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from '../../../components/modal-detail';
import CompanyReceivingEdit from './company-receiving-edit';
import ActionColumn from 'src/components/action-column ';

// Dữ liệu mẫu
const rows = [
    { id: 1, stt: 1, tenCongty: 'KTX A', maCty: 'P001', diaChi: 'Phòng 101', email: 'trong@example.com', sdt: '123456789', website: 'https://example.com', masothue: 'ABC123', loaiCty: 'Loại A', giakinhdoanh: 'GP001', logo: 'logo1.jpg', nguoidaidien: 'Người 1', chinhanh: 'Chi nhánh A', ngaythanhlap: '01/01/2022', fanpageCty: 'https://facebook.com/company1', ghiChu: 'Ghi chú 1', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 1', quocGia: 'Quốc gia 1' },
    { id: 2, stt: 2, tenCongty: 'Công ty ABC', maCty: 'P002', diaChi: 'Phòng 102', email: 'contact@abc.com', sdt: '987654321', website: 'https://abc-corp.com', masothue: 'XYZ789', loaiCty: 'Loại B', giakinhdoanh: 'GP002', logo: 'logo2.jpg', nguoidaidien: 'Người 2', chinhanh: 'Chi nhánh B', ngaythanhlap: '02/02/2022', fanpageCty: 'https://facebook.com/abc-company', ghiChu: 'Ghi chú 2', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 2', quocGia: 'Quốc gia 2' },
    { id: 3, stt: 3, tenCongty: 'Công ty XYZ', maCty: 'P003', diaChi: 'Phòng 103', email: 'info@xyzco.com', sdt: '555555555', website: 'https://xyzcompany.com', masothue: 'DEF456', loaiCty: 'Loại C', giakinhdoanh: 'GP003', logo: 'logo3.jpg', nguoidaidien: 'Người 3', chinhanh: 'Chi nhánh C', ngaythanhlap: '03/03/2022', fanpageCty: 'https://facebook.com/xyz-corp', ghiChu: 'Ghi chú 3', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 3', quocGia: 'Quốc gia 3' },
    { id: 4, stt: 4, tenCongty: 'Tổ chức ABCDE', maCty: 'P004', diaChi: 'Phòng 104', email: 'abcde@org.com', sdt: '1111222333', website: 'https://abcde.org', masothue: 'MNO789', loaiCty: 'Loại D', giakinhdoanh: 'GP004', logo: 'logo4.jpg', nguoidaidien: 'Người 4', chinhanh: 'Chi nhánh D', ngaythanhlap: '04/04/2022', fanpageCty: 'https://facebook.com/abcde-org', ghiChu: 'Ghi chú 4', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 4', quocGia: 'Quốc gia 4' },
    { id: 5, stt: 5, tenCongty: 'Công ty ABX', maCty: 'P005', diaChi: 'Phòng 105', email: 'contact@abxco.com', sdt: '7777888899', website: 'https://abxcompany.com', masothue: 'GHI101', loaiCty: 'Loại E', giakinhdoanh: 'GP005', logo: 'logo5.jpg', nguoidaidien: 'Người 5', chinhanh: 'Chi nhánh E', ngaythanhlap: '05/05/2022', fanpageCty: 'https://facebook.com/abx-company', ghiChu: 'Ghi chú 5', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 5', quocGia: 'Quốc gia 5' },
    { id: 6, stt: 6, tenCongty: 'Công ty WXYZ', maCty: 'P006', diaChi: 'Phòng 106', email: 'info@wxyzco.com', sdt: '3333222111', website: 'https://wxyzcompany.com', masothue: 'JKL303', loaiCty: 'Loại F', giakinhdoanh: 'GP006', logo: 'logo6.jpg', nguoidaidien: 'Người 6', chinhanh: 'Chi nhánh F', ngaythanhlap: '06/06/2022', fanpageCty: 'https://facebook.com/wxyz-corp', ghiChu: 'Ghi chú 6', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 6', quocGia: 'Quốc gia 6' },
    { id: 7, stt: 7, tenCongty: 'Công ty QRS', maCty: 'P007', diaChi: 'Phòng 107', email: 'contact@qrsco.com', sdt: '8888666555', website: 'https://qrscompany.com', masothue: 'PQR123', loaiCty: 'Loại G', giakinhdoanh: 'GP007', logo: 'logo7.jpg', nguoidaidien: 'Người 7', chinhanh: 'Chi nhánh G', ngaythanhlap: '07/07/2022', fanpageCty: 'https://facebook.com/qrs-company', ghiChu: 'Ghi chú 7', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 7', quocGia: 'Quốc gia 7' },
    { id: 8, stt: 8, tenCongty: 'Công ty MNOP', maCty: 'P008', diaChi: 'Phòng 108', email: 'info@mnopco.com', sdt: '4444333222', website: 'https://mnopcompany.com', masothue: 'ABCDEF', loaiCty: 'Loại H', giakinhdoanh: 'GP008', logo: 'logo8.jpg', nguoidaidien: 'Người 8', chinhanh: 'Chi nhánh H', ngaythanhlap: '08/08/2022', fanpageCty: 'https://facebook.com/mnop-corp', ghiChu: 'Ghi chú 8', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 8', quocGia: 'Quốc gia 8' },
    { id: 9, stt: 9, tenCongty: 'Công ty EFG', maCty: 'P009', diaChi: 'Phòng 109', email: 'contact@efgco.com', sdt: '9999888777', website: 'https://efgcompany.com', masothue: 'LMN456', loaiCty: 'Loại I', giakinhdoanh: 'GP009', logo: 'logo9.jpg', nguoidaidien: 'Người 9', chinhanh: 'Chi nhánh I', ngaythanhlap: '09/09/2022', fanpageCty: 'https://facebook.com/efg-company', ghiChu: 'Ghi chú 9', tinhTrang: 'Hoạt động', nghiepDoan: 'Nghiệp đoàn 9', quocGia: 'Quốc gia 9' },
    { id: 10, stt: 10, tenCongty: 'Công ty HIJK', maCty: 'P010', diaChi: 'Phòng 110', email: 'info@hijkco.com', sdt: '2222111333', website: 'https://hijkcompany.com', masothue: 'QRS789', loaiCty: 'Loại J', giakinhdoanh: 'GP010', logo: 'logo10.jpg', nguoidaidien: 'Người 10', chinhanh: 'Chi nhánh J', ngaythanhlap: '10/10/2022', fanpageCty: 'https://facebook.com/hijk-corp', ghiChu: 'Ghi chú 10', tinhTrang: 'Ngừng hoạt động', nghiepDoan: 'Nghiệp đoàn 10', quocGia: 'Quốc gia 10' },
];

export default function CompanyReceivingTable() {
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
        { field: 'stt', headerName: 'STT', width: 70 },
        { field: 'tenCongty', headerName: 'Tên công ty', width: 200 },
        { field: 'maCty', headerName: 'Mã công ty', width: 130 },
        { field: 'diaChi', headerName: 'Địa chỉ', width: 200 },
        { field: 'email', headerName: 'Email', width: 120 },
        { field: 'sdt', headerName: 'Số điện thoại', width: 120 },
        { field: 'website', headerName: 'Website', width: 120 },
        { field: 'masothue', headerName: 'Mã số thuế', width: 120 },
        { field: 'loaiCty', headerName: 'Loại công ty', width: 120 },
        { field: 'giakinhdoanh', headerName: 'Giấy phép kinh doanh', width: 120 },
        { field: 'logo', headerName: 'Logo', width: 120 },
        { field: 'nguoidaidien', headerName: 'Người đại diện (chức vụ)', width: 120 },
        { field: 'chinhanh', headerName: 'Chi nhánh', width: 120 },
        { field: 'ngaythanhlap', headerName: 'Ngày thành lập', width: 120 },
        { field: 'fanpageCty', headerName: 'Fanpage công ty', width: 120 },
        { field: 'ghiChu', headerName: 'Ghi chú', width: 120 },
        { field: 'tinhTrang', headerName: 'Tình trạng', width: 120 },
        { field: 'nghiepDoan', headerName: 'Nghiệp đoàn', width: 120 },
        { field: 'quocGia', headerName: 'Quốc gia', width: 120 },
        {
            field: 'action',
            headerName: 'Thao tác',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <ActionColumn
                    handleViewDetail={handleViewDetail}
                    openDialogEdit={openDialogEdit}
                    params={params}
                />
            ),
        }
    ];

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        email: false,
        sdt: false,
        website: false,
        masothue: false,
        giakinhdoanh: false,
        logo: false,
        nguoidaidien: false,
        chinhanh: false,
        ngaythanhlap: false,
        fanpageCty: false,
        ghiChu: false,
    });

    const handleDelete = (index) => {
        const updateUnions = [...rows];

        const deletedUnion = updateUnions.splice(index, 1);

        if (window.confirm(`Bạn có chắc chắn muốn xóa ${deletedUnion[0].name} không?`)) {
            console.log("Xóa thông tin của:", deletedUnion[0]);
        }
    };

    const handleEdit = (index) => {
        const updateUnions = [...rows];
        console.log("Chỉnh sửa thông tin của:", updateUnions[index]);
    };

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
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                }
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            <ModalDetail
                open={isModalDetailOpen}
                onClose={closeModalDetail}
                rowData={selectedRow}
                columns={columns}
            />
            <CompanyReceivingEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
