const oracledb = require("oracledb");

async function getConnection() {
  return await oracledb.getConnection({
    user: "system",
    password: "123456",
    connectString: "localhost/XEPDB1"
  });
}

module.exports = { getConnection };