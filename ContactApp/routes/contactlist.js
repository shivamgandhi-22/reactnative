import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const Contactlist = props => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [fetchContact, setFetchcontact] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSeacrh, setIsSearch] = useState(false);
  const addContact = () => {
    props.navigation.navigate('addcontact');
  };
  useEffect(() => {
    getContacts();
  });
  const getContacts = async () => {
    if (isSeacrh == false) {
      const data = await firestore()
        .collection('contacts')
        .orderBy('name')
        .get();
      setFetchcontact(data._docs);
    } else {
      const data = await firestore()
        .collection('contacts')
        .where('name', '==', searchQuery)
        .get();
      setFetchcontact(data._docs);
    }
  };
  const updateData = id => {
    setSelectedItem(id);
    props.navigation.navigate('updatecontact', {
      itemId: id,
    });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity style={[styles.item]} onPress={() => updateData(item.id)}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item._data.imagename}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginRight: 20,
          }}
        />
        <Text style={styles.title}>{item._data.name}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleInputChange = text => {
    if (text.length == 0) {
      setIsSearch(false);
      setSearchQuery('');
    } else {
      setIsSearch(true);
      setSearchQuery(text);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        style={{borderRadius: 50, backgroundColor: '#E5E4E2'}}
        placeholder="Search Contact..."
        onChangeText={handleInputChange}
        value={searchQuery}
        containerStyle={{borderRadius: 50, marginBottom: 10}}
      />
      <FlatList
        data={fetchContact}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.button}>
        <Icon
          name="person-add-alt"
          size={50}
          color="#000"
          onPress={addContact}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#E5E4E2',
    padding: 5,
    marginVertical: 8,
    borderRadius: 50,
  },
  selectedItem: {
    backgroundColor: '#6e3b6e',
  },
  title: {
    fontSize: 32,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Contactlist;
