import * as Yup from 'yup';

const schema = Yup.object().shape({
    user: Yup.string().trim().min(4, 'Type at least 4 char').required('Required Field'),
    password: Yup.string().trim().min(4, 'Type at least 4 char').required('Required Field'),
});

export default schema;
