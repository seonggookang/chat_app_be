// userController 만들고 가져오기
const userController = require("../Controllers/user.controller");

// io 통신관련 코드는 여기에 모두 넣을거임
module.exports = function (io) {
  // io~~~
  // 소켓 io에서 쓰인느 함수 2개
  // emit, on
  io.on("connection", async (socket) => {
    // 연결된 사람의 정보를 socket에 넣어줌
    console.log("client is connected", socket.id); // socket io에서 부여하는 id(연결할때마다)

    socket.on("login", async (userName, cb) => {
      // 여기서의 로그인: 받은 유저정보를 저장하고 소켓 아이디 정보도 저장
      // 유저정보를 저장하는 함수 >> 통신이랑은 관련없는 내용 >> 파일 따로.

      // 유저정보를 저장
      try {
        const user = await userController.saveUser(userName, socket.id); // saveUser는 async함수라서 await 써줘야함
        console.log("backend", userName); // 내가 클라에서 보낸게 잘도착했나 확인
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    // 연결이 끊긴 알림
    socket.on("disconnected", () => {
      console.log("user is disconnected");
    });
  });
};
