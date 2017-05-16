import { Observable } from 'rxjs';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import defaults from 'lodash.defaults';

const defaultCSVOptions = {
  delimeter: ','
};

function removeTextWrapper(text) {
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, text.length - 1);
  }

  return text;
}

function fromCSV(path, options) {

  options = defaults(options, defaultCSVOptions);

  return Observable.create((subscriber) => {
    let readStream = createReadStream(path);
    let reader = createInterface({ input: readStream });
    let isHeader = true;
    let columns;

    reader.on('line', (line) => {
      if (isHeader) {
        columns = line.split(options.delimeter).map((column) => removeTextWrapper(column));
        isHeader = false;
      } else {
        let values = line.split(options.delimeter).map((value) => removeTextWrapper(value));
        let valueObject = {};

        for (let i = 0, n = columns.length; i < n; i++) {
          valueObject[columns[i]] = values[i] || undefined;
        }

        subscriber.next(valueObject);
      }
    });

    reader.on('close', () => subscriber.complete());
    reader.on('pause', () => subscriber.complete());
    readStream.on('error', (error) => subscriber.error(error));
  });
}

Observable.fromCSV = fromCSV;