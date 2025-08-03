import React from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <div>

      {/* Child Routes Render Here */}
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
