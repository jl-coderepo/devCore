# Dev Core

===

Where developers come together to collaborate.

#### Motivation

To create an accessible, responsive spa where developers can find each other to collaborate on small projects. Designed with junior developers in mind to build their experience with other like minded individuals.

## Client

---

_Coming soon_

## Server

---

#### Overview

In the current iteration there are primarily three routes which are 'auth', 'users', and 'profile'. Implemented a RESTful api.

#### Getting Started

You will need Node.js to run and need npm (or another package manager) to install the dependencies. You will also need to create your own 'default.json' in './server/config/' with your own specified 'jwtSecret', 'githubClientId', and 'githubSecret'. Also, it's not necessary to generate your own github api for current usage (need to change code a little in order to make right github api calls).

#### auth

**POST /api/auth**, _Public_ : The login process where validation of username(email) and password occurs.

#### user

**POST /api/user**, _Public_ : The signup process where creation of new user occurs.

#### profile

**GET /api/profile/me**, _Private_ : Json web token required, retrives current user's profile.

**POST /api/profile**, _Private_ : Json web token required, creates or updates user's profile.

**GET /api/profile**, _Public_ : Retrieves all profiles currently on database.

**GET /api/profile/user/:user_id**, _Public_ : Grabs a profile via their user id.

**DELETE /api/profile/**, _Private_ : Json web token required, deletes user and profile.

**PUT /api/profile/experience**, _Private_ : Json web token required, adds an experience to profile.

**DELETE api/profile/experience/:edu_id**, _Private_ : Json web token required, deletes specified experience.

**PUT /api/profile/education**, _Private_ : Json web token required, adds an education to profile.

**DELETE api/profile/education/:edu_id**, _Private_ : Json web token required, deletes specified education.

## Database

---

#### Overview

In the current iteration uses MongoDB with two models which are 'User' and 'Profile'.

#### Getting Started

Personally used MongoDB Atlas for my database, but whoever is using this can set their own MongoDB instance. Need to create 'default.json' in './server/config/' directory and define 'MongoURI' to you own specification.

**User Schema** : name, email, password, date

**Profile Schema** : user, company, website, location, status, skills, bio, githubusername, experience, education, social, date

## Built With and Technologies Used

---

Node.js, Express, Axios, MongoDB, bcrypt, mongoose, config, jsonwebtoken, Postman

## Aside

---

With barebones back-end finished moving onto front-end that is primarily going to use React.
