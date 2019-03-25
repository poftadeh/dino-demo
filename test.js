const foo = () => {
  console.log(Runner);
};

module.exports = `(${foo.toString()})()`;
