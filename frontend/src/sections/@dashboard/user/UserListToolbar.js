import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Toolbar, IconButton, Typography, OutlinedInput, InputAdornment, Menu, MenuItem, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, queryType, setQueryType }) {
  // const [filterType, setFilterType] = React.useState('First Name');
  const filterTypes = ['firstname', 'location', 'age', 'price'];
  const filterNames = ['First Name', 'Location', 'Age', 'Price'];
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="ic:round-filter-list" />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 300, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {filterTypes.map((type, index) => (
          <MenuItem key={index} selected={type === queryType} onClick={() => setQueryType(type)}>
            <ListItemText primary={filterNames[index]} />
          </MenuItem>))}
      </Menu>
    </RootStyle>
  );
}
