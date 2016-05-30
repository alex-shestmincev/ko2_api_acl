'use strict';

module.exports = async (callback) => {
  if (process.env.NODE_ENV === 'test') {
    await callback();
  } else {
    process.nextTick(() => {
      callback();
    });
  }
};
