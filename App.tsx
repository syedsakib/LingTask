import React from 'react';
import { StyleSheet, View } from 'react-native';
import Table from './components/Table';
import UserInput from './components/UserInput.js';

const App = () => {
  return (
    <View style={styles.container}>
      <UserInput />
   
      <View style={styles.tableContainer}>
        <Table />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tableContainer: {
    paddingVertical: 15,
  },
});

export default App;
