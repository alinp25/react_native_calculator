import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class Calc extends Component {  
    
    constructor(props) {
        super(props);

        this.state = {
            inputText: '',
            pendingOperation: null,
            firstOperand: null
        }
        this.validKeys = [
            '0', '1', '2', 
            '3', '4', '5', 
            '6', '7', '8', 
            '9', '+', '-',
            '/', '*', '='
        ];
    }

    handleInput(text) {
        this.setState({
            inputText: text
        });
    }

    handleButtonInput(text) {
        if (['+', '-', '*', '/'].indexOf(text) > -1) {
            this.setState({
                pendingOperation: text,
                firstOperand: this.state.inputText,
                inputText: ''
            });
            console.log(JSON.stringify(this.state));
            return;
        } else if (text === '=') {
            if (['+', '-', '*', '/'].indexOf(this.state.pendingOperation) < 0) return; 
            console.log(JSON.stringify(this.state));
            this.setState({
                inputText: String(this.calculate(text)),
                pendingOperation: null,                
                firstOperand: null
            });
            return;
        }
        this.setState({
            inputText: this.state.inputText + text
        });
        console.log(JSON.stringify(this.state));
    }

    calculate(secondOperand) {
        switch(this.state.pendingOperation) {
            case '+':
                return Number(this.state.firstOperand) + Number(this.state.inputText);
            case '-':
                return Number(this.state.firstOperand) - Number(this.state.inputText);;
            case '*':
                return Number(this.state.firstOperand) * Number(this.state.inputText);;
            case '/':
                return Number(this.state.firstOperand) / Number(this.state.inputText);;
            default:
                return;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.input}>
                    <Text style={styles.inputTxt}> {this.state.inputText} </Text>
                </View>
                {/* <Text 
                    onChangeText={this.handleInput.bind(this)}  
                    style={styles.input}
                >{this.state.inputText}</Text> */}
                <View style={{ flex: 3, flexDirection: 'column'}}>
                    {this.validKeys.map((key, i) => {
                        if (i % 2 != 0) {
                            return;
                        } else if (i == 14) {
                            return (
                                <View style={styles.row} key={i}>
                                    <TouchableOpacity 
                                        key={i}
                                        style={styles.buttonEqual}
                                        onPress={this.handleButtonInput.bind(this, this.validKeys[i])}
                                    >
                                        <Text style={styles.btnText}>{this.validKeys[i]}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }
                        return (
                            <View style={styles.row} key={i}>
                                <TouchableOpacity 
                                    key={i}
                                    style={styles.button}
                                    onPress={this.handleButtonInput.bind(this, this.validKeys[i])}
                                >
                                    <Text style={styles.btnText}>{this.validKeys[i]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    key={i + 1} 
                                    style={styles.button}
                                    onPress={this.handleButtonInput.bind(this, this.validKeys[i + 1])}
                                >
                                    <Text style={styles.btnText}>{this.validKeys[i + 1]}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgb(41, 41, 41)',
        height: 100, 
        width: 100+'%', 
        // color: 'rgb(255, 255, 255)',
        // fontSize: 48,
        // textAlign: 'right',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputTxt: {
        color: 'rgb(255, 255, 255)',
        fontSize: 48,
        textAlign: 'right',
    },
    button: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: 'rgb(224, 224, 224)',
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    btnText: {
        fontSize: 36
    },
    buttonEqual: {
        // fontSize: 36,
        backgroundColor: '#b4d455',
        flex: 1,
        borderWidth: 1, 
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Calc;