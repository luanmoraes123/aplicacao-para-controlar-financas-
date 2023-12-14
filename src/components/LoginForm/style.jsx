import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button';
import TextFieldMUI from '@mui/material/TextField';
import SnackbarMUI from '@mui/material/Snackbar'
import AlertMUI from '@mui/material/Alert'
import TypographyMUI from '@mui/material/Typography';
import LinkNext from 'next/link'

export const Button = styled(ButtonMUI)`
  
`

export const TextField = styled(TextFieldMUI)`
  background-color: #fff;
`

export const Form = styled.form `
  display: flex;
  flex-direction: column;
  width: 20%;
  gap: 4vh;
  text-align: center;
`

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``

export const Typography = styled(TypographyMUI)`
  margin-bottom: 5vh;
`

export const Link = styled(LinkNext)`
  color: ${({theme}) => theme.palette.primary.main};
  text-decoration: none;
  font-size: 1rem;
`