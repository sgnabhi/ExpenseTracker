
import React, {useState, useContext} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Tab, TabView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ExpenseViewCard from './ExpenseViewCard';
import Actions from '../Constants/Actions';
import ModalContext from '../Contexts/ModalContext';
import { Transaction } from '../Objects/Transaction';
import ExpenseViewCard from './ExpenseViewCard';
import ExpenseEditCard from './ExpenseEditCard';
import ExpenseAddCard from './ExpenseAddCard';
import { TransactionAddFormContext, TransactionAddFormProvider, TransactionFormikContext } from '../Contexts/TransactionContext';
import { CategorySheetProvider } from '../Contexts/CategoryContext';

const Tab1Screen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tab 1 Content</Text>
  </View>
);

const Tab2Screen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tab 2 Content</Text>
  </View>
);

function ExpenseModal(props) {
    const { visible, transaction, newExpense } = props;
    const {modalDispatch} = useContext(ModalContext);
    const {formik} = useContext(TransactionFormikContext);
    const {values} = formik;
    const [index,setIndex] = useState(0);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                style={{flex:1, width: 400}}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    modalDispatch({
                      type: Actions.ExpenseModal.Toggle,
                      payload: {
                        visible : !visible,
                        newExpense : false,
                        transaction : new Transaction(),
                      }
                    })
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}> 
                        { newExpense ? 
                       // <ExpenseAddCard transaction={transaction}/>
                        (<><Tab value={0}>
                          <Tab.Item
                            icon={
                              <Icon
                                  name="pencil"
                                  size={30}
                                  color="black"
                                  // reverse={true}
                              />
                            }
                          />
                        </Tab>
  
                        <TabView value={0} >
                          <TabView.Item style={{ width: '100%' }}>  
                            <TransactionAddFormProvider>
                              <ExpenseAddCard />
                            </TransactionAddFormProvider>                          
                          </TabView.Item>
                        </TabView>
                        </>)
                        : (<><Tab value={index} onChange={setIndex}>
                        <Tab.Item
                          icon={
                            <Icon
                                name="eye"
                                size={30}
                                color="black"
                            />
                          }
                        />
                        <Tab.Item
                          icon={
                            <Icon
                                name="pencil"
                                size={30}
                                color="black"
                                // reverse={true}
                            />
                          }
                        />
                      </Tab>

                      <TabView value={index-1} onChange={setIndex} >
                        <TabView.Item style={{ width: '100%' }}>
                          <ExpenseViewCard transaction={transaction} />
                        </TabView.Item>
                        <TabView.Item style={{ width: '100%' }}>
                          {/* <Text h1>Favorite</Text> */}
                          <ExpenseEditCard transaction={transaction} />
                        </TabView.Item>
                        <TabView.Item style={{ width: '100%' }}>
                        </TabView.Item>
                      </TabView>
                      </>)
                       }
                      
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => modalDispatch({
                        type: Actions.ExpenseModal.Toggle,
                        payload: {
                          visible : !visible,
                          transaction : new Transaction(),
                          newExpense : false,
                        }
                      })}
                    >
                       <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
        </View>
    );
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default ExpenseModal;