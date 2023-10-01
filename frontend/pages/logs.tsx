import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { logStore } from '@/stores/LogStore';
import { promptStore } from '@/stores/PromptStore';
import { modelStore } from '@/stores/ModelStore';

export default function About() {
  const { push } = useRouter();

  var { logs, fetchLogs } = logStore();

  var { models } = modelStore();
  var { prompts } = promptStore();

  const initial_page = parseInt(location.search.replace('?page=', ''));

  const [page, setPage] = useState(initial_page || 1);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const page = parseInt(location.search.replace('?page=', ''));
    if (page) setPage(page);
  }, [setPage]);

  useEffect(() => {
    fetchLogs(page);
  }, [fetchLogs, page]);

  const handleRowClick = (logId:string) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [logId]: !(prevExpandedRows as any)[logId],
    }));
  };

  const handlePrevious = () => {
    if (page > 1) push(`?page=${page - 1}`);
    setPage(page - 1);
    fetchLogs(page);
  };

  const handleNext = () => {
    if (page) push(`?page=${page + 1}`);
    setPage(page + 1);
    fetchLogs(page);
  };

  function getModelName(id:string) {
    return models.find((model:any) => model.id === id)?.name || "N/a";
  }

  function getPromptName(id:string) {
    return prompts.find((prompt:any) => prompt.id === id)?.name || "N/a";
  }

  const renderRow = (log: any) => (
    <>
      <tr key={log.id} onClick={() => handleRowClick(log.id)} className="cursor-pointer">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {getPromptName(log.prompt_id)}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getModelName(log.model_id)}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(log.createdAt.toString())}</td>
        <td
          className={`whitespace-nowrap px-3 py-4 text-sm ${
            log.status !== 200 ? 'bg-yellow-300' : '' // Add your yellow background class here
          } text-gray-500`}
        >
          {log.status}
        </td>
      </tr>
      {(expandedRows as any)[log.id] && (
        <tr>
          <td colSpan={4} className="p-4 bg-gray-100">
            {/* Added the white-space property with value "pre-wrap" */}
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(log, null, 2)}</pre>
          </td>
        </tr>
      )}
    </>
  );  

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Logs</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the logs that have been generated by the system.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          </div>
        </div>

        <div className="mt-8 flow-root markdown-page markdown-content markdown-prompt-blockquote models">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full docs-models-toc">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Prompt
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Model
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => renderRow(log))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
        <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
          <div className="hidden sm:block">

          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button
              onClick={handlePrevious}
              className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${page === 1 && "opacity-50 cursor-not-allowed"}`}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0`}
            >
              Next
            </button>
          </div>
        </nav>

    </div>
  );
}
