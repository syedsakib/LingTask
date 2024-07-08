import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {COLORS} from '../helpers/helpers';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchLowRankUsers} from '../redux/actions/user';

const LowestRankUsers = ({lowRankEnabled, setLowRankEnabled}) => {
  const dispatch = useDispatch();

  const onSearchForLowRAnkUsers = () => {
    setLowRankEnabled(!lowRankEnabled);

    if (!lowRankEnabled) {
      dispatch(fetchLowRankUsers());
    }
  };

  return (
    <Button
      mode="outlined"
      buttonColor={lowRankEnabled ? COLORS.green : COLORS.white}
      onPress={onSearchForLowRAnkUsers}
      style={styles.buttonContainer}>
      {lowRankEnabled ? (
        <Text style={[styles.buttonText, {color: COLORS.white}]}>
          Low-Rank Users
        </Text>
      ) : (
        <Text style={[styles.buttonText, {color: COLORS.black}]}>
          Low-Rank Users
        </Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
  },
  buttonText: {},
});

export default LowestRankUsers;
