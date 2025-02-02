import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MarketSelect() {
    return (
        <Autocomplete
            id="country-select-demo"
            size='small'
            sx={{ width: 300,paddingLeft:'16px' }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    variant='outlined'
                    size='small'
                    {...params}
                    label="Chọn thị trường"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}

const countries = [
    { code: 'JP', label: 'Nhật Bản' },
    {
        code: 'Kr',
        label: 'Hàn Quốc',
    },
    { code: 'AU', label: 'Úc' },
    {
        code: 'FR',
        label: 'Pháp',
    },
    { code: 'CA', label: 'Canada' }
];