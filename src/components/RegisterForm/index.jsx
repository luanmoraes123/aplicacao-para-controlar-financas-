'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const RegisterForm = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {email, password, name});
      localStorage.setItem('token', res.data.data.token);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <S.Form action="" onSubmit={onSubmit}>
      <S.H1>Formulario de cadastro</S.H1>
      <S.TextField onChange={(e) => setName(e.target.value)} label='Nome' name='name' variant='outlined' />
      <S.TextField onChange={(e) => setEmail(e.target.value)} label='E-mail' name='email' variant='outlined' />
      <S.TextField onChange={(e) => setPassword(e.target.value)} label='Senha' name='password' variant='outlined' />
      <S.Button variant="outlined" color='success' type='submit'>Cadastrar</S.Button>;
    </S.Form>
  )
}

export default RegisterForm;