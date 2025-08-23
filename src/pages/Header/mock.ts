export type RegionResult = {
  id: string;
  time: string;
  name: string[];
  text?: string[];
};

export const schedule: Record<number, [RegionResult, RegionResult, RegionResult]> = {
  1: [
    { id: "1", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "2", time: "17:15", name: ["Xổ Số Thừa T. Huế", "Xổ Số Phú Yên"] },
    { id: "3", time: "16:15", name: ["Xổ Số Sài Gòn", "Xổ Số Đồng Tháp", "Xổ Số Cà Mau"] },
  ],
  2: [
    { id: "4", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "5", time: "17:15", name: ["Xổ Số Quảng Nam", "Xổ Số Đắk Lắk"] },
    { id: "6", time: "16:15", name: ["Xổ Số Bến Tre", "Xổ Số Vũng Tàu", "Xổ Số Bạc Liêu"] },
  ],
  3: [
    { id: "6", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "7", time: "17:15", name: ["Xổ Số Đà Nẵng", "Xổ Số Khánh Hòa"] },
    { id: "8", time: "16:15", name: ["Xổ Số Đồng Nai", "Xổ Số Cần Thơ", "Xổ Số Sóc Trăng"] },
  ],
  4: [
    { id: "9", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "10", time: "17:15", name: ["Xổ Số Bình Định", "Xổ Số Quảng Bình", "Xổ Số Quảng Trị"] },
    { id: "11", time: "16:15", name: ["Xổ Số Tây Ninh", "Xổ Số An Giang", "Xổ Số Bình Thuận"] },
  ],
  5: [
    { id: "12", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "13", time: "17:15", name: ["Xổ Số Gia Lai", "Xổ Số Ninh Thuận"] },
    { id: "14", time: "16:15", name: ["Xổ Số Vĩnh Long", "Xổ Số Bình Dương", "Xổ Số Trà Vinh"] },
  ],
  6: [
    { id: "15", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "16", time: "17:15", name: ["Xổ Số Đà Nẵng", "Xổ Số Quảng Ngãi", "Xổ Số Đắk Nông"] },
    { id: "17", time: "16:15", name: ["Xổ Số Sài Gòn", "Xổ Số Long An", "Xổ Số Hậu Giang", "Xổ Số Bình Phước"] },
  ],
  0: [
    { id: "18", time: "19:15", name: ["Xổ Số Miền Bắc"] },
    { id: "19", time: "17:15", name: ["Xổ Số Khánh Hòa", "Xổ Số Kon Tum"] },
    { id: "20", time: "16:15", name: ["Xổ Số Tiền Giang", "Xổ Số Kiên Giang", "Xổ Số Đà Lạt"] },
  ],
};

function toAbbrev(fullName: string): string {
  const parts = fullName.replace('Xổ Số ', '').split(" ");
  const rs = `${parts[0][0]}${parts[1][0]}`
  return rs.toUpperCase();
}

export function getLotteryToday(): [RegionResult, RegionResult, RegionResult] {
  const today = new Date().getDay(); // Chủ nhật = 0, Thứ 2 = 1...
  return schedule[today].map(region => ({
    id: region.id,
    time: region.time,
    name: region.name.map(toAbbrev),
    text: region.name.map(name => name.replace('Xổ Số ', ''))
  })) as [RegionResult, RegionResult, RegionResult];
}
