import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    View,FlatList, 
    Text, 
    StyleSheet, 
    StatusBar, 
    TouchableOpacity 
 } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const resouce = 'projects';
  const newProject = { 
    title: `Novo Projeto - ${Date.now()}`,
    owner: 'Fabiano Stoffel'
  }

  useEffect(getProjects, []);

  function getProjects() {
    api.get(resouce)
      .then(handleResponse)
      .catch(reject => console.log(reject));
  }

  function handleResponse(response) {
    console.log(response.data);
    setProjects(response.data);
  }

  async function handleAddProject() {
    const response = await api.post(resouce, newProject);

    setProjects([...projects, response.data])
  }

  return (
    <>
       <StatusBar barStyle="light-content" backgroundColor="#7159c1" ></StatusBar>
       <SafeAreaView style={style.flatList}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={style.projects}>
              {project.title}
            </Text>
          )}
          ></FlatList>
          <TouchableOpacity 
            style={style.button} 
            activeOpacity={0.6}
            onPress={handleAddProject}
          >
            <Text style={style.buttonText}>Adicionar Projeto</Text>
          </TouchableOpacity>
       </SafeAreaView>
      {/*<View style={style.container}>
        <Text style={style.title}>Hello Fabiano</Text>
          {projects.map(project => (
            <Text key={project.id} style={style.projects}>
              {project.title}
            </Text>
          ))}
      </View> */}
    </>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  projects: {
    color: '#FFF',
    fontSize: 20,
  },
  flatList: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})