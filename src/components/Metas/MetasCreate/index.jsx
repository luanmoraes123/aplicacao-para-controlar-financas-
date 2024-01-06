'use client'
import { useState, useEffect, forwardRef } from 'react'
import * as S from './style'
import axios from 'axios'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import { NumericFormat } from 'react-number-format';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale'


const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator='.'
      decimalSeparator=','
      valueIsNumericString
      prefix="R$ "
    />
  );
});

const MetasCreate = ({openModal, closeModal}) => {

  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataMeta, setDataMeta] = useState(new Date());
  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });
  const [open, setOpen] = useState(false);

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
      const res = await axios.post('http://localhost:8080/metas', {descricao, valor: valor * 100, data: formatISO(dataMeta, {representation: 'date', locale: ptBR} )}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Meta criada com sucesso',
        severity: 'success'
      });

      handleClose();
    } catch (error) {
      console.log(error);
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
      <Dialog maxWidth='xs' fullWidth open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: 'center'}}>Cadastro de metas</DialogTitle>
        <DialogContent>
          <S.Form action="" onSubmit={onSubmit}>
            <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' placeholder='Descrição' />
            <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' name="valor" placeholder='valor'
              id="formatted-numberformat-input" InputProps={{ inputComponent: NumericFormatCustom, }} />
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker value={dataMeta} onChange={(value) => setDataMeta(value)}/>
            </LocalizationProvider>
          </S.Form>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
          <S.Button variant='contained' onClick={onSubmit}>Cadastrar</S.Button>
        </DialogActions>
      </Dialog>
  </>
  )
}

export default MetasCreate;