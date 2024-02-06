'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Cards'
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AdsClickIcon from '@mui/icons-material/AdsClick';

const Panel = () => {

  const [somatorio, setSomatorio] = useState({
    saldo: 0,
    despesa: 0,
    receita: 0
  })
  const [metas, setMetas] = useState([])
  const [meta, setMeta] = useState({})
  
  useEffect(() => {
    const getTransacoes = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8080/transacoes', {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
        
        const somatorio = {}

        for (const transacao of response.data.data) {
          if(transacao.tipo === 'Receita'){
            somatorio.receita = somatorio.receita ? somatorio.receita = transacao.valor : transacao.valor
          }
          if(transacao.tipo === 'Despesa'){
            somatorio.despesa = somatorio.despesa ? somatorio.despesa = transacao.valor : transacao.valor
          }
        }

        somatorio.saldo = somatorio.receita - somatorio.despesa;
        console.log(somatorio)
        setSomatorio(somatorio);

      } catch (error) {
       console.log(error);
      }
     }
    getTransacoes();
  }, [])

  useEffect(() => {
    const getMetas = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8080/metas', {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
        
       setMetas(response.data.data)


      } catch (error) {
       console.log(error);
      }
     }
    getMetas();
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card label='Meu saldo' valor={`R$ ${somatorio.saldo / 100}`}> <AccountBalanceWalletIcon /> </Card>
        <Card label='Receitas' valor={`R$ ${somatorio.receita / 100}`}> <SwapHorizIcon/> </Card>
      </Grid>
      <Grid item xs={6}>
        <Card label='Despesas' valor={`R$ ${somatorio.despesa / 100}`}> <AttachMoneyIcon /> </Card>
        <Card label='Metas' valor={'R$ 250,00'} isMeta metas={metas}> <AdsClickIcon /> </Card>
      </Grid>
    </Grid>
  )
}

export default Panel;