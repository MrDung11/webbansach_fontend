import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./MyRequest";
// Do tách phần trên ra (tách funtion ra thành các API riêng để gọi ra khi cần sử dụng) nên phải import vào


// Lấy ra những hình ảnh nào liên quan đến quyển sách 

// Lấy ra toàn bộ ảnh của maSach nào đó
// Trả về một mảng (Promise): Hình ảnh
export async function layToanBoAnhCuaMotQuyenSach(maSach: number): Promise<HinhAnhModel[]> {

    // Ban đầu cho mảng là rỗng    
    const ketQua: HinhAnhModel[] = [];

    // *Xác định endpoint*
    // Chỉ đến đường dẫn BackEnd: `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`
    // Dùng dấu ` ở ESC: Để chèn được đường dẫn đến ${maSach}
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    // *Gọi phương thức my_request*
    // Gửi một yêu cầu lên Back-End
    const response = await my_request(duongDan);

    // *Lấy ra json hình ảnh*
    // Tạo biến: responseData để lấy
    // Nằm trong: _embedded.saches
    const responseData = response._embedded.hinhAnhs;

    // In responxe ra    
    // console.log(responseData);

    // Lấy ra toàn bộ hình ảnh liên quan đến một quyển sách (qua maSach): Dùng vòng lặp for để lấy ra từng hình ảnh
    // Cần có key: Để lấy    
    // push vào trong mảng để trả về
    for (const key in responseData) {
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh: responseData[key].duLieuAnh
        });
    }

    return ketQua;
}