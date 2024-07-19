export default class PageLoadError extends Error {
  error: Error;

  constructor(error: Error) {
    super();
    this.error = error;
  }
}
