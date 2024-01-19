import { set } from "lodash";
import { createContext, useRef, useState } from "react";

export const CategorySheetContext = createContext();

export const CategorySheetProvider = ( props ) => {
    const { children } = props;
    const categorySheetRef = useRef(null);
    const [ isCategoryModalVisible, setCategoryModalVisible ] = useState(false);
    
    return( 
        <CategorySheetContext.Provider value = { 
            { 
                categorySheetRef : categorySheetRef,
                isCategoryModalVisible : isCategoryModalVisible,
                setCategoryModalVisible : setCategoryModalVisible,

            }
        }>
            {children}
        </CategorySheetContext.Provider>
    )
}
