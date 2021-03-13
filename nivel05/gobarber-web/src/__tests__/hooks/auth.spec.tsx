import { renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from '../../hooks/Auth';

describe('Auth hook', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const email = 'b@b.com';

    result.current.signIn({
      email,
      password: '123456',
    });

    expect(result.current.user.email).toEqual(email);
  });
});
