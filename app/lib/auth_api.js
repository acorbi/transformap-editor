/*
 * This library handles calls to the authorization RP api for the transformap editor
 *
 * Fri  21 Jul 14:30:00 UTC+1 2017
 * Alex Corbi (alexcorbi@posteo.net), WTFPL

 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

const utils = require('./utils.js');

const endpoint = utils.baseUrl + '/auth/';

/* returns the API's endpoint */
function getAuthEndpoint () {
  return endpoint;
}

function isAlreadyLoggedIn () {
  return utils.getCookie("session") !== undefined &&  utils.getCookie("session") !== "";
}

function getUserIdFromSession() {
  //TODO deserialize
  return utils.getCookie("session");
}

/*
 * Decouples the auth token from the current session
 * Params:
 *  - callback: function to be called upon success.
 * Returns: false if invalid call
*/
function logout (authToken,callback) {
  if (!authToken){
    console.log('logout: no authToken given');
    return false;
  }

  var xhr = utils.createCORSRequest('GET', endpoint);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.error(xhr);
      }
    }
  };
}

module.exports = {
  getAuthEndpoint: getAuthEndpoint,
  isAlreadyLoggedIn: isAlreadyLoggedIn,
  getUserIdFromSession: getUserIdFromSession,
  logout: logout
};
