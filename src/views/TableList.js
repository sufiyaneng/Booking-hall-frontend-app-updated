import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { getAllBokkings } from '../api/auth';
import moment from 'moment/moment';

function TableList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Limit (page size)

  const getAll = async (pageNumber = 1, limit = 5) => {
    try {
      const res = await getAllBokkings(pageNumber, limit);
      console.log('API response:', res);
      setTotalPages(res?.totalPages || 1);
      setCurrentPage(res?.currentPage || 1);
      setProducts(res?.data || []); // Ensure safe access to res.data
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setProducts([]); // Set an empty array if there's an error
    }
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
    // { dataField: 'bookingDate', text: 'Booking Date', sort: true },
    {
      dataField: 'bookingDate',
      text: 'Booking Date',
      sort: true,
      formatter: (cell) => {
        return moment(cell).format('DD-MM-YYYY'); // Format date using moment in DD-MM-YY format
      },
    },
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
      <h5>Booking List</h5>

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
