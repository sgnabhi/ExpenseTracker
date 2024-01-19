import { ButtonGroup } from "react-native-elements";
import {Text} from 'react-native';

export const ButtonGroupForm = (props) => {
    const { containerStyle, buttons, selectedIndex, onPress } = props;    
    //console.log( props );
    return( 
        <ButtonGroup
            onPress={onPress}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={containerStyle}
        />
    )
}

export const TransactionTypeForm = (props) => {
    const categories = [ "Inflow", "Outflow" ];
    const buttons = categories.map( ( category ) => 
        { return( { element:() => <Text>{category}</Text> } ) },
        categories);
    const { onPress, value } = props;
    return(
        <ButtonGroupForm
            onPress = {(index) => { 
                const category = categories[index];
                onPress(category);
            } }
            selectedIndex = {categories.indexOf(value)}
            containerStyle = {{ marginVertical: 10 }}
            buttons = {buttons}
        />
    )
}