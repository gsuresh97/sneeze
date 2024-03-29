import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Image, View } from 'react-native';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import UploadImg from '../resources/upload.png';
import PhotoUpload from 'react-native-photo-upload';


export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        }
    };

    send(){
        fetch("http://192.168.43.166:8000/sneeze/",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                radius: 10,
                format: "png",
                user: this.props.id,
                latitude: 30,
                longitude: 40,
                data: this.state.image,
            })
          })
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.map}>

                    <PhotoUpload
                      onPhotoSelect={avatar => {
                        if (avatar) {
                          this.setState({image: avatar});
                        }
                      }}
                    >
                     <Image
                       style={{
                         paddingVertical: 30,
                         width: 400,
                         height: 400,
                       }}

                       resizeMode='contain'
                       source={{
                         uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                       }}
                     />
                   </PhotoUpload>
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
                        onPress={()=>{this.send();this.props.close()}}
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
      padding:5,
  },
  button: {
      height: '15%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4286f4',
  },
});
