import React from "react";
import { TextField, Box, Button, Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

export const SearchName = ({ name, listData, optionName, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue === null) {
            handleSearch();
        }
    }, [searchValue]);

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center'
            }}
        >
            <Autocomplete
                freeSolo // cho phép nhập giá trị tự do
                sx={{ margin: "12px 0px", width: '50%' }}
                disableClearable // ẩn nút xóa
                size="small"
                onChange={(event, newValue) => {
                    setSearchValue(newValue);
                }}
                options={listData.map((option) => option[optionName])}
                onKeyDown={handleEnterPress}
                onBlur={(event) => {
                    // Kiểm tra nếu người dùng không chọn gì mà rời khỏi trường nhập liệu
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        // Chỉ đặt giá trị thành null nếu event.target.value (giá trị hiện tại của trường nhập liệu) là rỗng
                        if (!event.target.value) {
                            setSearchValue(null);
                        } else {
                            setSearchValue(event.target.value);
                        }
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={`Nhập tên ${name}`}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <Button
                onClick={handleSearch}
                sx={{
                    margin: '8px',
                    backgroundColor: '#1C2536',
                    color: 'white'
                }}
                size='small'
                variant="contained"
            >Tìm kiếm</Button>
        </Box>
    )
}