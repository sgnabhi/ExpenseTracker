import { Picker } from '@react-native-picker/picker'; 
import { useState } from 'react';
import { Button, ButtonGroup, Icon, Input} from 'react-native-elements';


export const PickerDropDown = ( props ) => {
    const { dropdownOptions, onValueChange, selectedValue } = props;
    const [ isPickerVisible, setPickerVisible ] = useState( false );
    return( 
        <>
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
                onPress={(val) => setPickerVisible( !isPickerVisible )}
            />
            {   isPickerVisible && 
                <Picker
                    style={{marginTop:-80}}
                    selectedValue={selectedValue}
                    onValueChange={ (itemValue) => { onValueChange(itemValue); setPickerVisible(false); } }
                >
                    {dropdownOptions.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            }
        </>
                
    );
};

export const SubCategoryPicker = ( props ) => {
    const dropdownOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];    
    const { onValueChange, selectedValue } = props;

    return(
        <PickerDropDown
            dropdownOptions = {dropdownOptions}
            onValueChange = { onValueChange }
            selectedValue = { selectedValue }
        />
    );
}