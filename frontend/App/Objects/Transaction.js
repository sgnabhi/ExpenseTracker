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
        //const date = new Date();
        //console.log( date );
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
            userId,
        } = props;

        if( !timestamp )
            props.timestamp = new Date();

        if( !currency )
            props.currency = "INR";

        if( !userId )
            props.userId = "shringa";


        if( !transactionId )
            props.transactionId = this.GenerateTransactionId( props );

        return( props );
    }

    GenerateTransactionId = ( props ) => {
        //console.log( currentTime );
        const delimiter = "_";
        const random = new Date().getTime();

        // Use the timestamp to generate a random number
        const randomNum = Math.floor(Math.random() * random);
        //console.log( "randomNUmber", randomNum );
        
        const key = [ 
            "transaction",
            props.userId,
            randomNum,
        ].join( delimiter );

        return( key );
    }

    // GetTransactionCategory = ( subCategory ) => {
    //     const CategoryMap = GetCategoryMap();
        
    // }
};