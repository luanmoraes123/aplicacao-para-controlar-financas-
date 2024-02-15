'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'
import { useRouter } from 'next/navigation';


const LoginForm = () => {

  const router = useRouter();
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
      router.push('/dashboard');
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      });
    }
  }

  return(
  <>
    <S.Form action="" onSubmit={onSubmit}>
      <S.Typography variant='h1' color='primary'>YOURfinance.IO</S.Typography>
      <S.TextField onChange={(e) => setEmail(e.target.value)} variant='outlined' type='text' placeholder='E-mail' />
      <S.TextField onChange={(e) => setPassword(e.target.value)} variant='outlined' type='password' placeholder='Senha' />
      <S.Button variant='contained' type="submit">Entrar</S.Button>
      <S.Link href='/register'>Criar uma conta</S.Link>
    </S.Form>
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
  </>
  )
}

export default LoginForm;