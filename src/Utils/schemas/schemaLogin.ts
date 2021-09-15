import * as Yup from 'yup';

const schema = Yup.object().shape({
    user: Yup.string().trim().min(4, 'Digite o usuário').required('Campo obrigatório'),
    password: Yup.string().trim().min(4, 'Digite a senha').required('Campo obrigatório'),
});

export default schema;