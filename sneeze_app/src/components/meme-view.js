import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Image, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import UploadImg from '../resources/upload.png'


export default class MemeView extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.map}>
                    <Image
                        style={{width: '100%', height: '100%'}}
                        resizeMode={'contain'}
                        source={{uri: this.props.img}}
                    />
                </View>
                <View style={styles.title}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Title"
                    />
                </View>
                <View style={styles.buttonholder}>
                    <View style={styles.buttonno}>
                        <Button
                            buttonStyle={{backgroundColor: '#f45042', borderRadius: 0}}
                            textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                            title={`Kill`}
                            onPress={this.props.close}
                        />
                    </View>
                    <View style={styles.buttonyes}>
                        <Button
                            buttonStyle={{backgroundColor: '#27a800', borderRadius: 0}}
                            textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                            title={`ReSneeze`}
                            onPress={()=>{}}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

  map: {
      height: '85%',
      width: '100%',
       backgroundColor: '#ffffff',
  },
  title: {
      height: '0%',
      width: '100%',
      backgroundColor: '#ffffff',
      padding:5,
  },
  buttonholder: {
      flexDirection: 'row',
      height: '15%',
      width: '100%',
  },
  buttonyes: {
      height: '100%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#27a800',
  },
  buttonno: {
      height: '100%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f45042',
  },
});
