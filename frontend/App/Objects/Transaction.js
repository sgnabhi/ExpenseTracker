import { TransactionPropMap } from "./utils"

export class Transaction{
    constructor( TransactionProps = {
        amount : 0,
        category : "",
        currency : "INR",
        description : "",
        subCategory : "",
        timestamp : null,
        transactionId : "",
        transactionType : "Outflow",
        userId : "shringa",
        description : "",
    } 
    ){
        TransactionProps = this.EnrichTransactionProps( TransactionProps );
        Object.entries( TransactionProps ).forEach(([key,value]) => {
            this[ key ] = value;
        });
    }

    EnrichTransactionProps = ( props ) => {
        const { 
            timestamp,
            currency,
            category,
            transactionId,
        } = props;

        if( !timestamp )
            props.timestamp = new Date();

        if( !currency )
            props.currency = "INR";

        if( !transactionId )
            props.transactionId = this.GenerateTransactionId( props );

        return( props );
    }

    GenerateTransactionId = ( props ) => {
        const delimiter = "_";
        const key = [ 
            "transaction",
            props.userId,
            props.timestamp
        ].join( delimiter );
    }

    // GetTransactionCategory = ( subCategory ) => {
    //     const CategoryMap = GetCategoryMap();
        
    // }
};