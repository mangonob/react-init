import { nanoid } from '@reduxjs/toolkit';
import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from 'src/store';
import { useAllUsers, usePost } from './hooks';
import { Post, PostStatus, postUpdate } from './post-slice';
import { addNewPost } from './thunk';

export default function EditPost() {
  const [form] = useForm<Omit<Post, 'id'>>();
  const { postId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const post = usePost(postId);
  const users = useAllUsers();

  const { id, title, content, user } = post || {};

  const [addingStatus, setAddingStatus] = useState<PostStatus>('idle');
  const isAdding = useMemo(() => addingStatus === 'loading', [addingStatus]);

  const onSave = useCallback(async () => {
    const values = await form.validateFields();
    if (id) {
      dispatch(postUpdate({ id, ...values }));
    } else {
      setAddingStatus('loading');
      try {
        await dispatch(
          addNewPost({
            id: nanoid(),
            ...values,
          })
        );
      } catch {
        setAddingStatus('failed');
      }
      setAddingStatus('success');
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
      <Button loading={isAdding} onClick={onSave}>
        {(id && 'Save') || 'Create Post'}
      </Button>
    </>
  );
}
