import { GestureHandlerRootView } from "react-native-gesture-handler";

import React, { useContext, useRef } from 'react';
import { TransactionBottomSheet } from "../SubComponents/BottomSheet/BottomSheet";
import { Button, Text, View } from "react-native";
import { TransactionDatePicker } from "../SubComponents/Forms/DatePicker";
import { FilterSheetContext } from "../Contexts/FilterContext";
import { useFormik } from "formik";

function ExpenseBottomSheet(props) {
    const {bottomSheetRef} = props;
    const {state, dispatch } = useContext( FilterSheetContext );

    const formik = useFormik(
        {
            initialValues : state.filterData
        }
    );

    const { 
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
    } = formik;

    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
    };
    onSubmit = ( value ) => {
        dispatch( {
            type: 'SET_FILTER_DATA',
            payload : {
                filterData : {
                    startDate : value.startDate,
                    endDate : value.endDate,
                },
                transactionsData : []                
            }
        })
        closeBottomSheet();
    }
    return (
            <TransactionBottomSheet
                bottomSheetRef = {bottomSheetRef}                
            >
                <View style={{marginTop:10}}>
                    <Text>Start Date</Text>
                    <TransactionDatePicker 
                        selectedDate={values.startDate} 
                        onDateChange={(event, date) => {setFieldValue("startDate", date);}}
                    />
                    <Text>End Date</Text>
                    <TransactionDatePicker 
                        selectedDate={values.endDate} 
                        onDateChange={(event, date) => {setFieldValue("endDate", date);}} 
                    />
                    <Button title = "Close BS" onPress={ ()=> {onSubmit(values)} } />
                </View>
            </TransactionBottomSheet>
    );
}

export default ExpenseBottomSheet;