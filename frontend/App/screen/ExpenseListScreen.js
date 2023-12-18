import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import ExpenseCard from '../Components/ExpenseCard';
import axios from 'axios';



function ExpenseListScreen() {
    axios({
        method: "GET",
        url:"http://192.168.0.107:5000/getInfo/shringa",
    }).then((response) => {
        console.log(1)
        console.log(response.data);
      }).catch(error => {console.log(0);console.log(error);throw(error)});
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data = {DATA}
                renderItem = {
                    ({item}) => 
                        <ExpenseCard  
                            category={item.category} 
                            sub_category={item.sub_category}
                            amount={item.amount}
                            transaction_type={item.transaction_type}
                        />
                    }
                keyExtractor = {item => item.transaction_id}
            />
        </SafeAreaView>
    );
}

const DATA = [
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "12",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "13",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "14",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "52",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "19",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },  
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "22",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },    
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "123",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "124",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
    {
        "amount": 5000,
        "category": "Household",
        "currency": "INR",
        "description": "Maid Salary",
        "sub_category": "Maid",
        "timestamp": null,
        "transaction_id": "125",
        "transaction_type": "Expenditure",
        "user_id": "shringa"
    },
];

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});
  

export default ExpenseListScreen;