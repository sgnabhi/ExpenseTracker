import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import ExpenseListScreen from './ExpenseListScreen';
import LoginScreen from './LoginScreen';

import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { FilterButtonContext, FilterSheetProvider } from '../Contexts/FilterContext';
import ExpenseBottomSheet from '../Components/ExpenseBottomSheet';
import { LoginContext } from '../Contexts/LoginContext';
import { useRef } from 'react';
import { DashboardScreen } from './DashboardScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

// (...)
const Tab = createBottomTabNavigator();
export default function AppNavigation() {
    //const {bottomSheetRef} = useContext(FilterButtonContext);
    const bottomSheetRef = useRef(null);
    const {isLoggedIn, setLoggedIn} = useContext(LoginContext);
    //console.log(bottomSheetRef);
    return (
        <NavigationContainer>
        
        { isLoggedIn ?
          (
          <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Login') {
                iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Expense List') {
                    iconName = focused ? 'ios-list' : 'ios-list-outline';
                } else if (route.name === 'Dashboard') {
                    iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen 
                name="Expense List"
                component={ExpenseListScreen}
                options={{
                    tabBarLabel: 'Expense List',
                    headerRight: () => {
                        //console.log(bottomSheetRef);
                        return(
                      <Button title= "Filter" onPress={() => 
                            {bottomSheetRef.current?.expand()}} style={{ marginRight: 16 }}/>
                        )
                        },
                    headerLeft: () => {
                      //console.log(bottomSheetRef);
                      return(
                    <Button title= "Log Out" onPress={() => 
                          setLoggedIn(false)} style={{ marginRight: 16 }}/>
                      )
                    },
                  }}
            />
            <Tab.Screen 
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Dashboard',
                    headerRight: () => {
                        //console.log(bottomSheetRef);
                        return(
                      <Button title= "Filter" onPress={() => 
                            {bottomSheetRef.current?.expand()}} style={{ marginRight: 16 }}/>
                        )
                        },
                    headerLeft: () => {
                      //console.log(bottomSheetRef);
                      return(
                        <Button title= "Log Out" onPress={() => 
                          setLoggedIn(false)} style={{ marginRight: 16 }}/>
                      )
                    },
                  }}
            />
          </Tab.Navigator>
          )
          : (
            <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Login') {
                iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Login" component={LoginScreen} />
            
          </Tab.Navigator>

          )
        
        }
        
            <ExpenseBottomSheet
              bottomSheetRef = {bottomSheetRef}
            />
          
        
        </NavigationContainer>
        
    );
}