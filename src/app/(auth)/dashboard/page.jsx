'use client';

import { useEffect } from 'react';
import axios from 'axios';
import CategoriasCreate from '../../../components/Categorias/CategoriasCreate'
import CategoriasUpdate from '../../../components/Categorias/CategoriasUpdate'

export const DashBoard = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    return () => {
      
    }
  }, [])
  
  return(
    <div>
      Dashboard

      <CategoriasUpdate />

    </div>
  )
}

export default DashBoard;