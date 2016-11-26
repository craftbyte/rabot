'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})

//*********************************************
// Setup different handlers for messages
//*********************************************

slapp.command('/nmap', (msg, domain) => {
  // `respond` is used for actions or commands and uses the `response_url` provided by the
  // incoming request from Slack
  msg.respond()
  msg.say(`@${msg.body.user_name} wants to see https://dnsdumpster.com/static/map/${domain}.png`)
})

// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
