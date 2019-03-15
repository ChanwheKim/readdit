/* eslint-disable no-undef */
import authReducer from '../src/client/reducers/authReducer';
import * as actions from '../src/client/actions/types';

describe('authReducer', () => {
  it('should return null as the initial state', () => {
    expect(authReducer(undefined, {})).toBe(null);
  });

  it('should handle FETCH_USER action', () => {
    const responseAction = {
      type: actions.FETCH_USER,
      payload: { name: 'user-1', like: [] },
    };

    const user1 = authReducer(null, responseAction);
    const user2 = authReducer(false, responseAction);

    expect(user1.name).toBe('user-1');
    expect(user2.name).toBe('user-1');

    expect(user1 !== responseAction.payload).toBe(false);
    expect(user2 !== responseAction.payload).toBe(false);
  });

  it('should handle HANDLE_LIKE', () => {
    const prevState = {
      name: 'user-1',
      like: ['test-like-1'],
    };

    const responseAction = {
      type: actions.FETCH_USER,
      payload: { name: 'user-1', like: ['test-like-1', 'test-like-2'] },
    };

    const user = authReducer(prevState, responseAction);

    expect(user).toEqual({
      name: 'user-1',
      like: ['test-like-1', 'test-like-2'],
    });
    expect(user.like !== responseAction.payload.like).toBe(false);
  });
});
