import { LoginForm } from "../../modules"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { ErrorModal } from '../../components'
import { RootState } from '../../core'
import './login.scss'

const Login = () => {
    let navigate = useNavigate();
    const error = useSelector<RootState, boolean>(state => state.auth.error)

    return (
        <div className="login">
            {error && <ErrorModal
                message="Ошибка авторизации!"
                text="Неверные логин или пароль!"
                error={error} />}
            <div className="login__left">
                <h2>Регистрируйтесь в чате и общайтесь бесплатно</h2>
            </div>
            <div className="login__right">
                <h1>Войти в чат</h1>
                <LoginForm />

                <Button
                    onClick={() => {
                        navigate('/recovery')
                    }}>
                    Забыли пароль?
                </Button>
                <Button
                    onClick={() => {
                        navigate('/registration')
                    }}
                >
                    Зарегистрироваться
                </Button>
            </div>

        </div>
    )
}

export default Login