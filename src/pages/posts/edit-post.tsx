import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from 'src/store';
import { Post } from './post-slice';

export default function EditPost() {
  const [form] = useForm<Post>();
  const { postId } = useParams();
  const post = useSelector<RootState, Post | undefined>((s) =>
    s.posts.find((p) => p.id === postId)
  );

  // const {} = post;

  return (
    <Form form={form}>
      <Form.Item name="title" label="Title">
        <Input></Input>
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea></Input.TextArea>
      </Form.Item>
    </Form>
  );
}
