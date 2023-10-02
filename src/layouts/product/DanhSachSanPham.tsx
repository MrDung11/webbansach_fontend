import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach } from "../../api/SachAPI";
import { error } from "console";

// Biến DanhSachSanPham
const DanhSachSanPham: React.FC = () => {

// Kiểu DL: SachModel; Do có nhiều DL nên sẽ là mảng []; Bản đầu lấy mảng là rỗng []
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);

// Biến dangTaiDuLieu: Cho biết Font-End đang tải DL (mặc định ban đầu khi khởi động trang Web lên sẽ là Đang tải DL)    
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

// Biến baoLoi: Giả sử không kết nối được (Nếu không có lỗi gì sẽ mặc định là NULL: Không thông báo)
    const [baoLoi, setBaoLoi] = useState(null);

// Lấy DL ra
// Tìm hiểu khái niệm: useEffect
    useEffect(() => {

// Lấy ra những quyển sách
// Nếu thành công: then: Được một cái Data
        layToanBoSach().then(
            sachData =>{

// Đưa DL vào trong DanhSachQuyenSach
// Vì đã lấy được sách thì: setDangTaiDuLieu(false): Để không hiện đang tải dữ liệu nữa
                setDanhSachQuyenSach(sachData);
                setDangTaiDuLieu(false);
            }

// Nếu thất bại: catch: error.message: Để báo lỗi ra
        ).catch(

// Nếu gặp lỗi (error): Thì mới báo lỗi ra (error.message)
            error => {
                setBaoLoi(error.message);
            }
        );
    }, [] // Chỉ gọi một làn (nếu không sẽ chạy mãi mãi: lúc nào cũng truy vấn DL)
    )

// Có thể tách funtion ra thành các phần riêng để gọi khi cần sử dụng thì import vào      
// Nếu đang tải DL    
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
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
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map((sach) => (

// Lấy DL từ Back-End: qua DanhSachSanPham
                        <SachProps key={sach.maSach} sach={sach} />
                    )
                    )
                }
            </div>
        </div>
    );
}

export default DanhSachSanPham;