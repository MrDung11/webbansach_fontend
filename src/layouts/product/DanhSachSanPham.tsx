import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { error } from "console";
import { PhanTrang } from "../utils/PhanTrang";

// Để nhận DL: Từ khóa tìm kiếm
interface DanhSachSanPhamProps{
    tuKhoaTimKiem: string;
}

// Biến DanhSachSanPham
function DanhSachSanPham ({tuKhoaTimKiem}: DanhSachSanPhamProps){

// Kiểu DL: SachModel; Do có nhiều DL nên sẽ là mảng []; Bản đầu lấy mảng là rỗng []
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);

// Biến dangTaiDuLieu: Cho biết Font-End đang tải DL (mặc định ban đầu khi khởi động trang Web lên sẽ là Đang tải DL)    
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

// Biến baoLoi: Giả sử không kết nối được (Nếu không có lỗi gì sẽ mặc định là NULL: Không thông báo)
    const [baoLoi, setBaoLoi] = useState(null);

    // Phân trang: Mặc định mới vào là trang 1
    const [trangHienTai, setTrangHienTai] = useState(1);

    // Tổng số trang: mặc định ban đầu là không
    const [tongSoTrang, setTongSoTrang] = useState(0);

    const [tongSoSach, setTongSoSach] = useState(0);

// Lấy DL ra
// Tìm hiểu khái niệm: useEffect
    useEffect(() => {

        // Nếu từ khóa bằng rỗng thì không tìm kiếm
        if(tuKhoaTimKiem === ''){   

// Lấy ra những quyển sách
// Nếu thành công: then: Được một cái Data
// Trên Website trang đầu tiên là trang 1 mà sprintboot trang đầu tiên là trang 0 nên cần trừ trang hiện tại cho 1 để về 0
        layToanBoSach(trangHienTai-1).then(
            kq =>{

// Đưa DL vào trong DanhSachQuyenSach
// Vì đã lấy được sách thì: setDangTaiDuLieu(false): Để không hiện đang tải dữ liệu nữa
                setDanhSachQuyenSach(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);
            }

// Nếu thất bại: catch: error.message: Để báo lỗi ra
        ).catch(

// Nếu gặp lỗi (error): Thì mới báo lỗi ra (error.message)
            error => {
                setBaoLoi(error.message);
            }
        );
    } else {

        // Nếu từ khóa khác rỗng
        timKiemSach(tuKhoaTimKiem).then(
        
            kq =>{

                // Tìm sách
                // Vì đã lấy được sách thì: setDangTaiDuLieu(false): Để không hiện đang tải dữ liệu nữa
                                setDanhSachQuyenSach(kq.ketQua);
                                setTongSoTrang(kq.tongSoTrang);
                                setDangTaiDuLieu(false);
                            }
                
                // Nếu thất bại: catch: error.message: Để báo lỗi ra
                        ).catch(
                
                // Nếu gặp lỗi (error): Thì mới báo lỗi ra (error.message)
                            error => {
                                setBaoLoi(error.message);
                            }
                        );
        
    }
    }, [trangHienTai, tuKhoaTimKiem] // Chỉ gọi một lần (nếu không sẽ chạy mãi mãi: lúc nào cũng truy vấn DL)
    )

// Phân trang: Khi click chuột vào trang nào thì sẽ đến trang đó luôn (trang được click sẽ thành trang hiện tại)
const phanTrang = (trang: number) => {setTrangHienTai(trang);}

// Có thể tách funtion ra thành các phần riêng để gọi khi cần sử dụng thì import vào      
// Nếu đang tải DL    
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

// Nếu nội dung tìm kiếm là rỗng: Hiện không tìm thấy sách theo yêu cầu!
    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

// Nếu gặp lỗi: In luôn lỗi ra: {baoLoi}
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

// Nếu không gặp 2 lỗi trên thì return ra kết quả
    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (

// Lấy DL từ Back-End: qua DanhSachSanPham
                        <SachProps key={sach.maSach} sach={sach} />
                    )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}

export default DanhSachSanPham;