import AsyncStorageWrapper from "./AsyncStorageWrapper";
import { StringDateArray, StringToDate, DateToString } from "./utils";
import _ from "lodash"


const _generateTransactionKey = Symbol( "generateTransactionKey" );

export class AsycTransactionParameters{
    constructor( 
        {
            userId = null,
            transactionId = null,
            startDate = null,
            date = null,
            minAmount = null,
            maxAmount = null,
            category = null,
            subCategory = null,
            nItems = null,
            sortBy = null,
            nextIndex = null,
        } 
    )
    {
        this.userId = userId;
        this.transactionId = transactionId;
        this.startDate = startDate;
        this.date = date;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.category = category;
        this.subCategory = subCategory;
        this.nItems = nItems;
        this.sortBy = sortBy;
        this.nextIndex = nextIndex;
    }
}

export class AsyncTransactionStore{    
    constructor(){
        this.AsyncStore = new AsyncStorageWrapper();
        this.keyPrefix = "transaction";
        this.delimiter = "_";
    }

    [_generateTransactionKey]( parameters ){
        if( !( parameters instanceof AsycTransactionParameters))
            throw( "Error : Please pass in correct parameters" );
        const dates = StringDateArray( parameters.date, parameters.startDate );
        const keys = dates.map( date => [ this.keyPrefix, parameters.userId, date ].join(this.delimiter) );
        //console.log( keys );
        return( keys );
    }

    async set( parameters, value ){
        const key = this[_generateTransactionKey]( parameters )[0];
        await this.AsyncStore.setItem( key, value );
    }

    filter( parameters, values ){
        const { transactionId, minAmount, maxAmount, category, subCategory } = parameters;       
        
        let finalValues = []
        values.map( value => {
            let flag = true
            && ( transactionId ? value.transactionId == transctionId : 1 )
            && ( category ? category.includes( value.category ) : 1 )
            && ( subCategory ? subCategory.includes( value.subCategory ) : 1 )
            && ( minAmount ? value.amount >= minAmount : 1 )
            && ( maxAmount ? value.amount <= maxAmount : 1 );
            if( flag )
                finalValues.push( value )               
        } );

        return( finalValues )

    }

    sort( parameters, values ){
        sortBy = Object( parameters.sortBy )
        if( sortBy )
            values = _.orderBy( values, sortBy.keys(), sortBy.values() );
        return( values );
    }

    async get( parameters ){
        //await this.AsyncStore.clear();
        const keys = this[_generateTransactionKey](parameters);
        const Result = [];
        let {
            nextIndex,
            transactionId,
            startDate,
            date,
            userId,
            category,
            subCategory,
            sortBy,
            minAmount,
            maxAmount,
            nItems,
        } = parameters;

        await Promise.all(keys.slice(nextIndex, nextIndex + nItems)
        .map(async (key, index) => {
            //console.log(`\n key:${key} \n index:${index}`);
            if (Result.length >= nItems) {
                nextIndex = index;
                return;
            }

            try {
                let res = await this.AsyncStore.getItem(key);
                if (!res || !res["value"]) {
                    throw new Error(`key not found: ${key} \ncontinuing....\n`);
                }
                //console.log( "At last I see you: ", res );
                let values = res["value"];
                
                values = this.filter(parameters, values);
                Result.push(...values);
            } catch (error) {
                console.log("error1", error);
            }
        }));

        //Result = this.sort( parameters, Result )
        const finalResult = { 
            data : Result,
            parameters : new AsycTransactionParameters( 
                {
                    nextIndex : nextIndex,
                    userId : userId,
                    startDate : startDate,
                    date : date,
                    transactionId : transactionId,
                    category : category,
                    subCategory : subCategory,
                    minAmount : minAmount,
                    maxAmount : maxAmount,
                    sortBy : sortBy,    
                }                            
            )
        };
        return( finalResult );
    }
}

class TransactionBackupStore{
    constructor(){
        
    }

}

export class TransactionStore{
    constructor(){
        this.transactionAsyncStore = new AsyncTransactionStore();
    }

    async set( parameters, value ){
        this.transactionAsyncStore.set( parameters, value )
    }

    async get( parameters ){
        Result = await this.transactionAsyncStore.get( parameters );
        return( Result )
    }
}

export const TransactionStorer = new TransactionStore();
