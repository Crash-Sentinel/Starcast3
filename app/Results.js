import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import {styles} from './../components/styles';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export default function ResultScreen({ route, navigation }) {
    const { tempo, timeSig } = route.params;

    const [ms, setMS] = useState(determineMS(tempo, timeSig));
    const [sound, setSound] = useState();
    const [interval, setInt] = useState();
    const [running, setRunning] = useState(false);

    const width = useWindowDimensions().width;

    var beat = 1;


    function determineMS(tempo, timeSig) {
        return (60000 / tempo) * (4 / timeSig.split("/")[1]);
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require("./../audio/wood_click.mp3"));
        setSound(sound);
        beat++;
        await sound.playAsync();
    }

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined
    }, [sound]);
    
    return (
        <View>
            <View style={[styles.header, {width: width}]}>
                <Text style={styles.bold}>Metronome Component</Text>
            </View>
            {/* <br/> */}
            <View style={styles.container}>
                <Text style={styles.bold}>Metronome Settings:</Text>
                {/* <br/> */}
                <Text>Tempo: {tempo}</Text>
                <Text>Time Signature: {timeSig}</Text>
                {/* <br/> */}
                {running && (
                    <Text>Running Metronome...</Text>
                )}
                {/* <br/> */}
                <Pressable
                    style={styles.pressable} 
                    onPress={() => {
                        setRunning(true);
                        const interval = setInterval(playSound, ms);
                        setInt(interval);
                    }}
                >
                    <Text>  Start Metronome  </Text>
                </Pressable>
                {/* <br /> */}
                <Pressable 
                    style={styles.pressable}
                    onPress={() => {
                        setRunning(false);
                        setInt((prevInt) => clearInterval(prevInt));
                    }}
                >
                    <Text>  Stop Metronome  </Text>
                </Pressable>
                {/* <br/> */}
                <Pressable
                    style={styles.pressable}
                    onPress={() => {
                        setRunning(false);
                        setInt((prevInt) => clearInterval(prevInt));
                        navigation.goBack();
                    }}
                >
                    <Text>  Go Back to Main Screen  </Text>
                </Pressable>
            </View>
        </View>
        
    )
}