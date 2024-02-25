import { createContext, useContext } from "react";
import { FilterSheetContext } from "./FilterContext";
import { TransactionCategoryAggregator, TransactionTimeAggregator } from "../Objects/Aggregators";

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

export const ExpenseOverCategoryContext = createContext();

export const ExpenseOverCategoryProvider = ( props ) => {
    const { children } = props;
    const { state } = useContext( FilterSheetContext );
    const { transactionsData } = state;
    //console.log( "Transactions data : ", transactionsData);
    const transactionAggregator = new TransactionCategoryAggregator( {
        transactionsData : transactionsData
    } );

    const aggregatedTransactionData = transactionAggregator.aggregatedData;

    return( 
        <ExpenseOverCategoryContext.Provider value = {{aggregatedTransactionData: aggregatedTransactionData}}>
            {children}
        </ExpenseOverCategoryContext.Provider>
    )
}