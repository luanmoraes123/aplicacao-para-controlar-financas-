'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const LoginForm = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {email, password});
      localStorage.setItem('token', res.data.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <form action="" onSubmit={onSubmit}>
      <S.H1>Formulario de login</S.H1>
      <S.TextField onChange={(e) => setEmail(e.target.value)} variant='outlined' type='text' name='email' label='E-mail' />
      <S.TextField onChange={(e) => setPassword(e.target.value)} variant='outlined' type='password' name='password' label='Senha' />
      <S.Button variant='outlined' type="submit">Entrar</S.Button>
    </form>
  )
}

export default LoginForm;