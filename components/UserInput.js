import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, TouchableRipple, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  fetchUsersWithName,
  fetchUsersWithNameFuzzySearch,
} from '../redux/actions/user';
import {COLORS} from '../helpers/helpers';
import FuzzySearchButton from './FuzzySearchButton';
import LowestRankUsers from './LowestRankUsers';

const UserInput = ({
  userName,
  setUserName,
  fuzzySearchEnabled,
  setFuzzySearchEnabled,
  lowRankEnabled,
  setLowRankEnabled,
}) => {
  const dispatch = useDispatch();
  const placeSubmitHandler = () => {
    if (userName.trim() === '') {
      return;
    }

    {
      fuzzySearchEnabled
        ? dispatch(fetchUsersWithNameFuzzySearch(userName))
        : dispatch(fetchUsersWithName(userName));
    }
    // setUserName('');
  };

  const setNameChangeHandler = value => {
    setUserName(value);
  };

  return (
    <>
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
      <View style={styles.buttonContainer}>
        <FuzzySearchButton enabled={fuzzySearchEnabled} toggleEnabled={setFuzzySearchEnabled} />
        <LowestRankUsers lowRankEnabled={lowRankEnabled} setLowRankEnabled={setLowRankEnabled} />
      </View>
    </>
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
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default UserInput;
