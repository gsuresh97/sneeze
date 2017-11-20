import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Upload from './upload';
import MemeView from './meme-view';
import ReSneeze from './resneeze';


export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }
    state = {
      isModalVisible: false,
      isMemeViewVisible: false,
      isReSneezeVisible: false,
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    _showMeme = () => this.setState({ isMemeViewVisible: true })

    _hideMeme = () => this.setState({ isMemeViewVisible: false })

    _showReSneeze = () => this.setState({ isReSneezeVisible: true })

    _hideReSneeze = () => this.setState({ isReSneezeVisible: false })

    pollServer(){
        ;
    }


    componentDidMount(){
        this.timeout = setTimeout(this.pollServer, 1000);
        navigator.geolocation.getCurrentPosition(
            (position) => {
            this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,});
    },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.header}>
                    <Text>Hey</Text>
                </View>
                <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
    </View>
                <MapView
                    style={styles.map}
                    scrollEnabled={false}
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
                        buttonStyle={{backgroundColor: '#4286f4', borderRadius: 0}}
                        textStyle={{textAlign: 'center', fontSize:20, fontFamily:'Roboto', fontWeight:'bold'}}
                        title={`Sneeze`}
                        onPress={this._showModal}
                    />
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                  <Upload close={this._showMeme} />
                </Modal>
                <Modal isVisible={this.state.isMemeViewVisible}>
                  <MemeView close={()=>{this._hideModal();this._hideMeme();this._hideReSneeze()}} open={this._showReSneeze} />
                </Modal>
                <Modal isVisible={this.state.isReSneezeVisible}>
                  <ReSneeze close={()=>{this._hideModal();this._hideMeme();this._hideReSneeze()}} />
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

