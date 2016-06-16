var config = {
  mongoDbUrl : 'mongodb://localhost:27017/moviedb',
  defaultPageLimit : 100,
  pageLimit : 1,
  secret : '536179616e72616a4775686127735365637265744b6579466f724d45524e417070',
  errIncompleteRegisterData : 'INCOMPLETE-DATA',
  errPasswordMismatch : 'PASSWORD-MISMATCH',
  errAuthenticationFailed : 'AUTH-FAIL',
  errUserAlreadyExists : 'USER-ALREADY-EXISTS',
  errUserDoesNotExist : 'USER-DOES-NOT-EXIST'
};

module.exports = config;
