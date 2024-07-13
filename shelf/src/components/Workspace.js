import React, { useState } from 'react';
import './Workspace.css';

const Workspace = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {id,isDeletable} = props.workspace
  const[tabs,setTabs] = useState([])
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

  const handleDeleteTab = (tabId) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
  };


  const addTab = () => {
    setTabs([...tabs, {id:tabs.length,name:'Tab'}]);
  };

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
            {
              tabs.map((tab) => (
                <div key={tab.id} className="tab">
                <span>{tab.name}</span>
                <button onClick={() => handleDeleteTab(tab.id)}>Delete</button>
              </div>
              ))
            }
            
            <button onClick={(addTab)}>Add tab</button>
          </div>
        ) : (
          <p className="click-expand" onClick={toggleExpand}>Click here to expand</p>
        )}
        
      </div>
      
    </div>
  );
};

export default Workspace;
