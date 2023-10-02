class SachModel {
    
// maSach: Không bao giờ được NULL
    maSach: number;

// ?: Thể hiện có thể bị NULL 
    tenSach?: string;   // Có thể bị NULL
    giaBan?: number;
    giaNiemYet?: number;
    moTa?: string;
    soLuong?: number;
    tenTacGia?: string;
    trungBinhXepHang?:number;

    constructor(
        maSach: number,
        tenSach?: string,
        giaBan?: number,
        giaNiemYet?: number,
        moTa?: string,
        soLuong?: number,
        tenTacGia?: string,
        trungBinhXepHang?:number
    ) {
// Nếu khai báo bên trên private thì cần set/get: Khai báo private sẽ tối ưu được trong môi trường code hơn
// Nếu khai báo kiểu này thì vẫn lấy được DL ra: Nhưng không tối ưu được trong môi trường code (nhưng code nhanh hơn)

        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaBan = giaBan;
        this.giaNiemYet = giaNiemYet;
        this.moTa = moTa;
        this.soLuong = soLuong;
        this.tenTacGia = tenTacGia;
        this.trungBinhXepHang = trungBinhXepHang;
    }

}
export default SachModel;