import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RedirectProps {
  path: string;
}

export default function Redirect(props: RedirectProps) {
  const { path } = props;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return <></>;
}
