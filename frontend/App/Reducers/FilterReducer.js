import { AsycTransactionParameters, TransactionStorer } from "../Storage/TransactionStore";

export const FilterSheetReducer = ( state, action ) => {
    switch( action.type ){
        case 'SET_FILTER_DATA':
        {
            return { 
                ...state,
                filterData: action.payload.filterData,
            };
        }
        case "SET_TRANSACTIONS_DATA":
            return {
                ...state,
                transactionsData : action.payload.transactionsData
            }         
        default:
            return state;
    }
}