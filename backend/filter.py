from datetime import datetime

class DateFilter:
    def __init__( self, startDate, endDate ):
        self.startDate = startDate
        self.endDate = endDate

    def getQueryDict( self ):
        QueryDict = {}
        if( self.startDate ):
            startDate = datetime.strptime( self.startDate, "%Y-%m-%d" )
            QueryDict[ '$gte' ] = startDate
        if( self.endDate ):
            endDate = datetime.strptime( self.endDate, "%Y-%m-%d" )
            QueryDict[ '$lte' ] = endDate

        if( len(QueryDict ) != 0 ):
            QueryDict = { "date" : QueryDict }
        return( QueryDict )
    
class AmountFilter:
    def __init__( self, minAmount, maxAmount ):
        self.minAmount = minAmount
        self.maxAmount = maxAmount
    
    def getQueryDict( self ):
        QueryDict = {}
        if( self.minAmount ):
            minAmount = int( self.minAmount )
            QueryDict[ '$gte' ] = minAmount
        if( self.maxAmount ):
            maxAmount = int( self.maxAmount )
            QueryDict[ '$lte' ] = maxAmount

        if( len(QueryDict ) != 0 ):
            QueryDict = { "amount" : QueryDict }
        
        return QueryDict
    
class ListFilter:
    def __init__( self, attributeName, list ):
        self.list = list
        self.attributeName = attributeName
    
    def getQueryDict( self ):
        QueryDict = {}
        if( self.list ):
            QueryDict[ "$in" ] = self.list
        
        if( len(QueryDict) ):
            QueryDict = { self.attributeName : QueryDict }

        return QueryDict