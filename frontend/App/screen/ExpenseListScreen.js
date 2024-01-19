import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import ExpenseCard from '../Components/ExpenseCard';
import axios from 'axios';
import React, {useState, useReducer} from 'react';
import ExpenseModal from '../Components/ExpenseModal';
import DATA from '../Constants/Data';
import ModalContext from '../Contexts/ModalContext';
import ModalReducer from '../Reducers/ModalReducer';
import { Transaction } from '../Objects/Transaction';
import { SpeedDial, FAB } from 'react-native-elements';
import Actions from '../Constants/Actions';
import { TransactionFormikProvider } from '../Contexts/TransactionContext';
import { ExpenseCategoryBottomSheet } from '../Components/ExpenseCategoryPicker';
import { GetCategoryMap } from '../Objects/utils';
import { CategorySheetContext } from '../Contexts/CategoryContext';
import { useContext } from 'react';
import { Portal } from 'react-native-paper';




function ExpenseListScreen() {
    // axios({
    //     method: "GET",
    //     url:"http://192.168.0.107:5000/getInfo/shringa",
    // }).then((response) => {
    //     console.log(1)
    //     console.log(response.data);
    //   }).catch(error => {console.log(0);console.log(error);throw(error)});
    
    const transaction = new Transaction();

    const [ modalProp, dispatch] = useReducer( ModalReducer, {visible:false, transaction: transaction, newExpense: false})
    const [ open, setOpen ] = useState(false);
    //console.log(dispatch)
    //const [modalProp, setModalProp] = useState({visible:false, expenseId: null});
   
    const transactionData = DATA.map( item => new Transaction(item) );
    return (
        <SafeAreaView style={styles.container}>
            <ModalContext.Provider value={{modalDispatch:dispatch}}>
            <TransactionFormikProvider>
            <ExpenseModal {...modalProp} />
            <FlatList
                data = {transactionData}
                renderItem = {
                    ({item}) =>                     
                        <ExpenseCard transaction = {item} />
                    }
                keyExtractor = {item => item.transactionId}
            />
            <FAB
                placement="right"
                style={{marginBottom:100}}
                icon={{ name: 'add', color: 'white' }}
                onPress={() => {
                // Handle the Fab button press
                    dispatch({
                        type: Actions.ExpenseModal.Toggle,
                        payload: {
                          visible : !modalProp.visible,
                          newExpense : true,
                          transaction : new Transaction(),
                        }
                    })

                }}
            />
            
            </TransactionFormikProvider>
            </ModalContext.Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});
  

export default ExpenseListScreen;