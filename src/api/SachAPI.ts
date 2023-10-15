import React from "react";
import SachModel from "../models/SachModel";
import { my_request } from "./MyRequest";
// Do tách phần trên ra (tách funtion ra thành các API riêng để gọi ra khi cần sử dụng) nên phải import vào

// Dành cho phân trang
interface KetQuaInterface{
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;

}

// Lấy sách: Để truyền vào các hàm bên dưới
async function laySach(duongDan: string): Promise<KetQuaInterface> {  

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


    // Lấy thông tin trang: tổng số trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;


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
    return {ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang};
}

    // Lấy ra toàn bộ sách
// Trả về một mảng (Promise): sách
export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {
 
    // *Xác định endpoint*
    // Chỉ đến đường dẫn BackEnd: 'http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}'
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;

    return laySach(duongDan);
}

// Lấy ra 3 quyển sách mói nhất để dùng cho slide show
export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];    

        // *Xác định endpoint*
    // Chỉ đến đường dẫn BackEnd: 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3'
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';

    return laySach(duongDan);
}

// Tìm kiếm sách (đã có end-point ở backend)
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];    

        // *Xác định end-point*
    // Chỉ đến đường dẫn BackEnd: 'http://localhost:8080/sach?sort=maSach,desc&size=8&page=0'
    // Mặc định đường dãn ban đầu
    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    // Kiểm tra đường dẫn khác rỗng: Thì sẽ ra kết quả khác = đường dẫn cũ + &tenSach=${tuKhoaTimKiem}
    if(tuKhoaTimKiem !== '' && maTheLoai==0){

        // Tìm qua tên sách
        duongDan=`http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`
    } else if(tuKhoaTimKiem === '' && maTheLoai>0){

        // Tìm qua mã thể loại
        duongDan=`http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoai}`
    } else if(tuKhoaTimKiem !== '' && maTheLoai>0){

        // Tìm qua mã thể loại rồi đến từ khóa tên sách
        duongDan=`http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`
    }

    return laySach(duongDan);
}