import React, { useState } from 'react';
import StatusBar from 'expo-status-bar';
import db from './firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Text, Button, TextInput, View, Alert, SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser ] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    if (!login || !password) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('login', '==', login));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Błąd', 'Nie ma takiego użytkownika');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const storedPassword = userData.password;

      if (password === storedPassword) {
        setUser(userData);
        Alert.alert('Zalogowano', `Witaj, ${userData.firstname} ${userData.lastName}!`);
      } else {
        Alert.alert("Błąd", "Niepoprawne hasło.");
      }
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił błąd aplikacji. Spróbuj ponownie");
    }
  };

  const handleLogout = () => {
    setUser(null);
    Alert.alert("Wylogowano", "Wylogowano użytkownika");
  };

  const handleRegister = async () => {
    if (!login || !password || !firstname || !lastname || !email) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('login', '==', login));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Błąd', 'Użytkownik o tym loginie już istnieje');
        return;
      }

      await addDoc(usersRef, {
        login: login,
        password: password,
        firstname: firstname,
        lastName: lastname,
        email: email
      });

      Alert.alert('Sukces', 'Zarejestrowano użytkownika');
      setLogin('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setEmail('');
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił błąd podczas rejestracji. Spróbuj ponownie");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logText}>Rejestracja użytkownika</Text>
      <View>
        <TextInput
          style={styles.inputText}
          placeholder='Podaj login'
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Podaj hasło'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Podaj imię'
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Podaj nazwisko'
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Podaj email'
          value={email}
          onChangeText={setEmail}
        />
        <Button title='Zarejestruj się' onPress={handleRegister} />
      </View>
      <Text style={styles.logText}>Logowanie</Text>
      {!user ? (
        <View>
          <TextInput
            style={styles.inputText}
            placeholder='Podaj login'
            value={login}
            onChangeText={setLogin}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Podaj hasło'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title='Zaloguj się' onPress={handleLogin} />
          <StatusBar style="auto" />
        </View>
      ) : (
        <View>
          <Text>Witaj, {user.firstname} {user.lastName}</Text>
          <Button title="Wyloguj się" onPress={handleLogout} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logText: {
    fontSize: 24,
    marginBottom: 20
  },

  inputText: {
    height: 40, 
    borderColor: 'grey', 
    borderWidth: 1, 
    marginBottom: 10, 
    width: 200, 
    paddingLeft: 10
  },
});
