import styled from '@emotion/styled';
import FormControlMUI from '@mui/material/FormControl'
import  InputLabelMUI from '@mui/material/InputLabel';
import SelectMUI from '@mui/material/Select'
import MenuItemMUI from '@mui/material/MenuItem'

export const ChartContainer = styled.div `
  display: flex;
  align-itens: center;
  justify-content: center;
  background-color: #fff;
  padding: 25px;
  margin: 25px;
  width: 80%;
`

export const IconWraper = styled.div `
  display: flex;
  height: 70%;
  border-radius: 8px;
  padding: 5px;
  margin: auto 0;
  background: #299D91;
`

export const Content = styled.div `
  text-align: center;
  width: 100%;
`

export const FormControl = styled(FormControlMUI)`
min-width: 200px;
`

export const InputLabel = styled(InputLabelMUI)``

export const Select = styled(SelectMUI)``

export const MenuItem = styled(MenuItemMUI)``