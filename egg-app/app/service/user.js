const Service = require("egg").Service;

class UserService extends Service {
  async add(username, password) {
    const user = await this.app.mysql.query(
      "insert into userlist (username,password) values(?,?)",
      [username, password]
    );
    return user;
  }
  async del(id) {
    const user = await this.app.mysql.query("delete from userlist where id=?", [
      id
    ]);
    return user;
  }
  async edit(username, password, id) {
    const user = await this.app.mysql.query(
      "update userlist set username=?,password=? where id=?",
      [username, password, id]
    );
    return user;
  }
  async list() {
    const user = await this.app.mysql.query("select * from userlist");
    return user;
  }
}

module.exports = UserService;
