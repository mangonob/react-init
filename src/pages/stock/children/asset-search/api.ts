import request from 'src/request';

export interface Suggestion {
  value: string;
  name: string;
}

export async function fetchQuerySuggestion(
  query: string,
  maxCount?: number
): Promise<Suggestion[]> {
  const response = await request.get<string>('/hk/autocomplete.php', {
    params: {
      q: query,
      limit: maxCount ?? 8,
      lang: 'tc',
      timestamp: Date.now(),
    },
  });

  return response.data
    .split('\n')
    .filter((e) => e.length)
    .map((t): Suggestion => {
      const [code, name] = t.split(',');
      return { value: code, name };
    });
}
