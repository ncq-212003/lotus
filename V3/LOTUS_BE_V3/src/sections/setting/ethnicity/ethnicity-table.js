/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { useEffect } from "react";
import { useState } from "react";
import { listEthnicApi } from "src/contexts/api/setting/api-ethnicity";
import { HANDLERS_ETHNIC } from "src/contexts/reducer/setting/reducer-ethnic";
import ActionColumn from "src/components/action-column ";
import EthnicEdit from "./ethnicity-edit";
import { SearchName } from "src/components/search-name";


export default function EthnicityTable() {
  // sate
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
  // context
  const [state, dispatch] = useApp();
  const { ethnic } = state;
  const { ethnics } = ethnic;



  //hàm search
  const [filteredName, setFilteredName] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);

  const handleSearch = (searchValue) => {
    if (searchValue === null) {
      setFilteredName(dataWithSTT);
    } else {
      const filteredData = dataWithSTT.filter((item) =>
        item.ethnicName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredName(filteredData);
    }
  };


  useEffect(() => {
    if (isLoadData === true) {
      setFilteredName(dataWithSTT);
    }
  }, [isLoadData])

  const dataWithSTT = Array.isArray(ethnics) ? ethnics.map((x, index) => ({
    ...x,
    stt: index + 1,
    id: x.id || index + 1,
  })) : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listEthnicApi();
        if (response.status == 200) {
          dispatch({
            type: HANDLERS_ETHNIC.LIST_ETHNIC,
            payload: response.data,
          });
        }
        setIsLoadData(true);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, []);



  const handleViewDetail = (params) => {
    setSelectedRow(params.row);
    setIsModalDetailOpen(true);
  };

  const openDialogEdit = (params) => {
    setSelectedRow(params.row);
    setisDialogEditOpen(true);
  };

  const closeDialogEdit = () => {
    setisDialogEditOpen(false);
  };

  const closeModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "ethnicName",
      headerName: "Dân tộc",
      width: 200,
    },
    {
      field: "code",
      headerName: "Mã ( phân biệt )",
      width: 200,
    },
    {
      field: "marketId",
      headerName: "Thị trường",
      width: 200,
    },
    {
      field: "description",
      headerName: "Ghi chú",
      width: 220,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <ActionColumn
            handleViewDetail={handleViewDetail}
            openDialogEdit={openDialogEdit}
            params={params}
          />
        </>
      ),
    },
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({

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
    <div style={{ width: "100%" }}>

      <SearchName name="Dân tộc" listData={dataWithSTT} optionName="ethnicName" onSearch={handleSearch} />
      <DataGrid
        rows={filteredName}
        columns={columns}
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
        // columnVisibilityModel={columnVisibilityModel}
        // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ModalDetail
        open={isModalDetailOpen}
        onClose={closeModalDetail}
        rowData={selectedRow}
        columns={columns}
      />
      <EthnicEdit
        open={isDialogEditOpen}
        onClose={closeDialogEdit}
        id={selectedRow ? selectedRow.ethnicId : ""}
      />
    </div>
  );
}
