import React, { useState, useRef } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const TestScreen = () => {
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible,setSecondModalVisible] = useState( false);
  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const showFirstModal = () => {
    setFirstModalVisible(true);
  };

  const hideFirstModal = () => {
    setFirstModalVisible(false);
  };

  const showBottomSheet = () => {
    //hideFirstModal();
    //
    setBottomSheetVisible(true);   
    setSecondModalVisible(true);
    let count = 0;
    while( count <= 10 && bottomSheetRef.current == null ){
      console.log(bottomSheetRef);
      bottomSheetRef.current?.expand();
      count += 1;
    }
      
  };

  const hideBottomSheet = () => {
    setSecondModalVisible(false)
    setBottomSheetVisible(false);
    
    console.log(bottomSheetRef);
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Button title="Open First Modal" onPress={showFirstModal} />

      <Modal
        visible={isFirstModalVisible}
        onRequestClose={hideFirstModal}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text>This is the first modal</Text>
            <Button title="Open Bottom Sheet" onPress={showBottomSheet} />
          </View>
        </View>
        <Modal
          visible={isSecondModalVisible}
          onRequestClose={hideBottomSheet}
          transparent={true}
        >

<BottomSheet
        ref={bottomSheetRef} // Make sure you have this line
        index={0}
        snapPoints={['25%', '50%', '75%']}
        style={styles.bottomSheet}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
        )}
      >
        <View style={styles.bottomSheetContent}>
          <Text>This is the bottom sheet</Text>
          <Button title="Close Bottom Sheet" onPress={hideBottomSheet} />
        </View>
      </BottomSheet>
        </Modal>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    padding: 16,
  },
});

export default TestScreen;
