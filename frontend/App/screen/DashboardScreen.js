import { ExpenseDash } from "../Components/ExpenseDash";
import { View } from "react-native";

export const DashboardScreen = ( props ) => {
    
    return( 
        <View style={{flex:1}}>
            <ExpenseDash />
        </View>
    );
}