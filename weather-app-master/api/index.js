// const IPinfo = require("node-ipinfo");
import IPinfo from "node-ipinfo";

module.exports = async (req, res) => {
  const ip =
    req.connection.remoteAddress == "127.0.0.1"
      ? "8.8.8.8"
      : req.connection.remoteAddress;
  const token = process.env.IP_TOKEN;
  const ipinfo = new IPinfo(token);
  let data;
  await ipinfo
    .lookupIp(ip)
    .then(response => {
      const latitude = response._loc.split(",")[0];
      const longitude = response._loc.split(",")[1];
      data = { latitude, longitude };
    }) // { asn: 'AS15169', name: 'Google LLC', domain: 'google.com', route: '8.8.8.0/24', type: 'hosting' }
    .catch(e => {
      console.log(e);
    });
  res.json({
    ip: data
  });
};
