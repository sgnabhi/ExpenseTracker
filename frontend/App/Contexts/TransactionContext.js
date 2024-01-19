import React, { createContext, useReducer, useEffect } from 'react';
import { AsycTransactionParameters, TransactionStorer } from '../Storage/TransactionStore';
import { TransactionAddFormReducer } from '../Reducers/TransactionReducer';
import { Transaction } from '../Objects/Transaction';
import { useFormik } from 'formik';

const TransactionContext = createContext();

export const TransactionProvider = ( { children } ) => {
    const initialState = {};
    const [ state, dispatch ] = useReducer( TransactionReducer, initialState);
    const parameters = AsycTransactionParameters();
    useEffect(
        () => {
            TransactionStorer.set(parameters, state)
        },
        [ state ]
    );

    useEffect( () => {
        const loadData = async () => {
            try {
                const savedState = await TransactionStorer.get(parameters);
                if (savedState) {
                    dispatch({ type: 'LOAD_STATE', payload: savedState });
                }
            } 
            catch (error) 
            {
                console.error('Error loading state from AsyncStorage:', error);
            }
        };

        loadData();
    }, [ parameters ] )

}

export const TransactionAddFormContext = createContext();

const initialState = {
    formData: new Transaction( { 
        transactionType : 'Outflow',
        amount : '0',
        subCategory: '',
        category : '',
        description : ""
    } ),
};

const storeFormData = async ( state ) => {
    try {
        if( state == initialState )
        {
            console.log( "Initial State... not storing")
            return;
        };
        console.log( "Started Storing....\n" );
        let date = new Date();
        const parameters = new AsycTransactionParameters( { date : date, startDate : date, userId : "shringa" } );
        console.log( state.formData );
        await TransactionStorer.set( parameters, state.formData );
        console.log( "Stored the values in the form");
    } catch (error) {
        console.error('Error storing form data:', error);
    }
};
export const TransactionAddFormProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( TransactionAddFormReducer, initialState );
    
    useEffect(() => {
        storeFormData( state );
    }, [state.formData]);
    
    return( 
        <TransactionAddFormContext.Provider value={{ state, dispatch }}>
            {children}
        </TransactionAddFormContext.Provider>
    )
}

export const TransactionFormikContext = createContext();

export const TransactionFormikProvider = ( props ) => {
    const formik = useFormik(
        {
            initialValues : initialState.formData
        }
    );

    const {children} = props;

    return(
        <TransactionFormikContext.Provider value = {{formik : formik}}>
            {children}
        </TransactionFormikContext.Provider>
    )
}