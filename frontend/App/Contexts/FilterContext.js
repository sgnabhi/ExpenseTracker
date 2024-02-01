import { createContext, useRef, useState, useReducer, useEffect } from "react";
import { FilterSheetReducer } from "../Reducers/FilterReducer";
import { TransactionStorer, AsycTransactionParameters } from "../Storage/TransactionStore";

export const FilterButtonContext = createContext();

export const FilterButtonContextProvider = (props) => {
    const bottomSheetRef = useRef(null);
    const { children } = props;

    return(
        <FilterButtonContext.Provider value={{bottomSheetRef:bottomSheetRef}}>
            {children}
        </FilterButtonContext.Provider>
    );    
}

export const FilterSheetContext = createContext();

const initialState = {
    filterData : {
        startDate : new Date(),
        endDate : new Date(),
        category : [],
        subCategory : [],
    },
    transactionsData : []
};

const setTransactionsData = async( dispatch, filterData ) =>{
    try{

        const { startDate, endDate } = filterData;
        const parameters = new AsycTransactionParameters(
            {
                startDate : startDate,
                date : endDate,
                nItems : 100,
                userId : "shringa"
            }    
        );
    
        const Results = await TransactionStorer.get( parameters );
        dispatch( { 
            type : "SET_TRANSACTIONS_DATA",
            payload : {
                transactionsData : Results.data,
            }
        });
    }
    catch(error){
        console.log( "Error in fetching data: ", error );
    }
}

export const FilterSheetProvider = ( props ) => {
    
    const {children} = props;
    const [ state, dispatch ] = useReducer( FilterSheetReducer, initialState )
        
    useEffect(
        () =>{
            try{
                setTransactionsData( dispatch, state.filterData )
            }
            catch( error ){
                console.log(error)
            }
        },
        [ state.filterData ]
    );
    //console.log( state );
    return(
        <FilterSheetContext.Provider value={{state:state, dispatch:dispatch}}>
            {children}
        </FilterSheetContext.Provider>
    )
}