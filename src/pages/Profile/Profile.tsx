import { FC, useEffect, useRef } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../core/redux/async/asyncAuthActions'
import { RootState } from '../../core'
import { Main } from '../../layouts'
import './profile.scss'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Вы ввели неверный email')
        .required('Введите email'),
    name: yup
        .string()
        .required('Введите имя'),
    lastname: yup
        .string()
        .required('Введите вашу фамилию'),
    phone: yup
        .string(),
    organization: yup
        .string()
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

const Profile: FC = () => {
    const dispatch = useDispatch()
    const user = useSelector<RootState>(state => state.auth.user)
    const name = useSelector<RootState, string>(state => state.auth.user.name)
    const lastname = useSelector<RootState, string>(state => state.auth.user.lastname)
    const email = useSelector<RootState, string>(state => state.auth.user.email)
    const phone = useSelector<RootState, string | undefined>(state => state.auth.user.phone)
    const organization = useSelector<RootState, string | undefined>(state => state.auth.user.organization)
    const _id = useSelector<RootState, string>(state => state.auth.user._id)

    const beforeUpdate = useRef(user)
    const formik = useFormik({
        initialValues: {
            _id: _id,
            name: name ? name : '',
            lastname: lastname ? lastname : '',
            email: email ? email : '',
            phone: phone ? phone : '',
            organization: organization ? organization : ''

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(update(values))
        },
    });

    useEffect(() => {
        if (JSON.stringify(beforeUpdate) === JSON.stringify(user)) {
            alert('Данные изменились!')
        }
    }, [user])

    return (
        <Main>
            <div className="profile">
                <h1>Контактные данные</h1>
                <div className="profile__container">
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
                            id="organization"
                            name="organization"
                            label="Организация"
                            value={formik.values.organization}
                            onChange={formik.handleChange}
                            error={formik.touched.organization && Boolean(formik.errors.organization)}
                            helperText={formik.touched.organization && formik.errors.organization}
                            style={{ marginBottom: 25 }}
                        />
                        <InputMask mask="+7(999)999-99-99" value={formik.values.phone}
                            onChange={formik.handleChange}>
                            {(inputProps: any) => <FormTextField
                                {...inputProps}
                                fullWidth
                                id="phone"
                                name="phone"
                                label="Мобильный телефон"
                                type="tel"
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                style={{ marginBottom: 25 }}
                            />}
                        </InputMask>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            size="large"
                            style={{ marginBottom: 10 }}
                        >
                            Отправить
                        </Button>
                    </form>
                </div>
            </div>
        </Main>
    );
};

export default Profile