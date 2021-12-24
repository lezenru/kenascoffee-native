import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";
import {Ionicons} from "@expo/vector-icons";
import * as Font from "expo-font";
import {Asset} from "expo-asset";
import {useState} from "react";
import {ApolloProvider, useReactiveVar} from "@apollo/client";
import client, {isLoggedInVar, tokenVar} from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";


export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false)
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAsset = () => {
    const fontsToLoad = [Ionicons.font]
    const fontPromises
        = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image))
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token){
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAsset();
  }

  if(loading){
    return (<AppLoading
        startAsync={preload()}
        onError={console.warn()}
        onFinish={onFinish()}/>);
  };

  return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav/>: <LoggedOutNav/>}
        </NavigationContainer>
      </ApolloProvider>
  );



}//end of App


