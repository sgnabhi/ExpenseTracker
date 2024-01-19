import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Formik } from 'formik';

function LoginScreen(props) {
    const handleLogin = (values) => {
        // Handle login logic using the form values
        console.log('Form values:', values);
      };
    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}
                >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={{flex:1, width:"80%", justifyContent:"center"}}>
                    <Input
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <Button title="Login" onPress={handleSubmit} />
                    </View>
                )}
                </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems : "center",
      justifyContent: "center"
    },
});

export default LoginScreen;