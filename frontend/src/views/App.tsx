/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../auth/login.';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import HomePage from '../components/homepage';
import MenuBar from '../components/menubar';
import MyAccount from '../components/myAccount';
import { UserInterface } from '../components/myAccount';
import { useState } from 'react';

const colors = {
  brand: {
    900: '#107764',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ colors: colors });
const App: React.FC = (): any => {
  const [acc,setAcc]=useState({});
  let myAccount: UserInterface = {
    id: 0,
    name: "null",
    email: "null",
    role: "null",
    avatar: "null",
    accessToken: "null",
    password: "null"
  };
  const setAccount = (
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    avatar: string,
    accessToken: string): void => {
    myAccount.id = id;
    myAccount.name = name;
    myAccount.email = email;
    myAccount.role = role;
    myAccount.accessToken = accessToken;
    myAccount.avatar = avatar;
    myAccount.password = password;
    setAcc(myAccount);
  }
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <header>
          <MenuBar />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth/login' element={
              <Login
                setUser={setAccount}
              />
            } />
            <Route path='/my-account' element={
              <MyAccount
                obj={acc}
              />
            } />
          </Routes>
        </main>
        <footer>

        </footer>
      </ChakraProvider>
    </BrowserRouter>
  );
}
export default App;
