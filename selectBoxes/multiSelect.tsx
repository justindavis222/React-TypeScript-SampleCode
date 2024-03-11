import React, { FC, useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';
import ListSubheader from '@mui/material/ListSubheader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import theme from 'theme';
import { containsText } from 'utiles/utile';
import SearchBox, { SelectDivider } from './searchBox';

interface SelectAllProps {
  isAllSelected: boolean;
  handleChangeSelectAll: () => void;
}

const SelectAll: FC<SelectAllProps> = ({
  isAllSelected,
  handleChangeSelectAll,
}) => {
  return (
    <Box
      sx={{
        p: '0px 16px',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox checked={isAllSelected} onChange={handleChangeSelectAll} />
        }
        label={isAllSelected ? 'Unselect All' : 'Select All'}
        sx={{
          color: theme.palette.primary.main,
          marginLeft: 0,
        }}
      />
    </Box>
  );
};

export interface MultiSelectItem {
  id: number;
  lbl: string;
}

interface IProps {
  id: string;
  label?: string;
  disabled?: boolean;
  options: MultiSelectItem[];
  initialSelected: number[];
  onChange: (selected: number[]) => void;
  renderValue?: (value: number[]) => React.ReactNode;
  showFooter?: boolean;
  footer?: JSX.Element;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  labelTooltipText?: string;
  displayEmpty?: boolean;
}

const MultiSelect: FC<IProps> = ({
  id,
  label,
  disabled = false,
  options,
  initialSelected,
  onChange,
  renderValue,
  showFooter,
  footer,
  error,
  helperText,
  required,
  labelTooltipText,
  displayEmpty,
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');
  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option.lbl, searchText)),
    [searchText, options]
  );

  const hasOptions = displayedOptions.length > 0;
  const isAllSelected =
    hasOptions && selected.length === displayedOptions.length;

  useEffect(() => {
    setSelected((prev) => _.union(prev, initialSelected));
  }, [initialSelected]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const selectedItems = event.target.value as number[];
    setSelected(selectedItems);
  };

  const handleChangeSelectAll = () => {
    const values =
      selected.length === displayedOptions.length
        ? []
        : displayedOptions.map((option) => option.id);
    setSelected(values);
  };

  const handleClose = () => {
    onChange(selected);
    setSearchText('');
  };

  return (
    <FormControl
      variant="standard"
      fullWidth
      margin="dense"
      disabled={disabled}
      error={error}
      required={required}
    >
      {label && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          className="custom-label"
        >
          <InputLabel id={`${id}-label`} required={required} htmlFor={id}>
            {label}
          </InputLabel>
          {labelTooltipText && (
            <Tooltip arrow title={labelTooltipText}>
              <i className="fal fa-info-circle" />
            </Tooltip>
          )}
        </Stack>
      )}
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        multiple
        renderValue={renderValue}
        value={selected}
        onChange={handleChange}
        onClose={handleClose}
        label={label}
        displayEmpty={displayEmpty}
        MenuProps={{
          autoFocus: false,
          PaperProps: {
            style: {
              maxHeight: 250,
            },
          },
        }}
        IconComponent={(props) => (
          <Icon
            {...props}
            className={`far fa-chevron-down ${props.className}`}
          />
        )}
      >
        <ListSubheader sx={{ p: 0 }}>
          <SearchBox
            autoFocus
            placeholder="Type to search..."
            fullWidth
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setSearchText(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key !== 'Escape') {
                e.stopPropagation();
              }
            }}
          />
          <SelectDivider />
          {hasOptions && (
            <>
              <SelectAll
                isAllSelected={isAllSelected}
                handleChangeSelectAll={handleChangeSelectAll}
              />
              <SelectDivider />
            </>
          )}
        </ListSubheader>
        {hasOptions ? (
          displayedOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={selected.indexOf(option.id) > -1} />
              <ListItemText primary={option.lbl} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Box textAlign="center" width="100%">
              <em>No options</em>
            </Box>
          </MenuItem>
        )}
        {showFooter && footer}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelect;
