const LanguageDetailsSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>

      <hr className="my-6 border-gray-300" />
      <div className="flex justify-between items-center mb-2">
        <div className="h-5 w-32 bg-gray-200 rounded"></div>
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              {[...Array(5)].map((_, idx) => (
                <th key={idx} className="py-2 pr-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(2)].map((_, index) => (
              <tr key={index} className="border-b border-gray-300">
                {[...Array(5)].map((_, idx) => (
                  <td key={idx} className="py-3 pr-4">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LanguageDetailsSkel;
