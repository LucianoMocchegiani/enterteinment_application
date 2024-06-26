import React, { useState } from 'react'
import { Dimensions, Text, KeyboardAvoidingView, ImageBackground, Alert, View, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { useAuth } from '../context/authContext';
import { useStyles } from '../context/stylesContext'
const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #fff;
`

const Input = styled.TextInput`
    width: 95%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
	font-size: 15px;
	font-weight: bold;
    padding-left: 5px;
    color: black;
`
const SignInText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: left;
`

const NewToNetflixTextWrapper = styled.TouchableOpacity`
    width: 100%;
`

const NewToNetflix = styled.Text`
font-size: 15px;
font-weight: 500;
text-align: center;
color: #ccc;
margin: 15px;
text-align: center;
`

const HalfInputWrapper = styled.View`
    flex-direction:row;
    justify-content: center;
    align-items: center;
`

const HalfInput = styled.TextInput`
    width: 45.8%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-right: 5px;
    margin-top: 10px;
    &:focus {
        background-color: #454545;
    }   
`

const InputsWrapper = styled.View` 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Register = ({ navigation }) => {
    const {height, width}=useStyles()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth()

    const register = async () => {
        if (!email || !password || !firstName || !lastName) {
            alert("All fields are mandatory");
            setPassword("");
            setEmail("");
            return;
        }else{
            setLoading(true)
            const responce = await signup( email, password )
            if(responce.success){
                setEmail('')
                setPassword('')
                setFirstName('')
                lastName('')
                setLoading(false)
                navigation.replace("Login")
            }else{
                setEmail('')
                setPassword('')
                setFirstName('')
                lastName('')
                setLoading(false)
                Alert.alert('Error','Reintente crear la cuenta nuevamente. '+responce.message)
            }
        }
    }

    return (
        <>
            <StatusBar style="light" />
            <ScrollView style={{backgroundColor:'#000', height:height}}>
                <ImageBackground source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg' }} resizeMode="cover" style={{ height:height }}>
                    <View style={{height:height}}>
                        <Header login={false} />
                        <View style={{width:width, justifyContent:'center', alignContent:'center', alignItems:'center', height:height*0.8}}>
                        <View style={{height:400, width:width*0.9, maxWidth:600,backgroundColor:'black',flexDirection:'column',borderRadius:20,padding:20,justifyContent:'center'}}> 
                            <SignInText>Resgistra tu cuenta</SignInText>
                            <InputsWrapper>
                                <HalfInputWrapper>
                                    <HalfInput placeholderTextColor='grey' placeholder="Nombre" value={firstName} onChangeText={text => setFirstName(text)} />
                                    <HalfInput placeholderTextColor='grey' placeholder="Apellido" value={lastName} onChangeText={text => setLastName(text)} />
                                </HalfInputWrapper>
                                <Input placeholderTextColor='grey' placeholder="Ingresa tu email" value={email} onChangeText={(text) => setEmail(text)} />
                                <Input placeholderTextColor='grey' placeholder="Contraseña" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
                                <SubmitForm onPress={register} disabled={loading}><ButtonText>{loading ? 'Cargando...' : "Registrar"}</ButtonText></SubmitForm>
                                <NewToNetflixTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Login")}><NewToNetflix>Ya tienes cuenta? Inicia sesión</NewToNetflix></NewToNetflixTextWrapper>
                            </InputsWrapper>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </>
    )
}

export default Register
