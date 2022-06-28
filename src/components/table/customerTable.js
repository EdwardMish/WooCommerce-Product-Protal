import UserAvatar from "react-user-avatar";

export default function Table({ rowData, currentPage, numberPerPage }) {
  const userNodes = rowData.map(function (user, index) {
    return (
      <tr key={currentPage * numberPerPage + index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {currentPage * numberPerPage + index}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <UserAvatar
                size="48"
                name={user.first_name + " " + user.last_name}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.first_name}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {user.first_name + " " + user.last_name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{user.email}</div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
          <a href="/" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </td>
      </tr>
    );
  });
  return (
    <div className="flex flex-col px-4 py-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer Email
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userNodes}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
