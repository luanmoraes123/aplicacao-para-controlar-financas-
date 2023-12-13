'use client'
import { useEffect, useState } from 'react'
import * as S from './style'
import axios from 'axios'

const TransacoesCreate = () => {

  const [descricao, setDescricao] = useState();
  const [tipo, setTipo] = useState('Receita');
  const [dataTransacao, setDataTransacao] = useState();
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(() => {
    const getCategorias = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/categorias', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategorias(res.data.data);
    }

    getCategorias();
  }, []);

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
      <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' type='text' placeholder='Valor' />
      <S.FormControl fullWidth>
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
    </S.FormControl>
      <S.FormControl fullWidth>
        <S.InputLabel id="categoria">Categorias</S.InputLabel>
        <S.Select
          labelId="categoria"
          id="categoria_select"
          value={categoria}
          onChange={(e)=> setCategoria(e.target.value)}
        >
          {categorias.length && categorias.map(categoria => <S.MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</S.MenuItem>)}
          
          
        </S.Select>
    </S.FormControl>
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