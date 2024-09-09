import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useMemo } from 'react';
import { useChatUsers } from '../../user-editor/hooks';
import { SELF_USER_ID } from '../../user-editor/models';

export interface UserSelectorProps {
  value?: string;
  onChange?: (_: string) => void;
  className?: string;
}

export default function UserSelector(props: UserSelectorProps) {
  const { value = SELF_USER_ID, onChange, className } = props;

  const users = useChatUsers((s) => s.users);
  const options = useMemo((): DefaultOptionType[] => {
    const sss = users.map(({ name, userId }) => ({
      label: name,
      value: userId,
    }));
    return sss;
  }, [users]);

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      className={className}
    />
  );
}
