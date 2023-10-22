const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // 스키마는 설계도 : 내가 받을 데이터들이 어떻게 생겨야한다 설명해주는 것.
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    token: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("User", userSchema);