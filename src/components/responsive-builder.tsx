import { ReactNode, useCallback, useEffect, useState } from 'react';

export type Responsive = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ResponsiveBuilderProps {
  children: (_: Responsive) => ReactNode;
}

export function ResponsiveBuilder(props: ResponsiveBuilderProps) {
  const { children } = props;

  const getResponsive = useCallback((width: number): Responsive => {
    if (width < 576) {
      return 'xs';
    } else if (width < 768) {
      return 'sm';
    } else if (width < 992) {
      return 'md';
    } else if (width < 1200) {
      return 'lg';
    } else if (width < 1600) {
      return 'xl';
    } else {
      return 'xxl';
    }
  }, []);

  const [resp, setResp] = useState(getResponsive(window.innerWidth));

  useEffect(() => {
    const onResize = () => {
      setResp(getResponsive(window.innerWidth));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getResponsive]);

  return children(resp);
}
