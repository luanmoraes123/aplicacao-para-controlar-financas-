'use client'

import { useState, useEffect } from 'react';
import * as S from './style'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import {compareAsc, format} from 'date-fns'




const TransacoesList = () => {

  const [transacoes, setTransacoes] = useState([]);
  const [transacoesTable, setTransacoesTable] = useState([]);
  const [tipo, setTipo] = useState('todas');
  const [ano, setAno] = useState('todos');
  const [anos, setAnos] = useState([]);

  useEffect(() => {
    const getTransacoes = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8080/transacoes', {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
        setTransacoes(response.data.data);
        setTransacoesTable(response.data.data);
        
        


        

      } catch (error) {
      }
     }
  
    getTransacoes();
  }, [])

  useEffect(() => {

    if(ano === 'todos'){
      if(tipo === 'todas'){
        setTransacoesTable(transacoes);
       }
       
       if(tipo === 'receita'){
        const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita');
        setTransacoesTable(receitas);
       }
       
       if(tipo === 'despesa'){
        const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa');
        setTransacoesTable(despesas);
       }
    }else {
      if(tipo === 'todas'){
        setTransacoesTable(transacoes.filter(transacao => new Date(transacao.data).getFullYear() === ano));
       }
       
       if(tipo === 'receita'){
        const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita' && new Date(transacao.data).getFullYear() === ano);
        setTransacoesTable(receitas)
       }
       
       if(tipo === 'despesa'){
        const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa' && new Date(transacao.data).getFullYear() === ano);
        setTransacoesTable(despesas)
       }
    }
     setAnos(transacoes.map(
      transacao => new Date(transacao.data).getFullYear())
      .filter((ano, index, anos) => anos.indexOf(ano) === index)
      .sort((a, b) => a-b)) 
 
  }, [tipo, transacoes, ano])
  
  return (
    <>
      <div style={{display: 'flex', gap: '15px', margin: '30px 0'}}>
        <div onClick={() => setTipo('todas')} style={{cursor: 'pointer'}}>Todas transações</div>
        <div onClick={() => setTipo('despesa')} style={{cursor: 'pointer'}}>Despesas</div>
        <div onClick={() => setTipo('receita')} style={{cursor: 'pointer'}}>Receitas</div>
      </div>
        <S.FormControl>
          <S.InputLabel id="ano">Ano</S.InputLabel>
          <S.Select
            labelId="ano"
            label='Ano'
            id="ano"
            value={ano}
            onChange={(e)=> setAno(e.target.value)}
          >
            <S.MenuItem value={'todos'}>Todos</S.MenuItem>
            {anos.length > 0 && anos.map((ano, index) => <S.MenuItem key={index} value={ano}>{ano}</S.MenuItem>)}
          </S.Select>
        </S.FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Transação</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Situação</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacoesTable.map((transacao) => (
              <TableRow
                key={transacao.descricao}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transacao.descricao}
                </TableCell>
                <TableCell align="right">{transacao.tipo}</TableCell>
                <TableCell align="right">{format(new Date(transacao.data), 'd MMM, yyyy', { locale: ptBR} )}</TableCell>
                <TableCell align="right">{compareAsc(new Date(), new Date(transacao.data)) === 1 ? 'Realizada' : 'Planejada'}</TableCell>
                <TableCell align="right">R${transacao.valor / 100}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TransacoesList;