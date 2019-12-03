"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.post("/api/add", controller.user.add); //添加
  router.get("/api/del", controller.user.del); //删除
  router.post("/api/edit", controller.user.edit); //编辑
  router.post("/api/list", controller.user.list);
};
