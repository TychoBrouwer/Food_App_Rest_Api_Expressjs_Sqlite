const db = require('./users-db');

function validateUser(data) {
  console.log(data);

  // const data = db.query('SELECT * FROM quote LIMIT ?,?', []);

  return { data };
}

function validateCreate(userObj) {
  const messages = [];

  console.log(userObj);

  if (!userObj) {
    messages.push('No object is provided');
  }

  if (!userObj.email) {
    messages.push('Email is empty');
  }

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function createUser(userObj) {
  validateCreate(userObj);
  const { quote, author } = userObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', { quote, author });

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return { message };
}

module.exports = {
  validateUser,
  createUser,
};
