const WHITELIST_DOMAINS = [
    'http://localhost:3000'
]
const MESSAGE = {
    SERVER_ERROR: 'Lỗi server',
    CREATE_SUCCESS: 'Tạo mới thành công',
    UPDATE_SUCCESS: 'Cập nhật thành công',
    DELETE_SUCCESS: 'Xóa thành công',
    PRODUCT_DOES_NOT_EXIST: 'Sản phẩm không tồn tại!',
    REQUIRE_USERNAME: 'Username là bắt buộc',
    REQUIRE_PASSWORD: 'Password là bắt buộc',
    EXISTS_USERNAME: 'Username đã được sử dụng',
    EXISTS_EMAIL: 'Email đã được sử dụng',
    CHARACTER_PASSWORD: 'Mật khẩu phải có ít nhất 6 ký tự',
    CAPITALIZE_PASSWORD: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa',
    EMAIL_INVALID: 'Email không hợp lệ',
    USERNAME_INVALID: 'Người dùng không tồn tại!',
    SIGN_SUCCESS: 'Đăng ký thành công!',
    NOT_CONFIRMED_EMAIL: 'Chưa xác nhận Email!',
    EMAIL_CONFIRMED: 'Email đã được xác nhận thành công!'
}
module.exports = {
    WHITELIST_DOMAINS,
    MESSAGE
}