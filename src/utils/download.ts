export function download(url: string, fileName?: string): void {
  const a = document.createElement('a');
  if (fileName) a.setAttribute('download', fileName ?? 'unknown');
  a.setAttribute('href', url);
  a.click();
}
