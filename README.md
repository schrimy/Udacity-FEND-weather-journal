# Weather-Journal App Project

## Table of contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Resources](#resources)
* [Goals](#goals)
* [Challenges](#challenges)
* [Notes-for-reviewer](#notes-for-reviewer)

## Overview

This app is a single page weather journal that uses a web API to grab and
dynamically implement data into the UI. It displays general real time weather
information once a Zipcode has been entered. There are also some extra features
added to the project as an extra test for myself. It should work across all
device sizes utilising differing layouts when required.

## Instructions
* To use the local server, make sure you have node.js installed along with:
express, body-parser, and cors in the terminal.
* Spin up the server and navigate to localhost:3000.
* Enter a valid zipcode into the designated zipcode input box and add relevant
information into the feelings text area.
* Then press the generate button, the relevant data should appear in the 'most
recent entry' box.
* As more entries are added the 'past entries' section will expand. Of which,
each can be clicked to display in the 'Recent entry' text area.

## Resources

[node.js](https://nodejs.org/en/)

[open weather map](https://openweathermap.org/)

[Express js](https://expressjs.com/)

[MDN](https://developer.mozilla.org/en-US/)

[stack overflow](https://stackoverflow.com/)

## Goals
* Create a fully functioning app that utilises a web API.
* Make sure it works and is laid out effectively on major device sizes.
* To add extra functionality in addition to those specified in the project
brief.
* To better understand the use of API's and the use of promises and async
functions.

## Challenges
- Finding the best way to deal with the incorrect zip code error.
- Making sure all fields laid out as I expected on different screen sizes,
especially when most fields can expand dramatically if large amounts of user
input is used.
- Building the extra past entries feature and making sure it performed as
expected.

## Notes-for-reviewer
I have added a few extra features in an attempt to go beyond what was asked for:
* Error checking when nothing is entered into the zip and feelings fields and
generate is clicked.
* Catching errors and alerting the user when an incorrect zip code is entered.
* An additional field that displays all entries that can be clicked on to
display in the UI.
* On opening the page the app checks to see if there are already entries, if
so, the latest is displayed and the past entries field is built.
