import React, { useEffect, useState } from "react";
import { error } from "console";
import SachModel from "../../../models/SachModel";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";


// Lấy ra thông tin
const Carousel: React.FC = () => {

    // Lấy Dl bỏ xuống bên dưới: Để carosel cũng nhận sách từ Database
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
            lay3SachMoiNhat().then(
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

    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">

{/* Sửa lại đường dẫn để nhận sách từ Database */}
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem key={0} sach={danhSachQuyenSach[0]} />
                    </div>


                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem key={1} sach={danhSachQuyenSach[1]} />
                    </div>


                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem key={2} sach={danhSachQuyenSach[2]} />
                    </div>


                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;