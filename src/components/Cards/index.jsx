'use client'

import * as S from './style'
import { Icon } from '@mui/material';

const Card = ({children, label, valor, isMeta, metas}) => {
  return (
    <S.ChartContainer>
      <S.IconWraper>
        <Icon sx={{color: 'white'}}>{children}</Icon>
      </S.IconWraper>
      <S.Content>
        <div style={{fontSize: '15px'}}>{label}</div>
        <div style={{fontWeight: 'bold'}}>{valor}</div>
      </S.Content>
    </S.ChartContainer>
  )
}

export default Card;