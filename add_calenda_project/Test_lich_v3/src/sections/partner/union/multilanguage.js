import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { Delete } from '@mui/icons-material';

const LanguageInput = ({
    index,
    selectedLanguage,
    remainingLanguages,
    handleLanguageSelect,
    handleInputChange,
    handleRemoveInput,
    value,
    label
}) => {
    const handleAutocompleteClear = () => {
        handleLanguageSelect(index, null);
    };
    return (
        <div style={{ display: "flex", alignItems: "center", margin: "0 16px 8px 16px " }}>
            <Grid container>
                <Grid item xs={4}>
                    <Autocomplete
                        options={remainingLanguages}
                        value={selectedLanguage || ""}
                        onChange={(event, newValue) => handleLanguageSelect(index, newValue)}
                        onClear={false}
                        sx={{ flex: 1, mr: 1 }}
                        renderInput={(params) => <TextField {...params} label="Ngôn ngữ" variant="outlined" />}
                        size="small"
                        clearIcon={null}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label={label}
                        value={value}
                        fullWidth
                        onChange={(event) => handleInputChange(index, event.target.value)}
                        sx={{ flex: 1, mr: 1 }}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <IconButton onClick={() => handleRemoveInput(index)} size="small" sx={{ marginLeft: "8px", color: 'black' }}>
                <Delete />
            </IconButton>
        </div>
    );
};

const MultiLanguageComponent = ({ inputValues, setInputValues, label }) => {
    const allLanguages = ["Nhật", "Anh", "Trung Quốc"];
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    // const [remainingLanguages, setRemainingLanguages] = useState(allLanguages.filter((lang) => !selectedLanguages.includes(lang)));
    const [remainingLanguages, setRemainingLanguages] = useState([]);

    useEffect(() => {
        setRemainingLanguages(allLanguages.filter((lang) => !selectedLanguages.includes(lang)));
    }, [selectedLanguages]);

    const [numberOfRows, setNumberOfRows] = useState(inputValues.length);

    const handleAddInput = () => {
        if (remainingLanguages.length > 0 && numberOfRows < allLanguages.length) {
            setInputValues((prevInputValues) => [...prevInputValues, ""]);
            setNumberOfRows(prevRows => prevRows + 1);
        }
    };

    const handleInputChange = (index, value) => {
        setInputValues((prevInputValues) => {
            const updatedInputValues = [...prevInputValues];
            updatedInputValues[index] = value;
            return updatedInputValues;
        });
    };

    const handleLanguageSelect = (index, selectedLanguage) => {
        // Kiểm tra xem ngôn ngữ đã được chọn trước đó chưa
        if (!selectedLanguages.includes(selectedLanguage)) {
            // Cập nhật selectedLanguages cho input thứ index
            const updatedSelectedLanguages = [...selectedLanguages];
            updatedSelectedLanguages[index] = selectedLanguage;
            setSelectedLanguages(updatedSelectedLanguages);
        }
    };

    const handleRemoveInput = (index) => {
        const removedLanguage = selectedLanguages[index];

        // Xóa ngôn ngữ khỏi selectedLanguages
        const updatedSelectedLanguages = [...selectedLanguages];
        updatedSelectedLanguages.splice(index, 1);
        setSelectedLanguages(updatedSelectedLanguages);

        // Xóa giá trị tại index
        setInputValues((prevInputValues) => {
            const updatedInputValues = [...prevInputValues];
            updatedInputValues.splice(index, 1);
            return updatedInputValues;
        });

        // Nếu ngôn ngữ bị xóa tồn tại, thì thêm lại vào remainingLanguages
        if (removedLanguage) {
            const updatedRemainingLanguages = [...remainingLanguages, removedLanguage];
            setRemainingLanguages(updatedRemainingLanguages);
        }

        // Giảm số hàng
        setNumberOfRows((prevRows) => prevRows - 1);
    };



    return (
        <div>
            {inputValues.map((value, index) => (
                <LanguageInput
                    key={index}
                    index={index}
                    selectedLanguage={selectedLanguages[index]}
                    remainingLanguages={remainingLanguages}
                    handleLanguageSelect={handleLanguageSelect}
                    handleInputChange={handleInputChange}
                    handleRemoveInput={handleRemoveInput}
                    value={value}
                    label={label}
                />
            ))}
            <Button
                size="small"
                onClick={handleAddInput}
                disabled={remainingLanguages.length === 0 || numberOfRows >= allLanguages.length}
                sx={{ padding: "0 12px 0 12px", margin: "-8px auto 4px 8px" }}
            >
                Thêm ngôn ngữ
            </Button>
        </div>
    );
};


export default MultiLanguageComponent;
