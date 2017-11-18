import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Image, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import UploadImg from '../resources/upload.png'


export default class Upload extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.map}>
                    <Image
                      source={UploadImg}
                    />
                </View>
                <View style={styles.title}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Title"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        buttonStyle={{backgroundColor: '#4286f4', borderRadius: 0}}
                        textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                        title={`Send`}
                        onPress={this.props.close}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  map: {
      height: '75%',
      width: '100%',
       backgroundColor: '#ffffff',
  },
  title: {
      height: '10%',
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
