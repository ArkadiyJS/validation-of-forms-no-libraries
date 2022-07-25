import React, { useEffect, useState } from 'react';

function FormReg() {

  // начаольное состояние imput-ов емейла и пароля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ещё одно состояние которое показывает находились ли мы в поле input-а (по умолчанию false)
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  // заключительное состояние котоорое будет отображать ошибку
  const [emailError, setEmailError] = useState('Емейл не может быть пустым');
  const [passwordError, setpasswordError] = useState('Пароль не может быть пустым');

  // состояние отвечающие за валидность формы
  const [formValid, setFormValid] = useState(false);

  //  логика когда форма не валидна кнопка за дисейблена
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  })

  // функция чтобы пользователь мог менять состояние валидация емейла c регулярным вырожением
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('')
    }
  }

  // валдидация пароля
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setpasswordError('пароль должен быть от 3 до 8 символов')
      if (!e.target.value) {
        setpasswordError('Пароль не может быть пустым')
      }
    } else {
      setpasswordError('')
    }
  }

  // этот евент срабатывает когда пользователь убрал курсор с поля ввода
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div >
      <form>

        <h1>Регистрация</h1>

        {(emailDirty && emailError) && <div>{emailError}</div>}

        <input onChange={e => emailHandler(e)} value={email}
          onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Ваш email' />


        {(passwordDirty && passwordError) && <div>{passwordError}</div>}
        <input onChange={e => passwordHandler(e)} value={password}
          onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Ваш password' />


        <button disabled={!formValid} type='submit'>Продолжить</button>

      </form>
    </div>
  );
}

export default FormReg;