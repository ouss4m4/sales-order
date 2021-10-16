import React, { FC, useCallback } from 'react';
import { Stack, TextField, Autocomplete } from '@mui/material';
import { debounceFn } from './debounceFn';

interface Props {
  options: { [key: string]: any }[];
  showByKey: string;
  label?: string;
  onOptionSelected: (opt: any) => void;
  onInputChange: (val: string) => void;
}

const AutoComp: FC<Props> = ({
  options,
  showByKey,
  label,
  onOptionSelected,
  onInputChange,
}) => {
  const optionChange = (e: any, val: string) => {
    const selected = options.find((opt) => opt[showByKey] === val);
    onOptionSelected(selected);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const debounced = useCallback(debounceFn(inputChange, 250), []);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        onChange={(a, b, c, d) => optionChange}
        freeSolo
        disableClearable
        options={options.map((option) => option[showByKey])}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ? label : 'Search'}
            onChange={debounced}
          />
        )}
      />
    </Stack>
  );
};

export default AutoComp;
