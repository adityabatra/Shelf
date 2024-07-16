/*global chrome*/
import './App.css';
import React, {useState, useEffect} from 'react';
import Workspace from './components/Workspace';

function App() {
const initializeWorkspaces = async() => {
  const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces'));
  let activeTabs = await new Promise((resolve) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      // activeTabs = tabs.map((tab, index) => ({ id: index, name: tab.url }));
      tabs = tabs.map((tab, index) => ({ id: index, name: tab.url }));
      resolve(tabs);
    })
  })
  
  

  if(savedWorkspaces){
    const filteredWorkspaces = savedWorkspaces.filter(workspace => workspace.id !== 0)
    const initialWorkspace = [{id:0, isDeletable: false, tabheading: "Current session", alltabs:activeTabs}, ...filteredWorkspaces]
    const maxId = filteredWorkspaces.reduce((max,workspace) => (workspace.id > max ? workspace.id : max), 0) + 1
    setId(maxId)
    return initialWorkspace;
  }

   return [{id:0, isDeletable: false, tabheading : "Current session" , alltabs:activeTabs}]

}

  const [ids, setId] = useState(1)
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const initialWorkspaces = await initializeWorkspaces();
      setWorkspaces(initialWorkspaces);
    };
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    const workspacesToSave = workspaces.filter(workspace => workspace.id !== 0)
    localStorage.setItem('workspaces', JSON.stringify(workspacesToSave))
  }, [workspaces])
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
  const updateWorkspace = (id,tabs,heading) => {
    setWorkspaces(workspaces.map(workspace =>
      workspace.id === id ? {...workspace, tabheading: heading, alltabs: tabs} : workspace
      ))
  }

  return (
    <div className="App">
      <button className="add-workspace-button" onClick={addWorkspace}>Add empty workspace</button>
      
      {workspaces.map((workspace) =>  (
        <Workspace key={workspace.id} workspace = {workspace} Delete = {deleteWorkspace} Save = {saveWorkspace} update = {updateWorkspace}/>
      ))}
    </div>
  );
}

export default App;
