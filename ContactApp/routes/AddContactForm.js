import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Text,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import InputField from './Component/InputField';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
export default function AddContactForm(props) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(null);
  const [landlineNumber, setLandlineNumber] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  let options = {
    mediaType: 'photo',
    saveToPhotos: true,
  };
  function resetDetails() {
    setName('');
    setMobileNumber(null);
    setLandlineNumber(null);
  }
  async function saveDetails() {
    await firestore()
      .collection('contacts')
      .add({
        name: name,
        mobileNumber: parseInt(mobileNumber),
        landlineNumber: parseInt(landlineNumber),
        favourite: isFavourite,
        imagename: image.assets[0].uri,
      });
    console.log(
      name + ' ' + mobileNumber + ' ' + landlineNumber + ' ' + isFavourite,
    );
    uploadImage();
    props.navigation.navigate('contactlist');
  }
  const uploadImage = async () => {
    const ref = storage().ref(image.assets[0].fileName);
    const path = image.assets[0].uri;
    await ref.putFile(path);
  };
  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setImage(result);
    }

    // await uploadImage();
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.press}>
        <Icon
          name={isFavourite ? 'heart' : 'heart-o'}
          color="#ff0000"
          size={36}
          style={styles.icons}
          onPress={() => setIsFavourite(!isFavourite)}
        />
      </Pressable>
      {image === null ? (
        <View style={styles.CircleShape}>
          <Icon
            name="camera"
            style={{margin: 26}}
            size={40}
            color="#000"
            onPress={openCamera}
          />
        </View>
      ) : (
        <Image
          source={{uri: image.assets[0].uri}}
          style={styles.CircleShape}
          onPress={openCamera}
        />
      )}
      <InputField
        label="Name    "
        keyboardType="default"
        placeholder="Contact name"
        value={name}
        onChangeText={name => setName(name)}
      />
      <InputField
        label="Mobile  "
        keyboardType="numeric"
        placeholder="Mobile number"
        value={mobileNumber}
        onChangeText={mobile => setMobileNumber(mobile)}
      />
      <InputField
        label="Landline"
        keyboardType="numeric"
        placeholder="Landline number"
        value={landlineNumber}
        onChangeText={landline => setLandlineNumber(landline)}
      />

      <Button title="Save" onPress={saveDetails} />
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  press: {
    marginRight: 20,
    marginTop: 25,
    alignSelf: 'flex-end',
  },
  icons: {},

  imagePreview: {
    width: '50%',
    height: 20,
    marginBottom: 50,
    marginLeft: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  image: {
    width: '20%',
    height: '100%',
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 10,
  },
  CircleShape: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    // backgroundColor: '#FF9800',
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 50,
    marginLeft: 155,
    marginTop: 70,
  },
});

// marginTop: 100, marginBottom: 100
{
  /* <Image
            source={{uri: image}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: '#000',
            }}
          /> */
}
