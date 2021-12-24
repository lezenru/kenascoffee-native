import React, {useEffect, useRef} from "react";
import AuthLayout from "../components/AuthLayout";
import AuthButton from "../components/AuthButton";
import {ATextInput} from "../components/AuthShared";
import {useForm} from "react-hook-form";


export default function CreateAccount(){
    const {register, handleSubmit, setValue} = useForm();

    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }

    const onValid = (data) => {
        console.log(data);
    }

    useEffect(() => {
        register("firstName" , {required:true});
        register("lastName", {required:true});
        register("email", {required:true});
        register("username", {required:true});
        register("password", {required:true});
    }, [register])



    return (
        <AuthLayout>

            <ATextInput
                blurOnSubmit={false}
                placeholder={"First Name"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(lastNameRef)}
                onChangeText={(text) => setValue("firstName", text)}/>
            <ATextInput
                blurOnSubmit={false}
                ref={lastNameRef}
                placeholder={"Last Name"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
                onChangeText={(text) => setValue("lastName", text)}/>
            <ATextInput
                blurOnSubmit={false}
                ref={usernameRef}
                placeholder={"Username"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
                autoCapitalize="none"
                onChangeText={(text) => setValue("username", text)}/>
            <ATextInput
                blurOnSubmit={false}
                ref={emailRef}
                placeholder={"Email"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("email", text)}/>
            <ATextInput
                blurOnSubmit={false}
                ref={passwordRef}
                placeholder={"Password"}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
                lastOne={true}
                onChangeText={(text) => setValue("password", text)}/>
            <AuthButton text={"Create Account"} disable={false} onPress={handleSubmit(onValid)}/>

        </AuthLayout>

    );
}