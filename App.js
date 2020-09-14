import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {

  constructor(){
    super()
    this.state={
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL', '+', '-', '*', '/']
  }

  calculateResult(){
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  validade(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text){
    if(text == '='){
      return this.validade() && this.calculateResult()
    }

    this.setState({
      resultText: this.state.resultText+text
    })
  }

  operate(operation){
    // Aditional code to make calculator work more like one
    if(this.state.resultText == "" && ( operation == '*' || operation == '/')) return // stops invalid imputs such as *9+2 or /8+3*2
    if(this.state.resultText == "" && operation == 'DEL'){ // when you delete everything from calculation the result is empty as well
      this.setState({
        calculationText: ""
      })
      return
    }
    switch(operation){
      case 'DEL':
        const text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()

        if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.text == "") return

        this.setState({
          resultText: this.state.resultText + operation
        })
    }
  }

  render(){
    let rows = []
    let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.button}>
          <Text style={styles.buttonText}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i = 0; i < 5; i++){
      ops.push(<TouchableOpacity key={this.operations[i]} style={styles.button} onPress={() => this.operate(this.operations[i])}>
        <Text style={[styles.buttonText, {color: 'white'}]}>{this.operations[i]}</Text>
      </TouchableOpacity>)
    }

    return(
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>

        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View> 

          <View style={styles.operations}>
            {ops}          
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  result: {
    flex:2,
    backgroundColor:  'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#636363'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 40,
    color: 'black'
  },
  calculationText: {
    fontSize: 25,
    color: 'black'
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 30,
    color: 'white'
  }
})