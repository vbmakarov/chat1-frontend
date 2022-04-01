import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addUser } from '../../core/redux/async/asyncAuthActions'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Вы ввели неверный email')
        .required('Введите email'),
    password: yup
        .string()
        .min(8, 'Пароль должен быть минимум 8 символов')
        .required('Введите пароль'),
    name: yup
        .string()
        .required('Введите имя'),
    lastname: yup
        .string()
        .required('Введите вашу фамилию'),
    checkbox: yup.boolean().oneOf([true], 'Нужно принять условия')
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

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            checkbox: false

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(addUser(values))
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="login__form form">
            <FormTextField
                fullWidth
                id="name"
                name="name"
                label="Имя *"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                style={{ marginBottom: 20 }}
            />
            <FormTextField
                fullWidth
                id="lastname"
                name="lastname"
                label="Фамилия *"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
                style={{ marginBottom: 20 }}
            />
            <FormTextField
                fullWidth
                id="email"
                name="email"
                label="Электронная почта *"
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
                label="Пароль *"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                style={{ marginBottom: 25 }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <Checkbox
                        name="checkbox"
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <div>
                    Соглашаюсь на обработку моих персональных данных
                </div>
            </div>
            <br />
            {formik.touched.checkbox && formik.errors.checkbox ?
                <Alert severity="error">{formik.touched.checkbox && formik.errors.checkbox}</Alert> : ''}
            <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                style={{ marginBottom: 10 }}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default RegistrationForm