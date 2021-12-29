import {ApolloClient, createHttpLink, InMemoryCache, makeVar, useReactiveVar} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setContext} from "@apollo/client/link/context";
import {offsetLimitPagination} from "@apollo/client/utilities";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN, token)
    isLoggedInVar(true);
    tokenVar(token);
}

export const logUserOut = async() => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar("");
}

const httpLink = createHttpLink({
    uri: "https://kenascoffeeshop.herokuapp.com/graphql",
});

const authLink = setContext((_, {header}) => {
    return {
        header: {
            ...header,
            token: tokenVar()
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    seeFeed: offsetLimitPagination(),
                },
            },
        },
    }),
});

export default client;