// DiaBan.js - Class quản lý địa bàn 12 cung
// (c) 2016 doanguyen - Converted to JavaScript

import { diaChi, dichCung, khoangCachCung } from "./tuviCalculations.js";
import { dacTinhSao } from "./Sao.js";

// ============= CUNG ĐỊA BÀN CLASS =============

export class CungDiaBan {
  constructor(cungID) {
    const hanhCung = [
      null,
      "Thủy",
      "Thổ",
      "Mộc",
      "Mộc",
      "Thổ",
      "Hỏa",
      "Hỏa",
      "Thổ",
      "Kim",
      "Kim",
      "Thổ",
      "Thủy",
    ];

    this.cungSo = cungID;
    this.hanhCung = hanhCung[cungID];
    this.cungSao = [];
    this.cungAmDuong = this.cungSo % 2 === 0 ? -1 : 1;
    this.cungTen = diaChi[this.cungSo].tenChi;
    this.cungThan = false;
    this.cungChu = null;
    this.cungDaiHan = null;
    this.cungTieuHan = null;
    this.tuanTrung = false;
    this.trietLo = false;
  }

  themSao(sao) {
    dacTinhSao(this.cungSo, sao);
    this.cungSao.push({ ...sao });
    return this;
  }

  setCungChu(tenCungChu) {
    this.cungChu = tenCungChu;
    return this;
  }

  setDaiHan(daiHan) {
    this.cungDaiHan = daiHan;
    return this;
  }

  setTieuHan(tieuHan) {
    this.cungTieuHan = diaChi[tieuHan + 1].tenChi;
    return this;
  }

  anCungThan() {
    this.cungThan = true;
  }

  anTuan() {
    this.tuanTrung = true;
  }

  anTriet() {
    this.trietLo = true;
  }
}

// ============= ĐỊA BÀN CLASS =============

export class DiaBan {
  constructor(thangSinhAmLich, gioSinhAmLich) {
    this.thangSinhAmLich = thangSinhAmLich;
    this.gioSinhAmLich = gioSinhAmLich;
    this.thapNhiCung = [];

    // Khởi tạo 12 cung (index 0-12, cung 0 không dùng)
    for (let i = 0; i <= 12; i++) {
      this.thapNhiCung.push(new CungDiaBan(i));
    }

    this.nhapCungChu();
    this.nhapCungThan();
  }

  cungChu(thangSinhAmLich, gioSinhAmLich) {
    this.cungThan = dichCung(3, thangSinhAmLich - 1, gioSinhAmLich - 1);
    this.cungMenh = dichCung(3, thangSinhAmLich - 1, -gioSinhAmLich + 1);

    const cungPhuMau = dichCung(this.cungMenh, 1);
    const cungPhucDuc = dichCung(this.cungMenh, 2);
    const cungDienTrach = dichCung(this.cungMenh, 3);
    const cungQuanLoc = dichCung(this.cungMenh, 4);
    this.cungNoboc = dichCung(this.cungMenh, 5);
    const cungThienDi = dichCung(this.cungMenh, 6);
    this.cungTatAch = dichCung(this.cungMenh, 7);
    const cungTaiBach = dichCung(this.cungMenh, 8);
    const cungTuTuc = dichCung(this.cungMenh, 9);
    const cungTheThiep = dichCung(this.cungMenh, 10);
    const cungHuynhDe = dichCung(this.cungMenh, 11);

    return [
      { cungId: 1, tenCung: "Mệnh", cungSoDiaBan: this.cungMenh },
      { cungId: 2, tenCung: "Phụ mẫu", cungSoDiaBan: cungPhuMau },
      { cungId: 3, tenCung: "Phúc đức", cungSoDiaBan: cungPhucDuc },
      { cungId: 4, tenCung: "Điền trạch", cungSoDiaBan: cungDienTrach },
      { cungId: 5, tenCung: "Quan lộc", cungSoDiaBan: cungQuanLoc },
      { cungId: 6, tenCung: "Nô bộc", cungSoDiaBan: this.cungNoboc },
      { cungId: 7, tenCung: "Thiên di", cungSoDiaBan: cungThienDi },
      { cungId: 8, tenCung: "Tật Ách", cungSoDiaBan: this.cungTatAch },
      { cungId: 9, tenCung: "Tài Bạch", cungSoDiaBan: cungTaiBach },
      { cungId: 10, tenCung: "Tử tức", cungSoDiaBan: cungTuTuc },
      { cungId: 11, tenCung: "Phu thê", cungSoDiaBan: cungTheThiep },
      { cungId: 12, tenCung: "Huynh đệ", cungSoDiaBan: cungHuynhDe },
    ];
  }

  nhapCungChu() {
    const cungChuList = this.cungChu(this.thangSinhAmLich, this.gioSinhAmLich);
    for (let cung of cungChuList) {
      this.thapNhiCung[cung.cungSoDiaBan].setCungChu(cung.tenCung);
    }
    return this;
  }

  nhapDaiHan(cucSo, gioiTinh) {
    for (let cung of this.thapNhiCung) {
      if (cung.cungSo > 0) {
        const khoangCach = khoangCachCung(cung.cungSo, this.cungMenh, gioiTinh);
        cung.setDaiHan(cucSo + khoangCach * 10);
      }
    }
    return this;
  }

  nhapTieuHan(khoiTieuHan, gioiTinh, chiNam) {
    const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinh * (chiNam - 1));

    for (let cung of this.thapNhiCung) {
      if (cung.cungSo > 0) {
        const khoangCach = khoangCachCung(cung.cungSo, viTriCungTy1, gioiTinh);
        cung.setTieuHan(khoangCach);
      }
    }
    return this;
  }

  nhapCungThan() {
    this.thapNhiCung[this.cungThan].anCungThan();
  }

  nhapSao(cungSo, ...args) {
    for (let sao of args) {
      // Clone sao object để tránh reference issues
      const saoClone = Object.assign(
        Object.create(Object.getPrototypeOf(sao)),
        sao,
      );
      this.thapNhiCung[cungSo].themSao(saoClone);
    }
    return this;
  }

  nhapTuan(...args) {
    for (let cung of args) {
      this.thapNhiCung[cung].anTuan();
    }
    return this;
  }

  nhapTriet(...args) {
    for (let cung of args) {
      this.thapNhiCung[cung].anTriet();
    }
    return this;
  }
}
