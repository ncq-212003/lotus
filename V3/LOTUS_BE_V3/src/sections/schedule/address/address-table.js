import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";
import ModalDetail from "src/components/modal-detail";
import EditFormAddress from "./address-edit-form";
import Rating from '@mui/material/Rating';
import ActionColumn from "src/components/action-column ";
import { useApp } from "src/hooks/use-app";
import { HANDLERS_ADDRESS } from "src/contexts/reducer/schedule/reudecer-address";
import { listAddress } from "src/contexts/api/schedule/api-address";
import useFetchLocation, { fetchCities, fetchDistricts, fetchWards } from "src/contexts/api/location-api";

export default function Addresstable() {
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenEditFormAddress, setIsOpenEditAddress] = useState(false);
  const [state, dispatch] = useApp();
  const { address } = state;
  const { addresses } = address;
  const [listDataTable, setListDataTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listAddress();
        if (response.status === 200) {
          dispatch({
            type: HANDLERS_ADDRESS.LIST_ADDRESS,
            payload: response.data,
          });
        }
      } catch (error) {
        console.log("Đã xảy ra lỗi !!!", error);
      }
    };
    fetchData();
  }, []);

  const [typeCalendar, setTypeCalendar] = useState([
    { id: 1, name: "Nhà hàng" },
    { id: 2, name: "Quán cà phê" },
    { id: 3, name: "Sân bay" },
    { id: 4, name: "Họp" },
    { id: 5, name: "Khác" },
  ])

  useEffect(() => {
    const updateListDataTable = async () => {
      const updatedList = await Promise.all(
        addresses.map(async (add, index) => {
          const { cityId, districtId, wardId } = add;

          // Gọi các hàm fetch thay vì hook ở đây
          const cities = await fetchCities();
          const districts = await fetchDistricts(cityId);
          const wards = await fetchWards(districtId);

          return {
            ...add,
            stt: index + 1,
            id: add.id || index + 1,
            nameCity: cities.find((city) => city.value === cityId)?.label,
            nameDistrict: districts.find((district) => district.value === districtId)?.label,
            nameWard: wards.find((ward) => ward.value === wardId)?.label,
            nameType: typeCalendar.find((type) => type.id === (parseInt(add.type) || 0))?.name
          };
        })
      );
      setListDataTable(updatedList);
    };
    updateListDataTable();
  }, [addresses])

  const handleViewDetail = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsModalDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleOpenEditFormAddress = (params) => {
    setSelectedRow(params.row); //lay gia tri cua dong do
    setIsOpenEditAddress(true);
  };

  const handleCloseEditAddress = () => {
    setIsOpenEditAddress(false);
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "placeName", headerName: "Tên địa điểm", width: 200 },
    { field: "manager", headerName: "Người liên hệ", width: 200 },
    { field: "contactPhone", headerName: "Số điện thoại ", width: 200 },
    { field: "nameCity", headerName: "Tỉnh/ Thành phố", width: 200 },
    { field: "nameDistrict", headerName: "Quận/ Huyện", width: 200 },
    { field: "nameWard", headerName: "Xã/ Phường", width: 200 },
    {
      field: "geoX",
      headerName: "Kinh độ",
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value}&deg;
        </div>
      ),
    },
    {
      field: "geoY",
      headerName: "Vĩ Độ",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value}&deg;
        </div>
      ),
    },
    { field: "nameType", headerName: "Loại", width: 150 },
    {
      field: "rate", headerName: "Đánh giá", width: 150,
      renderCell: (params) => (
        <Rating name="read-only" value={params.value} readOnly />
      ),
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => (
        <ActionColumn
          handleViewDetail={handleViewDetail}
          openDialogEdit={handleOpenEditFormAddress}
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
      <Box style={{ width: "100%" }}>
        <DataGrid
          rows={listDataTable}
          columns={columns}
          onRowClick={handleViewDetail}
          sx={{
            borderColor: "rgb(224, 224, 224)",
            "& .MuiDataGrid-row": {
              border: "0.1px solid rgb(224, 224, 224) !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f0f0f0",
              borderBottom: "1px solid #ccc ",
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
          onClose={handleCloseDetail}
          rowData={selectedRow}
          columns={columns}
        />

        <EditFormAddress
          openEditFormAdress={isOpenEditFormAddress}
          closeEditFormAdress={handleCloseEditAddress}
          id={selectedRow ? selectedRow.id : ""}
        />
      </Box>
    </Stack>
  );
}
