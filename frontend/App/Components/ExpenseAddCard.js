import React, { useContext, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import CardBase from './CardBase';
import { Text, View, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet } from 'react-native-web';
import { Picker } from '@react-native-picker/picker'; 
import { Button, ButtonGroup, Icon, Input} from 'react-native-elements';
import { SubCategoryPicker } from '../SubComponents/Forms/Picker';
import { AmountForm, TransactionDescriptionForm } from '../SubComponents/Forms/Input';
import { ButtonGroupForm, TransactionFrequencyTypeForm, TransactionTypeForm, TransactionFrequencyForm } from '../SubComponents/Forms/Button';
import { TransactionAddFormContext, TransactionAddFormProvider, TransactionFormikContext } from '../Contexts/TransactionContext';
import { AsycTransactionParameters, TransactionStorer } from '../Storage/TransactionStore';
import { Transaction } from '../Objects/Transaction';
import { CategoryBottomSheet } from '../SubComponents/BottomSheet/BottomSheet';
import { CategoryCollapsible } from '../SubComponents/Collapsible/Collapsible';
import { GetCategoryMap } from '../Objects/utils';
import { CategorySheetContext } from '../Contexts/CategoryContext';
import { CategoryPicker } from './ExpenseCategoryPicker';
import ModalContext from '../Contexts/ModalContext';
import ACTIONS from '../Constants/Actions';
import { TransactionDatePicker } from '../SubComponents/Forms/DatePicker';
import { initialState } from '../Contexts/TransactionContext';

function ExpenseAddCard(props) {
    // const {category,transactionType} = props.transaction;
    // const component1 = () => <Text>Expenditure</Text>;
    // const component2 = () => <Text>Income</Text>;
    // const buttons = [{ element: component1 }, { element: component2 }];
    // const selectedIndex = 1;
    const { state, dispatch } = useContext(TransactionAddFormContext);
    const { formik } = useContext( TransactionFormikContext );
    const {modalDispatch} = useContext(ModalContext);
    const CategoryMap = GetCategoryMap();
         
    const { 
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
    } = formik;
    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, marginBottom:100}}
            keyboardVerticalOffset={100}
        >
        <ScrollView 
            contentContainerStyle={{flexGrow:1}}
            scrollEnabled
            keyboardShouldPersistTaps="always"
        >
        <View style={{flex:1}}>
        <CardBase
            title={"Add a new expense"} 
            containerStyle={{
                flex:1,
                height : "100%"

            }}          
        >
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
            <Text>Transaction Type</Text>
            <TransactionTypeForm
                onPress = { (value) => setFieldValue('transactionType', value)}
                value = {values.transactionType}
            />
            <TransactionFrequencyTypeForm
                onPress = { (value) => setFieldValue('transactionFrequencyType', value)}
                value = {values.transactionFrequencyType}
            />
            {
                values.transactionFrequencyType == "Recurring" && (
                <>
                <Text>Frequency</Text>
                <TransactionFrequencyForm
                    onPress = { (value) => setFieldValue('transactionFrequency', value) }
                    value = {values.transactionFrequency}
                />
                </>
            )
            }
            <Text>Enter amount</Text>
            <AmountForm 
                amount = {values.amount}
                onChangeText = { handleChange('amount') }
            />

            <Text>Select Date</Text>
            <TransactionDatePicker
                selectedDate = {values.timestamp}
                onDateChange = {(event, date) => setFieldValue('timestamp', date)}
            />
            <Text>Select a Sub Category</Text>
            <CategoryPicker 
                subCategory = {values.subCategory}  
                defaultCategoryMap = {CategoryMap}           
            />
            <Text>Enter Description</Text>
            <TransactionDescriptionForm
                text = {values.description}
                onChangeText = { handleChange('description') }
            />


            <Button
                title="Submit"
                onPress={() => {
                    const multi = async () => {
                        await dispatch( {
                            type: "SET_FORM_DATA",
                            payload: {
                                formData : new Transaction( {...values, transactionId : "" } )
                            }
                        });
                        Object.entries(initialState.formData).forEach( 
                            async ([ key, value ] ) => await setFieldValue(key, value)
                        );
                        await modalDispatch(
                            {
                                type: ACTIONS.ExpenseModal.Toggle,
                                payload : {
                                    visible : false,
                                    transaction : new Transaction(),
                                    newExpense : false,
                                }
                            }
                        );

                    }

                    multi();
                    
                }}
            />
            </View>
            </TouchableWithoutFeedback>
            
        </CardBase>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default ExpenseAddCard;