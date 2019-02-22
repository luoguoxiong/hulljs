const Base = require('./base.js');

module.exports = class extends Base {
  async loginByWeixinAction() {
    const code = this.post('code');
    const fullUserInfo = this.post('userInfo');
    const clientIp = this.ctx.ip;

    // 解释用户数据
    const userInfo = await this.service('weixin', 'api').login(code, fullUserInfo);
    if (think.isEmpty(userInfo)) {
      return this.fail('登录失败');
    }

    // 根据openid查找用户是否已经注册
    let userId = await this.model('user').where({ weixin_openid: userInfo.openId }).getField('id', true);
    if (think.isEmpty(userId)) {
      // 注册
      userId = await this.model('user').add({
        username: '微信用户' + think.uuid(6),
        password: '',
        register_time: parseInt(new Date().getTime() / 1000),
        register_ip: clientIp,
        mobile: '',
        weixin_openid: userInfo.openId,
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 1, // 性别 0：未知、1：男、2：女
        nickname: userInfo.nickName
      });
    }

    // 查询用户信息
    const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();

    // // 更新登录信息
    // userId = await this.model('user').where({ id: userId }).update({
    //   last_login_time: parseInt(new Date().getTime() / 1000),
    //   last_login_ip: clientIp
    // });

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create({ user_id: userId });

    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail('登录失败');
    }

    return this.success({ token: sessionKey, userInfo: newUserInfo });
  }

  // 通过手机号码登录
  async loginByMobileAction () {
    const mobile = this.post('mobile');
    const password = this.post('password');
    const clientIp = this.ctx.ip;
    const phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
    let userId = await this.model('user').where({ mobile: mobile,password:password }).getField('id', true);
    if(mobile === ''){
      this.fail('手机号不能为空！')
      return
    }
    if(!phoneReg.test(mobile)){
      this.fail('手机号码错误！')
      return
    }
    if(password === ''){
      this.fail('密码不能为空！')
      return
    }
    if (!think.isEmpty(userId)) {
      const TokenSerivce = this.service('token', 'api');
      const sessionKey = await TokenSerivce.create({ user_id: userId });
      await this.model('user').where({ id: userId }).update({
        last_login_time: parseInt(new Date().getTime() / 1000),
        last_login_ip: clientIp
      });
      this.success({mobile,password,sessionKey})
    }else{
      this.fail('密码不正确！');
    }
  }
  async logoutAction() {
    return this.success();
  }
};
