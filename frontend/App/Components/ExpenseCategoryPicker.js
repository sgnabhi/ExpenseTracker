import { useState, useContext } from "react";
import { CategoryBottomSheet } from "../SubComponents/BottomSheet/BottomSheet";
import { CategoryCollapsible } from "../SubComponents/Collapsible/Collapsible";
import { Modal, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import { TransactionFormikContext } from "../Contexts/TransactionContext";
import { CategorySheetContext } from "../Contexts/CategoryContext";
import { ScrollView } from "react-native-gesture-handler";

export const CategoryPicker = (props) => {
    const { subCategory, defaultCategoryMap } = props;
    const {categorySheetRef, setCategoryModalVisible, isCategoryModalVisible } = useContext( CategorySheetContext);
    console.log( "category Seet", categorySheetRef );
    return(
        <>
        <Button
            title={`SubCategory:${subCategory}`}
            titleStyle={{
                color: "black",
                textAlign:"center",
                flex: 1
            }}
            buttonStyle={{
                backgroundColor:"white",
                borderColor:"black",
                borderWidth:1,
                marginBottom: 2,
                flexDirection: 'row-reverse',
                justifyContent: 'flex-start'
            }}
            iconRight
            icon={<Icon name="keyboard-arrow-down" size={30} color="black" />}
            onPress={(val) => { 
                count = 0;
                while( categorySheetRef.current == null && count <= 20 )
                {
                    //console.log( categorySheetRef );
                    categorySheetRef.current?.expand();
                    count += 1;
                }
                
                setCategoryModalVisible(true);
            } }
        />
        <ExpenseCategoryBottomSheet
            defaultCategoryMap = {defaultCategoryMap}
            categorySheetRef = {categorySheetRef}
            setCategoryModalVisible ={setCategoryModalVisible}
            isCategoryModalVisible = {isCategoryModalVisible}
        />
        </>
    )
}

export const ExpenseCategoryBottomSheet = ( props ) => {
    const {categorySheetRef, defaultCategoryMap,setCategoryModalVisible, isCategoryModalVisible } = props;
    const {formik} = useContext( TransactionFormikContext );
    const {
        values,
        setFieldValue
    } = formik;
    const [ CategoryMap, setCategoryMap ] = useState( defaultCategoryMap );
    
    const openBottomSheet = () => {
        categorySheetRef.current?.expand();
    };

    const closeBottomSheet = () => {
        categorySheetRef.current?.close();
    };
    const handleSubCategoryChange = (category,subCategory) => 
    {
        setFieldValue("category", category);
        setFieldValue("subCategory", subCategory);
        closeBottomSheet();
        setCategoryModalVisible(false);
    };
    const findCategoryMap = (query) => {
        const map = {};
        //console.log( defaultCategoryMap );
        defaultCategoryMap.forEach((category) => {
            category.subcategories.forEach((subcategory) => {
                if (subcategory.label.toLowerCase().includes(query.toLowerCase())) {
                if(category.category in map)
                    map[ category.category].push( subcategory )
                else
                    map[ category.category ] = [ subcategory ];
                }
            });
        });

        const filtered = Object.keys( map ).map( (category) => {
            return(
                {
                    category : category,
                    subcategories : map[ category ]
                }
            )
        })
        return filtered;
    }
    const handleAutocompleteChange = (query) => {
        setCategoryMap( findCategoryMap(query))
        //handleSubCategoryChange( "", "" ); // Clear selected subcategory when the query changes
    };

    return(
        <Modal 
            visible = {isCategoryModalVisible}
            transparent = {true}
        >
        <CategoryBottomSheet
            categorySheetRef = {categorySheetRef}
        >
            <ScrollView>
                <TextInput
                    placeholder = "Select Category....."
                    onChangeText = {handleAutocompleteChange}
                />
                <CategoryCollapsible
                    CategoryMap = { CategoryMap }
                    selectedSubCategory = {values.subCategory}
                    handleSubCategoryChange = {(category, subCategory) => {
                        handleSubCategoryChange( category, subCategory );
                    }}
                />
            </ScrollView>
        </CategoryBottomSheet>
        </Modal>
    )
}
