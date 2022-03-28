import { nanoid } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from 'src/store';
import { Post, postAdded, postUpdate } from './post-slice';

export default function EditPost() {
  const [form] = useForm<Post>();
  const { postId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector<RootState, Post | undefined>((s) =>
    s.posts.find((p) => p.id === postId)
  );

  const { id, title, content } = post || {};

  const onSave = useCallback(async () => {
    const values = await form.validateFields();
    if (id) {
      dispatch(postUpdate({ id, ...values }));
    } else {
      dispatch(postAdded({ id: nanoid(), ...values }));
    }
  }, [form, dispatch, id]);

  return (
    <>
      <Form form={form} initialValues={{ title, content }}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea></Input.TextArea>
        </Form.Item>
      </Form>
      <Button onClick={onSave}>{(id && 'Save') || 'Create Post'}</Button>
    </>
  );
}
