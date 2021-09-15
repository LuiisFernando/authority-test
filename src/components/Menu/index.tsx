import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import * as Styled from 'styles/components/Menu/styles';

import { useAuth } from 'context/AuthContext';

export default function Menu() {

    const { logout } = useAuth();

    return (
        <Styled.AppBar>
            <div className="container">
                <div className="logout-container" onClick={logout}>
                    <FiLogOut color="#FFF" strokeWidth="3" />
                    <span>Logout</span>
                </div>
            </div>
        </Styled.AppBar>
    );
};