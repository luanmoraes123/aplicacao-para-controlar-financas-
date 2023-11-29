'use client'
import Button from '@mui/material/Button';

const RegisterForm = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  }

  return(
    <form action="" onSubmit={onSubmit}>
      <h1>Formulario de cadastro</h1>
      <label htmlFor="name">Nome</label>
      <input type="text" name='name'/>
      <label htmlFor="email">E-mail</label>
      <input type="text" name='email'/>
      <label htmlFor="password">Password</label>
      <input type="password" name='password'/>
      <Button variant="outlined" color='success' type='submit'>Cadastrar</Button>;
    </form>
  )
}

export default RegisterForm;