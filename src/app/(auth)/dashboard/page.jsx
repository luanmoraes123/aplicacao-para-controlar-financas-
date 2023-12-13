'use client';

import { useEffect } from 'react';
import axios from 'axios';
import CategoriasCreate from '../../../components/Categorias/CategoriasCreate'
import CategoriasUpdate from '../../../components/Categorias/CategoriasUpdate'
import MetasCreate from '../../../components/Metas/MetasCreate'
import MetasUpdate from '../../../components/Metas/MetasUpdate'
import TransacaoCreate from '../../../components/transacoes/TransacoesCreate'
import TransacaoUpdade from '../../../components/transacoes/TransacoesUpdate'

export const DashBoard = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    return () => {
      
    }
  }, [])
  
  return(
    <div>
      Dashboard

      <TransacaoUpdade  transacaoId={1}/>

    </div>
  )
}

export default DashBoard;