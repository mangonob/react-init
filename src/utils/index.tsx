import { Button, Modal, ModalProps } from 'antd';
import React, { ComponentProps, ComponentType, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Render component in command style
 * @param Component Component type
 * @param createProps props factory
 * @returns the function to unmount componet
 */
export function renderComponent<Comp extends ComponentType<any>>(
  Component: Comp,
  createProps: (destory: () => void) => ComponentProps<Comp>
): () => void {
  const div = document.createElement('div');
  document.body.append(div);
  const destory = () => {
    const unmounted = ReactDOM.unmountComponentAtNode(div);
    if (unmounted && div.parentNode) {
      div.remove();
    }
  };
  const props = createProps(destory);
  const element = React.createElement(Component, props);
  ReactDOM.render(element, div);
  return destory;
}

export function TestModal(props: ModalProps & { close?: () => void }) {
  const { close, ...others } = props;

  return (
    <Modal width={'80%'} {...others}>
      <h1>Test Modal</h1>
      <Button type="primary" onClick={close}>
        Button
      </Button>
    </Modal>
  );
}

export type Closable<T> = T & { close: () => void };

export function showModal<Props extends ModalProps>(
  Component: ComponentType<Props>,
  props: Props & { [key: string]: string }
) {
  const Wrapper = (props: Props) => {
    const { onCancel: _onCancel, ...others } = props;
    const [open, setOpen] = useState(true);
    return React.createElement(Component, {
      ...others,
      onCancel: (e) => {
        setOpen(false);
        _onCancel?.(e);
      },
      close: () => {
        setOpen(false);
      },
      open,
    } as ModalProps as Props);
  };

  renderComponent(Wrapper, (destory) => {
    const { afterClose: _afterClose, ...otherProps } = props;

    return {
      centered: true,
      ...otherProps,
      afterClose: () => {
        _afterClose?.();
        destory();
      },
    } as Props;
  });
}
