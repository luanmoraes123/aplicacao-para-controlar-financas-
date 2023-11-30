import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button';
import TextFieldMUI from '@mui/material/TextField';
import SnackbarMUI from '@mui/material/Snackbar'
import AlertMUI from '@mui/material/Alert'

export const Button = styled(ButtonMUI)`
  
`

export const TextField = styled(TextFieldMUI)`
  background-color: #fff;
`

export const H1 = styled.h1 `
  font-size: 25px;
`

export const Form = styled.form `
  display: flex;
  flex-direction: column;
  width: 20%;
  gap: 10px;
  text-align: center;
`

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``