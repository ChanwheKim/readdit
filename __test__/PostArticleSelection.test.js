/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PostArticleSection from '../src/client/components/PostArticleSection';

configure({ adapter: new Adapter() });

describe('<PostArticleSection />', () => {
  const articleState = {
    isPosting: false,
    article: {},
  };

  const modalState = {
    showModal: false,
    message: '',
  };

  it('should be rendered successfully', () => {
    const categories = [
      { id: 'test-id-1', name: 'test-category-1' },
    ];

    const wrapper = shallow(
      <PostArticleSection
        newArticle={articleState}
        modal={modalState}
        categories={categories}
      />
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should invoke onSubmit method with correct arguments', () => {
    const categories = [
      { id: 'test-id-1', name: 'test-category-1' },
    ];
    let url;
    let categoryId;

    const onSubmit = (arg1, arg2) => {
      url = arg1;
      categoryId = arg2;
    };

    const wrapper = mount(
      <PostArticleSection
        newArticle={articleState}
        modal={modalState}
        categories={categories}
        onSubmit={onSubmit}
      />
    );

    const instance = wrapper.instance();

    wrapper.setState({ url: 'test-url', categoryIdSelected: 'test-id-1' });

    expect(wrapper.state('url')).toBe('test-url');
    expect(wrapper.state('categoryIdSelected')).toBe('test-id-1');

    instance.handleSubmit();

    expect(url).toBe('test-url');
    expect(categoryId).toBe('test-id-1');
  });

  it('should not invoke onSubmit method without both arguments', () => {
    const categories = [
      { id: 'test-id-1', name: 'test-category-1' },
    ];
    let url = 'origin-url';
    let categoryId = 'origin-category';
    let count = 1;
    let message = '';

    const onSubmit = (arg1, arg2) => {
      url = arg1;
      categoryId = arg2;
      count++;
    };

    const displayModal = () => {
      message = 'cannot invoke without necessary arguments';
    };

    const wrapper = mount(
      <PostArticleSection
        newArticle={articleState}
        modal={modalState}
        categories={categories}
        onSubmit={onSubmit}
        onNotEnoughInfo={displayModal}
      />
    );

    const instance = wrapper.instance();

    wrapper.setState({ url: '', categoryIdSelected: 'test-id-1' });

    expect(wrapper.state('url')).toBe('');
    expect(wrapper.state('categoryIdSelected')).toBe('test-id-1');

    instance.handleSubmit();

    expect(count).toBe(1);
    expect(url).toBe('origin-url');
    expect(categoryId).toBe('origin-category');
    expect(message).toBe('cannot invoke without necessary arguments');
  });
});
