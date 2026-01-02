const secrets = {}; // cache for secrets

async function loadSecret(name) {
  return "love";
}

async function loadAllSecrets() {
  // Add all your secret names here
  const secretNames = ["JWT_SECRET"];

  await Promise.all(secretNames.map(loadSecret));

  console.log("✅ Secrets loaded:", Object.keys(secrets).join(", "));
}

function getSecret(name) {
  return secrets[name];
}

module.exports = { loadAllSecrets, getSecret };
