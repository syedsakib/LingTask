import React from 'react';
import {Button, Text} from 'react-native-paper';
import {COLORS} from '../helpers/helpers';
import {StyleSheet} from 'react-native';

const FuzzySearchButton = ({enabled, toggleEnabled}) => {
  return (
    <Button
      mode="outlined"
      buttonColor={enabled ? COLORS.green: COLORS.white }
      onPress={() => toggleEnabled(!enabled)}
      style={styles.buttonContainer}>
      {enabled ? (
        <Text style={[styles.buttonText, {color: COLORS.white}]}>
          Disable Fuzzy Search
        </Text>
      ) : (
        <Text style={[styles.buttonText, {color: COLORS.black}]}>
          Enable Fuzzy Search
        </Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10
  },
  buttonText: {
    //
  },
});

export default FuzzySearchButton;
