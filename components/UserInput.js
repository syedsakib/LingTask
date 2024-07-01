import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, TouchableRipple, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { fetchUsersWithName } from '../redux/actions/user';
import { COLORS } from '../helpers/helpers';

const UserInput = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  const placeSubmitHandler = () => {
    if (userName.trim() === '') {
      return;
    }

    dispatch(fetchUsersWithName(userName));
    setUserName('');
  };

  const setNameChangeHandler = value => {
    setUserName(value);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="User name..."
        left={<TextInput.Icon icon="text-search" />}
        value={userName}
        style={styles.placeInput}
        onChangeText={setNameChangeHandler}
      />

      <TouchableRipple
        onPress={placeSubmitHandler}
        rippleColor={COLORS.ash}
        style={styles.placeButton}>
        <Text>Search</Text>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  placeInput: {
    width: '70%',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderBottomColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  placeButton: {
    backgroundColor: COLORS.white,
    padding: 18,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default UserInput;
