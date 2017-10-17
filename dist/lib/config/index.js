'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
  Normally I wouldn't store a password inside of a config file
  but instead through a enviornment variable as this is very
  insecure. enableLogs will show all database calls in the logs
*/

var DATABASE = exports.DATABASE = {
  uri: 'postgres://naoqwdqydbehon:a191f5f532982d9c5de1313b057526d13dede397aeaa069f52e787f11844a7b4@ec2-54-204-41-80.compute-1.amazonaws.com:5432/d9tmid9m9q9q8i',
  enableLogs: true
};

var SIBI = exports.SIBI = {
  userPaging: 30
};