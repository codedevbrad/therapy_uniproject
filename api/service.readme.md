/ api / auth / v0 / 

/ api / test / auth / v0 
  / hash
  / testhash


match user by credentials.
find or create user
get user byid


service Auth
  authStrategy
     tests
         uses from user.js ( generateHashedPassword , comparePassword )
         - createHashPassword
         - testPasswords
     token.js
         - generateAccessToken
         - authenticateTokenMiddleware
         - authenticateToken
     user.js
         - generateHashedPassword(bcrypt)
         - comparePasswords(bcrypt)

   service

	user.controller.test

	    uses from authStrategy / token.js ( generateAccessToken ).

	    uses user.controller.db ( 
              getUserByUsername , create, update, remove , findorCreate , 
              matchByCredentials 
          ).

          // test Auth Queries
	    - matchUser
			- matchUserByCredentials()
          - findOrCreateUser
                  - findOrCreateUser()

          // test API Routes
	    - login
          - getUser

          // test Individual Queries.
              - createOne
              - getAll
              - getOne
              - updateOne
              - deleteOne
              - deleteAll

     
      user.controller.api 
	    uses db funcs - ( findorcreateuser , getUserById ).
          uses ( generateAccessToken ).
          - login
	        - findOrCreateUser()
              - generateAccessToken()
          - getLoggedUser
              - getUserById()

      user.controller.db
          - matchUserByCredentials
          - findOrCreateUser