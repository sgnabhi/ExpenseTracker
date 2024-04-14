import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FilterButtonContextProvider, FilterSheetProvider } from "./App/Contexts/FilterContext";
import AppNavigation from "./App/screen/Navigation";
import { CategorySheetProvider, FilterCategoryProvider } from "./App/Contexts/CategoryContext";
import { TransactionFormikProvider } from "./App/Contexts/TransactionContext";
import { TransactionAddFormProvider } from "./App/Contexts/TransactionContext";
import { ExpenseOverCategoryProvider, ExpenseOverTimeProvider } from "./App/Contexts/ChartContext";
import { LoginProvider } from "./App/Contexts/LoginContext";
// import { SafeAreaView, View } from "react-native";
// import { PortalProvider } from "@gorhom/portal";
// import TestScreen from "./App/screen/TestScreen";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function App(props) {
  return(
    <GestureHandlerRootView style={{flex:1}}>
      <LoginProvider>
      <FilterCategoryProvider>
      <FilterSheetProvider>        
      <ExpenseOverTimeProvider>
      <ExpenseOverCategoryProvider>
      <CategorySheetProvider>
      <TransactionFormikProvider>
      <FilterButtonContextProvider>
        <AppNavigation />
      </FilterButtonContextProvider>
      </TransactionFormikProvider>
      </CategorySheetProvider>       
      </ExpenseOverCategoryProvider>
      </ExpenseOverTimeProvider>
      </FilterSheetProvider>
      </FilterCategoryProvider>
      </LoginProvider>
    </GestureHandlerRootView>

  );
}

export default App;

// // App.js
// import React, { useRef } from 'react';
// import { View, Text, Pressable } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Tab = createBottomTabNavigator();

// const App = () => {
//   const bottomSheetRef = useRef(null);

//   const handleFilterPress = () => {
//     bottomSheetRef.current?.expand();
//   };

//   const handleClosePress = () => {
//     bottomSheetRef.current?.close();
//   };

//   return (
//     <GestureHandlerRootView style={{flex:1}}>
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerRight: () => (
//             <Pressable onPress={handleFilterPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, marginRight: 10 }]}>
//               <Text>Filter</Text>
//             </Pressable>
//           ),
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         {/* Add more screens as needed */}
//       </Tab.Navigator>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1}
//         snapPoints={['25%', '50%', '75%', '100%']}
//         backgroundComponent={({ style }) => <View style={[style, { backgroundColor: 'white' }]} />}
//       >
//         <View>
//           <Text>Bottom Sheet Content</Text>
//           <Pressable onPress={handleClosePress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, marginTop: 16 }]}>
//             <Text>Close Bottom Sheet</Text>
//           </Pressable>
//         </View>
//       </BottomSheet>
//     </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// };

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//       {/* Add components for the Home screen */}
//     </View>
//   );
// };

// export default App;

