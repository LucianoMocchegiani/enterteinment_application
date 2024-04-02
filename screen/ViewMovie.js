import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { getMovieDetail } from '../firebase/endpoints/movies'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import { Video } from 'expo-av';
import { useAuth } from '../context/authContext'
import { useRoute } from '@react-navigation/native'


import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";


const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
    min-height: ${(Dimensions.get('window').height)}px;
	height: auto;
`

const HeaderIcons = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Title = styled.Text`
    color: white;
    font-size: 24px;
    margin: 10px;
    font-family: "Montserrat_700Bold"
`

const MovieBadge = styled.Text`
    color: #a2a2a2;
    background-color: #373737;
    padding: 2px;
    border-radius: 5px;
    width: 38px;
    text-align: center;
    margin: 15px;
`

const Subtitle = styled.Text`
    color: #a2a2a2;
    margin: 5px;
`

const MovieSubDetails = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: -17px;
`

const Play = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #fff;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
    justify-content: center;
    margin: 10px;
`

const TextButtonPlay = styled.Text`
	font-size: 15px;
	font-weight: bold;
	padding-left: 5px;
`

const Download = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #262626;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
	justify-content: center;
`

const TextButtonDownload = styled.Text`
	font-size: 15px;
    font-weight: 700;
    color: white;
    padding-left: 5px;
`

const ActionButtons = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const MovieDescription = styled.Text`
    color: white;
    width: 98%;
    margin-left: 10px;
    margin: 10px;
    font-weight: 100;
    font-family: "Montserrat_300Light";
    line-height: 20px;
    margin-top: 25px;
`

const Tag = styled.Text`
    color: #fff;
    font-family: "Montserrat_400Regular";
`

const TagDot = styled.View`
    margin: 10px;
    background-color: white;
    height: 2px;
    width: 2px;
`

const Tags = styled.View`
flex-direction: row;
justify-content: center;
margin: 10px 0 5px 3px;
align-items: center;
flex-wrap: wrap;
width: 99%;
`

const TagWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`

const ActionButtons2 = styled.View`
    flex-direction :row;
    justify-content: center;
    margin: 20px;
    align-items: center;
`

const ActionButton = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px;
    margin-top: 20px;
`

const ActionButtonLabel = styled.Text`
    color: white;
    font-family: "Montserrat_300Light";
    font-size: 15px;
`

const ViewMovie = ({ navigation }) => {
    const {user} = useAuth()
    const {params} =  useRoute()
    const [state, setState]= useState({
        success: null, 
        message: null,
        data: null
    })
    const handleSetState = async ()=>{
        const {success, message, data} = await getMovieDetail(params?.id)
        setState({
            success: success, 
            message: message,
            data: data
        })
    }
    useEffect(()=>{
        handleSetState()
        console.log(params)
        return(()=>{
            setState({
                success: null, 
                message: null,
                data: null
            })
        })
    },[params])
    const [loading, setLoading] = useState(false)

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    return fontsLoaded && !loading ? (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />

            <Container>
                <Header login={true} goBack={navigation.goBack} />
                <Video
                    source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/entertainment-app-87f62.appspot.com/o/m-videos%2F${params?.id}?alt=media&token=6bf5d8cf-f5e3-4bcb-bdaa-0af7aee9f8db`
                    }}
                    isMuted={false}
                    useNativeControls={false}
                    shouldPlay={true}
                    style={{ height: 225, marginTop: 15 }}
                    resizeMode="contain"
                    usePoster={true}
                    posterSource={{ uri: state?.data?.poster_path?"https://image.tmdb.org/t/p/w500"+ state?.data?.poster_path:null }}
                    useNativeControls={true}
                />
                <Title>{state?.data?.title}</Title>
                <MovieSubDetails>
                    <MovieBadge>13+</MovieBadge>
                    <Subtitle>{state?.data?.release_date}</Subtitle>
                </MovieSubDetails>
                <ActionButtons>
                    <Play activeOpacity={0.5}>
                        <TextButtonPlay>Play</TextButtonPlay>
                    </Play>
                </ActionButtons>
                <MovieDescription>
                    {state?.data?.overview}
                </MovieDescription>
                <Tags>
                    {
                        state?.data?.genres.map((genre, i) => {
                            if (i + 1 == state?.data?.genres.length) {
                                return (
                                    <TagWrapper key={i}>
                                        <Tag>{genre.name}</Tag>
                                    </TagWrapper>
                                )
                            } else {
                                return (
                                    (
                                        <TagWrapper key={i}>
                                            <Tag>{genre.name}</Tag>
                                            <TagDot />
                                        </TagWrapper>
                                    )
                                )
                            }
                        })
                    }
                </Tags>

                <ActionButtons2>
                    {/* {
                        movie && user?.list.includes(movie.id) ? (
                            <ActionButton activeOpacity={0.5} onPress={() => {
                                console.log('funcion api my list delete')
                            }}>
                                <Feather name="check" size={35} color="white" />
                                <ActionButtonLabel>My List</ActionButtonLabel>
                            </ActionButton>
                        ) : (
                                <ActionButton activeOpacity={0.5} onPress={() => {
                                  console.log('funcion api add my list')

                                }}>
                                    <Ionicons name="add-outline" size={35} color="white" />
                                    <ActionButtonLabel>My List</ActionButtonLabel>
                                </ActionButton>
                            )
                    } */}
                    {/* <ActionButton activeOpacity={0.5}>
                        <AntDesign name="like2" size={30} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Rate</ActionButtonLabel>
                    </ActionButton> */}
                    {/* <ActionButton activeOpacity={0.5}>
                        <AntDesign name="sharealt" size={27} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Share</ActionButtonLabel>
                    </ActionButton> */}
                </ActionButtons2>
            </Container>
        </>
    ) : (
            <Container />
        )
}

export default ViewMovie