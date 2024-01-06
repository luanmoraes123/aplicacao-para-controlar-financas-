'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CategoriasCreate from '../../../components/Categorias/CategoriasCreate'
import CategoriasUpdate from '../../../components/Categorias/CategoriasUpdate'
import MetasCreate from '../../../components/Metas/MetasCreate'
import MetasUpdate from '../../../components/Metas/MetasUpdate'
import TransacaoCreate from '../../../components/transacoes/TransacoesCreate'
import TransacaoUpdade from '../../../components/transacoes/TransacoesUpdate'

export const DashBoard = () => {

  const router = useRouter();
  const [user, setUser] = useState({id: null});
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    }

    axios.get('http://localhost:8080/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data.data);
    }).catch(res => {
      router.push('/login');
    })
  
    return () => {
      
    }
  }, [])
  
  return(
    <div>
      Dashboard

      <CategoriasCreate  transacaoId={1}/>

    </div>
  )
}

export default DashBoard;