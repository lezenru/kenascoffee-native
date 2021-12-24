import React from "react";
import {TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {colors} from "../colors";
import AuthButton from "../components/AuthButton";


const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  width: 100%;
  max-width: 50%;
  height: 100px;
`;


const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome({navigation}){
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogin = () => navigation.navigate("Login");

    return (
      <Container>
        <Logo resizeMode="center" source={require("../assets/logo.png")}/>
          <AuthButton disable={false}
                      onPress={goToCreateAccount}
                      text={"Create Account"}/>
          <TouchableOpacity onPress={goToLogin}>
              <LoginLink>Log In</LoginLink>
          </TouchableOpacity>
      </Container>
    );
}