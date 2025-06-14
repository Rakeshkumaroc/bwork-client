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
    <table className="min-w-full border border-gray-200 rounded-md">
      <thead className="bg-gray-100 text-gray-800">
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="text-left p-3 text-sm font-semibold">
              {col.header}
            </th>
          ))}
          <th className="text-left p-3 text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-4 text-gray-600 text-sm"
            >
              Loading...
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-4 text-gray-600 text-sm"
            >
              No data available
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center py-4 text-gray-600 text-sm"
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr
              key={item._id || index}
              className="border-t border-gray-200 text-left hover:bg-gray-50"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-3 text-sm text-gray-700">
                  {col.render ? col.render(item) : item[col.accessor] || "-"}
                </td>
              ))}
              <td className="p-3 flex items-center gap-2">
                <Link
                  to={`${basePath}${item._id}`}
                  className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  title="View"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
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