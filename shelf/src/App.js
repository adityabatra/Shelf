import './App.css';
import React, {useState} from 'react';
import Workspace from './components/Workspace';

function App() {
  const [workspaces, setWorkspaces] = useState([{id:0, isDeletable: false}]);
  const addWorkspace = () => {
    setWorkspaces([...workspaces, { id: workspaces.length, isDeletable: true }]);
  };
  const deleteWorkspace = (id) => {
    setWorkspaces(workspaces.filter(workspace => workspace.id !== id));
  }
  const saveWorkspace = () => {
    setWorkspaces([...workspaces,{id:workspaces.length,isDeletable: true}]);
  }

  return (
    <div className="App">
      <button className="add-workspace-button" onClick={addWorkspace}>Add workspace</button>
      
      {workspaces.map((workspace) =>  (
        <Workspace workspace = {workspace} Delete = {deleteWorkspace} Save = {saveWorkspace}/>
      ))}
    </div>
  );
}

export default App;
