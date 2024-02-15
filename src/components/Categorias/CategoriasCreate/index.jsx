'use client'
import { useState, useEffect } from 'react'
import * as S from './style'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CategoriasCreate = ({openModal, closeModal}) => {

  const [name, setName] = useState();
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(()=> {
    if(openModal){
      setOpen(openModal);
    }
  }, [openModal])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/categorias', {name}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Categoria criada com sucesso',
        severity: 'success'
      });

      handleClose();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.data,
        severity: 'error'
      });
    }
  }

  return(    
    <>
      <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={()=> setNotification({
          open: false,
          message:'',
          severity:''
        })}>
          <S.Alert onClose={()=> setNotification({
          open: false,
          message:'',
          severity:''
        })} severity={notification.severity} sx={{ width: '100%' }}>
           {notification.message}
          </S.Alert>
      </S.Snackbar>
      <S.Dialog maxWidth='xs' fullWidth open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: 'center'}}>Nova categoria</DialogTitle>
        <DialogContent>
          <S.Form action="" onSubmit={onSubmit}>
            <S.TextField onChange={(e) => setName(e.target.value)} variant='outlined' type='text' placeholder='Descrição' />
          </S.Form>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
          <S.Button variant='contained' onClick={onSubmit}>Salvar</S.Button>
        </DialogActions>
      </S.Dialog>
    </>
  )
}

export default CategoriasCreate;