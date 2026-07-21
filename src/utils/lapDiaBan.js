// lapDiaBan.js - Hàm lập địa bàn chính
// (c) 2016 doanguyen - Converted to JavaScript

import { DiaBan } from "./DiaBan.js";
import {
  dichCung,
  ngayThangNam,
  ngayThangNamCanChi,
  nguHanh,
  thienCan,
  timCoThan,
  timCuc,
  timHoaLinh,
  timLuuTru,
  timPhaToai,
  timThienKhoi,
  timThienMa,
  timThienQuanThienPhuc,
  timTrangSinh,
  timTriet,
  timTuVi,
  diaChi,
} from "./tuviCalculations.js";

import {
  saoAnQuang,
  saoBachHo,
  saoBacSy,
  saoBatToa,
  saoBenh,
  saoBenhPhu,
  saoCoThan,
  saoCuMon,
  saoDaiHao,
  saoDaLa,
  saoDaoHoa,
  saoDauQuan,
  saoDeVuong,
  saoDiaGiai,
  saoDiaKhong,
  saoDiaKiep,
  saoDiaVong,
  saoDieuKhach,
  saoDuong,
  saoDuongPhu,
  saoGiaiThan,
  saoHoaCai,
  saoHoaKhoa,
  saoHoaKy,
  saoHoaLoc,
  saoHoaQuyen,
  saoHoaTinh,
  saoHongLoan,
  saoHuuBat,
  saoHyThan,
  saoKiepSat,
  saoKinhDuong,
  saoLamQuan,
  saoLiemTrinh,
  saoLinhTinh,
  saoLocTon,
  saoLongDuc,
  saoLongTri,
  saoLucSi,
  saoLuuHa,
  saoMo,
  saoMocDuc,
  saoNguyetDuc,
  saoPhaQuan,
  saoPhaToai,
  saoPhiLiem,
  saoPhongCao,
  saoPhucBinh,
  saoPhucDuc,
  saoPhuongCac,
  saoQuanDoi,
  saoQuanPhu2,
  saoQuanPhu3,
  saoQuaTu,
  saoQuocAn,
  saoSuy,
  saoTamThai,
  saoTangMon,
  saoTaPhu,
  saoTauThu,
  saoThai,
  saoThaiAm,
  saoThaiDuong,
  saoThaiPhu,
  saoThaiTue,
  saoThamLang,
  saoThanhLong,
  saoThatSat,
  saoThienCo,
  saoThienDong,
  saoThienDuc,
  saoThienGiai,
  saoThienHinh,
  saoThienHu,
  saoThienHy,
  saoThienKhoc,
  saoThienKhoi,
  saoThienKhong,
  saoThienLa,
  saoThienLuong,
  saoThienMa,
  saoThienPhu,
  saoThienPhuc,
  saoThienQuan,
  saoThienQuy,
  saoThienRieu,
  saoThienSu,
  saoThienTai,
  saoThienTho,
  saoThienThuong,
  saoThienTru,
  saoThienTuong,
  saoThienViet,
  saoThienY,
  saoThieuAm,
  saoThieuDuong,
  saoTieuHao,
  saoTrangSinh,
  saoTrucPhu,
  saoTu,
  saoTuePha,
  saoTuongQuan,
  saoTuPhu,
  saoTuVi,
  saoTuyet,
  saoVanKhuc,
  saoVanTinh,
  saoVanXuong,
  saoVuKhuc,
} from "./Sao.js";

// ============= HÀM LẬP ĐỊA BÀN CHÍNH =============

export function lapDiaBan(
  nn,
  tt,
  nnnn,
  gioSinh,
  gioiTinh,
  duongLich,
  timeZone,
) {
  // Chuyển đổi sang âm lịch nếu cần
  let ngayAm = nn,
    thangAm = tt,
    namAm = nnnn;

  if (duongLich === true) {
    const lunarDate = ngayThangNam(nn, tt, nnnn, duongLich, timeZone);
    ngayAm = lunarDate[0];
    thangAm = lunarDate[1];
    namAm = lunarDate[2];
  }

  // Tính Can Chi
  const [, canNam, chiNam] = ngayThangNamCanChi(
    ngayAm,
    thangAm,
    namAm,
    false,
    timeZone,
  );

  // Khởi tạo địa bàn
  const diaBan = new DiaBan(thangAm, gioSinh);

  const amDuongNamSinh = thienCan[canNam].amDuong;
  const amDuongChiNamSinh = diaChi[chiNam].amDuong;

  // Tìm Cục
  const hanhCuc = timCuc(diaBan.cungMenh, canNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc;

  // Nhập đại hạn
  diaBan.nhapDaiHan(cucSo, gioiTinh * amDuongChiNamSinh);

  // Nhập tiểu hạn
  const khoiHan = dichCung(11, -3 * (chiNam - 1));
  diaBan.nhapTieuHan(khoiHan, gioiTinh, chiNam);

  // ========== AN TỬ VI TINH HỆ ==========

  const viTriTuVi = timTuVi(cucSo, ngayAm);
  diaBan.nhapSao(viTriTuVi, saoTuVi);

  const viTriLiemTrinh = dichCung(viTriTuVi, 4);
  diaBan.nhapSao(viTriLiemTrinh, saoLiemTrinh);

  const viTriThienDong = dichCung(viTriTuVi, 7);
  diaBan.nhapSao(viTriThienDong, saoThienDong);

  const viTriVuKhuc = dichCung(viTriTuVi, 8);
  diaBan.nhapSao(viTriVuKhuc, saoVuKhuc);

  const vitriThaiDuong = dichCung(viTriTuVi, 9);
  diaBan.nhapSao(vitriThaiDuong, saoThaiDuong);

  const viTriThienCo = dichCung(viTriTuVi, 11);
  diaBan.nhapSao(viTriThienCo, saoThienCo);

  // ========== THIÊN PHỦ TINH HỆ ==========

  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);
  diaBan.nhapSao(viTriThienPhu, saoThienPhu);

  const viTriThaiAm = dichCung(viTriThienPhu, 1);
  diaBan.nhapSao(viTriThaiAm, saoThaiAm);

  const viTriThamLang = dichCung(viTriThienPhu, 2);
  diaBan.nhapSao(viTriThamLang, saoThamLang);

  const viTriCuMon = dichCung(viTriThienPhu, 3);
  diaBan.nhapSao(viTriCuMon, saoCuMon);

  const viTriThienTuong = dichCung(viTriThienPhu, 4);
  diaBan.nhapSao(viTriThienTuong, saoThienTuong);

  const viTriThienLuong = dichCung(viTriThienPhu, 5);
  diaBan.nhapSao(viTriThienLuong, saoThienLuong);

  const viTriThatSat = dichCung(viTriThienPhu, 6);
  diaBan.nhapSao(viTriThatSat, saoThatSat);

  const viTriPhaQuan = dichCung(viTriThienPhu, 10);
  diaBan.nhapSao(viTriPhaQuan, saoPhaQuan);

  // ========== VÒNG LỘC TỒN ==========

  const viTriLocTon = thienCan[canNam].vitriDiaBan;
  diaBan.nhapSao(viTriLocTon, saoLocTon, saoBacSy);

  const amDuongNamNu = gioiTinh * amDuongNamSinh;

  const viTriLucSi = dichCung(viTriLocTon, 1 * amDuongNamNu);
  diaBan.nhapSao(viTriLucSi, saoLucSi);

  const viTriThanhLong = dichCung(viTriLocTon, 2 * amDuongNamNu);
  diaBan.nhapSao(viTriThanhLong, saoThanhLong);

  const viTriTieuHao = dichCung(viTriLocTon, 3 * amDuongNamNu);
  diaBan.nhapSao(viTriTieuHao, saoTieuHao);

  const viTriTuongQuan = dichCung(viTriLocTon, 4 * amDuongNamNu);
  diaBan.nhapSao(viTriTuongQuan, saoTuongQuan);

  const viTriTauThu = dichCung(viTriLocTon, 5 * amDuongNamNu);
  diaBan.nhapSao(viTriTauThu, saoTauThu);

  const viTriPhiLiem = dichCung(viTriLocTon, 6 * amDuongNamNu);
  diaBan.nhapSao(viTriPhiLiem, saoPhiLiem);

  const viTriHyThan = dichCung(viTriLocTon, 7 * amDuongNamNu);
  diaBan.nhapSao(viTriHyThan, saoHyThan);

  const viTriBenhPhu = dichCung(viTriLocTon, 8 * amDuongNamNu);
  diaBan.nhapSao(viTriBenhPhu, saoBenhPhu);

  const viTriDaiHao = dichCung(viTriLocTon, 9 * amDuongNamNu);
  diaBan.nhapSao(viTriDaiHao, saoDaiHao);

  const viTriPhucBinh = dichCung(viTriLocTon, 10 * amDuongNamNu);
  diaBan.nhapSao(viTriPhucBinh, saoPhucBinh);

  const viTriQuanPhu2 = dichCung(viTriLocTon, 11 * amDuongNamNu);
  diaBan.nhapSao(viTriQuanPhu2, saoQuanPhu2);

  // ========== VÒNG ĐỊA CHI - THÁI TUẾ ==========

  const viTriThaiTue = chiNam;
  diaBan.nhapSao(viTriThaiTue, saoThaiTue);

  const viTriThieuDuong = dichCung(viTriThaiTue, 1);
  diaBan.nhapSao(viTriThieuDuong, saoThieuDuong, saoThienKhong);

  const viTriTangMon = dichCung(viTriThaiTue, 2);
  diaBan.nhapSao(viTriTangMon, saoTangMon);

  const viTriThieuAm = dichCung(viTriThaiTue, 3);
  diaBan.nhapSao(viTriThieuAm, saoThieuAm);

  const viTriQuanPhu3 = dichCung(viTriThaiTue, 4);
  diaBan.nhapSao(viTriQuanPhu3, saoQuanPhu3);

  const viTriTuPhu = dichCung(viTriThaiTue, 5);
  diaBan.nhapSao(viTriTuPhu, saoTuPhu, saoNguyetDuc);

  const viTriTuePha = dichCung(viTriThaiTue, 6);
  diaBan.nhapSao(viTriTuePha, saoTuePha);

  const viTriLongDuc = dichCung(viTriThaiTue, 7);
  diaBan.nhapSao(viTriLongDuc, saoLongDuc);

  const viTriBachHo = dichCung(viTriThaiTue, 8);
  diaBan.nhapSao(viTriBachHo, saoBachHo);

  const viTriPhucDuc = dichCung(viTriThaiTue, 9);
  diaBan.nhapSao(viTriPhucDuc, saoPhucDuc, saoThienDuc);

  const viTriDieuKhach = dichCung(viTriThaiTue, 10);
  diaBan.nhapSao(viTriDieuKhach, saoDieuKhach);

  const viTriTrucPhu = dichCung(viTriThaiTue, 11);
  diaBan.nhapSao(viTriTrucPhu, saoTrucPhu);

  // ========== VÒNG NGŨ HÀNH CỤC TRÀNG SINH ==========

  const viTriTrangSinh = timTrangSinh(cucSo);
  diaBan.nhapSao(viTriTrangSinh, saoTrangSinh);

  const viTriMocDuc = dichCung(viTriTrangSinh, amDuongNamNu * 1);
  diaBan.nhapSao(viTriMocDuc, saoMocDuc);

  const viTriQuanDoi = dichCung(viTriTrangSinh, amDuongNamNu * 2);
  diaBan.nhapSao(viTriQuanDoi, saoQuanDoi);

  const viTriLamQuan = dichCung(viTriTrangSinh, amDuongNamNu * 3);
  diaBan.nhapSao(viTriLamQuan, saoLamQuan);

  const viTriDeVuong = dichCung(viTriTrangSinh, amDuongNamNu * 4);
  diaBan.nhapSao(viTriDeVuong, saoDeVuong);

  const viTriSuy = dichCung(viTriTrangSinh, amDuongNamNu * 5);
  diaBan.nhapSao(viTriSuy, saoSuy);

  const viTriBenh = dichCung(viTriTrangSinh, amDuongNamNu * 6);
  diaBan.nhapSao(viTriBenh, saoBenh);

  const viTriTu = dichCung(viTriTrangSinh, amDuongNamNu * 7);
  diaBan.nhapSao(viTriTu, saoTu);

  const viTriMo = dichCung(viTriTrangSinh, amDuongNamNu * 8);
  diaBan.nhapSao(viTriMo, saoMo);

  const viTriTuyet = dichCung(viTriTrangSinh, amDuongNamNu * 9);
  diaBan.nhapSao(viTriTuyet, saoTuyet);

  const viTriThai = dichCung(viTriTrangSinh, amDuongNamNu * -2);
  diaBan.nhapSao(viTriThai, saoThai);

  const viTriDuong = dichCung(viTriTrangSinh, amDuongNamNu * -1);
  diaBan.nhapSao(viTriDuong, saoDuong);

  // ========== AN SAO ĐÔI ==========

  const viTriDaLa = dichCung(viTriLocTon, -1);
  diaBan.nhapSao(viTriDaLa, saoDaLa);

  const viTriKinhDuong = dichCung(viTriLocTon, 1);
  diaBan.nhapSao(viTriKinhDuong, saoKinhDuong);

  const viTriDiaKiep = dichCung(11, gioSinh);
  diaBan.nhapSao(viTriDiaKiep, saoDiaKiep);

  const viTriDiaKhong = dichCung(12, 12 - viTriDiaKiep);
  diaBan.nhapSao(viTriDiaKhong, saoDiaKhong);

  const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(
    chiNam,
    gioSinh,
    gioiTinh,
    amDuongNamSinh,
  );
  diaBan.nhapSao(viTriHoaTinh, saoHoaTinh);
  diaBan.nhapSao(viTriLinhTinh, saoLinhTinh);

  const viTriLongTri = dichCung(5, chiNam - 1);
  diaBan.nhapSao(viTriLongTri, saoLongTri);

  const viTriPhuongCac = dichCung(2, 2 - viTriLongTri);
  diaBan.nhapSao(viTriPhuongCac, saoPhuongCac, saoGiaiThan);

  const viTriTaPhu = dichCung(5, thangAm - 1);
  diaBan.nhapSao(viTriTaPhu, saoTaPhu);

  const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);
  diaBan.nhapSao(viTriHuuBat, saoHuuBat);

  const viTriVanKhuc = dichCung(5, gioSinh - 1);
  diaBan.nhapSao(viTriVanKhuc, saoVanKhuc);

  const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
  diaBan.nhapSao(viTriVanXuong, saoVanXuong);

  const viTriTamThai = dichCung(5, thangAm + ngayAm - 2);
  diaBan.nhapSao(viTriTamThai, saoTamThai);

  const viTriBatToa = dichCung(2, 2 - viTriTamThai);
  diaBan.nhapSao(viTriBatToa, saoBatToa);

  const viTriAnQuang = dichCung(viTriVanXuong, ngayAm - 2);
  diaBan.nhapSao(viTriAnQuang, saoAnQuang);

  const viTriThienQuy = dichCung(2, 2 - viTriAnQuang);
  diaBan.nhapSao(viTriThienQuy, saoThienQuy);

  const viTriThienKhoi = timThienKhoi(canNam);
  diaBan.nhapSao(viTriThienKhoi, saoThienKhoi);

  const viTriThienViet = dichCung(5, 5 - viTriThienKhoi);
  diaBan.nhapSao(viTriThienViet, saoThienViet);

  const viTriThienHu = dichCung(7, chiNam - 1);
  diaBan.nhapSao(viTriThienHu, saoThienHu);

  const viTriThienKhoc = dichCung(7, -chiNam + 1);
  diaBan.nhapSao(viTriThienKhoc, saoThienKhoc);

  const viTriThienTai = dichCung(diaBan.cungMenh, chiNam - 1);
  diaBan.nhapSao(viTriThienTai, saoThienTai);

  const viTriThienTho = dichCung(diaBan.cungThan, chiNam - 1);
  diaBan.nhapSao(viTriThienTho, saoThienTho);

  const viTriHongLoan = dichCung(4, -chiNam + 1);
  diaBan.nhapSao(viTriHongLoan, saoHongLoan);

  const viTriThienHy = dichCung(viTriHongLoan, 6);
  diaBan.nhapSao(viTriThienHy, saoThienHy);

  // ========== THIÊN QUAN - THIÊN PHÚC ==========

  const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canNam);
  diaBan.nhapSao(viTriThienQuan, saoThienQuan);
  diaBan.nhapSao(viTriThienPhuc, saoThienPhuc);

  const viTriThienHinh = dichCung(10, thangAm - 1);
  diaBan.nhapSao(viTriThienHinh, saoThienHinh);

  const viTriThienRieu = dichCung(viTriThienHinh, 4);
  diaBan.nhapSao(viTriThienRieu, saoThienRieu, saoThienY);

  const viTriCoThan = timCoThan(chiNam);
  diaBan.nhapSao(viTriCoThan, saoCoThan);

  const viTriQuaTu = dichCung(viTriCoThan, -4);
  diaBan.nhapSao(viTriQuaTu, saoQuaTu);

  const viTriVanTinh = dichCung(viTriKinhDuong, 2);
  diaBan.nhapSao(viTriVanTinh, saoVanTinh);

  const viTriDuongPhu = dichCung(viTriVanTinh, 2);
  diaBan.nhapSao(viTriDuongPhu, saoDuongPhu);

  const viTriQuocAn = dichCung(viTriDuongPhu, 3);
  diaBan.nhapSao(viTriQuocAn, saoQuocAn);

  // ========== THAI PHỤ - PHONG CÁO ==========

  const viTriThaiPhu = dichCung(viTriVanKhuc, 2);
  diaBan.nhapSao(viTriThaiPhu, saoThaiPhu);

  const viTriPhongCao = dichCung(viTriVanKhuc, -2);
  diaBan.nhapSao(viTriPhongCao, saoPhongCao);

  // ========== THIÊN GIẢI - ĐỊA GIẢI ==========

  const viTriThienGiai = dichCung(9, thangAm - 1);
  diaBan.nhapSao(viTriThienGiai, saoThienGiai);

  const viTriDiaGiai = dichCung(viTriTaPhu, 3);
  diaBan.nhapSao(viTriDiaGiai, saoDiaGiai);

  // ========== THIÊN LA - ĐỊA VÕNG ==========

  const viTriThienLa = 5;
  diaBan.nhapSao(viTriThienLa, saoThienLa);

  const viTriDiaVong = 11;
  diaBan.nhapSao(viTriDiaVong, saoDiaVong);

  const viTriThienThuong = diaBan.cungNoboc;
  diaBan.nhapSao(viTriThienThuong, saoThienThuong);

  const viTriThienSu = diaBan.cungTatAch;
  diaBan.nhapSao(viTriThienSu, saoThienSu);

  // ========== VÒNG THIÊN MÃ ==========

  const viTriThienMa = timThienMa(chiNam);
  diaBan.nhapSao(viTriThienMa, saoThienMa);

  const viTriHoaCai = dichCung(viTriThienMa, 2);
  diaBan.nhapSao(viTriHoaCai, saoHoaCai);

  const viTriKiepSat = dichCung(viTriThienMa, 3);
  diaBan.nhapSao(viTriKiepSat, saoKiepSat);

  const viTriDaoHoa = dichCung(viTriKiepSat, 4);
  diaBan.nhapSao(viTriDaoHoa, saoDaoHoa);

  // ========== PHÁ TOÁI ==========

  const viTriPhaToai = timPhaToai(chiNam);
  diaBan.nhapSao(viTriPhaToai, saoPhaToai);

  // ========== ĐẨU QUÂN ==========

  const viTriDauQuan = dichCung(chiNam, -thangAm + gioSinh);
  diaBan.nhapSao(viTriDauQuan, saoDauQuan);

  // ========== TỨ HÓA ==========

  let viTriHoaLoc, viTriHoaQuyen, viTriHoaKhoa, viTriHoaKy;

  switch (canNam) {
    case 1:
      viTriHoaLoc = viTriLiemTrinh;
      viTriHoaQuyen = viTriPhaQuan;
      viTriHoaKhoa = viTriVuKhuc;
      viTriHoaKy = vitriThaiDuong;
      break;
    case 2:
      viTriHoaLoc = viTriThienCo;
      viTriHoaQuyen = viTriThienLuong;
      viTriHoaKhoa = viTriTuVi;
      viTriHoaKy = viTriThaiAm;
      break;
    case 3:
      viTriHoaLoc = viTriThienDong;
      viTriHoaQuyen = viTriThienCo;
      viTriHoaKhoa = viTriVanXuong;
      viTriHoaKy = viTriLiemTrinh;
      break;
    case 4:
      viTriHoaLoc = viTriThaiAm;
      viTriHoaQuyen = viTriThienDong;
      viTriHoaKhoa = viTriThienCo;
      viTriHoaKy = viTriCuMon;
      break;
    case 5:
      viTriHoaLoc = viTriThamLang;
      viTriHoaQuyen = viTriThaiAm;
      viTriHoaKhoa = viTriHuuBat;
      viTriHoaKy = viTriThienCo;
      break;
    case 6:
      viTriHoaLoc = viTriVuKhuc;
      viTriHoaQuyen = viTriThamLang;
      viTriHoaKhoa = viTriThienLuong;
      viTriHoaKy = viTriVanKhuc;
      break;
    case 7:
      viTriHoaLoc = vitriThaiDuong;
      viTriHoaQuyen = viTriVuKhuc;
      viTriHoaKhoa = viTriThienDong;
      viTriHoaKy = viTriThaiAm;
      break;
    case 8:
      viTriHoaLoc = viTriCuMon;
      viTriHoaQuyen = vitriThaiDuong;
      viTriHoaKhoa = viTriVanKhuc;
      viTriHoaKy = viTriVanXuong;
      break;
    case 9:
      viTriHoaLoc = viTriThienLuong;
      viTriHoaQuyen = viTriTuVi;
      viTriHoaKhoa = viTriThienPhu;
      viTriHoaKy = viTriVuKhuc;
      break;
    case 10:
      viTriHoaLoc = viTriPhaQuan;
      viTriHoaQuyen = viTriCuMon;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThamLang;
      break;
  }

  diaBan.nhapSao(viTriHoaLoc, saoHoaLoc);
  diaBan.nhapSao(viTriHoaQuyen, saoHoaQuyen);
  diaBan.nhapSao(viTriHoaKhoa, saoHoaKhoa);
  diaBan.nhapSao(viTriHoaKy, saoHoaKy);

  // ========== LƯU HÀ - THIÊN TRÙ ==========

  const [viTriLuuHa, viTriThienTru] = timLuuTru(canNam);
  diaBan.nhapSao(viTriLuuHa, saoLuuHa);
  diaBan.nhapSao(viTriThienTru, saoThienTru);

  // ========== TUẦN, TRIỆT ==========

  const ketThucTuan = dichCung(chiNam, 10 - canNam);
  const viTriTuan1 = dichCung(ketThucTuan, 1);
  const viTriTuan2 = dichCung(viTriTuan1, 1);
  diaBan.nhapTuan(viTriTuan1, viTriTuan2);

  const [viTriTriet1, viTriTriet2] = timTriet(canNam);
  diaBan.nhapTriet(viTriTriet1, viTriTriet2);

  return diaBan;
}
