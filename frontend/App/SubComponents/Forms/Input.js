import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native';

export const InputTextArea = ( props ) => {
    const { text, onChangeText, inputContainerStyle } = props;
    return(
        <Input
            multiline
            placeholder="Type here..."
            value = { text }
            onChangeText = { onChangeText }
            inputContainerStyle = {inputContainerStyle}
        />
    )
}

export const TransactionDescriptionForm = (props) => {
    const { text, onChangeText } = props;
    return(
        <ScrollView>
            <InputTextArea
                value = {text}
                onChangeText = {onChangeText}
                inputContainerStyle = {{ 
                    borderBottomWidth: 1, 
                    borderColor: 'black',
                    height:150,
                    marginTop:-35
                }}
            />
        </ScrollView>
    )
}

export const AmountForm = ( props ) => {
    const { amount, onChangeText } = props;
    return(
        <Input
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={onChangeText}
            leftIcon={{ type: 'material', name: 'attach-money' }}
        />
    );
}