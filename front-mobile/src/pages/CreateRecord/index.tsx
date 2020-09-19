import React, {useEffect, useState} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import Header from "../../components/Header";
import PlatformCard from "./platformCard";
import {FontAwesome5 as Icon} from '@expo/vector-icons'
import {Game, GamePlatform} from "./types";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const placeholder = {
    label: 'Selecione o game',
    value: null
}

const BASE_URL = '192.168.1.168:8080';

const mapSelectValues = (games: Game[]) => {
    return games.map(game => ({
        ...game,
        label: game.title,
        value: game.id
    }));
}

const CreateRecord = () => {

    const [platform, setPlatform] = useState<GamePlatform>();
    const [selectedGame, setSelectedGame] = useState('');
    const [gameList, setGameList] = useState<Game[]>([]);
    const [gameListFiltered, setGameListFiltered] = useState<Game[]>([]);

    const handleChangePlatform = (selectedPlatform: GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = gameList.filter(game => game.platform == selectedPlatform);
        setGameListFiltered(gamesByPlatform);
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/games`)
            .then(res => {
                const selectedValues = mapSelectValues(res.data)
                setGameList(selectedValues)
            })
    }, []);

    return (
        <>
            <Header/>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Nome"
                    placeholderTextColor="#9E9E9E"
                />
                <TextInput
                    style={styles.inputText}
                    keyboardType="numeric"
                    placeholder="Idade"
                    placeholderTextColor="#9E9E9E"
                    maxLength={3}
                />
                <View style={styles.platformContainer}>
                    <PlatformCard platform="PC"
                                  icon="laptop"
                                  onChange={() => null}
                                  activePlatform = {handleChangePlatform}
                    />
                    <PlatformCard platform="XBOX"
                                  icon="xbox"
                                  onChange={() => null}
                                  activePlatform = {handleChangePlatform}
                    />
                    <PlatformCard platform="PLAYSTATION"
                                  icon="playstation"
                                  onChange={() => null}
                                  activePlatform = {handleChangePlatform}
                    />
                </View>
                <RNPickerSelect
                    onValueChange={value => setSelectedGame(value)}
                    value={selectedGame}
                    items={gameListFiltered}
                    placeholder={placeholder}
                    style={pickerSelectStyles}
                    Icon={() => {
                        return <Icon name="chevron-down" color="#9E9E9E" size={25}/>
                    }}
                />
            </View>
        </>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    placeholder: {
        color: '#9E9E9E',
        fontSize: 16,
        fontFamily: "Play_700Bold",
    },
    iconContainer: {
        top: 10,
        right: 12,
    }
});

const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        paddingRight: '5%',
        paddingLeft: '5%',
        paddingBottom: 50
    },
    inputText: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        fontFamily: "Play_700Bold",
        fontSize: 16,
        paddingLeft: 20,
        marginBottom: 21
    },
    platformContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        marginTop: '15%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00D4FF',
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "Play_700Bold",
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0B1F34',
    }
});

export default CreateRecord;