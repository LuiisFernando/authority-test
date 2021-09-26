import React from 'react';
import { useField } from 'formik';

import * as Styled from 'styles/components/Input/styles';

export default function Input({ name, placeholder, ...rest }: any) {
    const [field, meta] = useField(name);
    const isDirty = meta.touched && JSON.stringify(meta.value) !== JSON.stringify(meta.initialValue)

    return (
        <Styled.Container>
            <input
                className={isDirty && meta.touched && meta.error ? 'error-input' : ''}
                placeholder={placeholder}
                autoComplete="off"
                {...field}
                {...rest}
            />
            {isDirty && meta.error ? (
                <div className="error-message">{meta.error}</div>
            ) : ''}
        </Styled.Container>
    );
};
