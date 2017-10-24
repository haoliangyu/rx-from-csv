import { Observable } from 'rxjs';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import defaults from 'lodash.defaults';

const defaultCSVOptions = {
  delimiter: ',',
  noHeaderRow: false
};

function fromCSV(path, options) {

  options = defaults(options, defaultCSVOptions);

  return Observable.create((subscriber) => {

    if (options.noHeaderRow && !Array.isArray(options.columns)) {
      throw new Error('No column name is provided.');
    }

    let readStream = createReadStream(path);
    let reader = createInterface({ input: readStream });
    let isHeader = true && !options.noHeaderRow;
    let columns = options.columns;

    reader.on('line', (line) => {
      if (isHeader) {
        columns = parseRow(line, options.delimiter);
        isHeader = false;
      } else {
        let values = parseRow(line, options.delimiter);
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

function parseRow(row, delimiter) {
  let values = [];
  let wrapped = false;
  let wordStart = 0;

  for (let i = 0, n = row.length; i < n; i++) {
    if (row[i] === '"') {
      wrapped = !wrapped;
    } else if (row[i] === delimiter && !wrapped) {
      values.push(row.slice(wordStart, i));
      wordStart = i + 1;
    }
  }

  values.push(row.slice(wordStart));

  return values.map((value) => {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1);
    }

    return value;
  });
}

Observable.fromCSV = fromCSV;
