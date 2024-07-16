const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {
    // REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Tạo một user mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword, // Sử dụng hashedPassword thay vì hash
            });

            // Lưu vào cơ sở dữ liệu
            const user = await newUser.save();

            res.status(200).json(user);
        } catch (err) {
            console.error(err); // In lỗi ra console để kiểm tra và debug
            res.status(500).json(err);
        }
    },
    // LOGIN
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Tìm user trong cơ sở dữ liệu
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ error: "Wrong username or password" });
            }

            // Kiểm tra mật khẩu
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(404).json({ error: "Wrong username or password" });
            }

            // Nếu đăng nhập thành công, trả về thông tin user
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

module.exports = authController;
