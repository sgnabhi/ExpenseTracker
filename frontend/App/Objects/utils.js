import { CategoryMap } from "../Constants/Category";

export function TransactionPropMap(){
    return( {
        "amount": "amount",
        "category": "category",
        "currency": "currency",
        "description": "description",
        "sub_category": "subCategory",
        "timestamp": "timestamp",
        "transaction_id": "transactionId",
        "transaction_type": "transactionType",
        "user_id": "userId",
    } );
};

export const GetCategoryMap = () => {
    return( CategoryMap );
};