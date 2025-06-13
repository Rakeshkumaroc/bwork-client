// components/DataTable.jsx
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const DataTable = ({
  data,
  columns,
  loading,
  error,
  emptyMessage,
  basePath,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-orange-400 rounded-xl">
        <thead className="bg-orange-200 text-orange-800">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="text-left px-4 py-2">
                {col.header}
              </th>
            ))}
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-yellow-400"
              >
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-yellow-400"
              >
                No data available
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-yellow-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item._id || index}
                className="border-t border-orange-400 text-left"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">
                    {col.render ? col.render(item) : item[col.accessor] || "-"}
                  </td>
                ))}
                <td className="px-4 py-2 flex items-center space-x-3">
                  <Link
                    to={`${basePath}${item._id}`}
                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Link>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-full"
                    >
                      <Pencil className="w-4 h-4 text-yellow-600" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;