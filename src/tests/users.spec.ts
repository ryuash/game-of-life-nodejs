/* eslint no-undef: "warn" */
import { expect } from 'chai';
import * as R from 'ramda';
import Users from '../services/users';

let users: any = null;

describe('users test', () => {
  beforeEach(() => {
    users = new Users();
  });

  describe('setUser test', () => {
    it('should correctly set the user', () => {
      const socketId = '1';
      let newUser = users.setUser(socketId);

      expect(newUser).to.have.property('colorR');

      let temp = R.clone(newUser);

      newUser = users.setUser(socketId);
      expect(newUser).to.eql(temp);

      users.users[socketId].isConnected = false;

      temp = R.clone(newUser);
      newUser = users.setUser(socketId);
      expect(newUser.isConnected).to.eql(true);
      expect(temp.isConnected).to.eql(false);
      delete temp.isConnected;
      delete newUser.isConnected;
      expect(newUser).to.eql(temp);
    });
  });

  describe('getColor test', () => {
    it('should return a different color each time', () => {
      const userOne = '1';
      const userTwo = '2';
      const setUserOne = users.setUser(userOne);
      const setUserTwo = users.setUser(userTwo);
      expect(setUserOne.colorR).to.not.eql(setUserTwo.colorR);
      expect(setUserOne.colorB).to.not.eql(setUserTwo.colorB);
      expect(setUserOne.colorG).to.not.eql(setUserTwo.colorG);
    });
  });

  describe('removeUser test', () => {
    it('should successfully delete a user', () => {
      const userOne = '1';
      users.setUser(userOne);
      expect(users.users).to.have.property(userOne);
      users.removeUser(userOne);
      expect(users.users).to.not.have.property(userOne);
    });
  });
});
