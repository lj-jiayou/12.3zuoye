"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async add() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: -1,
        msg: "缺少参数"
      };
    } else {
      const addHn = await service.user.add(username, password);
      console.log(addHn, "123");
      if (addHn.affectedRows > 0) {
        try {
          ctx.body = {
            code: 1,
            msg: "添加成功"
          };
        } catch (e) {
          ctx.body = {
            code: 2,
            msg: e
          };
        }
      } else {
        ctx.body = {
          code: 3,
          msg: "输入有误"
        };
      }
    }
  }
  async del() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    if (!id) {
      ctx.body = {
        code: -1,
        msg: "缺少参数"
      };
    } else {
      const delHn = await service.user.del(id);
      if (delHn.affectedRows > 0) {
        try {
          ctx.body = {
            code: 1,
            msg: "删除成功"
          };
        } catch (e) {
          ctx.body = {
            code: 2,
            msg: e
          };
        }
      } else {
        ctx.body = {
          code: 3,
          msg: "输入有误"
        };
      }
    }
  }
  async edit() {
    const { ctx, service } = this;
    const { username, password, editId } = ctx.request.body;
    if (!username || !password || !editId) {
      ctx.body = {
        code: -1,
        msg: "缺少参数"
      };
    } else {
      const editHn = await service.user.edit(username, password, editId);
      if (editHn.affectedRows > 0) {
        try {
          ctx.body = {
            code: 1,
            msg: "编辑成功"
          };
        } catch (e) {
          ctx.body = {
            code: 2,
            msg: e
          };
        }
      } else {
        ctx.body = {
          code: 3,
          msg: "输入有误"
        };
      }
    }
  }
  async list() {
    const { ctx, service } = this;
    const listHn = await service.user.list();
    if (listHn.length > 0) {
      ctx.body = {
        code: 1,
        listHn,
        msg: "查找成功"
      };
    }
  }
}

module.exports = HomeController;
