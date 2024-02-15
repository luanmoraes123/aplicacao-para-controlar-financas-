'use client'
import { useEffect, useState, forwardRef } from 'react'
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

const TransacoesCreate = ({openModal, closeModal}) => {

  const [descricao, setDescricao] = useState();
  const [tipo, setTipo] = useState();
  const [dataTransacao, setDataTransacao] = useState(new Date());
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message:'',
    severity: ''
  });

  useEffect(() => {
    const getCategorias = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/categorias', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategorias(res.data.data);
    }

    getCategorias();
    if(openModal){
      setOpen(openModal)
    }
  }, [openModal]);

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
      const res = await axios.post('http://localhost:8080/transacoes', {descricao, data: formatISO(dataTransacao, {representation: 'date', locale: ptBR} ),
       tipo, categoria_id: categoria, valor: valor * 100}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setNotification({
        open: true,
        message: 'Transação criada com sucesso',
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
      <Dialog maxWidth='xs' fullWidth open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: 'center'}}>Cadastro de transações</DialogTitle>
        <DialogContent>
        <S.Form action="" onSubmit={onSubmit}>
            <S.TextField onChange={(e) => setDescricao(e.target.value)} variant='outlined' type='text' placeholder='Descrição' />
            <S.TextField onChange={(e) => setValor(e.target.value)} variant='outlined' name="valor" placeholder='valor'
              id="formatted-numberformat-input" InputProps={{ inputComponent: NumericFormatCustom, }} />
            <S.FormControl>
              <S.InputLabel id="categoria">Categoria</S.InputLabel>
              <S.Select
            labelId="categoria"
            label="Categoria"
            id="categoria_select"
            value={categoria}
            onChange={(e)=> setCategoria(e.target.value)}
            >
            {categorias.length > 0 && categorias.map(categoria => <S.MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</S.MenuItem>)}
            </S.Select>
          </S.FormControl>
          <S.FormControl>
            <S.InputLabel id="tipo">Tipo</S.InputLabel>
            <S.Select
            labelId="tipo"
            label="Tipo"
            id="tipo_select"
            value={tipo}
            onChange={(e)=> setTipo(e.target.value)}
          >
              <S.MenuItem value="Despesa">Despesa</S.MenuItem>
              <S.MenuItem value="Receita">Receita</S.MenuItem>
            </S.Select>
          </S.FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker value={dataTransacao} onChange={(value) => setDataTransacao(value)}/>
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

export default TransacoesCreate;