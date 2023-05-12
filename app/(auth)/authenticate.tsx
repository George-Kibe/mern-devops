import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'expo-router';
import { authenticate } from '../../libs/apis/auth';

const Authenticate = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { email } = useSearchParams();
  const router = useRouter();

  const onAuthenticate = async() => {
    if (code.length !== 6){
      setError("Code is Invalid! Check for Missing or Excess numbers!")
    }
    if (typeof email !== "string"){
      return;
    }
    try {
      const response = await authenticate({email, emailToken:code});
      console.log(response)
    } catch (error: any) {
      setError(error.message)
    }
    console.log(email, code.length)
    // router.push("/(drawer)")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Enter Your One Time Code</Text>
      <TextInput
        style={styles.input}
        placeholder='Email Code'
        value={code}
        onChangeText={code => {setCode(code); setError("")}}
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={onAuthenticate}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Authenticate

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