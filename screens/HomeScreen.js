import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import axios from "axios";

export default class HomeScreen extends React.Component {
  //Espace de stockage
  // c'est un objet qui va nous permettre de stocker des données
  state = {
    email: "",
    password: "",
    username: ""
  };
  //on va pouvoir coder notre fonction signup
  //on veut quel fasse la requete enoi une requete a notre backend sur notre route signup
  signup = async () => {
    try {
      const response = await axios.post(
        "https://cowork-back.herokuapp.com/signup",
        {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        }
      );
      if (response) {
        console.log(response.data);

        if (response.data.status === 409) {
          alert("cette adresse mail existe déja ");
        } else {
          alert("L'utilisateur a été crée");
        }
      }
    } catch (error) {
      console.log(error.message);

      alert("Une erreur est survenue");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Bonjour Brice </Text>
        <TextInput
          //a chaque fois qu'il yest un changement text input email, tu met à jour le state email
          onChangeText={email =>
            this.setState({ email }, () => {
              console.log(this.state.email);
            })
          }
          placeholder={"email"}
          style={styles.input}
        />
        <TextInput
          //a chaque fois qu'il yest un changement text input email, tu met à jour le state email
          onChangeText={password => this.setState({ password })}
          placeholder={"password"}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          //a chaque fois qu'il yest un changement text input email, tu met à jour le state email
          onChangeText={username => this.setState({ username })}
          placeholder={"username"}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => {
            this.signup();
          }}
          style={styles.touchableOpacity}
        >
          <Text>Valider</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },

  input: {
    height: 40,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 300,
    color: "white"
  },

  touchableOpacity: {
    height: 60,
    width: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});
