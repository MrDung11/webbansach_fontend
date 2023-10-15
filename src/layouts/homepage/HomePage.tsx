import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";
import { useParams } from "react-router-dom";

// Tác nhân thay đổi nằm trên thanh Menu (navbar) nhưng nội dung thay đổi lại được thực hiện trên HomePage
interface HomePageProps{
    tuKhoaTimKiem: string;
}

function HomePage({tuKhoaTimKiem}: HomePageProps){

    const  {maTheLoai} = useParams();

    let maTheLoaiNumber = 0;

    try {

        // Chuyển sang int: ép kiểu cho chắc chắn (vì chưa biết maTheLoai là number hay string)
        maTheLoaiNumber = parseInt(maTheLoai+''); // NaN
    } catch (error) {
        maTheLoaiNumber = 0;
        console.error('Error: ', error);
    }

    if(Number.isNaN(maTheLoaiNumber))
        maTheLoaiNumber = 0;

    return(
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber} />
        </div>
    );
}

export default HomePage;