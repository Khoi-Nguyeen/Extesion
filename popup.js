const input = document.getElementById("numInput");
const btn = document.getElementById("calcBtn");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  // Dù nhập gì cũng ra "hello world"
  result.textContent = "Kết quả: meo m be";
});

// (Tuỳ chọn) Bấm Enter trong ô input cũng tính
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    result.textContent = "Kết quả: meo m be";
  }
});
