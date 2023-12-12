'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const MetasCreate = () => {

  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataMeta, setDataMeta] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/metas', {descricao, valor, data: dataMeta}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Meta criada com sucesso',
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
      <S.H1>Cadastro de metas</S.H1>
      <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' placeholder='Descrição' />
      <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' type='text' placeholder='Valor' />
      <S.TextField onChange={(e) => setDataMeta(e.target.value)} variant='outlined' type='text' placeholder='Data' />
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

export default MetasCreate;