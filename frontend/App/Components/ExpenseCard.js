import { useContext } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-elements";
import { Button } from 'react-native-elements';
import ModalContext from "../Contexts/ModalContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import Actions from "../Constants/Actions";

function ExpenseCard(props) {
    const {modalDispatch} = useContext(ModalContext);
    const { category, subCategory, transactionType, amount } = props.transaction;
    return (
        <Card>
            <Card.Title>{category}</Card.Title>
            <Card.Divider />
            <Text> Sub Category : {subCategory}</Text>
            <Text> {transactionType} : {amount}</Text>
            <View style = {{ paddingTop: 10, flexDirection:"column", alignItems: "center", justifyContent: "space-evenly" }}>
                <View style= {{flex:1, padding:5 }}>
                    <Button
                        buttonStyle={styles.buttonStyles}
                        icon={
                            <Icon
                                name="eye"
                                size={15}
                                color="white"
                            />
                        }
                        title=" Show"
                        onPress={() => modalDispatch({
                            type: Actions.ExpenseModal.Toggle,
                            payload : {
                                visible : true,
                                transaction : props.transaction,
                            }
                        }) }
                    />
                </View>           
            </View>
        </Card>
    );
}

const styles = StyleSheet.create(
    {
        buttonStyles : {
            padding: 10,
            //width:150,
            flex:1
        }
    }
)

export default ExpenseCard;