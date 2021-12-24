import {Text, View } from "react-native";
import {useQuery} from "@apollo/client";

const SEE_COFFEE_SHOP_QUERY = gql`
    query seeCoffeeShop($id: Int!){
        seeCoffeeShop(id: $id){
            id
            name
            user{
                id
                name
            }
            latitude
            longitude
            isMine


        }
    }
`;


export default function Profile() {
    
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Profile</Text>
        </View>
    );
};