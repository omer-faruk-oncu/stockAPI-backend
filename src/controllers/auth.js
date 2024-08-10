"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Auth Controller

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ username });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          /* TOKEN */

          let tokenData = await Token.findOne({ userId: user._id });

          if (!tokenData) {
            const tokenKey = passwordEncrypt(user._id + Date.now());
            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }

          /* TOKEN */

          /* JWT */

          const accessData = user.toJSON(); // Valuable data.
          const accessTime = "120m";
          const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
            expiresIn: accessTime,
          });
          // console.log('accessToken', accessToken)

          const refreshData = { _id: user._id, password: user.password }; // Checkable data.
          const refreshTime = "3d";
          const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
            expiresIn: refreshTime,
          });
          // console.log('refreshToken', refreshToken)

          /* JWT */

          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: {
              access: accessToken,
              refresh: refreshToken,
            },
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username and password.");
    }
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'JWT: Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    bearer: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

            const refreshToken = req.body?.bearer?.refresh

            if (refreshToken) {
    
                const refreshData = await jwt.verify(refreshToken, process.env.REFRESH_KEY)
                // console.log(refreshData)
    
                if (refreshData) {
    
                    const user = await User.findOne({ _id: refreshData._id })
                    
                    if (user && user.password == refreshData.password) {
    
                        if (user.isActive) {
    
                            res.status(200).send({
                                error: false,
                                bearer: {
                                    access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })
                                }
                            })
    
                        } else {
                            res.errorStatusCode = 401
                            throw new Error("This account is not active.")
                        }
                    } else {
                        res.errorStatusCode = 401
                        throw new Error('Wrong id or password.')
                    }
                } else {
                    res.errorStatusCode = 401
                    throw new Error('JWT refresh data is wrong.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('Please enter bearer.refresh')
            }
    
        },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "SimpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

            const auth = req.headers?.authorization; //"Token token"
            const tokenKey = auth ? auth.split(" ") : null; // [ "Token", tokenKey]
    
            if (tokenKey[0] == "Token") {
    
                const result = await Token.deleteOne({ token: tokenKey[1] });
        
                res.send({
                    error: false,
                    message: "Token deleted. Logout was OK.",
                    result,
                });
    
            } else if (tokenKey[0] == "Bearer") {
    
                res.send({
                    error: false,
                    message: 'JWT: No need any process for logout.',
                })
            }
        },
    };
    