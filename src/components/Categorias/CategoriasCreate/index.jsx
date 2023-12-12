'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const CategoriasCreate = () => {

  const [name, setName] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/categorias', {name}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Categoria criada com sucesso',
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
      <S.H1>Cadastro de categoria</S.H1>
      <S.TextField onChange={(e) => setName(e.target.value)} variant='outlined' type='text' placeholder='Nome' />
      <S.Button variant='contained' type="submit">Cadastrar</S.Button>
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

export default CategoriasCreate;