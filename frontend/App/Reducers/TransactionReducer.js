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
            return { ...state, formData: action.payload.formData };
        default:
            return state;
    }
}