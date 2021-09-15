import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().trim().min(4, 'min char 4').required('field required'),
    user: Yup.string().trim().min(4, 'min char 4').required('field required'),
    password: Yup.string().trim().min(4, 'min chat 4').required('field required'),
});

export default schema;