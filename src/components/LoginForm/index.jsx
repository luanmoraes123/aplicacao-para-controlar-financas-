'use client'

const LoginForm = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  }

  return(
    <form action="" onSubmit={onSubmit}>
      <h1>Formulario de login</h1>
      <label htmlFor="email">E-mail</label>
      <input type="text" name='email'/>
      <label htmlFor="password">Password</label>
      <input type="password" name='password'/>
      <button type="submit">Entrar</button>
    </form>
  )
}

export default LoginForm;