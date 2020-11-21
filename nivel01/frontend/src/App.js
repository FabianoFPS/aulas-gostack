import React, { useState, useEffect } from 'react';

import './App.css'
// import background from './assets/background.jpg'

import Header, { constanteExportadaDentroDeChaves } from './components/Header'
import api from './services/api'

function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    }).catch(reject => {
      console.log(reject);
    })
  }, []);

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`) // ERRADO!! Imutabilidade, não alterar valores,
    // const novoProjeto = `Novo Projeto ${Date.now()}`;
    // setProjects([...projects, novoProjeto]);
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Jagunço, Aparecido"
    });

    const project = response.data;
    setProjects([...projects, project]);
  }


  return (
  <>
    <Header title="Home page">
      {/* <img width={350} src={background} alt=""/> */}
      <ul>
        <li>Homepage</li>
        <li>Projects</li>
      </ul>
    </Header>
    <p>{ constanteExportadaDentroDeChaves }</p>
    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
  </>
    );
}

export default App;