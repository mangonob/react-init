import { Col, Row } from 'antd';
import React from 'react';
import { ColorPalette } from './palette';

export function Colors() {
  const colors: [string, string][] = [
    ['蓝色', 'blue'],
    ['灰色', 'gray'],
    ['绿色', 'green'],
    ['橙色', 'orange'],
    ['红色', 'red'],
    ['青蓝', 'cyan'],
    ['紫色', 'purple'],
    ['黄色', 'yellow'],
    ['洋红', 'magenta'],
  ];

  return (
    <>
      <Row gutter={[24, 20]}>
        {colors.map(([label, colorName], j) => {
          return (
            <Col key={j} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
              <ColorPalette label={label} colorName={colorName}></ColorPalette>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
