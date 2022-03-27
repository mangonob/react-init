import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Post } from "./post-slice";

export default function EditPost() {
  const [form] = useForm<Post>();

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
