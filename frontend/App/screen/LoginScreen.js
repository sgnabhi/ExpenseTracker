import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';

function LoginScreen(props) {
    const handleLogin = (values) => {
        // Handle login logic using the form values
        console.log('Form values:', values);
    };

    const handleCreateAccount = () => {
        // Logic to navigate to the screen for creating a new account
        // You can implement navigation logic here, such as using React Navigation
        console.log('Create new account');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Personal ET</Text>
                <Text style={styles.welcomeText}>Welcome back!</Text>
            </View>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.form}>
                        <Input
                            placeholder="Username"
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            autoCapitalize="none"
                            inputStyle={styles.input}
                        />
                        <Input
                            placeholder="Password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
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
                        <Text style={styles.registerText}>Don't have an account yet? <Text style={styles.registerLink} onPress={handleCreateAccount}>Register Here</Text></Text>
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
