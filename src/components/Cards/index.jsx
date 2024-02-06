'use client'

import * as S from './style'
import { Icon } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({children, label, valor, isMeta, saldo = 0}) => {

  const [metas, setMetas] = useState([])
  const [meta, setMeta] = useState({})

  useEffect(() => {
    const getMetas = async () => {
     try {
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8080/metas', {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
        
       setMetas(response.data.data)


      } catch (error) {
       console.log(error);
      }
     }
    getMetas();
  }, [])

  return (
    <S.ChartContainer>
      <S.IconWraper>
        <Icon sx={{color: 'white'}}>{children}</Icon>
      </S.IconWraper>
      <S.Content>
        <div style={{fontSize: '15px'}}>{label}</div>
        { !isMeta && <div style={{fontWeight: 'bold'}}>{valor}</div>}
        { isMeta && <div style={{fontWeight: 'bold'}}>{`${(saldo / meta.valor * 100).toFixed(0)}%`}</div>}
      </S.Content>
      {isMeta && <S.FormControl>
              <S.InputLabel id="Meta">Meta</S.InputLabel>
              <S.Select
            labelId="meta"
            label="Meta"
            id="meta_select"
            value={metas[0]}
            onChange={(e)=> setMeta(e.target.value)}
            >
            {metas.length > 0 && metas.map(meta => <S.MenuItem key={meta.id} value={meta}>{meta.descricao}</S.MenuItem>)}
            </S.Select>
          </S.FormControl>}
    </S.ChartContainer>
  )
}

export default Card;