import './App.css';
import React, {useState} from 'react';
import Workspace from './components/Workspace';

function App() {
  const [workspaces, setWorkspaces] = useState([]);
  const addWorkspace = () => {
    setWorkspaces([...workspaces, { id: workspaces.length }]);
  };

  return (
    <div className="App">
      <button className="add-workspace-button" onClick={addWorkspace}>Add workspace</button>
      <Workspace />
      {workspaces.map((workspace) => (
        <Workspace key={workspace.id} />
      ))}
    </div>
  );
}

export default App;
