import { AutoCompleteProps } from 'antd';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'src/hooks';
import { fetchQuerySuggestion } from './api';

export function useSuggestion(query?: string): AutoCompleteProps['options'] {
  const _query = useDebounceValue(query, 100);
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  useEffect(() => {
    if (_query) {
      fetchQuerySuggestion(_query)
        .then((s) => {
          const options: AutoCompleteProps<unknown>['options'] = s.map(
            ({ name, value }) => ({
              label: value + ' | ' + name,
              value: value + '|' + name,
            })
          );
          setOptions(options);
        })
        .catch(() => void 0);
    }
  }, [_query]);

  return options;
}
