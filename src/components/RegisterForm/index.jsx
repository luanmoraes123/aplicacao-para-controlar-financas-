'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const RegisterForm = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/register', {email, password, name});
      localStorage.setItem('token', res.data.data.token);
      setNotification({
        open: true,
        message: 'Email cadastrado com sucesso',
        severity: 'success'
      });
    } catch (error) {
      console.log(error);
      setNotification({
        open: true,
        message: error.response.data.data,
        severity: 'error'
      });
    }
  }

  return(
    <>
      <S.Form action="" onSubmit={onSubmit}>
        <S.H1>Formulario de cadastro</S.H1>
        <S.TextField onChange={(e) => setName(e.target.value)} placeholder='Nome' name='name' type='text' variant='outlined' />
        <S.TextField onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' name='email' type='email' variant='outlined' />
        <S.TextField onChange={(e) => setPassword(e.target.value)} placeholder='Senha' name='password' type='password' variant='outlined' />
        <S.Button variant="contained" color='primary' type='submit'>Cadastrar</S.Button>;
        <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={()=> setNotification({
          open: false,
          message:'',
          severity:''
        })}>
          <S.Alert onClose={()=> setNotification({
          open: false,
          message:'',
          severity:''
        })} severity={notification.severity} sx={{ width: '100%' }}>
           {notification.message}
          </S.Alert>
        </S.Snackbar>
      </S.Form>
      
    </>
  )
}

export default RegisterForm;