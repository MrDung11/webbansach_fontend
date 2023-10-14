import React from "react";

// Phân trang tiếng anh là: Pagination
interface PhanTrangInterface{
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: any;
}

export const PhanTrang: React.FC<PhanTrangInterface> = (props) => {

// Tạo mảng danh sách các trang muốn hiển thị ra màn hình
    const danhSachTrang = [];

    // Nếu trang đang đứng là trang 1
    if(props.trangHienTai === 1){
        danhSachTrang.push(props.trangHienTai);

        // Ở đây tổng số trang là tính từ trang đang đứng đến trang cuối
        // Nếu có tổng số trang là 2 trang: Thì hiển thị 1 trang sau trang hiện tại
        if(props.tongSoTrang >= props.trangHienTai + 1){
            danhSachTrang.push(props.trangHienTai + 1);
        }

        // Nếu có tổng số trang là 3 trang: Thì hiển thị 2 trang sau trang hiện tại (bao gồm trang 2 bên trên và trang 3 ở đây)
        if(props.tongSoTrang >= props.trangHienTai + 2){
            danhSachTrang.push(props.trangHienTai + 2);
        }

        // Nếu trang đang đứng không phải trang 1
    } else if(props.trangHienTai > 1){

        // Nếu phía trước trang đang đứng có từ 3 trang trở lên: Thì hiển thị 2 trang trước trang hiện tại (bao gồm trang -1 bên dưới và trang -2 ở đây)
        if(props.trangHienTai >= 3){
            danhSachTrang.push(props.trangHienTai - 2);
        }

        // Hiển thị các trang phía trước trang hiện tại
        // Nếu phía trước trang đang đứng có từ 2 trang trở lên: Thì hiển thị 1 trang trước trang hiện tại
        if(props.trangHienTai >= 2){
            danhSachTrang.push(props.trangHienTai - 1);
        }

        // Hiển thị trang hiện tại
        danhSachTrang.push(props.trangHienTai);

        // Hiển thị các trang phía sau trang hiện tại
        // Nếu phía sau có 1 trang: Trang + 1
        if(props.tongSoTrang >= props.trangHienTai + 1){
            danhSachTrang.push(props.trangHienTai + 1);
        }

        // Nếu phía sau có 2 trang: Trang + 2
        if(props.tongSoTrang >= props.trangHienTai + 2){
            danhSachTrang.push(props.trangHienTai + 2);
        }

        // // Nếu trang hiện tại đang ở từ trang 4 trở đi thì hiển thị thêm trang 1 ở đầu
        // if(props.trangHienTai >= 4){
        //     danhSachTrang[1];
        // }

        // // Nếu trang hiện tại đang ở cách trang cuối từ 3 trang trở lên thì hiển thị trang cuối
        // if(props.trangHienTai <= props.tongSoTrang - 3){
        //     danhSachTrang[props.tongSoTrang];
        // }    
    }


    return(
        // <nav aria-label="...">
        //     <ul className="pagination">
        //         <li className="page-item" onClick={()=>props.phanTrang(1)}>
        //             <button className="page-link" >
        //                 Trang Đầu
        //             </button>
        //         </li>
        //         {
        //             danhSachTrang.map(trang => (
        //                 <li className="page-item" key={trang} onClick={()=>props.phanTrang(trang)}>
        //                     <button className={"page-link " + (props.trangHienTai===trang?"active":"")}>
        //                         {trang}
        //                     </button>
        //                 </li>
        //             ))
        //         }
        //         <li className="page-item" onClick={()=>props.phanTrang(props.tongSoTrang)}>
        //             <button className="page-link" >
        //                 Trang Cuối
        //             </button>
        //         </li>
        //     </ul>
        // </nav>
        <nav aria-label="...">
            <ul className="pagination">

                <li className="page-item" onClick={()=>props.phanTrang(1)}>
                    <button className="page-link">
                        Trang đầu
                    </button>
                </li>


                {/* <li className="pageNav-jump pageNav-jump--next" onClick={()=>props.phanTrang(props.trangHienTai - 1)}>
                    <button className="page-link">
                        Trang trước
                    </button>
                </li> */}

                    {
                        danhSachTrang.map(trang => (
                            <li className="page-item" key={trang} onClick={()=>props.phanTrang(trang)}>
                                <button className={"page-link " + (props.trangHienTai===trang?"active":"")}>
                                    {trang}
                                </button>
                            </li>
                        ))
                    }


                {/* <li className="pageNav-jump pageNav-jump--next" onClick={()=>props.phanTrang(props.trangHienTai + 1)}>
                    <button className="page-link">
                        Trang sau
                    </button>
                    </li> */}
                    
                    
                <li className="page-item" onClick={()=>props.phanTrang(props.tongSoTrang)}>
                    <button className="page-link">
                        Trang cuối
                    </button>
                </li>

            </ul>
        </nav>
    )
}

{/* <nav aria-label='Page navigation example' className='mt-5 fs-5'>
			<ul className='pagination justify-content-center'>
				<li
					className={
						"page-item " + (props.currentPage === 1 ? "disabled" : "")
					}
					onClick={
						props.currentPage === 1
							? () => {}
							: () => props.handlePagination(props.currentPage - 1)
					}
				>
					<button className='page-link' tabIndex={-1}>
						Previous
					</button>
				</li>
				{/* Hiện trang đầu tiên */}
		// 		{props.currentPage >= 4 && (
		// 			<>
		// 				<li
		// 					className='page-item'
		// 					onClick={() => props.handlePagination(1)}
		// 				>
		// 					<button className='page-link'>1</button>
		// 				</li>
		// 				<li className='page-item'>
		// 					<button className='page-link'>...</button>
		// 				</li>
		// 			</>
		// 		)}

		// 		{/* Hiện các trang tiếp theo */}
		// 		{showListPage.map((pageNumber, index) => (
		// 			<li
		// 				className={
		// 					"page-item" +
		// 					(props.currentPage === pageNumber ? " actived" : "")
		// 				}
		// 				key={pageNumber}
		// 				onClick={() => props.handlePagination(pageNumber)}
		// 			>
		// 				<button className='page-link'>{pageNumber}</button>
		// 			</li>
		// 		))}

		// 		{/* Hiện trang cuối cùng */}
		// 		{props.currentPage < props.totalPages - 2 && (
		// 			<>
		// 				<li className='page-item'>
		// 					<button className='page-link'>...</button>
		// 				</li>
		// 				<li
		// 					className='page-item'
		// 					onClick={() => props.handlePagination(props.totalPages)}
		// 				>
		// 					<button className='page-link'>{props.totalPages}</button>
		// 				</li>
		// 			</>
		// 		)}
		// 		<li
		// 			className={
		// 				"page-item " +
		// 				(props.totalPages === props.currentPage ? "disabled" : "")
		// 			}
		// 			onClick={
		// 				props.totalPages === props.currentPage
		// 					? () => {}
		// 					: () => props.handlePagination(props.currentPage - 1)
		// 			}
		// 		>
		// 			<button className='page-link'>Next</button>
		// 		</li>
		// 	</ul>
		// </nav> */}