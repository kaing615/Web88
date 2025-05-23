export const parseUserString = (token) => {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('-');

    // Format hợp lệ: web-<id>-<email>-<random>
    if (parts.length < 4 || parts[0] !== 'web') return null;

    const id = parts[1];
    const email = parts[2];
    const random = parts.slice(3).join('-'); // Trường hợp randomString có dấu '-'

    return { id, email, random };
};

export const authorization = (req, res, next) => {
    const token = req.headers['authorization'];
    const userInfo = parseUserString(token);

    if (!userInfo?.id || !userInfo?.email || !userInfo?.random) {
        console.log("🚀 ~ authorization ~ req.user:", req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userInfo = userInfo; // Lưu thông tin người dùng vào req để sử dụng trong các middleware hoặc route sau

    next();
}