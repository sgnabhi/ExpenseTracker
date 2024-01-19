import React from 'react';
import { Text,View } from "react-native";
import { Card } from "react-native-elements";

function ExpenseViewCard(props) {
    const {transaction} = props;
    return (
        <View style = {{ flex:1 }}>
            <Card containerStyle={{flex:1}}>
                <Card.Title>{transaction.category}</Card.Title>
                <Card.Divider />
                <Text> Sub Category : {transaction.subCategory}</Text>
                <Text> {transaction.transactionType} : {transaction.amount}</Text>
                <Text> {'Description :\n'} {transaction.description}</Text> 
            </Card>
                           
            
        </View>
        
    );
}

export default ExpenseViewCard;