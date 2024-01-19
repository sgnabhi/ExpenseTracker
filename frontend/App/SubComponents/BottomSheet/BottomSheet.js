import React, { useRef } from 'react';
import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BaseBottomSheet = ( props ) => {
    const { bottomSheetRef, children, initialIndex } = props;

    const handleFilterPress = () => {
        bottomSheetRef.current?.expand();
      };
    
      const handleClosePress = () => {
        bottomSheetRef.current?.close();
      };
    
      return (
            <BottomSheet
              ref={bottomSheetRef}
              index={initialIndex}
              snapPoints={['40%', '80%']}
              backgroundComponent={({ style }) => <View style={[style, styles.bottomSheetBackground]} />}
            >
              <View style={styles.bottomSheetContent}>
                {children}
              </View>
            </BottomSheet>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
      },
      openButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: 'lightblue',
        borderRadius: 8,
      },
      bottomSheetBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      bottomSheetContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      closeButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: 'lightcoral',
        borderRadius: 8,
      },
    });
    
export const TransactionBottomSheet = ( props ) => {
    const { bottomSheetRef, children } = props;
    return(
        <BaseBottomSheet
            bottomSheetRef = {bottomSheetRef}
            initialIndex = {-1}
        >
            {children}
        </BaseBottomSheet>
    );
}

export const CategoryBottomSheet = ( props ) => {
  const { categorySheetRef, children } = props;
  return( 
    <BaseBottomSheet
      bottomSheetRef = {categorySheetRef}
      initialIndex = {0}
    >
      {children}
    </BaseBottomSheet>
  )
}