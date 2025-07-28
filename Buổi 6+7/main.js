let selectedRow = null;

const btnThem = document.getElementById("btnThem");
const form = document.getElementById("sinhvienForm");

btnThem.addEventListener("click", function () {
  const maSV = document.getElementById("maSV").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaySinh = document.getElementById("ngaySinh").value;
  const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked').value;
  const ghiChu = document.getElementById("ghiChu").value;

  if (maSV === "" || hoTen === "" || email === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const regexEmail = /^\S+@\S+\.\S+$/;
  if (!regexEmail.test(email)) {
    alert("Email không hợp lệ!");
    return;
  }

  if (selectedRow === null) {
    themDongMoi(maSV, hoTen, email, ngaySinh, gioiTinh, ghiChu);
    thongBao("Thêm sinh viên thành công!");
  } else {
    capNhatSinhVien(maSV, hoTen, email, ngaySinh, gioiTinh, ghiChu);
    thongBao("Cập nhật sinh viên thành công!");
    btnThem.textContent = "Thêm sinh viên";
  }

  form.reset();
  selectedRow = null;
});

function themDongMoi(maSV, hoTen, email, ngaySinh, gioiTinh, ghiChu) {
  const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  newRow.insertCell(0).innerText = maSV;
  newRow.insertCell(1).innerText = hoTen;
  newRow.insertCell(2).innerText = email;
  newRow.insertCell(3).innerText = ngaySinh;
  newRow.insertCell(4).innerText = gioiTinh;
  newRow.insertCell(5).innerText = ghiChu;
  newRow.insertCell(6).innerHTML = `
    <button onclick="suaDong(this)">Sửa</button>
    <button onclick="xoaDong(this)">Xoá</button>
  `;
}

function thongBao(msg) {
 const tb = document.getElementById("thongBao");
  tb.innerText = msg;
  setTimeout(() => {
    tb.innerText = "";
  }, 3000);
}

function xoaDong(btn) {
  if (confirm("Bạn có chắc chắn muốn xoá?")) {
    btn.parentElement.parentElement.remove();
    thongBao("Xoá thành công!");
    form.reset();
    selectedRow = null;
    btnThem.textContent = "Thêm sinh viên";
  }
}

function suaDong(btn) {
  selectedRow = btn.parentElement.parentElement;
  document.getElementById("maSV").value = selectedRow.cells[0].innerText;
  document.getElementById("hoTen").value = selectedRow.cells[1].innerText;
  document.getElementById("email").value = selectedRow.cells[2].innerText;
  document.getElementById("ngaySinh").value = selectedRow.cells[3].innerText;

  const gioiTinh = selectedRow.cells[4].innerText;
  const radio = document.querySelector(`input[name="gioiTinh"][value="${gioiTinh}"]`);
  if (radio) radio.checked = true;

  document.getElementById("ghiChu").value = selectedRow.cells[5].innerText;

  btnThem.textContent = "Cập nhật";
}

function capNhatSinhVien(maSV, hoTen, email, ngaySinh, gioiTinh, ghiChu) {
  if (selectedRow) {
    selectedRow.cells[0].innerText = maSV;
    selectedRow.cells[1].innerText = hoTen;
    selectedRow.cells[2].innerText = email;
    selectedRow.cells[3].innerText = ngaySinh;
    selectedRow.cells[4].innerText = gioiTinh;
    selectedRow.cells[5].innerText = ghiChu;
    selectedRow = null;
  }
}
