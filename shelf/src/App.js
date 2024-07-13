import './App.css';
import React, {useState} from 'react';
import Workspace from './components/Workspace';

function App() {
  const [ids, setId] = useState(1)
  const [workspaces, setWorkspaces] = useState([{id:0, isDeletable: false, tabheading : "Current session" , alltabs:[]}]);
  const addWorkspace = () => {
    setWorkspaces([...workspaces, { id: ids, isDeletable: true, tabheading : "Your workspace " + ids , alltabs:[]}]);
    setId(ids + 1)
  };
  const deleteWorkspace = (id) => {
    setWorkspaces(workspaces.filter(workspace => workspace.id !== id));
  }
  const saveWorkspace = (tabs,heading) => {
    setWorkspaces([...workspaces,{id:ids,isDeletable: true, tabheading: heading, alltabs: tabs }]);
    setId(ids + 1)
  }

  return (
    <div className="App">
      <button className="add-workspace-button" onClick={addWorkspace}>Add workspace</button>
      
      {workspaces.map((workspace) =>  (
        <Workspace key={workspace.id} workspace = {workspace} Delete = {deleteWorkspace} Save = {saveWorkspace}/>
      ))}
    </div>
  );
}

export default App;
