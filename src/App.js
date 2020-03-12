import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports'
import * as queries from './graphql/queries'
// import * as mutations from './graphql/mutations';
// import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig)
async function fetch () {
  const allTodos = await API.graphql(graphqlOperation(queries.listTodos))
  console.log(allTodos)
}
fetch()

export default function App (props) {
  new Phaser.Game(config)

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
