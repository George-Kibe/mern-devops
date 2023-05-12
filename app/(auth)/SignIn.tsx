import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function validateEmail(emailAddress:string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(emailAddress);
  }
  const onSignIn = () => {
    const isValid = validateEmail(email)
    if(!isValid){
      setError("Email address is not valid");
      return;
    };
    router.push({pathname: "/authenticate", params: { email }})
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>SignIn or Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder='email'
        value={email}
        onChangeText={email => {setEmail(email); setError("")}}
        keyboardType="email-address"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: "gray",
  },
  error: {
    marginVertical: 5,
    color: "red",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    // borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button:{
    backgroundColor: "#050A12",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
  }, 
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})