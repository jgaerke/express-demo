describe('ProfileValidator', function(){
  describe('isProfileValid', function(){
    var profileValidator, expectedResponseBody, input, res, statusSpy, jsonSpy;

    beforeEach(function(done) {
      profileValidator = require('../validator/ProfileValidator');
      expectedResponseBody = {
        code: 400,
        message: 'Bad Request',
        reason: 'The profile you is missing required fields.'
      };
      input = {
        "id": "123",
        "isActive": true,
        "age": 35,
        "first": "Jeremy",
        "last": "Gaerke",
        "email": "jgaerke@gmail.com",
        "phone": "513-535-7594"
      };
      jsonSpy = sinon.spy();
      statusSpy = sinon.spy(function() {
        return {
          json: jsonSpy
        };
      });
      res = { status: statusSpy };
      done();
    });


    describe('should return true', function() {
      it('when all fields are provided', function (done) {
        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.true;

        done();
      });
    });

    describe('should return false, set status to 400, and return proper response body', function() {

      it('when [id] is required but is missing.', function(done){
        //given
        delete input.id;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });

      it('when [isActive] is missing.', function(done){
        //given
        delete input.isActive;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });

      it('when [age] is missing.', function(done){
        //given
        delete input.age;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });

      it('when [first] is missing.', function(done){
        //given
        delete input.first;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });



      it('when [last] is missing.', function(done){
        //given
        delete input.last;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });

      it('when [email] is missing.', function(done){
        //given
        delete input.email;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });

      it('when [phone] is missing.', function(done){
        //given
        delete input.phone;

        //when
        var result = profileValidator.isProfileValid(input, true, res);

        //then
        expect(result).to.be.false;
        expect(statusSpy).to.have.been.calledWith(400);
        expect(jsonSpy).to.have.been.calledWith(expectedResponseBody);

        done();
      });


    });
  })
})
