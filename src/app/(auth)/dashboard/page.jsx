'use client';

import { useEffect } from 'react';
import axios from 'axios';
import CategoriasCreate from '../../../components/Categorias/CategoriasCreate'
import CategoriasUpdate from '../../../components/Categorias/CategoriasUpdate'
import MetasCreate from '../../../components/Metas/MetasCreate'
import MetasUpdate from '../../../components/Metas/MetasUpdate'

export const DashBoard = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    return () => {
      
    }
  }, [])
  
  return(
    <div>
      Dashboard

      <MetasUpdate metaId={1} />

    </div>
  )
}

export default DashBoard;