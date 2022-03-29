import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from 'src/store';
import { User } from '../user/user-slice';
import { Post, postAdded, postUpdate } from './post-slice';

export default function EditPost() {
  const [form] = useForm<Omit<Post, 'id'>>();
  const { postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector<RootState, Post | undefined>((s) =>
    s.posts.find((p) => p.id === postId)
  );
  const users = useSelector<RootState, User[]>((s) => s.users);

  const { id, title, content, user } = post || {};

  const onSave = useCallback(async () => {
    const values = await form.validateFields();
    if (id) {
      dispatch(postUpdate({ id, ...values }));
    } else {
      dispatch(postAdded(values.title, values.content, values.user));
    }
  }, [form, dispatch, id]);

  return (
    <>
      <Form form={form} initialValues={{ title, content, user }}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        {users.length > 0 && (
          <Form.Item name="user" label="Author">
            <Select>
              {users.map((user) => {
                const { id, name } = user;
                return <Select.Option key={id}>{name}</Select.Option>;
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea></Input.TextArea>
        </Form.Item>
      </Form>
      <Button onClick={onSave}>{(id && 'Save') || 'Create Post'}</Button>
    </>
  );
}
