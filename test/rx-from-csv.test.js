import chai from 'chai';
import { join } from 'path';
import { Observable } from 'rxjs';
import '../src/rx-from-csv';

const expect = chai.expect;
const noop = () => {};

describe('fromCSV()', () => {

  it('should read a CSV file.', (done) => {
    let testCSV = join(__dirname, 'csv/test.csv');
    let rows = [];

    Observable.fromCSV(testCSV)
      .subscribe((row) => {
        rows.push(row);
      }, noop, () => {
        expect(rows).to.deep.equal([
          { id: '1', name: 'Mike', count: '2' },
          { id: '2', name: 'Tommy', count: '3' },
          { id: '3', name: 'Donny', count: '4' }
        ]);

        done();
      });
  });

  it('should read a CSV file with text wrapped by commas.', (done) => {
    let testCSV = join(__dirname, 'csv/test.commas.csv');
    let rows = [];

    Observable.fromCSV(testCSV)
      .subscribe((row) => {
        rows.push(row);
      }, noop, () => {
        expect(rows).to.deep.equal([
          { id: '1', name: 'Mike' },
          { id: '2', name: 'Tommy' },
          { id: '3', name: 'Tommy, Hord' }
        ]);

        done();
      });
  });

  it('should read a CSV file with empty values.', (done) => {
    let testCSV = join(__dirname, 'csv/test.undefined.csv');
    let rows = [];

    Observable.fromCSV(testCSV)
      .subscribe((row) => {
        rows.push(row);
      }, noop, () => {
        expect(rows).to.deep.equal([
          { id: undefined, name: 'Mike' },
          { id: '2', name: undefined }
        ]);

        done();
      });
  });

  it('should read a CSV file with custom delimiter.', (done) => {
    let testCSV = join(__dirname, 'csv/test.delimiter.csv');
    let rows = [];

    Observable.fromCSV(testCSV, { delimiter: '|' })
      .subscribe(
        (row) => rows.push(row),
        noop,
        () => {
          expect(rows).to.deep.equal([
            { id: '1', name: 'Mike', count: '1' },
            { id: '2', name: 'Rossy', count: '2' },
            { id: '3', name: 'Kate', count: '3' }
          ]);

          done();
        }
      );
  });

  it('should read a CSV file with no header row.', (done) => {
    let testCSV = join(__dirname, 'csv/test.no.header.csv');
    let rows = [];
    let options = {
      noHeaderRow: true,
      columns: ['id', 'name']
    };

    Observable.fromCSV(testCSV, options)
      .subscribe(
        (row) => rows.push(row),
        noop,
        () => {
          expect(rows).to.deep.equal([
            { id: '1', name: 'Mike' },
            { id: '2', name: 'Tom' }
          ]);

          done();
        }
      );
  });

  it('should throw an error if noHeaderRow is true but no column name is provided.', (done) => {
    let testCSV = join(__dirname, 'csv/test.csv');

    Observable.fromCSV(testCSV, { noHeaderRow: true })
      .subscribe(
        noop,
        (err) => {
          expect(err).to.be.an('error');
          expect(err.message).to.equal('No column name is provided.');
          done();
        }
      );
  });

});
