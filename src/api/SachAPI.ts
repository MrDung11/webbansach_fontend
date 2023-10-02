import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./MyRequest";
// Do tách phần trên ra (tách funtion ra thành các API riêng để gọi ra khi cần sử dụng) nên phải import vào


// Lấy ra toàn bộ sách
// Trả về một mảng (Promise): sách
export async function layToanBoSach(): Promise<SachModel[]> {

// Ban đầu cho mảng là rỗng    
    const ketQua: SachModel[] = [];

// *Xác định endpoint*
// Chỉ đến đường dẫn BackEnd: http://localhost:8080/sach
    const duongDan: string = 'http://localhost:8080/sach';

// *Gọi phương thức request*
// Gửi một yêu cầu lên Back-End
    const response = await my_request(duongDan);

// *Lấy ra json sach*
// Tạo biến: responseData để lấy
// Nằm trong: _embedded.saches
    const responseData = response._embedded.saches;

// In responxe ra    
    console.log(responseData);

// Lấy ra toàn bộ các quyển sách: Dùng vòng lặp for để lấy ra từng quyển
// Cần có key: Để lấy 
// push vào trong mảng để trả về   
    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa:responseData[key].moTa,
            soLuong:responseData[key].soLuong,
            tenTacGia:responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
        });
    }

    return ketQua;
}