import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const SearchType = styled(FormControl)({
    '& label.Mui-focused': {
        color: 'fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#aac0f0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',

        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'fff',
        },
    },
});

interface IFilterProps {
    setSearchType: (str: string) => void,
    typeSearch: string
}

export default function Filter({ setSearchType, typeSearch }: IFilterProps) {


    const handleChange = (event: SelectChangeEvent) => {
        setSearchType(event.target.value);
    };

    return (
        <SearchType sx={{ minWidth: 150, color: '#707C97' }}>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={typeSearch}
                onChange={handleChange}
                autoWidth
            >
                <MenuItem value={'messages'}>сообщения</MenuItem>
                <MenuItem value={'author'}>автор</MenuItem>
            </Select>
        </SearchType>
    );
}
