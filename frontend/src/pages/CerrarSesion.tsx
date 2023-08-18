import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Avatar, Space } from 'antd';
import Box from "@mui/material/Box";
import style from "../pages/Home.module.css";

const onClick: MenuProps['onClick'] = ({ key }) => {
  localStorage.setItem('user_id', "");
  window.location.href ='/';
};

const items: MenuProps['items'] = [
  {
    label: <strong>Cerrar sesión</strong>,
    key: '0',
  },
];

export const CerrarSesion = () => {
  return (
    <Box>
      <Dropdown className='AvarHeader' menu={{ items, onClick }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar size={40} className={`${style.HomeUser} u-floatRight`}>
            AP
          </Avatar>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Box>
  );
};
