var self = {
  //locals
  fs: require('fs'),
  _: require('lodash'),
  uuid: require('node-uuid'),
  dataFilePath: 'Data.json',

  //helper methods

  persist: function(profiles, cb) {
    self.fs.writeFile(self.dataFilePath, JSON.stringify(profiles, null, 2), function (err) {
      if(err) {
        return cb(err);
      }
      cb();
    });
  },

  load: function(cb) {
    self.fs.readFile(self.dataFilePath, 'utf8', function (err, data) {
      if(err) {
        return cb(err);
      }
      cb(null, JSON.parse(data));
    });
  },


  filterIfSpecified: function(filters, profiles) {
    filters = self._.omit(filters || {}, 'sort', 'page', 'size');

    if(!self._.size(filters)) {
      return profiles;
    }

    return self._.filter(profiles, filters);
  },

  sortIfSpecified: function(sort, profiles) {
    var results = profiles;

    if (sort) {
      var sortBy, sortFields, sortDirections;

      sortBy = self._.map(sort.split(','), function (sort) {
        var firstCharIsDirection, sortDirection, sortField;
        firstCharIsDirection = _.includes(['+', '-'], sort.substring(0, 1));

        sortDirection = firstCharIsDirection ? sort.substring(0, 1) : '+';
        sortField = firstCharIsDirection ? sort.substring(1) : sort;

        return {
          field: sortField,
          direction: sortDirection == '+' ? true : false
        };
      });

      sortFields = self._.pluck(sortBy, 'field');
      sortDirections = self._.pluck(sortBy, 'direction');

      results = self._.sortByOrder(profiles, sortFields, sortDirections);
    }

    return results;
  },

  //primary methods

  getAll: function(params, cb) {
    if(!cb) {
      cb = params;
    }
    self.load(function(err, profiles) {
      if(err) {
        return cb(err);
      }
      profiles = self.filterIfSpecified(params, profiles);
      profiles = self.sortIfSpecified(params.sort, profiles);
      cb(null, profiles);
    });
  },

  getById: function(id, cb) {
    self.load(function(err, profiles) {
      if(err) {
        return cb(err);
      }
      cb(null, self._.findWhere(profiles, {id: id}));
    });
  },

  removeById: function(id, cb) {
    self.load(function(err, profiles) {
      if(err) {
        return cb(err);
      }
      profiles = self._.remove(profiles, function (entry) {
        return entry.id == id;
      });
      self.persist(profiles, function(err) {
        if(err) {
          return cb(err);
        }
        cb(null);
      });
    });
  },

  save: function(profile, cb) {
    self.load(function(err, profiles) {
      if(profile.id) {
        var existing = self._.findWhere(profiles, {id: profile.id})
        profile = self._.assign(existing, profile);
      } else {
        profiles.push(self._.assign(profile, { id: self.uuid.v4() }));
      }
      self.persist(profiles, function(err) {
        cb(err, profile);
      });
    });
  }

};

module.exports = self;