'use client'
import { useEffect, useState } from 'react'
import * as S from './style'
import axios from 'axios'

const CategoriasUpdate = () => {

  const categoriaId = 2
  const [name, setName] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(() => {
    const getCategoria = async () => {

      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:8080/categorias/${categoriaId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setName(res.data.data.name);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.data,
          severity: 'error'
        });
      }
    }

    getCategoria();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`http://localhost:8080/categorias/${categoriaId}`, {name}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Categoria atualizada com sucesso',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.data,
        severity: 'error'
      });
    }
  }

  return(
    <S.Form action="" onSubmit={onSubmit}>
      <S.H1>Atualizar categoria</S.H1>
      <S.TextField onChange={(e) => setName(e.target.value)} variant='outlined' type='text' value={name} placeholder='Nome' />
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

export default CategoriasUpdate;