import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

export default function Main({ navigation }) {
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')
    const [isKeyBoardUp, setIsKeyBoardUp] = useState(false);

    useEffect(() => {
        const loadInitialLocation = async () => {
            const { granted } = await requestPermissionsAsync()

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        
        loadInitialLocation()
    }, [])
    
    useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setIsKeyBoardUp(true)
        }
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setIsKeyBoardUp(false)
        }
    );

    return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
    };
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(response.data.devs)
    }

    const handleRegionChanged = (region) => {
        setCurrentRegion(region)
    }

    if(!currentRegion) {
        return null
    }

    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged} 
                initialRegion={currentRegion} 
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }} key={dev._id}>
                        <Image style={styles.avatar} source={{ uri: dev.photo_url ? dev.photo_url : dev.avatar_url }} />
                        <Callout style={styles.callout} onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={isKeyBoardUp ? styles.searchFormUp : styles.searchForm}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },
    callout: {
        width: 260
    },  
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchFormUp: {
        position: 'absolute',
        bottom: 300,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})
