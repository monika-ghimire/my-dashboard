import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector(state => state.users);

  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [loading, setLoading] = useState(true); // simulate extra loading

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const active = users.filter(u => u.id % 2 === 0).length;
      const inactive = users.length - active;
      setActiveCount(active);
      setInactiveCount(inactive);

      // simulate 1 second extra loading for animation
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [users]);

  const activePercentage = users ? ((activeCount / users.length) * 100).toFixed(0) : 0;
  const activeUsers = users ? users.filter(u => u.id % 2 === 0) : [];

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard</h2>

      {/* Top Stats */}
      <div className="d-flex flex-wrap gap-4 mb-4 justify-content-center">
        {loading || status === 'loading' ? (
          <>
            <div className="card p-4 flex-grow-1 shadow-sm text-center">
              <div className="placeholder-glow">
                <span className="placeholder col-12" style={{ height: '2rem' }}></span>
                <span className="placeholder col-6 mt-2" style={{ height: '2rem' }}></span>
              </div>
            </div>
            <div className="card p-4 flex-grow-1 shadow-sm text-center">
              <div className="placeholder-glow">
                <span className="placeholder col-12" style={{ height: '2rem' }}></span>
                <span className="placeholder col-6 mt-2" style={{ height: '2rem' }}></span>
              </div>
            </div>
            <div className="card p-4 flex-grow-1 shadow-sm text-center">
              <div className="placeholder-glow">
                <span className="placeholder col-12" style={{ height: '2rem' }}></span>
                <span className="placeholder col-6 mt-2" style={{ height: '2rem' }}></span>
              </div>
            </div>
          </>
        ) : status === 'failed' ? (
          <p className="text-danger w-100 text-center">{error}</p>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Quick Active Users Cards */}
      {loading || status === 'loading' ? (
        <div className="d-flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card p-3 shadow-sm flex-fill text-center"
              style={{ minWidth: '150px' }}
            >
              <div className="placeholder-glow">
                <span className="placeholder col-10" style={{ height: '1.2rem' }}></span>
                <span className="placeholder col-6 mt-2" style={{ height: '1rem' }}></span>
                <span className="placeholder col-4 mt-2 badge placeholder"></span>
              </div>
            </div>
          ))}
        </div>
      ) : status === 'failed' ? null : (
        <>
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
                <span className="badge bg-success">Active</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
