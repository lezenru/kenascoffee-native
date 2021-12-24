import {ApolloClient, InMemoryCache, makeVar, useReactiveVar} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async(token) => {
    await AsyncStorage.multiSet([
        ["token", token],
        ["loggedIn", "yes"],
    ]);
    isLoggedInVar(true);
    tokenVar(token);
}

const client = new ApolloClient({
    uri: "https://kenascoffeeshop.herokuapp.com/graphql",
    cache: new InMemoryCache()
})

export default client;