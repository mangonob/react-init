import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
  Tabs,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useCallback } from "react";
import FormItemGroup, { FormItem } from "../../components/form/item-group";
import { cloneDeep } from "lodash";

const { TabPane } = Tabs;

interface Personal {
  name?: string;
  sex?: boolean;
  age?: number;
  slivers?: Personal[];
}

interface Appearence {
  fontSize?: number;
  isDarkMode?: boolean;
}

interface FormStore {
  user?: Personal;
  appearence?: Appearence;
}

export default function Home() {
  const [form] = useForm<FormStore>();
  const [sliverCount, setSliverCount] = React.useState(1);

  const updateFormStore = useCallback(
    (reducer: (prev: FormStore) => FormStore | undefined) => {
      const prev = form.getFieldsValue();
      const newValue = reducer(prev);
      newValue && form.setFieldsValue(newValue);
    },
    [form]
  );

  return (
    <Form
      name="profiles"
      form={form}
      initialValues={
        {
          user: {
            name: "Tom",
            sex: true,
            slivers: [
              {
                name: "Jerry",
                sex: false,
                age: 24,
              },
            ],
          },
          appearence: {
            isDarkMode: true,
            fontSize: 24,
          },
        } as FormStore
      }
    >
      <Tabs defaultActiveKey={"0"}>
        <TabPane tab="User" key="user">
          <FormItemGroup name="user">
            <FormItem name={"name"} label="Name">
              <Input />
            </FormItem>
            <FormItem name={"sex"} label="Sex" valuePropName="checked">
              <Checkbox />
            </FormItem>
            <FormItem name={"age"} label="Age">
              <InputNumber />
            </FormItem>
            <FormItemGroup name="slivers">
              {new Array(sliverCount).fill(0).map((_, i) => {
                return (
                  <FormItemGroup name={i} key={`sliver-${i}`}>
                    <Divider />
                    Sliver {i}
                    <FormItem name={"name"} label="Name">
                      <Input />
                    </FormItem>
                    <FormItem name={"sex"} label="Sex" valuePropName="checked">
                      <Checkbox />
                    </FormItem>
                    <FormItem name={"age"} label="Age">
                      <InputNumber />
                    </FormItem>
                  </FormItemGroup>
                );
              })}
            </FormItemGroup>
          </FormItemGroup>
        </TabPane>

        <TabPane tab="Appearence" key="appearence">
          <FormItemGroup name="appearence">
            <FormItem name="fontSize" label="Font size">
              <InputNumber />
            </FormItem>
            <FormItem
              name="isDarkMode"
              label="Dark mode enable"
              valuePropName="checked"
            >
              <Checkbox />
            </FormItem>
          </FormItemGroup>
        </TabPane>
      </Tabs>

      <Space direction="vertical">
        <Button
          onClick={() => {
            updateFormStore((prev) => {
              const newValue = cloneDeep(prev);
              const sliver: Personal = { age: 16, name: "Sliver", sex: true };
              newValue.user.slivers.push(sliver);
              return newValue;
            });
            setSliverCount(sliverCount + 1);
          }}
          type="dashed"
        >
          Add Sliver
        </Button>

        <Button
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                console.log(values);
              })
              .catch((e) => {});
          }}
        >
          提交
        </Button>
      </Space>
    </Form>
  );
}
