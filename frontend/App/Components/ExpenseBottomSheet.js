import { GestureHandlerRootView } from "react-native-gesture-handler";

import React, { useContext, useRef } from 'react';
import { TransactionBottomSheet } from "../SubComponents/BottomSheet/BottomSheet";
import { Button, Text, View, Pressable } from "react-native";
import { TransactionDatePicker } from "../SubComponents/Forms/DatePicker";
import { FilterSheetContext } from "../Contexts/FilterContext";
import { useFormik } from "formik";
import { ExpenseCategoryMultiPicker } from "./ExpenseCategoryPicker";
import { FilterCategorySheetContext } from "../Contexts/CategoryContext";
import { GetCategoryMap } from "../Objects/utils";

function ExpenseBottomSheet(props) {
    const {bottomSheetRef} = props;
    const {state, dispatch } = useContext( FilterSheetContext );
    const { categorySheetRef, modalVisible, setModalVisible } = useContext( FilterCategorySheetContext );
    const defaultCategoryMap = GetCategoryMap();
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

    handleCategoryChange = (category, subCategory ) => {
        setFieldValue( "category", category );
        setFieldValue( "subCategory", subCategory );
    }

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
    // console.log( "myCategoryMap", defaultCategoryMap);
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
                    <Pressable
                        onPress = { () => {setModalVisible(true)} }
                    >
                        <Text>Select Category</Text>
                    </Pressable>
                    <Text> Selected Category : {values.category} </Text>
                    <Text> Selected Sub Category : {values.subCategory} </Text>
                    <ExpenseCategoryMultiPicker 
                        defaultCategoryMap = {defaultCategoryMap}
                        categorySheetRef = {categorySheetRef}
                        isCategoryModalVisible = {modalVisible}
                        setCategoryModalVisible = {setModalVisible}
                        handleCategoryChange = {handleCategoryChange}
                    />
                    <Button title = "Submit" onPress={ ()=> {onSubmit(values)} } />
                </View>
            </TransactionBottomSheet>
    );
}

export default ExpenseBottomSheet;