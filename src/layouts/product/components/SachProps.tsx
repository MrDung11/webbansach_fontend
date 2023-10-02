import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotQuyenSach } from "../../../api/HinhAnhAPI";

// Nếu không có quá nhiều biến thì bỏ: interface SachPropsInterface đi cũng được
interface SachPropsInterface {

    // Có thể có một hoặc nhiều biến
    sach: SachModel;
}

// Hiển thị hình ảnh của quyển sách (Từ HinhAnhAPI)
const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    // Kiểu DL: HinhAnhModel; Do có nhiều DL nên sẽ là mảng []; Bản đầu lấy mảng là rỗng []
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);

    // Biến dangTaiDuLieu: Cho biết Font-End đang tải DL (mặc định ban đầu khi khởi động trang Web lên sẽ là Đang tải DL)    
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);

    // Biến baoLoi: Giả sử không kết nối được (Nếu không có lỗi gì sẽ mặc định là NULL: Không thông báo)
    const [baoLoi, setBaoLoi] = useState(null);


    // Lấy DL ra
    // Tìm hiểu khái niệm: useEffect
    useEffect(() => {

        // Lấy ra ảnh của mỗi quyển sách
        // Nếu thành công: then: Được một cái Data
        layToanBoAnhCuaMotQuyenSach(maSach).then(
            hinhAnhData => {

                // Đưa DL vào trong danhSachAnh
                // Vì đã lấy được sách thì: setDangTaiDuLieu(false): Để không hiện đang tải dữ liệu nữa
                setDanhSachAnh(hinhAnhData);
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

    // Sau khi có được danh sách hình ảnh
    // Tạm thời lấy ảnh đầu tiên (anh 0-phần tử thứ 0) làm ảnh đại diện (Icon)


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

    // console.log('Data Anh: ', danhSachAnh[0]);

    // Cách 1: nếu duLieuAnh không có-rỗng ("")
    // Tìm_hiểu_lại_cách_sử_dụng_let
    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    }
    // {/* Đầu tiên là có ảnh đầu tiên (ảnh 0) và ảnh đầu tiên phải có DL ảnh thì ảnh đầu tiên mới được hiển thị ra làm ảnh đại diện (Icon) */}
    //                     <img
    //     // Tạm thời lấy ảnh đầu tiên (anh 0-phần tử thứ 0) làm ảnh đại diện (Icon)
    //                         src={duLieuAnh}
    //                         className="card-img-top"
    //                         alt={props.sach.tenSach}
    //                         style={{ height: '200px' }}
    //                     />

    return (
        <div className="col-md-3 mt-2">
            <div className="card">

                {/* Cách 2: */}
                {/* Đầu tiên là có ảnh đầu tiên (ảnh 0) và ảnh đầu tiên phải có DL ảnh thì ảnh đầu tiên mới được hiển thị ra làm ảnh đại diện (Icon) */}
                {/* {danhSachAnh[0] && danhSachAnh[0].duLieuAnh && <img

// Tạm thời lấy ảnh đầu tiên (anh 0-phần tử thứ 0) làm ảnh đại diện (Icon)
                    src={`${danhSachAnh[0].duLieuAnh}`}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }}
                />} */}

                {/* Đầu tiên là có ảnh đầu tiên (ảnh 0) và ảnh đầu tiên phải có DL ảnh thì ảnh đầu tiên mới được hiển thị ra làm ảnh đại diện (Icon) */}
                <img
                    // Tạm thời lấy ảnh đầu tiên (anh 0-phần tử thứ 0) làm ảnh đại diện (Icon)
                    src={duLieuAnh}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }}
                />

                <div className="card-body">
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                    <p className="card-text">{props.sach.moTa}</p>

                    {/* Cho phần giá vào một khu vực (thẻ div) gồm: giá niêm yết và giá bán */}
                    <div className="price">
                        <span className="original-price">
                            <del>{props.sach.giaNiemYet}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.sach.giaBan}</strong>
                        </span>
                    </div>

                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;