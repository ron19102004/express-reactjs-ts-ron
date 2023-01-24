/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import '../styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { UserInterface } from '../components/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HomePage,Product,MenuBar,Login,Profile} from '../components/index';
import { useState } from 'react';

const App: React.FC = (): any => {
  const [acc, setAcc] = useState({});
  const setAccount = (
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    avatar: string,
    accessToken: string): void => {
    let myAccount: UserInterface = {
      id: id,
      name: name,
      email: email,
      role: role,
      avatar: avatar,
      accessToken: accessToken,
      password: password
    };
    setAcc(myAccount);
  }
  return (
    <BrowserRouter>
      <ChakraProvider>
        <header>
          <MenuBar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile/login' element={
              <Login
                setUser={setAccount}
              />
            } />
            <Route path='/profile' element={<Profile obj={acc}/>} />
            <Route path='/products' element={<Product/>}/>
          </Routes>
        </main>
        <footer style={{
          textAlign:'center',
          fontSize:'18px',
          backgroundColor:'rgba(1, 0, 3, 0.879)',
          color: 'white'
        }}>
          @Copyright (c) - RON
        </footer>
      </ChakraProvider>
    </BrowserRouter>
  );
}
export default App;
