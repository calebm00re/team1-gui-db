import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import { UserRepository } from '../api/userRepository.js'
// import { Sitter } from '../models/sitter';
import ProfileImg from '../Assets/images/imgurl.jpg';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstname', label: 'Name', alignRight: false },
  // { id: 'nameL', label: 'Last Name', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, queryTerm) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if (queryTerm === 'firstname') {
      console.log('array: ');
      console.log(array);
      return filter(array, (_user) => _user.age.toString().indexOf(query.toLowerCase()) !== -1);
    }
    else if (queryTerm === 'location') {
      return filter(array, (_user) => _user.location.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Sitters() {
  const userRepository = new UserRepository();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstname');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sitters, setSitters] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [queryType, setQueryType] = useState('firstname');

  const getSitter = (i, sitterList) => {
    var sittersTemp = sitters;
    let currentSitter = sitterList[i];
    // console.log('sitterList[i]');
    // console.log(currentSitter);
    sittersTemp[i] = currentSitter;
    setSitters(sittersTemp);
  }

  const loadSitters = () => {
    userRepository.getSitters().then(res => {
      console.log('this is the response for get_sitters13: ')
      let allSitters = res.data;
      for (var i in allSitters) {
        getSitter(i, allSitters);
      }
      console.log(sitters);
    }).catch(error => {
      console.log('this is the error for get_sitters: ')
      console.log(error)
    })
      .finally(() => {
        console.log('in the sitter finally');
        console.log(sitters);
        setLoaded(true);
      });
  }

  useEffect(() => {
    loadSitters();
    setTimeout(function () {
      if (sitters) {
        setLoaded(true)
      } else {
        console.log("taking too long to load info")
      }
    }, 1000);
    console.log('this is the sitters: ')
    console.log(sitters);
  })
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sitters.length) : 0;

  const filteredUsers = applySortFilter(sitters, getComparator(order, orderBy), filterName, queryType);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Sitters">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sitters
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>
        {!loaded ?
          <div>
            <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" width="50px" height="50px" alt="loading" />
          </div>
          :
          <Card>
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} queryType={queryType} setQueryType={setQueryType} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={sitters.length}
                    // numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, firstname, lastname, location, age, price, imgurl, email } = row;
                      // const isItemSelected = selected.indexOf(firstname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, firstname + lastname)} /> */}
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={firstname} src={imgurl === 'null' ? ProfileImg : imgurl} />
                              <Typography variant="subtitle2" noWrap>
                                {firstname + ' ' + lastname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">{age}</TableCell>
                          <TableCell align="left">{price}</TableCell>
                          {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu email={email} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sitters.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>}
      </Container>
    </Page>
  );
}
