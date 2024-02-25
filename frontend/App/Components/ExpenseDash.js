import { valuesIn } from "lodash";
import { ExpenseOverTimeContext } from "../Contexts/ChartContext"
import { ChartCard } from "../SubComponents/Cards/Cards";
import { Chart } from "../SubComponents/Charts/Charts";
import { FilterSheetContext } from "../Contexts/FilterContext";
import { useContext } from "react";
import { View, Text } from "react-native";
import { CategoryChart } from "./DashComponents/CategoryChart";

export const ExpenseDash = ( props ) => {
    const { state } = useContext( FilterSheetContext );
    const categories = state.category;
    const { aggregatedTransactionData } = useContext( ExpenseOverTimeContext );
    //console.log( aggregatedTransactionData );
    const series = Object.entries(aggregatedTransactionData)
    .map( ([category, values]) => {
        return({
            x : Object.keys(values),
            y : Object.values(values),
            name : category,
        })
    });
    //console.log( series);
    return(
        <View style = {{ flex : 1 }}>
            <ChartCard>
                <Chart
                    series = {series}
                    chartType = {"line"}
                    title = { "Expense Over Time" }
                    xAxis = {{ title : "Time" }}
                    yAxis = {{ title : "Expense" }}
                />
                {/* <Text> Hi How are you?</Text> */}
            </ChartCard>
            <CategoryChart />
        </View>
    )
}