/* eslint-disable */

const chai = require('chai');

const expect = chai.expect;
var User = require('../src/User')

describe('User', function () {
            let user;
            beforeEach(function () {
                user = new User();
            });

            it('should be a function', function () {
                expect(User).to.be.a('function');
            });

            it('should be an instance of User', function () {
                expect(user).to.be.an.instanceof(User);
            });

            it('should have a unique id', () => {
                expect(user.id).to.equal(user.id);
            })

            it('should have a list of favoriteRecipes', function () {
                expect(user.favoriteRecipes).to.deep.equal([]);
            });

            it('should have a property of pantry', function () {
                expect(user.pantry).to.deep.equal([]);
            });

            });