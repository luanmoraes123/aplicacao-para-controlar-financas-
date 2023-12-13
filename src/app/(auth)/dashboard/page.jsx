'use client';

import { useEffect } from 'react';
import axios from 'axios';
import CategoriasCreate from '../../../components/Categorias/CategoriasCreate'
import CategoriasUpdate from '../../../components/Categorias/CategoriasUpdate'
import MetasCreate from '../../../components/Metas/MetasCreate'
import MetasUpdate from '../../../components/Metas/MetasUpdate'
import TransacaoCreate from '../../../components/transacoes/TransacoesCreate'

export const DashBoard = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    return () => {
      
    }
  }, [])
  
  return(
    <div>
      Dashboard

      <TransacaoCreate  />

    </div>
  )
}

export default DashBoard;