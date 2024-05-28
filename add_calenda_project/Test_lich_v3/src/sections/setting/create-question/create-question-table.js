import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ActionColumn from "src/components/action-column ";
import ModalDetail from "src/components/modal-detail";
import CreateQuestionEdit from "./create-question-edit";

// Dữ liệu mẫu
const rows = [
  {
    stt: 1,
    id: 1,
    questionName: "Bạn có người thân bên Nhật không",
    type: "2",
    category: "Người thân bên Nhật",
    order: "1",
    options: ["Có người thân bên nhật ", " Không có người thân bên nhật"],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 2,
    id: 2,
    questionName: "Quan hệ với bạn thế nào",
    type: "1",
    category: "Người thân bên Nhật",
    order: "2",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 3,
    id: 3,
    questionName: "Thời gian tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "3",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 4,
    id: 4,
    questionName: "Nơi làm việc",
    type: "1",
    category: "Người thân bên Nhật",
    order: "4",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 5,
    id: 5,
    questionName: "Điện thoại/Facebook của họ",
    type: "1",
    category: "Người thân bên Nhật",
    order: "5",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 6,
    id: 6,
    questionName: "Họ tên người thân tại Nhật",
    type: "1",
    category: "Người thân bên Nhật",
    order: "6",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 7,
    id: 7,
    questionId: "7",
    questionName: "Sở thích cá nhân",
    type: "1",
    category: "Sở thích tính cách",
    order: "7",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  },
  {
    stt: 8,
    id: 8,
    questionName: "Nhược điểm",
    type: "1",
    category: "Sở thích tính cách",
    order: "8",
    options: [],
    position: "Thực tập sinh",
    required: "Có",
  }
];

export default function CreateQuestionTable() {
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
    { field: "stt", headerName: "STT", width: 30 },
    {
      field: "questionName",
      headerName: "Tên câu hỏi",
      width: 180,
    },
    {
      field: "type",
      headerName: "Kiểu câu hỏi",
      width: 100,
    },
    {
      field: "category",
      headerName: "Nhóm câu hỏi",
      width: 180,
    },
    {
      field: "order",
      headerName: "Thứ tự câu hỏi",
      width: 100,
    },
    {
      field: "options",
      headerName: "Lựa chọn câu trả lời",
      width: 190,
    },
    {
      field: "position",
      headerName: "Vị trí câu hỏi",
      width: 110,
    },
    {
      field: "required",
      headerName: "Yêu cầu bắt buộc",
      width: 110,
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
    moTa: false,
    ghiChu: false,
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: "rgb(224, 224, 224)",
          "& .MuiDataGrid-row": {
            border: "0.1px solid rgb(224, 224, 224) !important",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <CreateQuestionEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
