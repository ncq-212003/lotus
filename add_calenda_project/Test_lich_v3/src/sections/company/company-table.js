import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ModalDetail from 'src/components/modal-detail';
import CompanyEdit from './company-edit';
import ActionColumn from 'src/components/action-column ';
import { useApp } from 'src/hooks/use-app';
import { useEffect } from 'react';
import { listCompanyApi } from 'src/contexts/api/company/api-company';
import { HANDLERS_COMPANY } from 'src/contexts/reducer/company/reducer-company';
import { format } from 'date-fns';

// Dữ liệu mẫu
// const rows = [
//     { id: 1, stt: 1, tenCongty: 'KTX A', maCty: 'P001', diaChi: 'Phòng 101', email: 'trong@example.com', sdt: '123456789', website: 'https://example.com', masothue: 'ABC123', loaiCty: 'Loại A', giakinhdoanh: 'GP001', logo_img: '', nguoidaidien: 'Người 1', chinhanh: 'Chi nhánh A', ngaythanhlap: '01/01/2022', fanpageCty: 'https://facebook.com/company1', ghiChu: 'Ghi chú 1', tinhTrang: 'Hoạt động' },
//     { id: 2, stt: 2, tenCongty: 'Công ty ABC', maCty: 'P002', diaChi: 'Phòng 102', email: 'contact@abc.com', sdt: '987654321', website: 'https://abc-corp.com', masothue: 'XYZ789', loaiCty: 'Loại B', giakinhdoanh: 'GP002', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-3_1586785660.png', nguoidaidien: 'Người 2', chinhanh: 'Chi nhánh B', ngaythanhlap: '02/02/2022', fanpageCty: 'https://facebook.com/abc-company', ghiChu: 'Ghi chú 2', tinhTrang: 'Ngừng hoạt động' },
//     { id: 3, stt: 3, tenCongty: 'Công ty XYZ', maCty: 'P003', diaChi: 'Phòng 103', email: 'info@xyzco.com', sdt: '555555555', website: 'https://xyzcompany.com', masothue: 'DEF456', loaiCty: 'Loại C', giakinhdoanh: 'GP003', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-7_1586451588-800x795.jpeg', nguoidaidien: 'Người 3', chinhanh: 'Chi nhánh C', ngaythanhlap: '03/03/2022', fanpageCty: 'https://facebook.com/xyz-corp', ghiChu: 'Ghi chú 3', tinhTrang: 'Hoạt động' },
//     { id: 4, stt: 4, tenCongty: 'Tổ chức ABCDE', maCty: 'P004', diaChi: 'Phòng 104', email: 'abcde@org.com', sdt: '1111222333', website: 'https://abcde.org', masothue: 'MNO789', loaiCty: 'Loại D', giakinhdoanh: 'GP004', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-4_1586785798-800x387.jpeg', nguoidaidien: 'Người 4', chinhanh: 'Chi nhánh D', ngaythanhlap: '04/04/2022', fanpageCty: 'https://facebook.com/abcde-org', ghiChu: 'Ghi chú 4', tinhTrang: 'Ngừng hoạt động' },
//     { id: 5, stt: 5, tenCongty: 'Công ty ABX', maCty: 'P005', diaChi: 'Phòng 105', email: 'contact@abxco.com', sdt: '7777888899', website: 'https://abxcompany.com', masothue: 'GHI101', loaiCty: 'Loại E', giakinhdoanh: 'GP005', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/download-1.png', nguoidaidien: 'Người 5', chinhanh: 'Chi nhánh E', ngaythanhlap: '05/05/2022', fanpageCty: 'https://facebook.com/abx-company', ghiChu: 'Ghi chú 5', tinhTrang: 'Hoạt động' },
//     { id: 6, stt: 6, tenCongty: 'Công ty WXYZ', maCty: 'P006', diaChi: 'Phòng 106', email: 'info@wxyzco.com', sdt: '3333222111', website: 'https://wxyzcompany.com', masothue: 'JKL303', loaiCty: 'Loại F', giakinhdoanh: 'GP006', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 6', chinhanh: 'Chi nhánh F', ngaythanhlap: '06/06/2022', fanpageCty: 'https://facebook.com/wxyz-corp', ghiChu: 'Ghi chú 6', tinhTrang: 'Ngừng hoạt động' },
//     { id: 7, stt: 7, tenCongty: 'Công ty QRS', maCty: 'P007', diaChi: 'Phòng 107', email: 'contact@qrsco.com', sdt: '8888666555', website: 'https://qrscompany.com', masothue: 'PQR123', loaiCty: 'Loại G', giakinhdoanh: 'GP007', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 7', chinhanh: 'Chi nhánh G', ngaythanhlap: '07/07/2022', fanpageCty: 'https://facebook.com/qrs-company', ghiChu: 'Ghi chú 7', tinhTrang: 'Hoạt động' },
//     { id: 8, stt: 8, tenCongty: 'Công ty MNOP', maCty: 'P008', diaChi: 'Phòng 108', email: 'info@mnopco.com', sdt: '4444333222', website: 'https://mnopcompany.com', masothue: 'ABCDEF', loaiCty: 'Loại H', giakinhdoanh: 'GP008', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 8', chinhanh: 'Chi nhánh H', ngaythanhlap: '08/08/2022', fanpageCty: 'https://facebook.com/mnop-corp', ghiChu: 'Ghi chú 8', tinhTrang: 'Ngừng hoạt động' },
//     { id: 9, stt: 9, tenCongty: 'Công ty EFG', maCty: 'P009', diaChi: 'Phòng 109', email: 'contact@efgco.com', sdt: '9999888777', website: 'https://efgcompany.com', masothue: 'LMN456', loaiCty: 'Loại I', giakinhdoanh: 'GP009', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 9', chinhanh: 'Chi nhánh I', ngaythanhlap: '09/09/2022', fanpageCty: 'https://facebook.com/efg-company', ghiChu: 'Ghi chú 9', tinhTrang: 'Hoạt động' },
//     { id: 10, stt: 10, tenCongty: 'Công ty HIJK', maCty: 'P010', diaChi: 'Phòng 110', email: 'info@hijkco.com', sdt: '2222111333', website: 'https://hijkcompany.com', masothue: 'QRS789', loaiCty: 'Loại J', giakinhdoanh: 'GP010', logo_img: 'https://maludesign.vn/wp-content/uploads/2021/11/logo-cong-ty-xay-dung-6_1586786415-800x800.png', nguoidaidien: 'Người 10', chinhanh: 'Chi nhánh J', ngaythanhlap: '10/10/2022', fanpageCty: 'https://facebook.com/hijk-corp', ghiChu: 'Ghi chú 10', tinhTrang: 'Ngừng hoạt động' },
// ];

const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
};

export default function CompanyTable() {
    const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = React.useState(false);
    const [state, dispatch] = useApp();
    const { company } = state;
    const { companies } = company;

    // console.log(companies[0]);

    useEffect(() => {
        const listData = async () => {
            const res = await listCompanyApi();
            dispatch({
                type: HANDLERS_COMPANY.LIST_COMPANY,
                payload: res.data,
            });
        };
        listData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const companyWithSTT = Array.isArray(companies[0]) ? companies[0].map((company, index) => ({
        ...company,
        stt: index + 1,
        id: company.id || index + 1,
    })) : [];

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
        {
            field: 'logo_img',
            headerName: 'Logo',
            width: 120,
            renderCell: (params) => (
                <Avatar
                    src={params.row.logo_img}
                    alt="Logo"
                    sx={{ width: 40, height: 40 }}
                >Logo</Avatar>
            ),
        },
        { field: 'companyName', headerName: 'Tên công ty', width: 200 },
        { field: 'briefCode', headerName: 'Mã công ty', width: 130 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'email', headerName: 'Email', width: 120 },
        { field: 'telephone', headerName: 'Số điện thoại', width: 120 },
        { field: 'website', headerName: 'Website', width: 120 },
        { field: 'taxCode', headerName: 'Mã số thuế', width: 120 },
        { field: 'typeCompany', headerName: 'Loại công ty', width: 120 },
        { field: 'licenseBusiness', headerName: 'Giấy phép kinh doanh', width: 120 },
        { field: 'personResponsibilty', headerName: 'Người đại diện (chức vụ)', width: 120 },
        { field: 'companyBranchId', headerName: 'Chi nhánh', width: 120 },
        {
            field: 'establishCompanyDate',
            headerName: 'Ngày thành lập',
            width: 120,
            renderCell: (params) => (
                <span>{formatDate(params.value)}</span>
            ),
        },
        { field: 'fanpage', headerName: 'Fanpage công ty', width: 120 },
        { field: 'description', headerName: 'Ghi chú', width: 120 },
        { field: 'status', headerName: 'Tình trạng', width: 120 },
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
        nguoidaidien: false,
        chinhanh: false,
        ngaythanhlap: false,
        fanpageCty: false,
        ghiChu: false,
    });

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
                rows={companyWithSTT}
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
            <CompanyEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.id : ""}
            />
        </div>
    );
}
