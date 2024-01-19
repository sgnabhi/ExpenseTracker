import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const BaseDatePicker = (props) => {
    const { selectedDate, onDateChange } = props;

    return(
      <DateTimePicker
        value={selectedDate}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onDateChange}
        style={styles.datePicker}
      />
    );
}

export const TransactionDatePicker = ( props ) => {
    const { selectedDate, onDateChange } = props;

    return(
        <BaseDatePicker
            selectedDate = {selectedDate}
            onDateChange = {onDateChange}
        />            
    );
}

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor : "green",
  },
});