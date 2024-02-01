import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';

const BaseCollapsible = (props) => {
  console.log( 'BaseCollapsible');
  
  const { categoriesWithSubcategories, selectedCategoryMap, handleSubCategoryChange } = props;
  console.log("selectedCategoryMap", selectedCategoryMap, "\n");
  const selectedCategory = Object.keys( selectedCategoryMap);
  const selectedSubCategory = Object.values( selectedCategoryMap).flat();
  console.log("\nSelected Category", selectedCategory, "\n");
  console.log("\nSelected SubCategory", selectedSubCategory, "\n");
  const [expandedSections, setExpandedSections] = useState(categoriesWithSubcategories.map((_, index) => index));
  
  const renderSubcategoryButton = (category, subcategory) => {
    //const [isPressed, setPressed] = useState(false);
    const handlePress = () => {
      //setPressed(newPressedValue);
      handleSubCategoryChange(category.category, subcategory.label);
    };

    return (
      <Pressable
        key={subcategory.label}
        style={({ pressed }) => [
          styles.subcategoryButton,
          pressed && styles.pressedButton,
          selectedCategory.includes( category.category ) && selectedSubCategory.includes( subcategory.label ) && styles.selectedButton,
        ]}
        onPress={handlePress}
      >
        <View style={styles.iconContainer}>
          <Icon name={subcategory.icon} size={16} color="black" />
        </View>
        <Text style={{ fontSize: 10 }}>{subcategory.label}</Text>
      </Pressable>
    );
  };

  const renderHeader = (category, index) => (
    <Pressable onPress={() => toggleSection(index)}>
      <View style={[styles.categoryHeader, styles.activeCategoryHeader]}>
        <Text style={styles.categoryTitle}>{category.category}</Text>
      </View>
    </Pressable>
  );

  const renderContent = (category, index) => (
    <Collapsible collapsed={!expandedSections.includes(index)}>
      <View style={styles.subcategoryContainer}>
        {category.subcategories.map((subcategory) => renderSubcategoryButton(category, subcategory))}
      </View>
    </Collapsible>
  );

  const toggleSection = (index) => {
    const updatedExpandedSections = [...expandedSections];
    const sectionIndex = updatedExpandedSections.indexOf(index);

    if (sectionIndex === -1) {
      updatedExpandedSections.push(index);
    } else {
      updatedExpandedSections.splice(sectionIndex, 1);
    }

    setExpandedSections(updatedExpandedSections);
  };

  return (
    <View style={styles.container}>
      {categoriesWithSubcategories.map((category, index) => (
        <View key={category.category}>
          {renderHeader(category, index)}
          {renderContent(category, index)}
        </View>
      ))}
    </View>
  );
};
export const CategoryCollapsible = ( props ) => {
    const { CategoryMap, selectedCategoryMap, handleSubCategoryChange } = props;
    return(
        <BaseCollapsible
            categoriesWithSubcategories = {CategoryMap}
            selectedCategoryMap = {selectedCategoryMap}
            handleSubCategoryChange = {handleSubCategoryChange}
        />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : 100
  },
  categoryHeader: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeCategoryHeader: {
    backgroundColor: '#e0e0e0',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  subcategoryButton: {
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  pressedButton: {
    backgroundColor: '#e0e0e0',
  },
  selectedButton: {
    backgroundColor: '#e0e0e0',
  },
  iconContainer: {
    marginBottom: 5,
  },
  categoryLabel: {
    color: '#888',
    marginTop: 5,
  },
});

