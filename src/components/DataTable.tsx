import React from 'react';

interface DataTableProps {
  data: any[];
  columns: Array<{
    name: string;
    selector: (row: any) => any;
  }>;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  if (!data || !columns) return null;
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        {/* Table header */}
        <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-slate-200 border-b">
          <tr>
            {columns.map(({ name }) => (
              <th key={name} className="p-2 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">{name}</div>
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.id || row.key}>
              {columns?.map(({ name, selector }) => (
                <td key={name} className="p-2 whitespace-nowrap">
                  <div className="text-left">{selector(row)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
