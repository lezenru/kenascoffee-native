import React, {useEffect, useRef} from "react";
import AuthLayout from "../components/AuthLayout";
import {ATextInput} from "../components/AuthShared";
import AuthButton from "../components/AuthButton";
import {useForm} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import {logUserIn} from "../apollo";

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function Login({navigation}){
    const {register, handleSubmit, setValue, watch} = useForm();
    const passwordRef = useRef();
    const onCompleted = async (data) => {
        const {login: {ok, token},} = data;
        if (ok) {
            await logUserIn(token);
        }
    };
    const [logInMutation, {loading}] = useMutation(LOGIN_MUTATION , {
        onCompleted,
    })
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }

    const onValid = (data) => {
        if(!loading){
            logInMutation({
                variables: {
                    ...data
                },
            });
        }
    };

    useEffect(() => {
        register("username", {required:true});
        register("password", {required:true});
    }, [register])



    return (
        <AuthLayout>

            <ATextInput
                blurOnSubmit={false}
                placeholder={"Username"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                returnKeyType="next"
                onSubmitEditing={() => {onNext(passwordRef)}}
                onChangeText={(text) => setValue("username", text)}
                autoCapitalize="none"
                />

            <ATextInput
                ref={passwordRef}
                blurOnSubmit={false}
                placeholder={"Password"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
                lastOne={true} />



            <AuthButton
                text={"Log In"}
                disable={!watch("username") || !watch("password")}
                onPress={handleSubmit(onValid)}
                loading={loading}/>

        </AuthLayout>
    );
}