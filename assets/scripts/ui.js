'use strict'

const store = require('./store')
const showGamesTemplate = require('./templates/game-listing.handlebars')
const showPlaythroughsTemplate = require('./templates/playthrough-listing.handlebars')

const signUpSuccess = (data) => {
  $('#signUpModal').modal('hide')
  $('.text-field').val('')
}
const signUpFailure = () => {
  $('.sign-up-error-msg').text('Oops! Something went wrong! Please try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('.logged-out').hide()
  $('.logged-in').show()
  $('.greeting').text('hello, ' + data.user.email)
  $('#create-game').show(400)
  $('.instructions').text('Start a new game!')
  $('.error').text('')
  $('.text-field').val('')
  $('.playthrough-content').show()
  $('.new-game-btn').show()
  $('#library').show()
}

const signInFailure = () => {
  $('.sign-in-error-msg').text('Oops! Something went wrong! Please check your username and password and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const changePasswordSuccess = (data) => {
  $('#changePwModal').modal('hide')
  $('.text-field').val('')
}

const changePasswordFailure = () => {
  $('.change-pw-error-msg').text('Oops! Something went wrong! Please try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const signOutSuccess = (data) => {
  $('#create-game').hide()
  $('.logged-in').hide()
  $('.logged-out').show()
  $('#library tbody').empty()
  $('#library').DataTable().destroy()
  $('#library').hide()
  $('.playthrough-body').empty()
  $('.playthrough-content').hide()
}

const signOutFailure = (eror) => {
}

const createGameSuccess = (data) => {
  $('#addGameModal').modal('hide')
  const showGamesHtml = showGamesTemplate({ games: data.games })
  $('#library tbody').empty()
  $('#library').DataTable().destroy()
  $('#library tbody').append(showGamesHtml)
  loadGamesSuccess(data)
  $('.text-field').val('')
}

const createGameFailure = () => {
  $('.add-game-error-msg').text('Oops! Something went wrong! Please check required fields and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const createPlaythroughSuccess = (data) => {
  showPlaythroughsSuccess(data)
}

const createPlaythroughFailure = () => {
  $('.playthrough-error-msg').text('Oops! Something went wrong! Please check required fields and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const showPlaythroughsSuccess = (data) => {
  console.log(data)
  const filteredData = data.playthroughs.filter(function (item) {
    return item.game_id == document.getElementsByClassName('playthrough-content')[0].id
  })
  const showPlaythroughsHtml = showPlaythroughsTemplate({ playthroughs: filteredData })
  if (filteredData.length > 0) {
    console.log('yes playthroughs')
    $('.playthrough-body').empty()
    $('.playthrough-body').html(showPlaythroughsHtml)
  } else {
    $('.playthrough-body').html('<h3>No Playthroughs To Display</h3>')
  }
}

const showPlaythroughsFailure = () => {
}

const loadGamesSuccess = (data) => {
  const showGamesHtml = showGamesTemplate({ games: data.games })
  $('#library tbody').empty()
  $('#library tbody').append(showGamesHtml)
  $('#library').show()
  $('#library').DataTable()
  $('#index-games').hide()
  $('.add-playthrough').hide()
}

const loadGamesFailure = () => {
}

const loadGameSuccess = (data) => {
  console.log(data)
}

const loadGameFailure = () => {
}

const updateGameSuccess = (data) => {
  console.log('updatedata: ' + data)
  $('#updateGameModal').modal('hide')
  loadGamesSuccess(data)
  $('.text-field').val('')
}

const updateGameFailure = () => {
  $('.update-game-error-msg').text('Oops! Something went wrong! Please check required fields and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const updatePlaythroughSuccess = (data) => {
  $('#updatePlaythroughModal').modal('hide')
  showPlaythroughsSuccess(data)
}

const updatePlaythroughFailure = () => {
  $('.update-playthrough-error-msg').text('Oops! Something went wrong! Please check required fields and try again!').fadeIn('fast').delay(3000).fadeOut('slow')
}

const deleteGameSuccess = (data) => {
  $('#deleteGameConfirm').modal('hide')
  const showGamesHtml = showGamesTemplate({ games: data.games })
  $('#library tbody').empty()
  $('#library').DataTable().destroy()
  $('#library tbody').append(showGamesHtml)
  $('.playthrough-body').empty()
}

const deleteGameFailure = () => {
}

const deletePlaythroughSuccess = (data) => {
  showPlaythroughsSuccess(data)
}

const deletePlaythroughFailure = () => {
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createGameSuccess,
  createGameFailure,
  loadGamesSuccess,
  loadGamesFailure,
  updateGameSuccess,
  updateGameFailure,
  loadGameSuccess,
  loadGameFailure,
  deleteGameSuccess,
  deleteGameFailure,
  createPlaythroughSuccess,
  createPlaythroughFailure,
  showPlaythroughsSuccess,
  showPlaythroughsFailure,
  updatePlaythroughSuccess,
  updatePlaythroughFailure,
  deletePlaythroughSuccess,
  deletePlaythroughFailure
}
