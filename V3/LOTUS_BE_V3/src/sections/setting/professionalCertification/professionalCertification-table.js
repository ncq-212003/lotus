import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import ModalDetail from "../../../components/modal-detail";
import ActionColumn from "src/components/action-column ";
import CertificationEdit from "./professionalCertification-edit";
import { HANDLERS_CERTIFICATION } from "src/contexts/reducer/setting/reducer-certification";
import { listCertificationApi } from "src/contexts/api/setting/api-certification";
import { useApp } from "src/hooks/use-app";
import dayjs from 'dayjs';
import useFetchLocation from "src/contexts/api/location-api";

export default function ProfessionalCertificationTable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const { cities, districts, wards } = useFetchLocation(cityId, districtId);
  const [state, dispatch] = useApp();
  const { certification } = state;
  const { certifications } = certification;

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
    { field: "stt", headerName: "STT", width: 50 },
    { field: "certificationCompanyName", headerName: "Công ty", width: 200 },
    { field: "transactionName", headerName: "Tên giao dịch", width: 180 },
    { field: "type", headerName: "Loại hình doanh nghiệp", width: 400 },
    { field: "nameCity", headerName: "Địa điểm đặt trụ sở", width: 150 },
    { field: "address", headerName: "Địa chỉ công ty", width: 220 },
    { field: "phone", headerName: "Số điện thoại", width: 120 },
    { field: "fax", headerName: "Số fax", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "registerDate", headerName: "Ngày đăng ký", width: 150 },
    { field: "licenseDate", headerName: "Ngày cấp giấy phép", width: 180 },
    { field: "description", headerName: "Thông tin khác", width: 200 },
    { field: "representative", headerName: "Người đại diện", width: 200 },
    { field: "jobRepresentative", headerName: "Chức vụ đại diện", width: 200 },
    { field: "reprentivePhone", headerName: "Điện thoại người đại diện", width: 200 },
    { field: "signaturePersonName", headerName: "Người ký CV", width: 200 },
    { field: "jobSignaturePersonName", headerName: "Chức danh người ký CV", width: 180 },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listCertificationApi();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_CERTIFICATION.LIST_CERTIFICATION,
            payload: response.data
          })
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi .Vui lòng kiểm tra lại ")
      }
    }
    fetchData();
  }, [])

  const rowData = Array.isArray(certifications) ? certifications.map((cer, index) => ({
    ...cer,
    stt: index + 1,
    id: cer.id || index + 1,
    nameCity: cities.find((item) => item.value === cer.locationId)?.label,
    registerDate: cer.registerDate ? dayjs(cer.registerDate).format('DD/MM/YYYY') : '',
    licenseDate: cer.licenseDate ? dayjs(cer.licenseDate).format('DD/MM/YYYY') : '',
  })) : []

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ margin: "12px 0px", width: "50%" }}
          size="small"
          label="Nhập nội dung tìm kiếm"
          variant="outlined"
        />
        <Button
          sx={{
            margin: "8px",
            backgroundColor: "#1C2536",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Tìm kiếm
        </Button>
      </Box>
      <DataGrid
        rows={rowData}
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
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />

      <CertificationEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.id : ""}
      />
    </div>
  );
}
