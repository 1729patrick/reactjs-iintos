import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Container, ContainerWrap } from '~/styles/Sidebar';

import EmptyMessage from '~/components/EmptyMessage';

const columns = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'count',
    label: 'Downloads',
  },

  {
    id: 'url',
    label: '',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: window.innerHeight - 300,
  },
});

export default function Logs() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const fetchLogs = async () => {
    const response = await api.get('log/files');

    const projects = response.data;

    const pro = projects
      .sort((project1, project2) => {
        return project1.startDate > project2.startDate;
      })
      .reverse();

    setUsers(pro);
    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    fetchLogs();
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

    if (column.id === 'url') {
      return (
        <a href={value} target="_blak">
          Show File
        </a>
      );
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Downloads</h1>
        </span>
        {error === true && <EmptyMessage />}
        {error === false && (
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
                  {users
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
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </ContainerWrap>
    </Container>
  );
}
