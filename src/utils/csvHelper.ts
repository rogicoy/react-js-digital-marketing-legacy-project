/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import { parseAsync } from 'json2csv';

interface IOptions {
  fields: string[];
  filename: string;
}

const exportTable = <IRowItem>(rows: IRowItem[], opts: IOptions): Promise<void> =>
  parseAsync(rows, opts).then((csv) => {
    const csvFileContent = `data:text/csv;charset=utf-8,${csv}`;
    const encodedUri = encodeURI(csvFileContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${opts.filename}.csv`);
    document.body.appendChild(link);
    link.click();
  });

const csvHelper = {
  exportTable
};

export default csvHelper;
