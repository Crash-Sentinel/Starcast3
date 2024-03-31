import { View, SafeAreaView, Text, TextInput, Pressable } from 'react-native';
import {styles} from './../components/styles';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation }) {
    const [tempo, setTempo] = useState(120);
    const [placeHolder, setPlaceHolder] = useState(String(tempo));
    const [timeSig, setTimeSig] = useState('4/4');
    const tempoMin = 60;
    const tempoMax = 240;

    const clampValue = (input, minValue, maxValue, func) => {
        if (input < minValue) func(minValue);
        else if (input > maxValue) func(maxValue);
    };

    const handlePress = () => {
        navigation.navigate('Results', {
            tempo: tempo,
            timeSig: timeSig
        });
    }

    useEffect(() => {
        setTempo(placeHolder);
    }, [placeHolder])

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* <br /> */}

                <Text style={styles.bold}>Adjust Metronome Settings:</Text>

                {/* <br /> */}

                <Text>Adjust Tempo:</Text>

                
                <TextInput 
                    style={[styles.textCenterAlign, styles.pressable]} 
                    value={placeHolder} 
                    onChangeText={setPlaceHolder}
                    onBlur={() => clampValue(parseInt(placeHolder), tempoMin, tempoMax, setPlaceHolder)}
                />
                {/* <br/> */}

                <Text>Time Signature:</Text>

                <Picker 
                    style={[styles.pressable, styles.textCenterAlign, {width: 165}]}
                    selectedValue={timeSig}
                    onValueChange={setTimeSig}
                >
                    <Picker.Item label='4/4' value='4/4'/>
                    <Picker.Item label='6/8' value='6/8'/>
                </Picker>

                {/* <br /> */}

                <Pressable style={styles.pressable} onPress={handlePress}>
                    <Text>  Load Metronome  </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}
