import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from 'src/store';
import { useAllUsers, usePost } from './hooks';
import { Post, postAdded, postUpdate } from './post-slice';

export default function EditPost() {
  const [form] = useForm<Omit<Post, 'id'>>();
  const { postId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const post = usePost(postId);
  const users = useAllUsers();

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
