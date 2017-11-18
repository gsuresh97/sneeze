import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';


export default class Upload extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.map}>
                    <Text>Hey</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        buttonStyle={{backgroundColor: '#4286f4', borderRadius: 0}}
                        textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                        title={`Upload`}
                        onPress={this.props.close}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: '0%',
        width: '100%',
    },
  map: {
      height: '85%',
      width: '100%',
       backgroundColor: '#ffffff',
  },
  button: {
      height: '15%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4286f4',
  },
});
