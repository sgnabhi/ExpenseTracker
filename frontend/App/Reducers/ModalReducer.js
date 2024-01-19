import React from 'react';
import ACTIONS from '../Constants/Actions';

function ModalReducer( state, action ) {
    switch( action.type ){
        case ACTIONS.ExpenseModal.Toggle:
            return( {...state,...action.payload} )        
        default:
            return( state )
    };
}

export default ModalReducer;