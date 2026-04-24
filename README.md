# game_round1

## 🕹️ Mô tả dự án

Đây là một mini game React: **Click số theo thứ tự**. Người chơi cần click vào các vòng tròn chứa số theo đúng thứ tự tăng dần trong thời gian ngắn nhất. Game có chế độ tự động (auto play) và hiển thị thời gian hoàn thành.

## 🚀 Cách chạy project

1. **Clone hoặc tải về**
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Chạy project:
   ```bash
   npm run dev
   ```
4. Truy cập trình duyệt tại: [http://localhost:5173](http://localhost:5173)

## 🗂️ Cấu trúc thư mục chính

```
haibazo-test/
├── public/                # Static files
├── src/
│   ├── components/        # Circle, GameBoard, ...
│   ├── constants/         # game.js (hằng số)
│   ├── hooks/             # useGameTimer.js
│   ├── utils/             # generateCircles.js
│   ├── App.jsx            # Main app
│   ├── Game.css           # Style chính
│   └── ...
├── package.json
└── README.md
```

## 🧩 Các chức năng nổi bật

- Random vị trí các số, không trùng lặp
- Hiệu ứng bo tròn, màu sắc đẹp, responsive
- Tính thời gian chơi
- Chế độ auto play
- Restart nhanh

## 💻 Công nghệ sử dụng

- React + Vite
- CSS Flexbox, Gradient, Responsive

## 📸 Demo giao diện

![demo](demo.png)

---

> Tác giả: [Tên của bạn]
