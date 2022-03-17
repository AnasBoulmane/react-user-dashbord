import React from 'react';

type handler = (currentRow: any, event?: any) => void;

interface ActionsColumn {
  name: string;
  edit?: handler;
  delete?: handler;
}

interface DataTableProps {
  data: any[];
  actions?: ActionsColumn;
  columns: Array<{
    name: string;
    selector: (row: any) => any;
  }>;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, actions }) => {
  const shouldDisplayActions = actions?.edit || actions?.delete;
  const onEdit = (currentRow) => (event) => actions.edit(currentRow, event);
  const onDelete = (currentRow) => (event) => actions.delete(currentRow, event);
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
            {/* Actions */}
            {shouldDisplayActions && (
              <th className="p-2 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">{actions.name}</div>
              </th>
            )}
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
              {/* Actions Column */}
              {shouldDisplayActions && (
                <td className="p-2 py-3 whitespace-nowrap">
                  <div className="flex gap-3">
                    {actions.edit && (
                      <button className="shrink-0 rounded-full" onClick={onEdit(row)}>
                        <span className="sr-only">Edit</span>
                        <svg className="w-8 h-8 fill-current hover:opacity-50" viewBox="0 0 32 32">
                          <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z"></path>
                        </svg>
                      </button>
                    )}
                    {actions.delete && (
                      <button className="text-rose-500 rounded-full" onClick={onDelete(row)}>
                        <span className="sr-only">Delete</span>
                        <svg className="w-8 h-8 fill-current hover:opacity-50" viewBox="0 0 32 32">
                          <path d="M13 15h2v6h-2zM17 15h2v6h-2z"></path>
                          <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
