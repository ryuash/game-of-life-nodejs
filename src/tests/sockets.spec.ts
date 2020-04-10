// /* eslint no-undef: "warn" */
// import express from 'express';
// import ioClient from 'socket.io-client';
// import { expect } from 'chai';
// import {
//   app,
//   startServer,
//   users,
//   gameOfLife,
//   io: serverIo
// } from '../index';

// describe('socket test', () => {
//   let socketOne: any;
//   let socketTwo: any;
//   before((done) => {
//     startServer();
//     done();
//   });
//   beforeEach((done) => {
//     socketOne = ioClient('http://localhost:8080',
//       { forceNew: true, autoConnect: false, query: '' });
//     socketTwo = ioClient('http://localhost:8080',
//       { forceNew: true, autoConnect: false, query: '' });
//     done();
//   });
//   afterEach((done) => {
//     if (socketOne && socketOne.connected) {
//       socketOne.disconnect();
//     }
//     if (socketTwo && socketTwo.connected) {
//       socketTwo.disconnect();
//     }
//     done();
//   });
//   after((done) => {
//     console.log('done');
//     app.close();
//     done();
//   });

//   it('client should connect', (done) => {
//     ioServer.on('connection', (socket) => {
//       assert.notEqual(socket, null, 'socket should not be null');
//       done()
//     });
//   });
// });
