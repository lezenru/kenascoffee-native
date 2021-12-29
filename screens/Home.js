import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {gql, useQuery} from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import {useState} from "react";


const SEE_COFFEE_SHOPS_QUERY = gql`
    query seeCoffeeShops($page: Int){
        seeCoffeeShops(page: $page){
            shops{
                id
                name
                user{
                    name
                }
            }
            ok
            totalPages
            error
        }
    }
`


export default function Home() {

    const {data, loading, refetch, fetchMore} = useQuery(SEE_COFFEE_SHOPS_QUERY, {
        variables: {
            page: 0,
        }
    });
    const renderShops = ({item}) => {
        return <View>
            <Text style={{color: "white"}}>커피샵 이름 : {item.name}</Text>
        </View>
    }

    const refresh = async() => {
        setRefreshing(true)
        await refetch();
        setRefreshing(false)
    }

    console.log(data.seeCoffeeShops?.shops.length);

    const [refreshing, setRefreshing] = useState(false);

    return (
            <ScreenLayout loading={loading}>
                <Text style={{color:"white"}}>loaded</Text>
                <FlatList
                    onEndReachedThreshold={0.05}
                    onEndReached={() => fetchMore({
                        variables: {
                            page: data.seeCoffeeShops?.shops.length,
                        }
                    })}
                    refreshing={refreshing}
                    onRefresh={refresh}
                    data={data?.seeCoffeeShops?.shops}
                          renderItem={renderShops}
                          keyExtractor={(shop) => shop.id}/>
            </ScreenLayout>
            );
};