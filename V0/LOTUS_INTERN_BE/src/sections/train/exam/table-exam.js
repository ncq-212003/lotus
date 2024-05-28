import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useRouter } from "next/router";
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import ActionColumn from "src/components/action-column ";

const rows = [
  {
    id: 1,
    stt: 1,
    sotailieu: "LotusBT01",
    nghiepdoan: "Công ty a",
    tenbaithi: "Kiểm tra tiếng Nhật JLPT ",
    nganhnghe: "Y tế",
    ghichu: "Ghi chú lại các luận điểm chính trong văn bản",
    loaibaithi: "Trắc nghiệm",
    thoigianthi: "90 phút",
    trangthaibaithi: "Hoạt động",
  },
  {
    id: 2,
    stt: 2,
    sotailieu: "LotusBT02",
    nghiepdoan: "Công ty b",
    tenbaithi: "Đánh giá năng lực học tập EJU ",
    nganhnghe: "Xáy dựng",
    ghichu: "Tập trung vào phần đọc hiểu ",
    loaibaithi: "Trắc nghiệm",
    thoigianthi: "45 phút",
    trangthaibaithi: "Hoạt động",
  },
  {
    id: 3,
    stt: 3,
    sotailieu: "LotusBT03",
    nghiepdoan: "Công ty c",
    tenbaithi: "Đánh giá khả năng giao tiếp J.TEST ",
    nganhnghe: "Công nghệ chế biến",
    ghichu: "Nghiên cứu kỹ về phần giao tiếp",
    loaibaithi: "Tự luận",
    thoigianthi: "30 phút",
    trangthaibaithi: "Dừng",
  },
  {
    id: 4,
    stt: 4,
    sotailieu: "IELTS2023",
    nghiepdoan: "Công ty c",
    tenbaithi: "Kiểm tra tiếng Anh IELTS",
    nganhnghe: "Du lịch",
    ghichu: "Thực hành kỹ năng nghe và nói thường xuyên",
    loaibaithi: "Trắc nghiệm",
    thoigianthi: "150 phút",
    trangthaibaithi: "Đang diễn ra",
  },
  {
    id: 5,
    stt: 5,
    sotailieu: "GRE2023",
    nghiepdoan: "Công ty d",
    tenbaithi: "Kiểm tra GRE",
    nganhnghe: "Nghiên cứu",
    ghichu: "Chuẩn bị tốt về các kiến thức chuyên ngành",
    loaibaithi: "Tự luận",
    thoigianthi: "240 phút",
    trangthaibaithi: "Sắp tới",
  }
  // Thêm các hàng dữ liệu lớp học khác ở đây
];

export default function ExamTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormPresent, setIsOpenEditPresent] = useState(false);
  const router = useRouter();
  const handleAddQuestion = (tenbaithi) => {
    const url = `/train/question?tenbaithi=${encodeURIComponent(tenbaithi)}`;
    router.push(url);
  };

  const handleAddPartQuestion = (tenbaithi) => {
    const url = `/train/part-question?tenbaithi=${encodeURIComponent(tenbaithi)}`;
    router.push(url);
  };

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsModalDetailOpen(true);
  }

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  }

  const handleOpenEditExam = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do 
    setIsOpenEditPresent(true);
  }

  const handleCloseEditExam = () => {
    setIsOpenEditPresent(false);
  }

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "sotailieu", headerName: "Số tài liệu", width: 150 },
    { field: "nghiepdoan", headerName: "Nghiệp đoàn", width: 130 },
    { field: "tenbaithi", headerName: "Tên bài thi", width: 250 },
    { field: "nganhnghe", headerName: "Ngành nghề", width: 200 },
    { field: "ghichu", headerName: "Ghi chú", width: 400 },
    { field: "loaibaithi", headerName: "Loại bài thi", width: 120 },
    { field: "thoigianthi", headerName: "Thời gian thi", width: 120 },
    { field: "trangthaibaithi", headerName: "Trạng thái bài thi", width: 130 },
    {
      field: "taophan",
      headerName: "Tạo phần",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary">
            <Button onClick={() => handleAddPartQuestion(params.row.tenbaithi)}>
              <AppRegistrationIcon />
            </Button>
          </IconButton>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "themcauhoi",
      headerName: "Thêm câu hỏi",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton color="primary">
            <Button onClick={() => handleAddQuestion(params.row.tenbaithi)}>
              <AutoStoriesIcon />
            </Button>
          </IconButton>
        </div>
      ),
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditExam}
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
      <Box style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // onRowClick={handleViewDetail}
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
