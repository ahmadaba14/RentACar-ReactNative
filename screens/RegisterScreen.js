import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { auth, createUserDocument } from '../firebase'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [nationality, setNationality] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("DrawerNav")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = async () => {
        try {
            const credential = await auth.createUserWithEmailAndPassword(email, password);
            const uid = credential.user.uid;
            const user = {
                email: email,
                name: name,
                nationality: nationality,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirth,
            };
            await createUserDocument(user, uid);
        }catch(error){
            alert(error.message);
        }
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
            >
                <Image 
                    style={styles.logo}
                    source={require('../images/RentACarIcon.png')}
                />
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text style={styles.headerText}>Welcome</Text>
                    <Text>Please register to Continue</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Name'
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder='Re-enter Password'
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Nationality'
                        value={nationality}
                        onChangeText={text => setNationality(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Date of Birth'
                        value={dateOfBirth}
                        onChangeText={text => setDateOfBirth(text)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomTextContainer}>
                        <Text style={{marginRight: 5, fontSize: 16}}>Already have an account?</Text>
                        <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.buttonOutlineText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    headerText:{
        fontWeight: '800',
        fontSize: 40,
        color: '#0782F9'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#0782F9'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    bottomTextContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        marginTop: 30
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
})
