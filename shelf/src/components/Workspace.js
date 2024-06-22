import React, { useState } from 'react';
import './Workspace.css';

const Workspace = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {id,isDeletable} = props.workspace
  console.log(id)
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  let heading;
  if(id === 0){
    heading = (
        <h2>Current session</h2>
    );
  } else{
    heading = (
        <h2>Your workspace {id}</h2>
    );
  }

  const handleDelete = () => {
    props.Delete(id)
  }
  const save = () => {
    props.Save()
  }

  return (
    <div className="workspace-container">
        {isDeletable? (
            <div class = "delete-button" onClick={handleDelete}>
                <p className="delete">X</p>
          </div>
        ):(
            <div class = "save-button" onClick={save}>
                <p className="save">+</p>
          </div>
        )}
      <div className="workspace-header">
      
        {heading}
        {isExpanded ? (
          <div className="workspace-tabs">
            <p>All your tabs are here.</p>
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
