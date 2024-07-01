import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, DataTable, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../redux/actions/user';
import {COLORS, FLAG_STATUS, HEADERS, SIZE} from '../helpers/helpers';

const Table = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );
  const [usersState, setUsersState] = useState([]);

  const from = 0;
  const to = 10;

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setUsersState({
      error: users.error,
      loading: users.loading,
      users: Object.values(users?.users),
    });
  }, [users]);

  if (usersState.loading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        animating={FLAG_STATUS.TRUE}
        color={COLORS.black}
        size={SIZE.LARGE}
      />
    );
  }

  return (
    <>
      {usersState?.users?.length === 0 ? (
        <Text>No data to show</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.tableHeader}>
              {HEADERS.NAME}
            </DataTable.Title>
            <DataTable.Title numeric style={styles.tableHeader}>
              {HEADERS.RANK}
            </DataTable.Title>
            <DataTable.Title numeric style={styles.tableHeader}>
              {HEADERS.NO_OF_BANANAS}
            </DataTable.Title>
          </DataTable.Header>

          {usersState?.users?.slice(from, to).map(item => (
            <DataTable.Row key={item.bananas}>
              <DataTable.Cell>
                <Text
                  style={[
                    styles.userName,
                    {
                      color:
                        item.mark === FLAG_STATUS.TRUE
                          ? COLORS.red
                          : COLORS.black,
                    },
                  ]}>
                  {item?.name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>{item?.rank}</DataTable.Cell>
              <DataTable.Cell numeric>{item?.bananas}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(usersState?.users?.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${usersState?.users?.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  userName: {
    // Additional styles for userName can be defined here
  },
});

export default Table;
