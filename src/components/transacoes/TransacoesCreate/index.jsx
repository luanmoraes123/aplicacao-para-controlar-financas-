'use client'
import { useState } from 'react'
import * as S from './style'
import axios from 'axios'

const TransacoesCreate = () => {

  const [descricao, setName] = useState();
  const [tipo, setTipo] = useState();
  const [dataTransacao, setDataTransacao] = useState();
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/transacoes', {descricao, data: dataTransacao, tipo, categoria_id: categoria, valor}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Transação criada com sucesso',
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
      <S.H1>Cadastro de transações</S.H1>
      <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' placeholder='Descrição' />
      <S.TextField onChange={(e) => setTipo(e.target.value)} variant='outlined' type='text' placeholder='Tipo' />
      <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' type='text' placeholder='Valor' />
      <S.TextField onChange={(e) => setCategoria(e.target.value)} variant='outlined' type='text' placeholder='Categoria' />
      <S.TextField onChange={(e) => setDataTransacao(e.target.value)} variant='outlined' type='text' placeholder='Data' />
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

export default TransacoesCreate;