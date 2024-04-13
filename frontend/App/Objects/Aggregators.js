//import { DateToString, LuxonDateFromJS } from "../Storage/utils";
import { DateToString, LuxonDateFromJS } from "../Storage/utils";

class Aggregator {
  constructor() {
    this.aggregatedData = {};
  }
}

export class TransactionTimeAggregator {
  constructor({ transactionsData = [], frequency = "", dateFormatProvider, keyGenerator, valueGenerator } = {}) {
    this.transactionsData = transactionsData;
    this.frequency = frequency;
    this.dateFormatProvider = dateFormatProvider || this.getDefaultDateFormat;
    this.keyGenerator = keyGenerator || this.defaultKeyGenerator;
    this.valueGenerator = valueGenerator || this.defaultValueGenerator;
    // this.aggregatedData = { 
    //   "Total Expense" :
    //   "category" : {},
    //   "subCategory"
    // }
    this.aggregatedData = this.getProcessedAggregatedData();
  }

  getDefaultDateFormat() 
  {
    switch (this.frequency) {
      case "D":
        return "yyyyLLLdd";
      case "M":
        return "YYYYMMM";
      case "Y":
        return "YYYY";
      default:
        return "";
    }
  }

  getProcessedAggregatedData() {
    return this.transactionsData.reduce((aggregatedData, transaction) => {
      aggregatedData = this.valueGenerator(transaction, aggregatedData);
      return aggregatedData;
    }, {});
  }

  defaultKeyGenerator(transaction) {
    if (!transaction.timestamp) {
      throw new Error("Transaction timestamp is required.");
    }
    const timestamp = LuxonDateFromJS(new Date(transaction.timestamp) );
    const key = DateToString(timestamp, this.dateFormatProvider());
    return key;
  }

  defaultValueGenerator( transaction, aggregatedData ) {
    const amount = parseFloat(transaction.amount);
    const key = this.keyGenerator(transaction);
    const attributes = [ "Total Expense", transaction.category, transaction.subCategory ];
    attributes.forEach( (attribute) => {
      if( attribute in aggregatedData)
        if( key in aggregatedData[ attribute ] )
          aggregatedData[ attribute ][ key ] += amount;
        else 
          aggregatedData[ attribute ][ key ] = amount;
      else
        aggregatedData[ attribute ] = { [key] : amount };
    });

    return aggregatedData;
  }
};

export class TransactionCategoryAggregator {
  constructor({ transactionsData = [], frequency = "", keyGenerator, valueGenerator } = {}) {
    this.transactionsData = transactionsData;
    this.valueGenerator = valueGenerator || this.defaultValueGenerator;
    this.aggregatedData = this.getProcessedAggregatedData();
  }


  getProcessedAggregatedData() {
    return this.transactionsData.reduce((aggregatedData, transaction) => {
      aggregatedData = this.valueGenerator(transaction, aggregatedData);
      return aggregatedData;
    }, {});
  }

  defaultValueGenerator( transaction, aggregatedData ) {
    const amount = parseFloat(transaction.amount);
    const attributes = [ transaction.category ];
    attributes.forEach( (attribute) => {
      if( attribute in aggregatedData)
          aggregatedData[ attribute ] += amount;
      else
        aggregatedData[ attribute ] = amount;
    });

    return aggregatedData;
  }
};

// export class LastTwoMonthsAggregator extends TransactionTimeAggregator {
//   constructor({ transactionsData = [], frequency = "", dateFormatProvider, keyGenerator, valueGenerator } = {}) {
//     super({ transactionsData, frequency, dateFormatProvider, keyGenerator, valueGenerator });
//   }

//   getLastTwoMonthsData() {
//     const twoMonthsAgo = LuxonDateFromJS(new Date()).minus({ months: 2 });
//     const filteredTransactions = this.transactionsData.filter(transaction => {
//       const transactionDate = LuxonDateFromJS(new Date(transaction.timestamp));
//       return transactionDate >= twoMonthsAgo;
//     });

//     return new TransactionTimeAggregator({
//       transactionsData: filteredTransactions,
//       frequency: this.frequency,
//       dateFormatProvider: this.dateFormatProvider,
//       keyGenerator: this.keyGenerator,
//       valueGenerator: this.valueGenerator
//     }).getProcessedAggregatedData();
//   }
// }



