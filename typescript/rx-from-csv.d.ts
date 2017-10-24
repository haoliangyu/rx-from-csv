declare module 'rxjs/Observable' {

  interface csvOptions {
    delimiter?: string,
    noHeaderRow?: boolean,
    columns?: Array<string>
  }

  interface Observable<T> {
    fromCSV(path: string, options?: csvOptions): Observable<T>;
  }

}
