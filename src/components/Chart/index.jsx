'use clinet'

import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const chartSetting = {
  height: 500,
};
const dataset = [
  {
    receita: 1200000,
    despesa: 800000,
    ano: '2020',
  },
  {
    receita: 1800000,
    despesa: 1000000,
    ano: '2021',
  },
  {
    receita: 2500000,
    despesa: 1400000,
    ano: '2022',
  }
];

const valueFormatter = (value) => `R$ ${value / 100}`;

const Chart = () => {

  const [transacoes, setTransacoes] = useState([]);
  const [transacoesChart, setTransacoesChart] = useState([]);
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
        setTransacoesChart(response.data.data);
        setAnos(response.data.data.map(
          transacao => new Date(transacao.data).getFullYear())
          .filter((ano, index, anos) => anos.indexOf(ano) === index)
          .sort((a, b) => a-b))
        
        const teste = []
        for (const transacao of response.data.data) {
          const ano = new Date(transacao.data).getFullYear();
          teste[ano] = teste[ano] ?? {}
          if(transacao.tipo === 'Receita'){
            teste[ano].receita = teste[ano].receita ? teste[ano].receita = transacao.valor : transacao.valor
          }
          if(transacao.tipo === 'Despesa'){
            teste[ano].despesa = teste[ano].despesa ? teste[ano].despesa = transacao.valor : transacao.valor
          }
        }
        console.log(teste);
      } catch (error) {
       console.log(error);
      }
     }
  
    getTransacoes();
  }, [])

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'ano' }]}
      series={[
        { dataKey: 'despesa', label: 'Despesa', valueFormatter },
        { dataKey: 'receita', label: 'Receita', valueFormatter },
      ]}
      {...chartSetting}
    />
  )
}

export default Chart;