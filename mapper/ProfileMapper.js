var self = {
  //locals
  _: require('lodash'),

  //primary methods
  map: function(profile) {
    return self._.pick(profile, 'id', 'isActive', 'age', 'first', 'last', 'email', 'phone');
  }
};

module.exports = self;