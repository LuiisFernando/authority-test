import React, { useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify';

import { useAuth } from 'context/AuthContext';
import { withAuth } from 'Utils/withAuth';

import Menu from 'components/Menu';
import * as Styled from 'styles/pages/Dashboard/styles';

const Dashboard: NextPage = (props: any) => {

    const { userInfo } = useAuth();

    return (
        <>
            <Head>
                <title>Authority test - Dashboard</title>
            </Head>
            <Menu />
            <Styled.Container>
                {userInfo && (
                    <Styled.InfoContainer>
                        <h1>Hello, {userInfo.name}</h1>

                        <p>
                            <span>Username: </span>
                            {userInfo.username}
                        </p>

                        <p>
                            <span>Name: </span>
                            {userInfo.name}
                        </p>
                    </Styled.InfoContainer>
                )}
            </Styled.Container>
        </>
    )
}

export default Dashboard;

export const getServerSideProps = withAuth(async (ctx: any) => {

    return {
        props: {}
    }
});