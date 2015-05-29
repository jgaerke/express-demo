describe('ProfileRepository', function () {
  var profileRepository, fs;

  beforeEach(function (done) {
    profileRepository = require('../repository/ProfileRepository');
    fs = {writeFile: sinon.spy(), readFile: sinon.spy()};
    profileRepository.fs = fs;
    done();
  });


  describe('persist', function () {
    it('should persist data', function (done) {
      //given
      var profiles = [{id: '123'}];

      //when
      profileRepository.persist(profiles);

      //then
      expect(fs.writeFile).to.have.been.calledWith('Data.json', sinon.match.string, sinon.match.func);

      done();
    })
  });

  describe('load', function () {
    it('should load data', function (done) {
      //when
      profileRepository.load();

      //then
      expect(fs.readFile).to.have.been.calledWith('Data.json', 'utf8', sinon.match.func);

      done();
    })
  });
})
