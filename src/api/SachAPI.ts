import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./MyRequest";
// Do tách phần trên ra (tách funtion ra thành các API riêng để gọi ra khi cần sử dụng) nên phải import vào


// Lấy sách: Để truyền vào các hàm bên dưới
async function laySach(duongDan: string): Promise<SachModel[]> {  

// Ban đầu cho mảng là rỗng    
    const ketQua: SachModel[] = [];

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

    // Lấy ra toàn bộ sách
// Trả về một mảng (Promise): sách
export async function layToanBoSach(): Promise<SachModel[]> {
 
    // *Xác định endpoint*
    // Chỉ đến đường dẫn BackEnd: http://localhost:8080/sach?sort=maSach,desc
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc';

    return laySach(duongDan);
}

// Lấy ra 3 quyển sách mói nhất để dùng cho slide show
export async function lay3SachMoiNhat(): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];    

        // *Xác định endpoint*
    // Chỉ đến đường dẫn BackEnd: http://localhost:8080/sach?sort=maSach,desc&page=0&size=3
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';

    return laySach(duongDan);
}