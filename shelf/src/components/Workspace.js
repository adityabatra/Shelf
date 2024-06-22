import React, { useState } from 'react';
import './Workspace.css';

const Workspace = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <h2>Current active workplace</h2>
        {isExpanded ? (
          <div className="workspace-tabs">
            <p>All your active tabs are here.</p>
            {/* Add more tab content here if needed */}
          </div>
        ) : (
          <p className="click-expand" onClick={toggleExpand}>Click here to expand</p>
        )}
      </div>
      
    </div>
  );
};

export default Workspace;
