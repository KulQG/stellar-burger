import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Forgot-password.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthFormWrapper from '../../components/AuthForm/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../services/actions/forgot-password'

export default function ForgotPassword() {
  const postEmail = useSelector((s) => s.postForgotReducer.postEmail)
  const [email, setEmail] = React.useState('')
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()
  function click(e) {
    dispatch(forgotPassword(email))
    if (postEmail) {
      navigate('/reset-password')
    }
  }

  useEffect(() => {
    if (email.length > 0 && postEmail) {
      navigate('/reset-password')
    }
  }, [postEmail])

  const getForm = () => {
    return (
      <>
        <EmailInput
          value={email}
          name={'email'}
          onChange={onChangeEmail}
          size={'default'}
          placeholder="Укажите e-mail"
        />
        <Button onSubmit={click} htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </>
    )
  }

  const getUILinks = () => {
    return (
      <div className={styles.link}>
        <p className="text text_type_main-default">Вспомнили пароль?</p>
        <Link className={styles.text} to="/login">
          <p
            className={`${styles.text} ${styles.textLink} text text_type_main-default`}
          >
            Войти
          </p>
        </Link>
      </div>
    )
  }

  const user = useSelector((s) => s.getUserReducer.getUser)

  return !user.success ? (
    <AuthFormWrapper
      heading="Восстановление пароля"
      form={getForm}
      uiLinks={getUILinks}
    />
  ) : (
    <Navigate to="/" replace />
  )
}
