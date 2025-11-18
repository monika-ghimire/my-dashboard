import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector(state => state.users);

  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const active = users.filter(u => u.id % 2 === 0).length;
      const inactive = users.length - active;
      setActiveCount(active);
      setInactiveCount(inactive);
    }
  }, [users]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p className="text-danger">Error: {error}</p>;

  const activePercentage = ((activeCount / users.length) * 100).toFixed(0);
  const activeUsers = users.filter(u => u.id % 2 === 0); // Only active

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard</h2>

      {/* Top Stats */}
      <div className="d-flex flex-wrap gap-4 mb-4 justify-content-center">
        <div className="card p-4 flex-grow-1 shadow-sm text-center">
          <h5>Total Users</h5>
          <h2 className="display-6">{users.length}</h2>
        </div>

        <div className="card p-4 flex-grow-1 shadow-sm text-center">
          <h5>Active Users</h5>
          <h2 className="display-6">{activeCount}</h2>
          <div className="progress mt-3" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${activePercentage}%` }}
            />
          </div>
        </div>

        <div className="card p-4 flex-grow-1 shadow-sm text-center">
          <h5>Inactive Users</h5>
          <h2 className="display-6">{inactiveCount}</h2>
          <div className="progress mt-3" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${100 - activePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Active Users Cards */}
      <h4 className="mb-3">Active Users</h4>
      <div className="d-flex flex-wrap gap-3">
        {activeUsers.slice(0, 6).map(user => (
          <div
            key={user.id}
            className="card p-3 shadow-sm flex-fill text-center"
            style={{ minWidth: '150px' }}
          >
            <h6>{user.name}</h6>
            <p className="m-3 text-muted">@{user.username}</p>
            <span className="badge bg-success ">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
