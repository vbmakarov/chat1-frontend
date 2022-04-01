import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { loginUser } from '../../core/redux/async/asyncAuthActions'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Вы ввели неверный email')
        .required('Введите email'),
    password: yup
        .string()
        .min(8, 'Пароль должен быть минимум 8 символов')
        .required('Введите пароль'),
});

const FormTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#aac0f0',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#aac0f0',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#eee',
        },
        '&:hover fieldset': {
            borderColor: '#aac0f0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#aac0f0',
        },
    },
});

const LoginForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(loginUser(values))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="login__form form">
            <FormTextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                style={{ marginBottom: 20 }}
            />
            <FormTextField
                fullWidth
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                color="success"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                style={{ marginBottom: 25 }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: 10 }}>
                Войти
            </Button>
        </form>
    );
};

export default LoginForm