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
import { ButtonGroupForm, TransactionTypeForm } from '../SubComponents/Forms/Button';
import { TransactionAddFormContext, TransactionAddFormProvider, TransactionFormikContext } from '../Contexts/TransactionContext';
import { AsycTransactionParameters, TransactionStorer } from '../Storage/TransactionStore';
import { Transaction } from '../Objects/Transaction';
import { CategoryBottomSheet } from '../SubComponents/BottomSheet/BottomSheet';
import { CategoryCollapsible } from '../SubComponents/Collapsible/Collapsible';
import { GetCategoryMap } from '../Objects/utils';
import { CategorySheetContext } from '../Contexts/CategoryContext';
import { CategoryPicker } from './ExpenseCategoryPicker';

function ExpenseAddCard(props) {
    const {category,transactionType} = props.transaction;
    const component1 = () => <Text>Expenditure</Text>;
    const component2 = () => <Text>Income</Text>;
    const buttons = [{ element: component1 }, { element: component2 }];
    const selectedIndex = 1;
    const { state, dispatch } = useContext(TransactionAddFormContext);
    const { formik } = useContext( TransactionFormikContext );
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
            <Text>Enter amount</Text>
            <AmountForm 
                amount = {values.amount}
                onChangeText = { handleChange('amount') }
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
                    dispatch( {
                        type: "SET_FORM_DATA",
                        payload: {
                            formData : new Transaction( values )
                        }
                    })
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