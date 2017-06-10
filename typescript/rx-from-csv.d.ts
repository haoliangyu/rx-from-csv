declare module 'rxjs/Observable' {
  interface Observable<T> {
    fromCSV(path: string, options?: { delimiter?: string }): Observable<T>;
  }
}
