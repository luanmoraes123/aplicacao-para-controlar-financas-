'use client'
import { useEffect, useState } from 'react'
import * as S from './style'
import axios from 'axios'

const MetasUpdate = ({metaId}) => {

  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataMeta, setDataMeta] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(() => {
    const getMeta = async () => {

      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:8080/metas/${metaId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDescricao(res.data.data.descricao);
        setValor(res.data.data.valor);
        setDataMeta(res.data.data.data);
        console.log(res.data);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.data,
          severity: 'error'
        });
      }
    }

    getMeta();
  }, [metaId])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`http://localhost:8080/metas/${metaId}`, {descricao, valor, data: dataMeta}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Meta atualizada com sucesso',
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
      <S.H1>Atualizar meta</S.H1>
      <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' value={descricao} placeholder='Descrição' />
      <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' type='text' value={valor} placeholder='Valor' />
      <S.TextField onChange={(e) => setDataMeta(e.target.value)} variant='outlined' type='text' value={dataMeta} placeholder='Data' />
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

export default MetasUpdate;