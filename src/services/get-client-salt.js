const { getSalt, setSalt } = require('../utils/salt-gen');

const sanitizeInput = require('../utils/sanitize-input');

function set(data) {
  const { email } = sanitizeInput(data);

  return setSalt(true, email);
}

function get(email) {
  return getSalt(true, email);
}

module.exports = {
  set,
  get,
};
