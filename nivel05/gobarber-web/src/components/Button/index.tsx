import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number;
  children: ReactNode;
};

function Button({ children, loading, ...rest }: ButtonProps): JSX.Element {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando ...' : children}
    </Container>
  );
}

Button.defaultProps = {
  loading: 0,
};

export default Button;
