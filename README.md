# React Kanban Task Manager

Ứng dụng quản lý công việc cá nhân theo phong cách Kanban, được xây dựng để thực hành React Context API và Tailwind CSS.

## Tính năng chính

- **Quản lý Task:** Thêm, xóa, và chuyển đổi trạng thái (Todo -> Doing -> Done).
- **Cảnh báo thông minh:** Tự động đổi màu và hiệu ứng nhấp nháy cho task sắp hết hạn (trước 1 tiếng) và đã quá hạn.
- **Tìm kiếm:** Lọc công việc theo tiêu đề thời gian thực.
- **Lưu trữ:** Dữ liệu được bảo toàn qua LocalStorage (không mất khi F5).
- **Responsive:** Hiển thị tốt trên cả máy tính và điện thoại.

## Công nghệ sử dụng

- **Frontend:** React JS (Vite)
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **State Management:** Context API

## Cài đặt và Chạy thử

1. Clone dự án: `git clone [https://github.com/KayleCorlineTran/SPA.git]`
2. Cài đặt thư viện: `npm install`
3. Chạy môi trường dev: `npm run dev`

## Cấu trúc thư mục

- `src/context`: Quản lý dữ liệu toàn cục.
- `src/components`: Các thành phần giao diện tái sử dụng.
- `src/hook`: Custom hook `useTasks` để truy cập dữ liệu nhanh.

## Sẽ bổ sung

- Bắt lỗi thời gian
- Thêm pop up cảnh báo
- Kéo trực tiếp các task qua các trạng thái mà không cần nhấn từng trạng thái
- Thiết kế lại giao diện đẹp hơn
