import request from 'src/request';

export interface Publisher {
  id: string;
  name: string;
}

export async function fetchPublisherOptions(): Promise<Publisher[]> {
  const response = await request.get<string>('/tc/ajax/opt-underlying', {
    params: {
      wtype: 'warrant',
    },
  });

  const div = document.createElement('div');
  div.innerHTML = response.data;

  return Array.from(div.childNodes).map((n): Publisher => {
    const el = n as HTMLElement;
    return {
      id: el.getAttribute('value') as string,
      name: el.textContent as string,
    };
  });
}
