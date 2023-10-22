const User = require("../Models/user");
const userController = {};

userController.saveUser = async (userName, sid) => {
  // 유저정보 저장하기 위해 필요한거 2개
  // 이름(io에서 알 수 있음), 토큰(socket.id)
  // 이미 있는 유저인지 확인
  let user = await User.findOne({ name: userName }); // const를 let으로 바꿨다. 왜? const는 재할당을 못하지만 let은 재할당 가능.
  // 없다면 새로 유저정보 만들기
  if (!user) {
    user = new User({
      name: userName,
      token: sid,
      online: true,
    });
  }
  // 이미 있는 유저라면 연결정보 token값만 바꿔주자
  user.token = sid;
  user.online = true;

  await user.save();
  return user;
}; // 저장하는 내용이기에 async를 넣어준다.왜?

// 함수를 만들면 뭐해 써야지 >> io.js로 고고
module.exports = userController;
