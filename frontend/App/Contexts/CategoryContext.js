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


export const FilterCategorySheetContext = createContext();

export const FilterCategoryProvider = ( props ) => {
    const { children } = props;
    const categorySheetRef = useRef( null );
    const [ modalVisible, setModalVisible ] = useState( false );
    return(
        <FilterCategorySheetContext.Provider value = 
            {
                { 
                    categorySheetRef : categorySheetRef,
                    modalVisible : modalVisible,
                    setModalVisible : setModalVisible,
                }
            }
        >
            {children}
        </FilterCategorySheetContext.Provider>
    )
}