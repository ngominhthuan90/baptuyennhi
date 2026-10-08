# Gọi số thứ tự 001–999

Mở https://ngominhthuan90.github.io/baptuyennhi/goi-so/

1. Kết nối loa với máy tính, bật âm lượng.
2. Bấm **Thử loa**. Nghe câu “Xin mời số không không một. Vui lòng vào quầy.”
3. Bấm **Gọi số tiếp theo** hoặc phím **N**. Bấm **Gọi lại** hoặc **R** nếu cần.
4. **Màn hình lớn** hiển thị số cho người chờ. Esc thoát và dừng âm thanh.

## Hoạt động

- Chạy trực tiếp trên GitHub Pages, không cần máy chủ riêng, API key, tài khoản hay PIN.
- Âm thanh tiếng Việt dạng MP3 nhúng trong `audio.js`, đọc từng chữ số để phân biệt rõ 001–999. Không phụ thuộc giọng đọc cài trên máy. Cụm từ âm thanh được tổng hợp trước bằng Google Translate TTS; khi sử dụng, trang không gọi dịch vụ TTS bên ngoài.
- Sau khi các tệp trang tải xong, trang đang mở vẫn gọi được khi mất mạng. Không cam kết mở lại trang khi mất mạng.
- Web Audio giải mã MP3 và phát theo hàng đợi. Khóa nút trong khi đang đọc; có thể dừng tiếng.
- Lưu số bằng localStorage. Tải lại trang giữ số; sang ngày mới theo Asia/Ho_Chi_Minh tự bắt đầu lại từ 001. Đến 999 dừng, không tự quay vòng.
- Trong Cài đặt có thể đổi số tiếp theo, số lần đọc và âm lượng; thao tác đặt lại cần xác nhận.
- Đây là bộ đếm cho một máy điều khiển. Các tab cùng trình duyệt nhận cập nhật số; thiết bị/trình duyệt khác không đồng bộ. Không dùng nhiều máy để điều khiển chung một hàng đợi.
- Xóa dữ liệu trình duyệt/ẩn danh có thể làm mất bộ đếm. Cần đặt lại số tiếp theo nếu đổi máy.

## Các tệp

- `index.html`: giao diện và CSS.
- `app.js`: bộ đếm, lưu số, múi giờ, phát âm thanh.
- `audio.js`: bộ MP3 tiếng Việt nhúng base64.

Không cần bước build. Đặt cả thư mục `goi-so` vào thư mục được GitHub Pages xuất bản. Trang chính của kho được giữ nguyên.
