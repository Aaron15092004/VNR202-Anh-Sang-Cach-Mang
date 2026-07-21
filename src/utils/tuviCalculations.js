export const thienCan = [
  {
    id: 0,
    chuCaiDau: null,
    tenCan: null,
    nguHanh: null,
    nguHanhID: null,
    vitriDiaBan: null,
    amDuong: null,
  },
  {
    id: 1,
    chuCaiDau: "G",
    tenCan: "Giáp",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 3,
    amDuong: 1,
  },
  {
    id: 2,
    chuCaiDau: "A",
    tenCan: "Ất",
    nguHanh: "M",
    nguHanhID: 2,
    vitriDiaBan: 4,
    amDuong: -1,
  },
  {
    id: 3,
    chuCaiDau: "B",
    tenCan: "Bính",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 4,
    chuCaiDau: "D",
    tenCan: "Đinh",
    nguHanh: "H",
    nguHanhID: 4,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 5,
    chuCaiDau: "M",
    tenCan: "Mậu",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 6,
    amDuong: 1,
  },
  {
    id: 6,
    chuCaiDau: "K",
    tenCan: "Kỷ",
    nguHanh: "O",
    nguHanhID: 5,
    vitriDiaBan: 7,
    amDuong: -1,
  },
  {
    id: 7,
    chuCaiDau: "C",
    tenCan: "Canh",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 9,
    amDuong: 1,
  },
  {
    id: 8,
    chuCaiDau: "T",
    tenCan: "Tân",
    nguHanh: "K",
    nguHanhID: 1,
    vitriDiaBan: 10,
    amDuong: -1,
  },
  {
    id: 9,
    chuCaiDau: "N",
    tenCan: "Nhâm",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 12,
    amDuong: 1,
  },
  {
    id: 10,
    chuCaiDau: "Q",
    tenCan: "Quý",
    nguHanh: "T",
    nguHanhID: 3,
    vitriDiaBan: 1,
    amDuong: -1,
  },
];

export const diaChi = [
  { id: 0, tenChi: "Hem có", tenHanh: ":D", amDuong: 0 },
  {
    id: 1,
    tenChi: "Tý",
    tenHanh: "T",
    menhChu: "Tham lang",
    thanChu: "Hỏa tinh",
    amDuong: 1,
  },
  {
    id: 2,
    tenChi: "Sửu",
    tenHanh: "O",
    menhChu: "Cự môn",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 3,
    tenChi: "Dần",
    tenHanh: "M",
    menhChu: "Lộc tồn",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 4,
    tenChi: "Mão",
    tenHanh: "M",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 5,
    tenChi: "Thìn",
    tenHanh: "O",
    menhChu: "Liêm trinh",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 6,
    tenChi: "Tỵ",
    tenHanh: "H",
    menhChu: "Vũ khúc",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
  {
    id: 7,
    tenChi: "Ngọ",
    tenHanh: "H",
    menhChu: "Phá quân",
    thanChu: "Linh tinh",
    amDuong: 1,
  },
  {
    id: 8,
    tenChi: "Mùi",
    tenHanh: "O",
    menhChu: "Vũ khúc",
    thanChu: "Thiên tướng",
    amDuong: -1,
  },
  {
    id: 9,
    tenChi: "Thân",
    tenHanh: "K",
    menhChu: "Liêm trinh",
    thanChu: "Thiên lương",
    amDuong: 1,
  },
  {
    id: 10,
    tenChi: "Dậu",
    tenHanh: "K",
    menhChu: "Văn khúc",
    thanChu: "Thiên đồng",
    amDuong: -1,
  },
  {
    id: 11,
    tenChi: "Tuất",
    tenHanh: "O",
    menhChu: "Lộc tồn",
    thanChu: "Văn xương",
    amDuong: 1,
  },
  {
    id: 12,
    tenChi: "Hợi",
    tenHanh: "T",
    menhChu: "Cự môn",
    thanChu: "Thiên cơ",
    amDuong: -1,
  },
];

// ============= JULIAN DATE FUNCTIONS =============

export function jdFromDate(dd, mm, yy) {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  if (jd < 2299161) {
    jd =
      dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

export function jdToDate(jd) {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return [day, month, year];
}

// ============= NEW MOON CALCULATIONS =============

export function NewMoon(k) {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 =
    C1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  C1 =
    C1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 =
    C1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  let deltat;
  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }

  const JdNew = Jd1 + C1 - deltat;
  return JdNew;
}

export function SunLongitude(jdn) {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;

  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL +=
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);

  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));

  return L;
}

export function getSunLongitude(jdn, timeZone) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T ** 2;
  const dr = Math.PI / 180;

  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL =
    DL +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);

  let L = L0 + DL;
  const omega = 125.04 - 1934.136 * T;
  L = L - 0.00569 - 0.00478 * Math.sin(omega * dr);
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));

  return Math.floor((L / Math.PI) * 6);
}

export function getNewMoonDay(k, timeZone) {
  return Math.floor(NewMoon(k) + 0.5 + timeZone / 24);
}

export function getLunarMonth11(yy, timeZone) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);

  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

export function getLeapMonthOffset(a11, timeZone) {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

  while (arc !== last && i < 14) {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  }

  return i - 1;
}

// ============= SOLAR TO LUNAR CONVERSION =============

export function S2L(dd, mm, yy, timeZone = 7) {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);

  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);

  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = 1;
      }
    }
  }

  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return [lunarDay, lunarMonth, lunarYear, lunarLeap];
}

// ============= LUNAR TO SOLAR CONVERSION =============

export function L2S(lunarD, lunarM, lunarY, lunarLeap, tZ = 7) {
  let a11, b11;

  if (lunarM < 11) {
    a11 = getLunarMonth11(lunarY - 1, tZ);
    b11 = getLunarMonth11(lunarY, tZ);
  } else {
    a11 = getLunarMonth11(lunarY, tZ);
    b11 = getLunarMonth11(lunarY + 1, tZ);
  }

  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarM - 11;

  if (off < 0) {
    off += 12;
  }

  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, tZ);
    let leapM = leapOff - 2;
    if (leapM < 0) {
      leapM += 12;
    }
    if (lunarLeap !== 0 && lunarM !== leapM) {
      return [0, 0, 0];
    } else if (lunarLeap !== 0 || off >= leapOff) {
      off += 1;
    }
  }

  const monthStart = getNewMoonDay(k + off, tZ);
  return jdToDate(monthStart + lunarD - 1);
}

// ============= NGÀY THÁNG NĂM CAN CHI =============

export function ngayThangNam(nn, tt, nnnn, duongLich = true, timeZone = 7) {
  let thangNhuan = 0;
  if (nn > 0 && nn < 32 && tt < 13 && tt > 0) {
    if (duongLich === true) {
      const result = S2L(nn, tt, nnnn, timeZone);
      return [result[0], result[1], result[2], result[3]];
    }
    return [nn, tt, nnnn, thangNhuan];
  } else {
    throw new Error("Ngày, tháng, năm không chính xác.");
  }
}

export function canChiNgay(
  nn,
  tt,
  nnnn,
  duongLich = true,
  timeZone = 7,
  thangNhuan = false,
) {
  let day = nn,
    month = tt,
    year = nnnn;

  if (duongLich === false) {
    const solar = L2S(nn, tt, nnnn, thangNhuan, timeZone);
    day = solar[0];
    month = solar[1];
    year = solar[2];
  }

  const jd = jdFromDate(day, month, year);
  const canNgay = ((jd + 9) % 10) + 1;
  const chiNgay = ((jd + 1) % 12) + 1;

  return [canNgay, chiNgay];
}

export function ngayThangNamCanChi(
  nn,
  tt,
  nnnn,
  duongLich = true,
  timeZone = 7,
) {
  let month = tt,
    year = nnnn;

  if (duongLich === true) {
    const lunar = ngayThangNam(nn, tt, nnnn, timeZone);
    month = lunar[1];
    year = lunar[2];
  }

  const canThang = ((year * 12 + month + 3) % 10) + 1;
  const canNamSinh = ((year + 6) % 10) + 1;
  const chiNam = ((year + 8) % 12) + 1;

  return [canThang, canNamSinh, chiNam];
}

// ============= NGŨ HÀNH =============

export function nguHanh(tenHanh) {
  const hanhMap = {
    Kim: {
      id: 1,
      tenHanh: "Kim",
      cuc: 4,
      tenCuc: "Kim tứ Cục",
      css: "hanhKim",
    },
    K: { id: 1, tenHanh: "Kim", cuc: 4, tenCuc: "Kim tứ Cục", css: "hanhKim" },
    Moc: {
      id: 2,
      tenHanh: "Mộc",
      cuc: 3,
      tenCuc: "Mộc tam Cục",
      css: "hanhMoc",
    },
    M: { id: 2, tenHanh: "Mộc", cuc: 3, tenCuc: "Mộc tam Cục", css: "hanhMoc" },
    Thuy: {
      id: 3,
      tenHanh: "Thủy",
      cuc: 2,
      tenCuc: "Thủy nhị Cục",
      css: "hanhThuy",
    },
    T: {
      id: 3,
      tenHanh: "Thủy",
      cuc: 2,
      tenCuc: "Thủy nhị Cục",
      css: "hanhThuy",
    },
    Hoa: {
      id: 4,
      tenHanh: "Hỏa",
      cuc: 6,
      tenCuc: "Hỏa lục Cục",
      css: "hanhHoa",
    },
    H: { id: 4, tenHanh: "Hỏa", cuc: 6, tenCuc: "Hỏa lục Cục", css: "hanhHoa" },
    Tho: {
      id: 5,
      tenHanh: "Thổ",
      cuc: 5,
      tenCuc: "Thổ ngũ Cục",
      css: "hanhTho",
    },
    O: { id: 5, tenHanh: "Thổ", cuc: 5, tenCuc: "Thổ ngũ Cục", css: "hanhTho" },
  };

  if (hanhMap[tenHanh]) {
    return hanhMap[tenHanh];
  } else {
    throw new Error(
      "Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T), Hỏa (H) hoặc Thổ (O)",
    );
  }
}

export function sinhKhac(hanh1, hanh2) {
  const matranSinhKhac = [
    [null, null, null, null, null, null],
    [null, 0, -1, 1, -1, 1],
    [null, -1, 0, 1, 1, -1],
    [null, 1, 1, 0, 1, -1],
    [null, -1, 1, -1, 0, 1],
    [null, 1, -1, -1, 1, 0],
  ];
  return matranSinhKhac[hanh1][hanh2];
}

// ============= NGŨ HÀNH NẠP ÂM =============

export function nguHanhNapAm(diaChi, thienCan, xuatBanMenh = false) {
  const banMenh = {
    K1: "HẢI TRUNG KIM",
    T1: "GIÁNG HẠ THỦY",
    H1: "TÍCH LỊCH HỎA",
    O1: "BÍCH THƯỢNG THỔ",
    M1: "TANG ÐỐ MỘC",
    T2: "ÐẠI KHÊ THỦY",
    H2: "LƯ TRUNG HỎA",
    O2: "THÀNH ÐẦU THỔ",
    M2: "TÒNG BÁ MỘC",
    K2: "KIM BẠCH KIM",
    H3: "PHÚ ÐĂNG HỎA",
    O3: "SA TRUNG THỔ",
    M3: "ÐẠI LÂM MỘC",
    K3: "BẠCH LẠP KIM",
    T3: "TRƯỜNG LƯU THỦY",
    K4: "SA TRUNG KIM",
    T4: "THIÊN HÀ THỦY",
    H4: "THIÊN THƯỢNG HỎA",
    O4: "LỘ BÀN THỔ",
    M4: "DƯƠNG LIỄU MỘC",
    T5: "TRUYỀN TRUNG THỦY",
    H5: "SƠN HẠ HỎA",
    O5: "ÐẠI TRẠCH THỔ",
    M5: "THẠCH LỰU MỘC",
    K5: "KIẾM PHONG KIM",
    H6: "SƠN ÐẦU HỎA",
    O6: "ỐC THƯỢNG THỔ",
    M6: "BÌNH ÐỊA MỘC",
    K6: "XOA XUYẾN KIM",
    T6: "ÐẠI HẢI THỦY",
  };

  const matranNapAm = [
    [0, "G", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "N", "Q"],
    [1, "K1", false, "T1", false, "H1", false, "O1", false, "M1", false],
    [2, false, "K1", false, "T1", false, "H1", false, "O1", false, "M1"],
    [3, "T2", false, "H2", false, "O2", false, "M2", false, "K2", false],
    [4, false, "T2", false, "H2", false, "O2", false, "M2", false, "K2"],
    [5, "H3", false, "O3", false, "M3", false, "K3", false, "T3", false],
    [6, false, "H3", false, "O3", false, "M3", false, "K3", false, "T3"],
    [7, "K4", false, "T4", false, "H4", false, "O4", false, "M4", false],
    [8, false, "K4", false, "T4", false, "H4", false, "O4", false, "M4"],
    [9, "T5", false, "H5", false, "O5", false, "M5", false, "K5", false],
    [10, false, "T5", false, "H5", false, "O5", false, "M5", false, "K5"],
    [11, "H6", false, "O6", false, "M6", false, "K6", false, "T6", false],
    [12, false, "H6", false, "O6", false, "M6", false, "K6", false, "T6"],
  ];

  try {
    const nh = matranNapAm[diaChi][thienCan];
    if (
      nh &&
      typeof nh === "string" &&
      ["K", "M", "T", "H", "O"].includes(nh[0])
    ) {
      if (xuatBanMenh === true) {
        return banMenh[nh];
      } else {
        return nh[0];
      }
    }
  } catch {
    throw new Error("Không thể tính Ngũ hành nạp âm");
  }
}

// ============= DỊCH CUNG =============

export function dichCung(cungBanDau, ...args) {
  let cungSauKhiDich = parseInt(cungBanDau);
  for (let soCungDich of args) {
    cungSauKhiDich += parseInt(soCungDich);
  }
  if (cungSauKhiDich % 12 === 0) {
    return 12;
  }
  return ((cungSauKhiDich % 12) + 12) % 12 || 12;
}

export function khoangCachCung(cung1, cung2, chieu = 1) {
  if (chieu === 1) {
    return (cung1 - cung2 + 12) % 12;
  } else {
    return (cung2 - cung1 + 12) % 12;
  }
}

// ============= TÌM CỤC =============

export function timCuc(viTriCungMenhTrenDiaBan, canNamSinh) {
  const canThangGieng = (canNamSinh * 2 + 1) % 10;
  let canThangMenh =
    (((viTriCungMenhTrenDiaBan - 3 + 12) % 12) + canThangGieng) % 10;
  if (canThangMenh === 0) {
    canThangMenh = 10;
  }
  return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
}

// ============= TÌM TỬ VI =============

export function timTuVi(cuc, ngaySinhAmLich) {
  const cungDan = 3;
  const cucBanDau = cuc;

  if (![2, 3, 4, 5, 6].includes(cuc)) {
    throw new Error("Số cục phải là 2, 3, 4, 5, 6");
  }

  let currentCuc = cuc;
  let currentCungDan = cungDan;

  while (currentCuc < ngaySinhAmLich) {
    currentCuc += cucBanDau;
    currentCungDan += 1;
  }

  let saiLech = currentCuc - ngaySinhAmLich;
  if (saiLech % 2 === 1) {
    saiLech = -saiLech;
  }

  return dichCung(currentCungDan, saiLech);
}

// ============= TÌM TRÀNG SINH =============

export function timTrangSinh(cucSo) {
  if (cucSo === 6) return 3; // Hỏa lục cục -> Dần
  if (cucSo === 4) return 6; // Kim tứ cục -> Tỵ
  if (cucSo === 2 || cucSo === 5) return 9; // Thủy nhị cục, Thổ ngũ cục -> Thân
  if (cucSo === 3) return 12; // Mộc tam cục -> Hợi

  throw new Error("Không tìm được cung an sao Trường sinh");
}

// ============= TÌM HỎA LINH =============

export function timHoaLinh(chiNamSinh, gioSinh, gioiTinh, amDuongNamSinh) {
  let khoiCungHoaTinh, khoiCungLinhTinh;

  if ([3, 7, 11].includes(chiNamSinh)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNamSinh)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNamSinh)) {
    khoiCungHoaTinh = 11;
    khoiCungLinhTinh = 4;
  } else if ([12, 4, 8].includes(chiNamSinh)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Error("Không thể khởi cung tìm Hỏa-Linh");
  }

  let viTriHoaTinh, viTriLinhTinh;

  if (gioiTinh * amDuongNamSinh === -1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -1 * gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
  } else if (gioiTinh * amDuongNamSinh === 1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -1 * gioSinh);
  }

  return [viTriHoaTinh, viTriLinhTinh];
}

// ============= TÌM CÁC SAO KHÁC =============

export function timThienKhoi(canNam) {
  const khoiViet = [null, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  if (khoiViet[canNam]) {
    return khoiViet[canNam];
  }
  throw new Error("Không tìm được vị trí Khôi-Việt");
}

export function timThienQuanThienPhuc(canNam) {
  const thienQuan = [null, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
  const thienPhuc = [null, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];

  if (thienQuan[canNam] && thienPhuc[canNam]) {
    return [thienQuan[canNam], thienPhuc[canNam]];
  }
  throw new Error("Không tìm được Quan-Phúc");
}

export function timCoThan(chiNam) {
  if ([12, 1, 2].includes(chiNam)) return 3;
  if ([3, 4, 5].includes(chiNam)) return 6;
  if ([6, 7, 8].includes(chiNam)) return 9;
  return 12;
}

export function timThienMa(chiNam) {
  const demNghich = chiNam % 4;
  if (demNghich === 1) return 3;
  if (demNghich === 2) return 12;
  if (demNghich === 3) return 9;
  if (demNghich === 0) return 6;

  throw new Error("Không tìm được Thiên mã");
}

export function timPhaToai(chiNam) {
  const demNghich = chiNam % 3;
  if (demNghich === 0) return 10;
  if (demNghich === 1) return 6;
  if (demNghich === 2) return 2;

  throw new Error("Không tìm được Phá toái");
}

export function timTriet(canNam) {
  if ([1, 6].includes(canNam)) return [9, 10];
  if ([2, 7].includes(canNam)) return [7, 8];
  if ([3, 8].includes(canNam)) return [5, 6];
  if ([4, 9].includes(canNam)) return [3, 4];
  if ([5, 10].includes(canNam)) return [1, 2];

  throw new Error("Không tìm được Triệt");
}

export function timLuuTru(canNam) {
  const maTranLuuHa = [null, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
  const maTranThienTru = [null, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];

  if (maTranLuuHa[canNam] && maTranThienTru[canNam]) {
    return [maTranLuuHa[canNam], maTranThienTru[canNam]];
  }
  throw new Error("Không tìm được Lưu - Trù");
}
