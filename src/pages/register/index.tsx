import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import api from 'service/api';
import Input from 'components/Input';
import schema from 'Utils/schemas/schemaRegister';

import * as Styled from 'styles/pages/login/styles';

interface Values {
    name: string;
    user: string;
    password: string;
}

const Login: NextPage = (props: any) => {
    const initialValues = {
        name: '',
        user: '',
        password: ''
    };


    const handleSubmit = async (data: any) => {
        try {
            const response = await api.post('/api/controllers/user', data);
            if (response.status === 200) {
                toast.success('user inserted');
                Router.push('/');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message);
        }
    };

    const handleGoBack = () => {
        Router.back();
    };

    return (
        <>
            <Head>
                <title>Authority test - Register</title>
            </Head>

            <Styled.Main>
                <Styled.Container>

                    <div className="title-container">
                        <FiArrowLeft color="#000" strokeWidth="3" size={30} onClick={handleGoBack} />
                        <h1>
                            Authority test
                        </h1>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        isInitialValid={false}
                    >
                        {({ isValid }) => (
                            <Form>
                                <Input name="name" placeholder="Name" />
                                <Input name="user" placeholder="Username" />
                                <Input name="password" placeholder="Password" type="password" />
                                <button type="submit" disabled={!isValid}>submit</button>
                            </Form>
                        )}
                    </Formik>
                </Styled.Container>
            </Styled.Main>
        </>
    )
}

export default Login