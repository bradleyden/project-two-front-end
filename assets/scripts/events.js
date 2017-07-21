'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onShowGames = function (event) {
  event.preventDefault()
  api.getAllGames()
     .then(ui.loadGamesSuccess)
     .catch(ui.loadGamesFailure)
  $(document).on('submit', '.delete-game', onDeleteGame)
}

const onShowGame = function (event) {
  event.preventDefault()
  api.getGame()
     .then(ui.loadGameSuccess)
     .catch(ui.loadGameFailure)
}

const onCreateGame = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.createGame(data)
     .then(ui.createGameSuccess)
     .catch(ui.createGameFailure)
}

const onUpdateGame = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.updateGame(data)
     .then(ui.updateGameSuccess)
     .catch(ui.updateGameFailure)
}

const onDeleteGame = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.deleteGame(data)
     .then(ui.deleteGameSuccess)
     .catch(ui.deleteGameFailure)
     .then(api.getAllGames)
        .then(ui.loadGamesSuccess)
        .catch(ui.loadGamesFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-pw').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#index-games').on('submit', onShowGames)
  $('#show-game').on('submit', onShowGame)
  $('#create-game').on('submit', onCreateGame)
  $('#update-game').on('submit', onUpdateGame)
}

module.exports = {
  addHandlers
}