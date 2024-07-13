import React, { useState } from 'react';
import './Workspace.css';

const Workspace = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {id,isDeletable} = props.workspace
  const[tabs,setTabs] = useState([])
  const[inputvalue,setvalue] = useState('')

  const handleValuechange = (e) => {
    setvalue(e.target.value);
  }
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


  const addTab = (inputvalue) => {
    if (inputvalue.trim() === ""){
      alert("Enter a valid value")
      return
    }
    setTabs([...tabs, {id:tabs.length,name:inputvalue}]);
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
            <input type ="text" value = {inputvalue} onChange={handleValuechange}></input>
            <button onClick={() => {addTab(inputvalue)}}>Add tab</button>
          </div>
        ) : (
          <p className="click-expand" onClick={toggleExpand}>Click here to expand</p>
        )}
        
      </div>
      
    </div>
  );
};

export default Workspace;
