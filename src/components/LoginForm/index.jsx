'use client'

import * as S from './style'

const LoginForm = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  }

  return(
    <form action="" onSubmit={onSubmit}>
      <S.H1>Formulario de login</S.H1>
      <S.TextField variant='outlined' type='text' name='email' label='E-mail' />
      <S.TextField variant='outlined' type='password' name='password' label='Password' />
      <S.Button variant='outlined' type="submit">Entrar</S.Button>
    </form>
  )
}

export default LoginForm;