import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import UserInput from './components/UserInput';
import Table from './components/Table';
import { clearUserData } from './redux/actions/user';

const App = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState('');
  const [fuzzySearchEnabled, setFuzzySearchEnabled] = useState(false);
  const [lowRankEnabled, setLowRankEnabled] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUserName('');
    setFuzzySearchEnabled(false);
    setLowRankEnabled(false);
    dispatch(clearUserData());
    setRefreshing(false);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
            tintColor={'#689F38'}
          />
        }>
        <UserInput
          userName={userName}
          setUserName={setUserName}
          fuzzySearchEnabled={fuzzySearchEnabled}
          setFuzzySearchEnabled={setFuzzySearchEnabled}
          lowRankEnabled={lowRankEnabled}
          setLowRankEnabled={setLowRankEnabled}
        />

        <View style={styles.tableContainer}>
          <Table />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableContainer: {
    paddingVertical: 15,
  },
});

export default App;
