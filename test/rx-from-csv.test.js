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
          { id: '1', name: 'Mike' },
          { id: '2', name: 'Tommy' }
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

});
