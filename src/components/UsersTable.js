import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector(state => state.users);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // number of rows per page

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p className="text-danger">Error: {error}</p>;

  // Filter users based on search
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users Table</h2>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, username or email..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset to first page on search
        }}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Website</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UsersTable;
