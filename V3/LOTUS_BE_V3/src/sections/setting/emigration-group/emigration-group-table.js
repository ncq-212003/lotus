/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import ModalDetail from "../../../components/modal-detail";
import { useApp } from "src/hooks/use-app";
import { ListDocumentApi } from "src/contexts/api/setting/api-document";
import { HANDLERSDOCUMENT } from "src/contexts/reducer/setting/reducer-document";
import { useEffect } from "react";
import { useState } from "react";
import { listEmigrarionGroupApi } from "src/contexts/api/setting/api-emigration-group";
import { HANDLERS_EMIGRATION_GROUP } from "src/contexts/reducer/setting/reducer-emigration-group";
import ActionColumn from "src/components/action-column ";
import EmigrationGroupEdit from "./emigration-group-edit";


export default function EmigrationGroupTable() {
    // sate
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDialogEditOpen, setisDialogEditOpen] = useState(false);
    // context
    const [state, dispatch] = useApp();
    const { emigrationGroup } = state;
    const { emigrationGroups } = emigrationGroup;

    const dataWithSTT = Array.isArray(emigrationGroups) ? emigrationGroups.map((x, index) => ({
        ...x,
        stt: index + 1,
        id: x.id || index + 1,
    })) : [];

    console.log(dataWithSTT);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listEmigrarionGroupApi();
                if (response.status == 200) {
                    dispatch({
                        type: HANDLERS_EMIGRATION_GROUP.LIST_EMIGRATION_GROUP,
                        payload: response.data,
                    });
                }
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

    const closeModalDetail = () => {
        setIsModalDetailOpen(false);
    };

    const openDialogEdit = (params) => {
        setSelectedRow(params.row);
        setisDialogEditOpen(true);
    };

    const closeDialogEdit = () => {
        setisDialogEditOpen(false);
    };

    const columns = [
        {
            field: "stt",
            headerName: "STT",
            width: 50,
        },
        {
            field: "exitGroupName",
            headerName: "Nhóm xuất cảnh",
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

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({

    });

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
                    label="Nhập tên nhóm xuất cảnh tìm kiếm"
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
                rows={dataWithSTT}
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
            <EmigrationGroupEdit
                open={isDialogEditOpen}
                onClose={closeDialogEdit}
                id={selectedRow ? selectedRow.exitGroupId : ""}
            />
        </div>
    );
}
