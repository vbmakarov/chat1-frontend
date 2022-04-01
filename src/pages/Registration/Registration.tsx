import { useSelector } from 'react-redux'
import { RegistrationForm } from "../../modules"
import { Link } from 'react-router-dom'
import { RootState } from '../../core'
import { ErrorModal } from '../../components'
import './registration.scss'


const Login = () => {

    const error = useSelector<RootState, boolean>(state => state.auth.error)

    return (
        <div className="login">
            {error && <ErrorModal
                message="Ошибка регистрации!"
                text="Пользователь с таким Email уже зарегистрирован в системе!"
                error={error} />}
            <div className="login__left">
                <h2>Регистрируйтесь в чате и общайтесь бесплатно</h2>
            </div>
            <div className="login__right">
                <h1>Регистрация</h1>
                <div className="login__signin">Уже есть аккаунт? <Link to="/login" className="login__link">Войти</Link></div>
                <RegistrationForm />
            </div>

        </div>
    )
}

export default Login