import React from 'react';
import { Formik } from 'formik';
import CardBase from './CardBase';
import { Text, View, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { StyleSheet } from 'react-native-web';
import { Picker } from '@react-native-picker/picker'; 
import { Button, ButtonGroup, Icon, Input} from 'react-native-elements';

function ExpenseEditCard(props) {
    const {category,transactionType} = props.transaction;
    const component1 = () => <Text>Expenditure</Text>;
    const component2 = () => <Text>Income</Text>;
    const buttons = [{ element: component1 }, { element: component2 }];
    const dropdownOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];    
    const selectedIndex = 1;
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
            title={category} 
            containerStyle={{
                flex:1,
                height : "100%"

            }}          
        >
            <Formik
                initialValues={{ selectedIndex : 0, amount : '50', selectedOption: 'option1', isPickerVisible: false, text : "" }}
                onSubmit={(values) => console.log(values)}
            >
            {({ handleChange, handleSubmit,setFieldValue, values }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                <Text>Transaction Type</Text>
                <ButtonGroup
                    onPress={(index) => {setFieldValue('selectedIndex', index)}}
                    selectedIndex={values.selectedIndex}
                    buttons={buttons}
                    containerStyle={{ marginVertical: 10 }}
                />
                <Text>Enter amount</Text>
                <Input
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={values.amount}
                    onChangeText={handleChange('amount')}
                    leftIcon={{ type: 'material', name: 'attach-money' }}
                />
                <Text>Select a Sub Category</Text>
                <Button
                    title="Click Here"
                    titleStyle={{
                        color: "black",
                        textAlign:"center",
                        flex: 1
                    }}
                    buttonStyle={{
                        backgroundColor:"white",
                        borderColor:"black",
                        borderWidth:1,
                        marginBottom: 2,
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-start'
                    }}
                    iconRight
                    icon={<Icon name="keyboard-arrow-down" size={30} color="black" />}
                    // style={{
                    //     borderColor:"black",
                    //     borderWidth:1
                    // }}
                    onPress={(val) => { setFieldValue('isPickerVisible', !values.isPickerVisible)}}
                />
                {   values.isPickerVisible && 
                    <Picker
                        style={{marginTop:-80}}
                        selectedValue={values.selectedOption}
                        onValueChange={(itemValue) => { handleChange('selectedOption')(itemValue); setFieldValue('isPickerVisible', false); }}
                    >
                        {dropdownOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                }
                <Text>Enter Description</Text>
                <ScrollView>
                    <Input
                        multiline
                        placeholder="Type here..."
                        value={values.text}
                        onChangeText={handleChange('text')}
                        inputContainerStyle={{ borderBottomWidth: 1, borderColor: 'black', height:150, marginTop:-35 }}
                    />
                </ScrollView>
                


                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
                </View>
                </TouchableWithoutFeedback>
            )}
            </Formik>
        </CardBase>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    heading:{
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 5,
    },
    transactionType:{
        width:400
    }
})
export default ExpenseEditCard;