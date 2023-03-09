import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { prewviewPDF } from 'runner-bridge';

const { Item } = Form;

export function PDFPreview() {
  const [title, setTitle] = useState<string>('基金概要');
  const [url, setUrl] = useState<string>(
    'https://atszxyw.cjhxfund.com/xxpl/FUND/007866/CN_50990000_001909_FA010080_20200007_007866_20200901_090000_01.pdf'
  );

  return (
    <Form>
      <Item label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </Item>
      <Item label="URL">
        <Input value={url} onChange={(e) => setUrl(e.target.value)}></Input>
      </Item>
      <Item>
        <Button
          type="primary"
          onClick={() => {
            prewviewPDF({
              title,
              url,
              showBottomBtn: true,
              disableText: 'Disakljflksjdfaklsjdklfajslfjlkaskdlaslkdfjalsdj',
              enableText: 'enable aklsdjklf',
            });
          }}
        >
          Preview
        </Button>
      </Item>
    </Form>
  );
}
