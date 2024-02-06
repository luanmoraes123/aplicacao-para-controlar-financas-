'use clinet'

import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const chartSetting = {
  height: 500,
};

const valueFormatter = (value) => `R$ ${value / 100}`;

const Chart = () => {

  const [transacoes, setTransacoes] = useState([]);
  const [transacoesChart, setTransacoesChart] = useState([]);
  const [ano, setAno] = useState('todos');
  const [anos, setAnos] = useState([]);
  const [dataset, setDataset] = useState([]);

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
        
        const somatorio = []

        for (const transacao of response.data.data) {
          const ano = new Date(transacao.data).getFullYear();
          somatorio[ano] = somatorio[ano] ?? {}
          if(transacao.tipo === 'Receita'){
            somatorio[ano].receita = somatorio[ano].receita ? somatorio[ano].receita = transacao.valor : transacao.valor
          }
          if(transacao.tipo === 'Despesa'){
            somatorio[ano].despesa = somatorio[ano].despesa ? somatorio[ano].despesa = transacao.valor : transacao.valor
          }
        }

        const dataset = [] 
        somatorio.map((item, index) => {
          dataset.push({
            ano: index,
            receita: item.receita ?? 0,
            despesa: item.despesa ?? 0
          }) 
        });

        setDataset(dataset) 

      } catch (error) {
       console.log(error);
      }
     }
  
    getTransacoes();
  }, [])

  return (

    <>

    {dataset.length && <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'ano' }]}
      series={[
        { dataKey: 'receita', label: 'Receita', valueFormatter },
        { dataKey: 'despesa', label: 'Despesa', valueFormatter },
      ]}
      {...chartSetting}
    />}
    </>
  )
}

export default Chart;