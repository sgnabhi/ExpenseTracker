export const TransactionReducer = ( state, action ) => {
    switch( action.type ){
        case 'SET':
        {
            return( {} );
        }            
        case 'GET':
        {
            return( {} );
        }
        default:
            return state;
    }

}

export const TransactionAddFormReducer = ( state, action ) => {
    switch( action.type ){
        case 'SET_FORM_DATA':
        {
            //console.log("Action:\n", action);
            return { ...state, formData: action.payload.formData };
        }
        //case 'SET_DEFAULT':
        //    return { ...action.payload.initialState };
        default:
        {
            //console.log( state );
            return state;
        }
    }
}