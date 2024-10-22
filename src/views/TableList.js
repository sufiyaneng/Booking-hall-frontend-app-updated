import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { getAllBokkings } from '../api/auth';

function TableList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Limit (page size)

  const getAll = async (pageNumber = 1, limit = 5) => {
    const res = await getAllBokkings(pageNumber, limit); // Send page and limit
    setTotalPages(res?.totalPages || 1);
    setCurrentPage(res?.currentPage || 1);
    setProducts(res?.data || []);
  };

  useEffect(() => {
    getAll(currentPage, pageSize); // Fetch data for the current page and page size
  }, [currentPage, pageSize]);

  // Filter products based on search term
  const filteredProducts = products?.filter((product) =>
    product?.customerName.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    product?.phone.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const columns = [
    { dataField: 'customerName', text: 'Customer Name', sort: true },
    { dataField: 'phone', text: 'Phone', sort: true },
    { dataField: 'description', text: 'Description', sort: true },
    { dataField: 'bookingDate', text: 'Booking Date', sort: true },
    { dataField: 'eventType', text: 'Event Type', sort: true },
    { dataField: 'address', text: 'Address' },
  ];

  const defaultSorted = [
    {
      dataField: 'customerName',
      order: 'desc',
    },
  ];

  // Handle next and previous
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h5>React Bootstrap Table with Custom Search</h5>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or phone..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <BootstrapTable
        bootstrap4
        keyField="id"
        data={filteredProducts}
        columns={columns}
        defaultSorted={defaultSorted}
      />

      <div className="pagination">
        <button
          onClick={handlePrevious}
          className="btn btn-primary"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="btn btn-primary"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TableList;
