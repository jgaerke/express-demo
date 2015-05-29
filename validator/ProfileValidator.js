var self = {

  //primary methods
  isProfileValid: function (profile, idRequired, res) {
    if ((idRequired && !profile.id) || !profile.isActive || !profile.age || !profile.first || !profile.last || !profile.email || !profile.phone) {
      res.status(400).json({
        code: 400,
        message: 'Bad Request',
        reason: 'The profile you is missing required fields.'
      });
      return false;
    }
    return true;
  }
};

module.exports = self;