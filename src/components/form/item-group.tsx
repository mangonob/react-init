import { Form, FormItemProps } from 'antd';
import { InternalNamePath, NamePath } from 'antd/lib/form/interface';
import React, { createContext, PropsWithChildren, useContext } from 'react';

interface FormItemContextData {
  pathes: InternalNamePath;
}

const FormItemContext = createContext<FormItemContextData>({ pathes: [] });

const { Provider } = FormItemContext;

export default function FormItemGroup(
  props: PropsWithChildren<{ name: NamePath; isTop?: boolean }>
) {
  const { name, isTop = false, ...extra } = props;

  const { pathes } = useContext(FormItemContext);

  if (isTop) {
    return <Provider value={{ pathes: [] }} {...extra}></Provider>;
  } else {
    const newPathes = Array.isArray(name)
      ? pathes.concat(name)
      : [...pathes, name];

    return <Provider value={{ pathes: newPathes }} {...extra}></Provider>;
  }
}

export function FormItem(props: FormItemProps) {
  const { name, ...extra } = props;
  const { pathes } = useContext(FormItemContext);

  if (name) {
    const newPathes = Array.isArray(name)
      ? pathes.concat(name)
      : [...pathes, name];

    return <Form.Item name={newPathes} {...extra}></Form.Item>;
  } else {
    return <Form.Item name={pathes} {...extra}></Form.Item>;
  }
}
