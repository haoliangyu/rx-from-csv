declare module 'rxjs/Observable' {
  interface Observable<T> {
    fromCSV(path: string, options?: { delimeter?: string }): Observable<T>;
  }
}
