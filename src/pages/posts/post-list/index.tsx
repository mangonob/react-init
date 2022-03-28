import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Space } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import produce from 'immer';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/store';
import { Post, removePost } from '../post-slice';
import styles from './index.module.scss';

/** Extra values type from FormInstance */
export type FormValues<T> = T extends FormInstance<infer V> ? V : unknown;

export default function PostList() {
  const posts = useSelector<RootState, Post[]>((state) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setEditing] = useState(false);
  const [valuesDep, toggleValues] = useState({});

  const [form] = useForm<{ selected?: { [key in string]: boolean } }>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formValues = useMemo(() => form.getFieldsValue(), [form, valuesDep]);

  const isAllSelected = useMemo(() => {
    return (
      Object.entries(formValues.selected || {}).filter(
        ([, isSelected]) => isSelected
      ).length === posts.length
    );
  }, [formValues, posts.length]);

  const onSelectAll = useMemo(() => {
    return (isSelected: boolean) => {
      form.setFieldsValue({
        selected: produce({} as { [key in string]: boolean }, (draft) => {
          // eslint-disable-next-line unicorn/no-array-for-each
          posts.forEach(({ id }) => {
            draft[id] = isSelected;
          });
        }),
      });
      toggleValues({});
    };
  }, [form, posts]);

  return (
    <section className={styles.postList}>
      <h2>Posts</h2>
      <Form form={form} onValuesChange={() => toggleValues({})}>
        <ul>
          {isEditing && (
            <li key="selectAll">
              <Checkbox
                checked={isAllSelected}
                className={styles.checkbox}
                onChange={(e) => {
                  onSelectAll(e.target.checked);
                }}
              ></Checkbox>
              <a>Select All</a>
            </li>
          )}
          {posts.map((post) => {
            const { id, title } = post;

            return (
              <li key={`postItem-${id}`}>
                {isEditing && (
                  <Form.Item
                    name={['selected', id]}
                    noStyle
                    valuePropName="checked"
                  >
                    <Checkbox className={styles.checkbox} />
                  </Form.Item>
                )}
                {!isEditing && <Link to={`/post/${id}`}>{title}</Link>}
                {isEditing && <a>{title}</a>}
                {isEditing && (
                  <MinusCircleOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removePost(id));
                    }}
                    style={{ color: 'red', marginLeft: 8 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </Form>
      <Space>
        <Link to="/create">
          <Button icon={<PlusCircleOutlined />}>Add Post</Button>
        </Link>
        {(isEditing || posts.length > 0) && (
          <Button
            type={isEditing ? 'default' : 'primary'}
            onClick={() => {
              if (isEditing) {
                onSelectAll(false);
              }
              setEditing(!isEditing);
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        )}
        {isEditing && <Button type="primary">Remove Selected</Button>}
      </Space>
    </section>
  );
}
