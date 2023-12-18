import { Text, View } from "react-native";
import { Card } from "react-native-elements";

function ExpenseCard(props) {
    return (
        <Card>
            <Card.Title>{props.category}</Card.Title>
            <Card.Divider />
            <Text> Sub Category : {props.sub_category}</Text>
            <Text> {props.transaction_type} : {props.amount}</Text>
        </Card>
    );
}

export default ExpenseCard;