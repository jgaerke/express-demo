describe('ProfileMapper', function(){
  describe('map', function(){
    it('should excluded unwanted fields', function(done){

      //given
      var profileMapper, input, output;
      profileMapper = require('../mapper/ProfileMapper');
      input = {
        "foo": "bar",
        "bar": "foo",
        "id": "123",
        "isActive": true,
        "first": "Jeremy",
        "last": "Gaerke",
        "email": "jgaerke@gmail.com",
        "phone": "513-535-7594"
      };

      //when
      output = profileMapper.map(input);

      //then
      expect(output).to.eql({
        "id": "123",
        "isActive": true,
        "first": "Jeremy",
        "last": "Gaerke",
        "email": "jgaerke@gmail.com",
        "phone": "513-535-7594"
      });

      done();
    })
  })
})
