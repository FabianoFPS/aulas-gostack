const express = require('express');
// const { isUuid } = require('uuidv4');
const cors = require('cors')
const { v4 , validate} = require('uuid');


const app = express();
app.use(cors());

app.use(express.json())

/**
 * Metodos HTTP:
 * 
 * GET:       Buscar informações do back-end
 * POST:      Criar uma informação no back-end
 * PUT/PATH:  Alterar uma informação no back-end
 * DELETE:    Deletar uma informação no back-end
 */

 /**
  * Tipos de parametros
  * 
  * Query params: filtros e paginação
  * Route params: identificar recursos (atualizar/deletar)
  * Request body: Conteúdo na hora de criar ou editar um recurso (json)
  */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  
  // return next();
  next();
  console.timeEnd(logLabel);
}


function validateProjectId(request, response, next) {
  const { id } = request.params;
  
  if(!validate(id)) {
    return response.status(400).json({ error: "Invalid Project ID." })
  }
  
  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

// app.get('/projects', logRequests, middleware1, middleware2 (request, response) => { // é possivel incluir na rota especifica, quantos quiser
app.get('/projects', (request, response) => {
  const { title } = request.query;
  
  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;
  
  return response.json(results)
})

app.post('/projects', (request, response) => {
  
  const { title, owner} = request.body;
  const project = {id: v4(), title, owner};
  projects.push(project);

  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  
  const { id } = request.params;
  const { title, owner} = request.body;
  
  const projectIndex = projects.findIndex(project =>  project.id == id );

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'});
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project =>  project.id == id );

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
})

app.listen(3333, () => {
  console.info('Back-end started!');
});