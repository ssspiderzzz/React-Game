import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports'
import * as queries from './graphql/queries'
import * as mutations from './graphql/mutations'
// import * as subscriptions from './graphql/subscriptions';

export default function App (props) {
  Amplify.configure(awsconfig)

  // async function createNewData () {
  //   const newTodo = await API.graphql(
  //     graphqlOperation(mutations.createTodo, {
  //       input: {
  //         name: 'Bin',
  //         character: 'Iron Man',
  //         timeRecord: 20.12,
  //         score: 7829
  //       }
  //     })
  //   )
  // }
  // createNewData()

  async function fetchData () {
    const allTodos = await API.graphql(graphqlOperation(queries.listTodos))
    console.log(allTodos)
  }
  fetchData()

  new Phaser.Game(config)

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
