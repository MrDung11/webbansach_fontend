class HinhAnhModel {

// maHinhAnh: Không bao giờ được NULL    
    maHinhAnh: number;

// ?: Thể hiện có thể bị NULL     
    tenHinhAnh?: string;
    laIcon?: boolean;
    duongDan?: string;
    duLieuAnh?: string;

    constructor(
        maHinhAnh: number,
        tenHinhAnh?: string,
        laIcon?: boolean,
        duongDan?: string,
        duLieuAnh?: string,
    ){

// Nếu khai báo bên trên private thì cần set/get: Khai báo private sẽ tối ưu được trong môi trường code hơn
// Nếu khai báo kiểu này thì vẫn lấy được DL ra: Nhưng không tối ưu được trong môi trường code (nhưng code nhanh hơn)        
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.laIcon = laIcon;
        this.duongDan = duongDan;
        this.duLieuAnh = duLieuAnh;
    }
}
export default HinhAnhModel;