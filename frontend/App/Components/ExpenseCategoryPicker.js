import { useState, useContext, useEffect } from "react";
import { CategoryBottomSheet } from "../SubComponents/BottomSheet/BottomSheet";
import { CategoryCollapsible } from "../SubComponents/Collapsible/Collapsible";
import { Modal, TextInput, StyleSheet, Pressable,Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { TransactionFormikContext } from "../Contexts/TransactionContext";
import { CategorySheetContext } from "../Contexts/CategoryContext";
import { ScrollView } from "react-native-gesture-handler";

export const CategoryPicker = (props) => {
    const { subCategory, defaultCategoryMap } = props;
    const {categorySheetRef, setCategoryModalVisible, isCategoryModalVisible } = useContext( CategorySheetContext);
    //console.log( "category Seet", categorySheetRef );
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

    const selectedCategoryMap = {[values.category] : [ values.subCategory]};
    console.log("1Selected Category Map", selectedCategoryMap, "\n");
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
                    selectedCategoryMap = { selectedCategoryMap }
                    handleSubCategoryChange = {(category, subCategory ) => {
                        handleSubCategoryChange( category, subCategory );
                    }}
                />
            </ScrollView>
        </CategoryBottomSheet>
        </Modal>
    )
}


export const ExpenseCategoryMultiPicker = ( props ) => {
    const { categorySheetRef, defaultCategoryMap, handleCategoryChange, isCategoryModalVisible, setCategoryModalVisible} = props;
    return(
        <ExpenseCategoryPickerBase
            categorySheetRef = {categorySheetRef}
            defaultCategoryMap = {defaultCategoryMap}
            handleCategoryChange = {handleCategoryChange}
            isCategoryModalVisible = {isCategoryModalVisible}
            setCategoryModalVisible = {setCategoryModalVisible}
        />
    );
}

export const ExpenseCategoryPickerBase = ( props ) => {    
    const {categorySheetRef, defaultCategoryMap, handleCategoryChange, isCategoryModalVisible, setCategoryModalVisible } = props;
    const [ CatStruct, setCatStruct ] = useState( {} );
    const [ CategoryMap, setCategoryMap ] = useState( defaultCategoryMap );
    
      

    const closeBottomSheet = () => {
        categorySheetRef.current?.close();
    };
    const handleCatStruct = (struct,category,subCategory) => {
        //console.log(CatStruct);
        const state = {...struct};
        if (category in state && !state[category].includes(subCategory)) {
            state[category] = [...state[category], subCategory];
        } else if (category in state && state[category].includes(subCategory)) {
            //console.log("before\n", state, "\n");
            state[category] = state[category].filter((item) => item !== subCategory);
            //console.log("after\n", state, "\n");
            if (state[category].length === 0) {
            delete state[category];
            }
        } else if (!(category in state)) {
            state[category] = [subCategory];
        }
        return state;
    };
    const handleSubCategoryChange = (category,subCategory) => 
    {
        //console.log(category, subCategory);
        setCatStruct(handleCatStruct(CatStruct, category,subCategory));
        //setCategoryMap([{category:category, subCategory : {label: subCategory, icon : "home"}}])
    };
    const handleSubmit = () => {
        handleCategoryChange( Object.keys(CatStruct), Object.values(CatStruct).flat() );
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
        setCategoryMap( findCategoryMap(query) )
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
            <ScrollView
                stickyHeaderIndices={[ 0, 1 ]} 
            >
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
                </Pressable>
                <TextInput
                    placeholder = "Select Category....."
                    onChangeText = {handleAutocompleteChange}
                />
                <CategoryCollapsible
                    CategoryMap = { Object.values( {category : CategoryMap})[0] }
                    SelectedCategoryMap = {CatStruct}
                    handleSubCategoryChange = {(category, subCategory) => {
                        handleSubCategoryChange( category, subCategory );
                    }}
                />
            </ScrollView>
        </CategoryBottomSheet>
        </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 20,
      backgroundColor: '#3498db',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  