import {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

function InputField({label, placeholder, value, keyboardType, onChangeText}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputField}>
      <Text style={styles.inputText}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && {borderWidth: 2, borderColor: '#595959'},
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={keyboardType === 'numeric' ? 10 : 25}
        minLength={keyboardType === 'numeric' ? 10 : 1}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </View>
  );
}

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    flexDirection: 'row',
  },
  inputText: {
    marginTop: 18,
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#595959',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 12,
    marginRight: 18,
    marginVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
});
