import React, { FC, useEffect, useMemo, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import Icon from '@mui/material/Icon';
import FormHelperText from '@mui/material/FormHelperText';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, ListSubheader } from '@mui/material';
import _ from 'lodash';
import { containsText } from 'utiles/utile';
import SearchBox, { SelectDivider } from './searchBox';

interface SelectOptionType {
  value: number | string;
  text: string;
}

interface IProps {
  id: string;
  label?: string;
  options: { [key: string]: Object }[];
  fields: {
    text: string;
    value: string;
  };
  value?: string | number;
  onChange: (selected: number | string) => void;
  renderValue?: (value: number | string) => React.ReactNode;
  renderOption?: (option: SelectOptionType) => React.ReactNode;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  labelTooltipText?: string;
  enableSearch?: boolean;
  searchBarPlaceholder?: string;
  disabled?: boolean;
  placeholder?: string;
  showInputAdornment?: boolean;
  footer?: React.ReactNode;
  multiple?: boolean;
}

const Select: FC<IProps> = ({
  id,
  label,
  onChange,
  value,
  options,
  fields,
  renderValue,
  required,
  error,
  helperText,
  labelTooltipText,
  enableSearch,
  searchBarPlaceholder,
  disabled,
  placeholder,
  showInputAdornment = true,
  footer,
  multiple,
  renderOption,
}) => {
  const [data, setData] = useState<SelectOptionType[]>([]);
  const [selected, setSelected] = useState<number | string | undefined>('');
  const [searchText, setSearchText] = useState('');

  const [open, setOpen] = useState(false);

  const displayedOptions = useMemo(
    () => data.filter((option) => containsText(option.text, searchText)),
    [searchText, data]
  );

  useEffect(() => {
    if (!options) return;
    const temp = options.map((option) => ({
      value: `${option[fields.value]}`,
      text: `${option[fields.text]}`,
    }));
    setData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (options?.length) {
      setSelected(value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedOptions]);

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;

    const userSelectedOption = options.find((option) => {
      const optionsValue = _.get(option, fields.value);
      // eslint-disable-next-line eqeqeq
      return selectedValue == optionsValue;
    });
    if (userSelectedOption) {
      const val = userSelectedOption[fields.value] as string | number;
      onChange(val);
    } else {
      onChange('');
    }
    setSelected(event.target.value);
  };

  const handleClearClick = () => {
    onChange('');
    setSelected('');
  };

  const handleClose = () => {
    setOpen(false);
    setSearchText('');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl
      variant="standard"
      fullWidth
      margin="dense"
      required={required}
      error={error}
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
      <MuiSelect
        id={id}
        labelId={`${id}-label`}
        value={selected || ''}
        label={label}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        disabled={disabled}
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
        endAdornment={
          selected && showInputAdornment ? (
            <InputAdornment
              position="end"
              sx={{ position: 'absolute', right: '0' }}
            >
              <IconButton
                sx={{
                  visibility: required ? 'hidden' : 'visible',
                  marginRight: '4px',
                }}
                onClick={handleClearClick}
                data-testid="clear-select"
              >
                {' '}
                <ClearIcon sx={{ width: '16px', height: '16px' }} />
              </IconButton>
            </InputAdornment>
          ) : null
        }
        renderValue={renderValue}
        multiple={multiple}
      >
        {enableSearch && (
          <ListSubheader sx={{ p: 0, lineHeight: '36px' }}>
            <SearchBox
              autoFocus
              placeholder={searchBarPlaceholder || 'Type to search'}
              fullWidth
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setSearchText(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
            <SelectDivider />
          </ListSubheader>
        )}
        {placeholder && (
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {displayedOptions?.length ? (
          displayedOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {renderOption ? renderOption(option) : option.text}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Box textAlign="center" width="100%">
              <em>No options</em>
            </Box>
          </MenuItem>
        )}
        {footer && (
          <Box
            onClick={() => {
              setOpen(false);
            }}
          >
            {footer}
          </Box>
        )}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
