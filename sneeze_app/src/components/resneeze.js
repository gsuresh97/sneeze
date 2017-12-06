import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

export default class ReSneeze extends React.Component {
    send(){
        fetch("this.pollEndpoint",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.props.id,
                latitude: this.props.latitude,
                longitude: this.props.longitutde,
                data: this.props.image,
            })
        })
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <MapView
                    style={styles.map}
                    scrollEnabled={false}
                    region={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.115,
                        longitudeDelta: 0.0121,
                    }}
                >
                <MapView.Marker coordinate={{latitude:this.props.latitude,longitude:this.props.longitude}}/>
                </MapView>
                <View style={styles.button}>
                    <Button
                        icon={{name: 'blur-on', size: 32}}
                        buttonStyle={{backgroundColor: '#4286f4', borderRadius: 0}}
                        textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                        title={`ReSneeze`}
                        onPress={()=>{this.send();this.props.close();}}
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
  },
  button: {
      height: '15%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4286f4',
  },
});
