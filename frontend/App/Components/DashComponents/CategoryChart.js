import { ExpenseOverCategoryContext } from "../../Contexts/ChartContext";
import { ChartCard } from "../../SubComponents/Cards/Cards";
import { Chart } from "../../SubComponents/Charts/Charts";
import { FilterSheetContext } from "../../Contexts/FilterContext";
import { useContext } from "react";
import { View, Text } from "react-native";

export const CategoryChart = ( props ) => {
    const { state } = useContext( FilterSheetContext );
    const categories = state.category;
    const { aggregatedTransactionData } = useContext( ExpenseOverCategoryContext );
    //console.log( aggregatedTransactionData );
    const series = [ {
        x : Object.keys(aggregatedTransactionData),
        y : Object.values( aggregatedTransactionData ),
    } ];
    return(
        <View style = {{ flex : 1 }}>
            <ChartCard>
                <Chart
                    series = {series}
                    chartType = {"bar"}
                    title = { "Expense Over Time" }
                    xAxis = {{ title : "Category" }}
                    yAxis = {{ title : "Expense" }}
                />
                {/* <Text> Hi How are you?</Text> */}
            </ChartCard>
        </View>
    )
}