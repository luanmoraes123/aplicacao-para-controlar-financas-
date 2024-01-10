'use client'

import { useState, useEffect } from 'react';
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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const [transacoes, setTransacoes] = useState([]);

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
      } catch (error) {
       console.log(error);
      }
     }
  
    getTransacoes();
  }, [])
  
  return (
    <>
      <div style={{display: 'flex', gap: '15px', margin: '30px 0'}}>
        <div style={{cursor: 'pointer'}}>Todas transações</div>
        <div style={{cursor: 'pointer'}}>Despesas</div>
        <div style={{cursor: 'pointer'}}>Receitas</div>
      </div>
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
            {transacoes.map((transacao) => (
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