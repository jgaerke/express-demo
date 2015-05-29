var self = {
  //locals
  profileRepo: require('../repository/ProfileRepository'),
  profileValidator: require('../validator/ProfileValidator'),
  profileMapper: require('../mapper/ProfileMapper'),
  _: require('lodash'),

  //helper functions
  isProfilePresent: function (profile, res) {
    if (!profile) {
      res.status(422).json({
        code: 422,
        message: 'Unprocessable entity',
        reason: 'The profile you requested does not exist.'
      });
      return false;
    }
    return true;
  },

  isErrorPresent: function (err, res) {
    if (err) {
      res.status(500).send({
        code: 500,
        message: 'Server error',
        reason: 'An unexpected error occurred.'
      });
      return true;
    }
    return false;
  },

  //primary methods
  list: function (req, res) {
    self.profileRepo.getAll(req.query, function (err, profiles) {
      if (self.isErrorPresent(err, res)) return;
      return res.json(profiles);
    });
  },

  get: function (req, res) {
    self.profileRepo.getById(req.params.id, function (err, profile) {
      if (self.isErrorPresent(err, res)) return;
      if(!self.isProfilePresent(profile, res)) return;
      return res.json(profile);
    });
  },

  create: function (req, res) {
    var body = self._.omit(self.profileMapper.map(req.body), 'id');

    if (!self.profileValidator.isProfileValid(body, false, res)) return;

    self.profileRepo.save(body, function (err, profile) {
      if (self.isErrorPresent(err, res)) return;
      res.append('Link', 'http://localhost:3000/api/profile/' + profile.id);
      return res.status(201).json(body);
    });
  },

  update: function (req, res) {
    var body = self.profileMapper.map(req.body);
    if (!self.profileValidator.isProfileValid(body, true, res)) return;
    self.profileRepo.save(body, function (err, saved) {
      if (self.isErrorPresent(err, res)) return;
      res.json(saved);
    });
  },

  patch: function (req, res) {
    var body = self.profileMapper.map(req.body);
    self.profileRepo.save(body, function (err, profile) {
      if (self.isErrorPresent(err, res)) return;
      res.json(profile);
    });
  },

  delete: function (req, res) {
    self.profileRepo.removeById(req.params.id, function (err) {
      if (self.isErrorPresent(err, res)) return;
      res.status(200).send({ status: 200, message: "Successfully removed profile"});
    });
  },

  wire: function (app) {
    //expose 'profiles' collection
    app.get('/api/profiles', self.list);

    //expose 'profile' resource
    app.get('/api/profiles/:id', self.get);

    //expose 'profile' resource creation
    app.post('/api/profiles', self.create);

    //expose 'profile' resource update
    app.put('/api/profiles', self.update);

    //expose 'profile' resource patch
    app.patch('/api/profiles', self.patch);

    //expose 'profile' resource delete
    app.delete('/api/profiles/:id', self.delete);
  }
}


module.exports = self;