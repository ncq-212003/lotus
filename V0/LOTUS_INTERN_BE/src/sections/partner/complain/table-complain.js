import * as React from "react";
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
  {
    id: 1,
    stt: "1",
    nghiepdoan: "Doanh nghiệp A",
    ten: "La thị Hòa",
    loiphatsinh: "Trốn việc nhiều lần",
    congty: "Công ty Kouyu kogyo",
    ngaytiepnhan: "01/05/2023",
    phuonganxuly: "Gọi điện và làm việc online",
    ketqua: "Đã gọi điện và bạn hứa sẽ thay đổi",
    nguoixuly: "Phạm Thái Thảo",
    ghichu: "Mạnh tay",
    trangthai: "Đã xong",
  },
  {
    id: 2,
    stt: "2",
    nghiepdoan: "Doanh nghiệp B",
    ten: "Lê Thị Mai",
    loiphatsinh: "Làm việc không đúng quy trình",
    congty: "Cty ABC",
    ngaytiepnhan: "20/05/2023",
    phuonganxuly: "Hướng dẫn lại quy trình làm việc",
    ketqua: "Nhân viên đã hiểu và tuân thủ quy trình",
    nguoixuly: "Phạm Văn Đông",
    ghichu: "Cần theo dõi và đánh giá hiệu quả",
    trangthai: "Đang xử lý",
  },
  {
    id: 3,
    stt: "3",
    nghiepdoan: "Doanh nghiệp D",
    ten: "Trần Văn Nam",
    loiphatsinh: "Lạm dụng tài sản công ty",
    congty: "Cty Alpha",
    ngaytiepnhan: "10/06/2023",
    phuonganxuly: "Kiểm tra và thu hồi tài sản",
    ketqua: "Tài sản đã được thu hồi, đưa ra quy trình xử lý",
    nguoixuly: "Nguyễn Thị Hương",
    ghichu: "Cần báo cáo lãnh đạo và đề xuất biện pháp phòng ngừa",
    trangthai: "Đang xử lý",
  },
  {
    id: 4,
    stt: "4",
    nghiepdoan: "Doanh nghiệp A",
    ten: "Nguyễn Thị An",
    loiphatsinh: "Vi phạm quy tắc an toàn lao động",
    congty: "Cty XYZ",
    ngaytiepnhan: "15/05/2023",
    phuonganxuly: "Tổ chức đào tạo lại về an toàn lao động",
    ketqua: "Hoàn thành đào tạo, áp dụng quy tắc",
    nguoixuly: "Trần Văn Bình",
    ghichu: "Cần theo dõi định kỳ",
    trangthai: "Đang xử lý",
  },
  {
    id: 5,
    stt: "5",
    nghiepdoan: "Doanh nghiệp E",
    ten: "Hoàng Văn Long",
    loiphatsinh: "Lừa đảo đối tác kinh doanh",
    congty: "Cty Delta",
    ngaytiepnhan: "18/06/2023",
    phuonganxuly: "Khởi kiện và yêu cầu bồi thường",
    ketqua: "Đối tác đã đồng ý bồi thường thiệt hại",
    nguoixuly: "Trần Thị Ngọc",
    ghichu: "Theo dõi tình hình quan hệ đối tác",
    trangthai: "Đã xong",
  },
];

export default function TableCompalain() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditComplain = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEditComplain = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "nghiepdoan", headerName: "Nghiệp đoàn", width: 150 },
    { field: "ten", headerName: "Tên", width: 160 },
    { field: "loiphatsinh", headerName: "Lỗi phát sinh", width: 300 },
    { field: "congty", headerName: "Công ty", width: 200 },
    { field: "ngaytiepnhan", headerName: "Ngày tiếp nhận", width: 160 },
    { field: "phuonganxuly", headerName: "Phương án xử lý", width: 300 },
    { field: "ketqua", headerName: "Kết quả", width: 350 },
    { field: "nguoixuly", headerName: "Người xử lý", width: 160 },
    { field: "ghichu", headerName: "Ghi chú", width: 300 },
    { field: "trangthai", headerName: "Trạng thái", width: 160 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditComplain}
          params={params}
        />
      ),
    },
  ];

  return (

    <Stack
      spacing={1}
      sx={{
        margin: "30px 0px",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center'
        }}
      >
        <TextField
          sx={{ margin: "5px 0px", width: '50%' }}
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

      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleViewDetail}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
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
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <ModalDetail
        open={isModalDetailOpen}
        onClose={handleCloseDetail}
        rowData={selectedRow}
        columns={columns}
      />
    </Stack>
  );
}
