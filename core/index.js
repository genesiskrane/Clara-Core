const { loadAllSecrets } = require("../secrets");

const init = async () => {
  console.info("Initializing Clara Core");
  await loadAllSecrets();

};

module.exports = { init };