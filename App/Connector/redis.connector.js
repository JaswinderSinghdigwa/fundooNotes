const redis = require("redis");

let client;
class RedisServer {
  constructor () {
    this.connection();
  }

  connection = () => {
    client = redis.createClient(6379, "127.0.0.1");
    client.connect();
    client.on("connection", function () {
      console.log("Connected Redis");
    });
  };

  findData = async (key) => {
    let getdata = await client.get(key + "getRedisById")
    try {
      if (!getdata) {
        return null;
      }
      return JSON.parse(data);
    }catch(error) {
      console.log("failed to get data",error);
    }
  }

  setData = async (key, time, data) => {
    client.setEx(key, time, data);
  };

  delCache = (key) => {
    client.del(key, (err, res) => {
      if (err) {
        return false;
      } else {
        return res;
      }
    });
  };
}
module.exports = new RedisServer();