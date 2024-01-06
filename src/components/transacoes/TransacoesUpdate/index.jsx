'use client'
import { useEffect, useState } from 'react'
import * as S from './style'
import axios from 'axios'

const TransacoesUpdate = ({transacaoId}) => {

  const [descricao, setDescricao] = useState();
  const [tipo, setTipo] = useState();
  const [dataTransacao, setDataTransacao] = useState();
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState();
  const [categorias, setCategorias] = useState([]);
  

  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(() => {
    const getTransacao = async () => {

      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:8080/transacoes/${transacaoId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
         setDescricao(res.data.data.descricao);
         setValor(res.data.data.valor);
         setTipo(res.data.data.tipo);
         setDataTransacao(res.data.data.data);
         setCategoria(res.data.data.categoria_id);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: 'error'
        });
      }
    }

    const getCategorias = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/categorias', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategorias(res.data.data);
    }
    getTransacao();
    getCategorias();
  }, [transacaoId])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`http://localhost:8080/transacoes/${transacaoId}`, {descricao, data: dataTransacao, tipo, categoria_id: categoria, valor}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Transacao atualizada com sucesso',
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
      <S.H1>Atualizar transação</S.H1>
      <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' value={descricao}  placeholder='Descrição' />
      <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' type='text' value={valor}  placeholder='Valor' />
      <S.TextField onChange={(e) => setDataTransacao(e.target.value)} variant='outlined' value={dataTransacao} type='text' placeholder='Data' />
      {tipo && <S.FormControl fullWidth>
        <S.InputLabel id="tipo">Tipo</S.InputLabel>
        <S.Select
          labelId="tipo"
          id="tipo_select"
          value={tipo}
          onChange={(e)=> setTipo(e.target.value)}
        >
          <S.MenuItem value="Despesa">Despesa</S.MenuItem>
          <S.MenuItem value="Receita">Receita</S.MenuItem>
        </S.Select>
    </S.FormControl>}
      {categoria && <S.FormControl fullWidth>
        <S.InputLabel id="categoria">Categorias</S.InputLabel>
        <S.Select
          labelId="categoria"
          id="categoria_select"
          value={categoria}
          onChange={(e)=> setCategoria(e.target.value)}
        >
          {
          categorias.length > 0 && categorias.map(categoria => {
          return (<S.MenuItem key={categoria.id} value={categoria.id} >{categoria.name}</S.MenuItem>)})}     
        </S.Select>
    </S.FormControl>}
      
      <S.Button variant='contained' type="submit">Atualizar</S.Button>
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

export default TransacoesUpdate;