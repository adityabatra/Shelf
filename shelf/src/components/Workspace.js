import React, { useState, useEffect} from 'react';
import './Workspace.css';

const Workspace = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {id,isDeletable} = props.workspace
  const[tabs,setTabs] = useState(props.workspace.alltabs)
  const[heading,setHeading] = useState(props.workspace.tabheading)
  const[inputvalue,setvalue] = useState('')

  const handleValuechange = (e) => {
    setvalue(e.target.value);
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    props.Delete(id)
  }
  const save = () => {
    props.Save(tabs,heading)
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
  const handleBlur = (e) => {
    setHeading(e.target.innerText)
    
  }
// eslint-disable-next-line
  useEffect(() => {
    props.update(id,tabs,heading)
  }, [tabs,heading])

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
        
          <p contentEditable onBlur={handleBlur} style={{cursor:"pointer"}}> {heading}</p>
        
        {isExpanded ? (
          <div className="workspace-tabs">
            <p>All your tabs are here.</p>
            {
              tabs.map((tab) => (
                <div key={tab.id} className="tab">
                <span>{tab.name}</span>
                <button class = "tabdelete" onClick={() => handleDeleteTab(tab.id)}>X</button>
              </div>
              ))
            }
            <input type ="text" value = {inputvalue} onChange={handleValuechange}></input>
            <button onClick={() => {addTab(inputvalue)}}>Add tab</button>
            <p className="click-expand" onClick={toggleExpand}>Click here to minimize</p>
          </div>
        ) : (
          <p className="click-expand" onClick={toggleExpand}>Click here to expand</p>
        )}
        
      </div>
      
    </div>
  );
};

export default Workspace;
