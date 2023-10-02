// Cần một function có thể gọi đến một endpoint bất kỳ và nó sẽ trả về một Data response: Dùng asyn function
// asyn function: Function chờ cho đến lúc nào DL được phàn hồi thì thôi
// endpoint: Là một điểm để đường dẫn truy cập đến
// export: Luôn ở bên trên
export async function my_request(duongDan: string) {

// *Truy cấn đến đường dẫn*
// Biến response
// Lấy toàn bộ thông tin về: Trả về một response kèm theo thông tin, json data hoặc báo lỗi; Nếu thành công sẽ báo OK
// Hàm này có thể được tách ra một class riêng
    const response = await fetch(duongDan);

// *Nếu bị trả về lỗi*
    if (!response.ok) {

// Dấu ` ở phím ESC: Để lấy được đường dẫn bên trong        
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

// *Nếu trả về OK*
// Hàm json sẽ trả về toàn bộ DL ở bên trong.
    return response.json();
}