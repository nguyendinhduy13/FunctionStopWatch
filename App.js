import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableHighlight } from "react-native"
import formatTime from "minutes-seconds-milliseconds"

function StopWatch() {

    const [timeElapsed, settimeElapsed] = useState('')
    const [running, setrunning] = useState(false)
    const [startTime, setstartTime] = useState('')
    const [laps, setlaps] = useState([])
    useEffect(() => {
        let inter;
        if (running) {
            inter = setInterval(() => {
                settimeElapsed(new Date() - startTime)
            }, 10)
        }
        return () => clearInterval(inter)
    }, [running, timeElapsed])
    startStopButton = () => {
        var style = running ? styles.stopButton : styles.startButton;
        return (
            <TouchableHighlight
                underlayColor={"gray"}
                onPress={()=>{
                    setstartTime(new Date());
                    setrunning(!running);
                }}
                style={[styles.button, style]}
            >
                <Text>{(running ? 'Stop' : 'Start')}</Text>

            </TouchableHighlight>
        )
    }

    handleLapPress = () => {
        var lap = timeElapsed;
        setstartTime(new Date())
        setlaps(laps.concat([lap]))
    }

    lapButton = () => {
        return (
            <TouchableHighlight style={styles.button}
                underlayColor="gray"
                onPress={()=>{
                    handleLapPress()
                }}
            >
                <Text>
                    Lap
                </Text>
            </TouchableHighlight>
        )
    }
    lapready = () => {
        return (
            laps.map(function (time, index) {
                return (
                    <View key={index} style={styles.lap}>
                        <Text style={styles.lapText}>
                            Lap #{index + 1}
                        </Text>
                        <Text style={styles.lapText}> 
                           {formatTime(time)}
                        </Text>
                    </View>
                )
            })
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.timerWrapper}>
                    <Text style={styles.timer}>
                          {formatTime(timeElapsed)}
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                {lapButton()}
                {startStopButton()} 
                </View>
            </View>
            <View style={styles.footer}>
            {lapready()}
            </View>
        </View>
    )
            }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 20
        },
        header: {
            flex: 1
        },
        footer: {
            flex: 1
        },
        timerWrapper: {
            flex: 5,
            justifyContent: "center",
            alignItems: "center"
        },
        buttonWrapper: {
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        },
        lap: {
            justifyContent: "space-around",
            flexDirection: "row",
            backgroundColor: "lightray",
            padding: 10,
            marginTop: 10
        },
        button: {
            borderWidth: 2,
            height: 100,
            width: 100,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center"
        },
        timer: {
            fontSize: 60
        },
        lapText: {
            fontSize: 30
        },
        startButton: {
            borderColor: "green"
        },
        stopButton: {
            botderColor: "red"
        }
    })
    export default StopWatch