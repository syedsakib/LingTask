// App.js
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import ListItem from './components/ListItem';
import { connect } from 'react-redux';
import { addPlace } from './redux/actions/place';

const App = ({ places, add }) => {
  const [placeName, setPlaceName] = useState('');

  const placeSubmitHandler = () => {
    if (placeName.trim() === '') {
      return;
    }
    add(placeName);
    setPlaceName('');
  };

  const placeNameChangeHandler = (value) => {
    setPlaceName(value);
  };

  const renderListItem = ({ item }) => (
    <ListItem
      placeName={item.value}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search Places"
          style={styles.placeInput}
          value={placeName}
          onChangeText={placeNameChangeHandler}
        />
        <Button
          title='Add'
          onPress={placeSubmitHandler}
        />
      </View>
      <FlatList
        style={styles.listContainer}
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
  listContainer: {
    width: '100%'
  }
});

const mapStateToProps = state => ({
  places: state.places.places
});

const mapDispatchToProps = dispatch => ({
  add: name => dispatch(addPlace(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
