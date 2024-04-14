import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { LoginContext } from '../Contexts/LoginContext';
import { set } from 'lodash';
import { useContext } from 'react';

function LoginScreen(props) {
    //console.log( props );
    const {setLoggedIn} = useContext( LoginContext );
    const handleLogin = async (values) => {
        // Handle login logic using the form values
        console.log('Form values:', values);
        if( values.enteredotp == values.otp )
        {
            Alert.alert( "Login Successful");
            await setLoggedIn(true);
            await props.navigation.navigate( "Dashboard" );            
        }            
        else
        {
            Alert.alert( "Login Unsuccessful. Try Again!!");
            props.navigation.navigate( "Login" )
        }
            
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Personal ET</Text>
                <Text style={styles.welcomeText}>Welcome back!</Text>
            </View>
            <Formik
                initialValues={{ username: '', otp: '', enteredotp : '', sendotp : false }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit,setFieldValue, values }) => (
                    <View style={styles.form}>
                        <Input
                            placeholder="Email Address"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            autoCapitalize="none"
                            inputStyle={styles.input}
                        />
                        <Button
                            title="Send OTP"
                            onPress={ async (e) => {
                                try {
                                    const response = await fetch(`http://192.168.0.108:3000/send-otp?email=${values.username}`);
                                    const data = await response.json();
                                    console.log('Response:', data);
                                    await setFieldValue( 'otp', data.otp )
                                    Alert.alert('OTP Sent Successfully!');
                                } catch (error) {
                                    console.error('Error sending OTP:', error);
                                    Alert.alert('Failed to send OTP. Please try again.');
                                }
                                await setFieldValue('sendotp', true);
                            }}
                            buttonStyle={styles.loginButton}
                            titleStyle={styles.loginButtonText}
                        />                        
                        {
                            values.sendotp &&
                            (<View>
                                <Input
                                    placeholder="OTP"
                                    value={values.enteredotp}
                                    onChangeText={handleChange('enteredotp')}
                                    onBlur={handleBlur('enteredotp')}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    inputStyle={styles.input}
                                />
                                <Button
                                    title="Login"
                                    onPress={handleSubmit}
                                    buttonStyle={styles.loginButton}
                                    titleStyle={styles.loginButtonText}
                                />
                            </View>)  
                            
                        }                   
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF4500', // Orange color
    },
    welcomeText: {
        fontSize: 18,
        color: '#333',
    },
    form: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#FF4500',
        borderRadius: 10,
    },
    loginButtonText: {
        fontWeight: 'bold',
    },
    registerText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#333',
    },
    registerLink: {
        color: '#FF4500',
    },
});

export default LoginScreen;
