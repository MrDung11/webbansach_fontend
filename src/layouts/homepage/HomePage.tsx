import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";

// Tác nhân thay đổi nằm trên thanh Menu (navbar) nhưng nội dung thay đổi lại được thực hiện trên HomePage
interface HomePageProps{
    tuKhoaTimKiem: string;
}

function HomePage({tuKhoaTimKiem}: HomePageProps){
    return(
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem}/>
        </div>
    );
}

export default HomePage;