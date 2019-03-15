/* eslint-disable no-undef */
import articleReducer from '../src/client/reducers/articlesReducer';
import * as actions from '../src/client/actions/types';

describe('article-reducer', () => {
  const initialState = {
    isLoading: false,
    list: {},
  };

  it('should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual({ isLoading: false, list: {} });
  });

  it('should handle LOADING_ARTICLES action', () => {
    const startAction = {
      type: actions.LOADING_ARTICLES,
      payload: true,
    };

    expect(articleReducer({}, startAction)).toEqual({ isLoading: true });
    expect(articleReducer(initialState, startAction)).toEqual({ isLoading: true, list: {} });
  });

  it('should handle FETCH_ARTICLES_BY_CATEGORY', () => {
    const successAction1 = {
      type: actions.FETCH_ARTICLES_BY_CATEGORY,
      payload: [{ _id: 'id1' }, { _id: 'id2' }],
    };

    const successAction2 = {
      type: actions.FETCH_ARTICLES_BY_CATEGORY,
      payload: [{ _id: 'id1' }, { _id: 'id1' }],
    };

    const result1 = articleReducer(initialState, successAction1);
    const result2 = articleReducer(initialState, successAction2);

    expect(Object.keys(result1.list).length).toBe(2);
    expect(Object.keys(result2.list).length).toBe(1);
    expect(result1.list !== successAction1.payload).toBe(true);
  });

  it('should not update existing articles', () => {
    const prevState = {
      isLoading: true,
      list: {
        id1: { _id: 'id1', count: 7 },
      },
    };

    const successAction = {
      type: actions.FETCH_ARTICLES_BY_CATEGORY,
      payload: [{ _id: 'id1', count: 1 }, { _id: 'id2', count: 5 }],
    };

    const result = articleReducer(prevState, successAction);

    expect(result.list.id1.count).toBe(7);
    expect(Boolean(result.list.id2)).toBe(true);
    expect(result.list.id2.count).toBe(5);
    expect(result.list !== successAction.payload).toBe(true);
    expect(result.isLoading).toBe(false);
  });

  it('should handle RECEIVE_USER_POSTS', () => {
    const prevState = {
      isLoading: true,
      list: {
        id1: { _id: 'id1' },
        id2: { _id: 'id2' },
      },
    };

    const successAction = {
      type: actions.FETCH_ARTICLES_BY_CATEGORY,
      payload: [
        { _id: 'id1' },
        { _id: 'id2' },
        { _id: 'id3' },
        { _id: 'id4' },
        { _id: 'id5' }
      ],
    };

    const result = articleReducer(prevState, successAction);

    expect(Object.values(result.list).length).toBe(5);
    expect(result.list !== successAction.payload).toBe(true);
  });

  it('should handle HANDLE_LIKE', () => {
    const prevState = {
      isLoading: true,
      list: {
        id1: { _id: 'id1', like: [] },
        id2: { _id: 'id2', like: [] },
      },
    };

    const successAction = {
      type: actions.HANDLE_LIKE,
      payload: {
        article: {
          _id: 'id1',
          like: ['sample-like'],
        },
      },
    };

    const result = articleReducer(prevState, successAction);

    expect(result.list.id1.like[0]).toBe('sample-like');
    expect(result.list.id1.like.length).toBe(1);
    expect(result.list.id2.like.length).toBe(0);
    expect(Object.values(result.list).length).toBe(2);
    expect(prevState.list.id1.like !== result.list.id1.like).toBe(true);
  });
});
