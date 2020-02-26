import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import api from '~/services/api';
import { Container, ContainerWrap } from './styles';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'phone', label: 'Phone', minWidth: 150 },
  {
    id: 'country',
    label: 'Country',
    minWidth: 100,
    format: value => value.toLocaleString(),
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 100,
    format: value => value.toLocaleString(),
  },
  {
    id: 'postalCode',
    label: 'Postal Code',
    minWidth: 100,
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: window.innerHeight - 270,
  },
});

export default function Schools() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schools, setSchools] = useState([]);

  const fetchSchools = async () => {
    const response = await api.get('schools');
    setSchools(response.data);
  };

  useState(() => {
    fetchSchools();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Details</h1>
        </span>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {schools
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map(column => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {getRowContent({ column, row })}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={schools.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </ContainerWrap>
    </Container>
  );
}
