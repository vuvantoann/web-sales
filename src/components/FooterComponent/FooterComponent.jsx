import { Box } from "@mui/material";

const FooterComponent = () => {
  return (
  <Box component="footer" className=" py-[40px]">
    <div className="flex justify-between px-[120px] py-[40px]">
      <ul>
        <h5 className="font-semibold text-14 mb-4">GIỚI THIỆU NGUYỄN CÔNG</h5>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        
        <div id="socialNet">
          <a href=""><img src="" alt="" /></a>

        </div>
      </ul>
      <ul>
        <h5 className="font-semibold text-14 mb-4">GIỚI THIỆU NGUYỄN CÔNG</h5>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        
      </ul>
      <ul>
        <h5 className="font-semibold text-14 mb-5">GIỚI THIỆU NGUYỄN CÔNG</h5>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        
      </ul>
      <ul>
        <h5 className="font-semibold text-14 mb-5">GIỚI THIỆU NGUYỄN CÔNG</h5>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
        <li className="font-normal text-13">Giới thiệu công ty</li>
      </ul> 
    </div>

    <div id="footer_bottom" className="bg-[#f4f4f4] px-[120px] py-[10px]">
      <p>WEBSITE ĐƯỢC SỞ HỮU VÀ QUẢN LÝ BỞI NGUYỄN VIẾT CÔNG</p>
      <b>CÔNG TY TNHH MÁY TÍNH NGUYỄN CÔNG</b>
      <p>Địa chỉ: Số 377-379 Trương Định, tổ 41 - Phường Tương Mai - Quận Hoàng Mai - Hà Nội.</p>
      <p>Mã số thuế: 0107568451 do Sở Kế Hoạch và Đầu Tư TP.Hà Nội (22/12/2015)</p>
      <p>Mua hàng: 0989.336.366 - 0899.999.191</p>
      <p className="d-flex list-contact-footer align-items-center">
            <span>GÓP Ý : <a href="tel:0978131113">0978.131.113</a> - <a href="tel:0971113333">0971.113.333</a>.</span>
            <span>Email: <a href="mailTo:info@nguyencongpc.vn">info@nguyencongpc.vn</a>.</span>
            <span>Website: <a href="/">nguyencongpc.vn</a>.</span>
            <span>Fanpage: <a href="www.facebook.com/MAY.TINH.NGUYEN.CONG">www.facebook.com/MAY.TINH.NGUYEN.CONG</a>.</span>
      </p>
    </div>
  </Box>
  )
};

export default FooterComponent;
