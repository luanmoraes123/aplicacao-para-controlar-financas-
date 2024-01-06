'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@mui/material/Button';
import CategoriaCreate from '../../../components/Categorias/CategoriasCreate';
import MetasCreate from '../../../components/Metas/MetasCreate';

const ExtratoPage = () => {

  const router = useRouter();
  const [user, setUser] = useState({id: null});
  const [openCategoria, setOpenCategoria] = useState(false);
  const [openMetas, setOpenMetas] = useState(false);

  const abrirCategoria = () => {
    setOpenCategoria(!openCategoria);
  }

  const abrirMetas = () => {
    setOpenMetas(!openMetas);
  }
  

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

  return (
    <div>
      <Button variant='contained' color='primary' type='submit'>Nova transação</Button>
      <Button variant='contained' color='primary' onClick={abrirCategoria}>Nova categoria</Button>
      <Button variant='contained' color='primary' onClick={abrirMetas}>Nova meta</Button>
      <CategoriaCreate openModal={openCategoria} closeModal={setOpenCategoria}/>
      <MetasCreate openModal={openMetas} closeModal={setOpenMetas}/>
    </div>
  )
}

export default ExtratoPage;