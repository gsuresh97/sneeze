import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Upload from './upload';

export default class Home extends React.Component {
    state = {
      isModalVisible: false
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.header}>
                    <Text>Hey</Text>
                </View>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.115,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>
                <View style={styles.button}>
                    <Button
                        icon={{name: 'blur-on', size: 32}}
                        buttonStyle={{backgroundColor: '#4286f4', borderRadius: 0}}
                        textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                        title={`Sneeze`}
                        onPress={this._showModal}
                    />
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                  <Upload close={this._hideModal} />
                </Modal>
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
