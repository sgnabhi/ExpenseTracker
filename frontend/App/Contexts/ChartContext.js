import { createContext, useContext } from "react";
import { FilterSheetContext } from "./FilterContext";
import { TransactionTimeAggregator } from "../Objects/Aggregators";

export const ExpenseOverTimeContext = createContext();

export const ExpenseOverTimeProvider = ( props ) => {
    const { children } = props;
    const { state } = useContext( FilterSheetContext );
    const { transactionsData } = state;

    const transactionAggregator = new TransactionTimeAggregator( {
        transactionsData : transactionsData,
        frequency : 'D',
    } );

    const aggregatedTransactionData = transactionAggregator.aggregatedData;

    return( 
        <ExpenseOverTimeContext.Provider value = {{aggregatedTransactionData: aggregatedTransactionData}}>
            {children}
        </ExpenseOverTimeContext.Provider>
    )
    




}