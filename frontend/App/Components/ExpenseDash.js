import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ChartCard } from "../SubComponents/Cards/Cards";
import { Chart } from "../SubComponents/Charts/Charts";
import { FilterSheetContext } from "../Contexts/FilterContext";
import { ExpenseOverTimeContext, ExpenseOverCategoryContext } from "../Contexts/ChartContext";
import { ModuleTypeForm } from "../SubComponents/Forms/Button";
import { Formik } from "formik";

export const ExpenseDash = (props) => {
    const { state } = useContext(FilterSheetContext);
    const categories = state.category;

    // Line Chart Context
    const { aggregatedTransactionData } = useContext(ExpenseOverTimeContext);
    const series = Object.entries(aggregatedTransactionData)
        .map(([category, values]) => ({
            x: Object.keys(values),
            y: Object.values(values),
            name: category,
        }));

    // Category Chart Context
    const { aggregatedCategoryData } = useContext(ExpenseOverCategoryContext);
    const series2 = [{
        x: Object.keys(aggregatedCategoryData),
        y: Object.values(aggregatedCategoryData),
    }];

    // Calculate total expenditure, target expenditure, and percentage change
    const totalExpenditure = series2[0].y.reduce((acc, curr) => acc + curr, 0);
    const targetExpenditure = 4500; // Example target expenditure, replace with actual target
    const previousMonthExpenditure = 4500; // Example previous month's expenditure
    const percentageChange = ((totalExpenditure - previousMonthExpenditure) / previousMonthExpenditure) * 100;

    // Styled Components
    const Metric = ({ title, value }) => {
        let textStyle = styles.metricValue;
        if (title.includes("Percentage")) {
            textStyle = value >= 0 ? [styles.metricValue, styles.positiveChange] : [styles.metricValue, styles.negativeChange];
        }
        return (
            <View style={styles.metric}>
                <Text style={styles.metricTitle}>{title}</Text>
                <Text style={textStyle}>
                    {title.includes("Percentage") ? `${value.toFixed(0)}%` : `Rs ${value.toFixed(0)}`}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.heading}>Monthly Summary</Text>

                <View style={styles.metricsContainer}>
                    <Metric title="Total Expenditure" value={totalExpenditure} />
                    <Metric title="Last Month Expeneses" value={targetExpenditure} />
                    <Metric title="Percentage Change" value={percentageChange} />
                </View>

                <Text style={styles.trendsHeading}>Trends & Distributions</Text>
                <Formik initialValues={{ "moduleType" : "Over Category" }} >
                    {({ handleChange, handleBlur, handleSubmit,setFieldValue, values }) => (
                        <View style = {{flex : 1}}>
                            <ModuleTypeForm
                                onPress = { (value) => setFieldValue('moduleType', value)}
                                value = {values.moduleType}
                            />
                            {
                                values.moduleType == "Over Time" && (
                                    <ChartCard title="Expense Over Time">
                                        <Chart
                                            series={series}
                                            chartType={"line"}
                                            //title={"Highest Expenditure on XXX Date"}
                                            xAxis={{ 
                                                title: { text : "Time", standoff : 1 },
                                                titlefont: { size: 7 }, // Adjust the title font size
                                                tickfont: { size: 6 }, // Adjust the tick labels font size
                                            }}
                                            yAxis={{ 
                                                title: { text : "Expense", standoff : 1 },
                                                titlefont: { size: 7 }, // Adjust the title font size                                               
                                                tickfont: { size: 6 }, // Adjust the tick labels font size
                                            }}
                                        />
                                    </ChartCard>
                                )                                
                            }
                            {
                                values.moduleType == "Over Category" && (
                                    <ChartCard title="Expense Over Category">
                                        <Chart
                                            series={series2}
                                            chartType={"bar"}
                                           // title={"Highest Expenditure in Leisure Category"}
                                           xAxis={{ 
                                                title: { text : "Category", standoff : 1 },
                                                titlefont: { size: 7 }, // Adjust the title font size
                                                tickfont: { size: 6 }, // Adjust the tick labels font size
                                            }}
                                            yAxis={{ 
                                                title: { text : "Expense", standoff : 1 },
                                                titlefont: { size: 7 }, // Adjust the title font size                                               
                                                tickfont: { size: 6 }, // Adjust the tick labels font size
                                            }}
                                        />
                                    </ChartCard>
                                )                                
                            }                            
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Center align the metrics vertically
        marginBottom: 30,
    },
    metric: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    metricTitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
        textAlign: 'center', // Center align the metric title
    },
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', // Center align the metric value
    },
    positiveChange: {
        color: '#e74c3c',
    },
    negativeChange: {
        color: '#2ecc71',
    },
    trendsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});