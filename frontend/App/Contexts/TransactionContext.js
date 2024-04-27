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

export const initialState = {
    formData: new Transaction( { 
        transactionType : 'Outflow',
        transactionFrequencyType : "Non Recurring",
        transactionFrequency : "Monthly",
        amount : '0',
        subCategory: '',
        category : '',
        description : "",
        transactionId : "Initial",
    } ),
};

const storeFormData = async ( state, dispatch ) => {
    try {
        console.log( state );
        if( state == initialState )
        {
            console.log( "Initial State... not storing")
            return;
        };
        console.log( "Started Storing....\n" );
        let date = state.formData.timestamp;
        const parameters = new AsycTransactionParameters( { date : date, startDate : date, userId : "shringa" } );
        await TransactionStorer.set( parameters, state.formData );

        console.log( "stored State : ", state);
        console.log( "Stored the values in the form");
        // dispatch( {
        //     type : "SET_DEFAULT",
        //     payload : {
        //         initialState : initialState,
        //     }
        // });
    } catch (error) {
        console.error('Error storing form data:', error);
    }
};
export const TransactionAddFormProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( TransactionAddFormReducer, initialState );
    
    useEffect(() => {
        storeFormData( state, dispatch );
    }, [state.formData]);
    //console.log(dispatch);
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