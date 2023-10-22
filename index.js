const { createServer } = require("http"); // 서버 생성
const app = require("./app"); // 만든 앱 가져오기 , app은 db 연결부분
const { Server } = require("socket.io"); // 웹소켓 쉽게 만들어 주는 라이브러리
require("dotenv").config();

const httpServer = createServer(app);
// 웹소켓도 아무나 나한테 들어오라고 허락할 수 없어서 cors 써줘야함
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./utils/io")(io); // 이게 파일쪽으로 전달될거임

// 얘를 틀어놔야함
httpServer.listen(process.env.PORT, () => {
  console.log("server is listening on port", process.env.PORT); // 여기서 듣고 있다.
});
