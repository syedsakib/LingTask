import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import Table from './components/Table';
import UserInput from './components/UserInput';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate fetching data after a delay
    setTimeout(() => {
      // Replace this with your actual data fetching logic
      // For example, fetchData()
      
      // After fetching data, set refreshing to false
      setRefreshing(false);
    }, 1000); // Delay for demonstration purposes, replace with actual fetch delay
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
            tintColor={'#689F38'}
          />
        }
      >
        <UserInput />
   
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    paddingVertical: 15,
  },
});

export default App;
