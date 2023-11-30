'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const LoginForm = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/login', {email, password});
      localStorage.setItem('token', res.data.data.token);
      setNotification({
        open: true,
        message: 'Login efetuado com sucesso',
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
    <S.Form action="" onSubmit={onSubmit}>
      <S.H1>Formulario de login</S.H1>
      <S.TextField onChange={(e) => setEmail(e.target.value)} variant='outlined' type='text' placeholder='E-mail' />
      <S.TextField onChange={(e) => setPassword(e.target.value)} variant='outlined' type='password' placeholder='Senha' />
      <S.Button variant='contained' type="submit">Entrar</S.Button>
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
  )
}

export default LoginForm;