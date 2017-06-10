# rx-from-csv

![build status](https://travis-ci.org/haoliangyu/rx-from-csv.svg?branch=master)

[![ReactiveX](http://reactivex.io/assets/Rx_Logo_S.png)](http://reactivex.io/)

[RxJS 5](http://reactivex.io/) operator to load [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) file

Work in both JavaScript and TypeScript

## Installation

```
npm install rx-to-csv
```

## Use

Import this library and it will add a static `fromCSV` operator to the rxjs `Observable` class.

```
public fromCSV(path: string, options?: { delimiter?: string }): Observable<T>;
```

This operator will load the CSV file from the give path and emit each row as an object, whose keys are column names and values are column values.

Parameters:

  * **path**: csv file path
  * **options**: optional configuration for the csv creation
    * **delimiter**: a character to separate values. Default: `,`

## Example

``` javascript
import { Observable } from 'rxjs';
import 'rx-from-csv';

/**
 * For example, there is a data.csv with content
 *
 * id,name
 * 1,"Mike",
 * 2,"Tommy"
 */

Observable.fromCSV('data.csv')
  .subscribe((data) => {
    console.log(data);
  });

/**
 * It will output:
 * { id: '1', name: 'Mike' }
 * { id: '1', name: 'Tommy' }
 */
```

## License

MIT
