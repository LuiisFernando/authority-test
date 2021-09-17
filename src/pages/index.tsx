import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from 'context/AuthContext';
import Input from 'components/Input';
import shemaLogin from 'Utils/schemas/schemaLogin';
import * as Styled from 'styles/pages/login/styles';

type signInCredentials = {
  user: string;
  password: string;
}

const Home: NextPage = (props: any) => {

  const initialValues = {
    user: '',
    password: ''
  };
  const { signIn } = useAuth();

  const handleSubmit = async (data: signInCredentials) => {
    try {
      await signIn(data);
    } catch (e: any) {
      toast.error(e.response?.data?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Authority test - Login</title>
      </Head>

      <Styled.Main>
        <Styled.Container>
          <h1>Authority test</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={shemaLogin}
            onSubmit={handleSubmit}
            isInitialValid={false}
          >
            {({ isValid }) => (
              <Form>
                <Input
                  name="user"
                  placeholder="Username"
                />

                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                />

                <div className="container-newAccount">
                  <label htmlFor="">
                    Do not have an account ?
                    <span>
                      <a href="#" onClick={() => Router.push('/register')}>
                        create here
                      </a>
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={!isValid}>
                  submit
                </button>
              </Form>
            )}
          </Formik>
        </Styled.Container>
      </Styled.Main>

    </>
  )
}

export default Home
