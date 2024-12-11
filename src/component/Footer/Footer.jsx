export default function Footer() {
  const logos = [
    "https://movie-booking-project.vercel.app/img/logo-connect/cgv.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/bhd.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/galaxycine.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/cinestar.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/lotte.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/megags.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/bt.jpg",
    "https://movie-booking-project.vercel.app/img/logo-connect/dongdacinema.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/TOUCH.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/cnx.jpg",
    "https://movie-booking-project.vercel.app/img/logo-connect/STARLIGHT.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/dcine.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/zalopay_icon.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/payoo.jpg",
    "https://www.inlogo.vn/vnt_upload/File/Image/logo_VCB_828891.jpg",
    "https://movie-booking-project.vercel.app/img/logo-connect/AGRIBANK.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/VIETTINBANK.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/IVB.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/123go.png",
    "https://movie-booking-project.vercel.app/img/logo-connect/laban.png",
  ];

  const mobileApps = [
    {
      img: "https://movie-booking-project.vercel.app/img/mobile-system/apple-logo.png",
      url: "https://apps.apple.com/vn/app/movie-booking/id644319307",
    },
    {
      img: "https://movie-booking-project.vercel.app/img/mobile-system/android-logo.png",
      url: "https://play.google.com/store/apps/details?id=com.movie.booking",
    },
  ];

  const socialMedia = [
    {
      img: "https://movie-booking-project.vercel.app/img/media/facebook-logo.png",
      url: "https://cgv.vn",
    },
    {
      img: "https://movie-booking-project.vercel.app/img/media/zalo-logo.png",
      url: "https://cgv.vn",
    },
  ];

  return (
    <footer className="bg-[#212121] text-white">
      <div className="container">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-6">
          {/* TIX Section */}
          <div className="space-y-3">
            <h1 className="uppercase">TIX</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2">
              {["FAQ", "Terms of use", "Guidelines", "Privacy Policy"].map(
                (text, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-gray-500 hover:text-gray-300 duration-300"
                  >
                    {text}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Partners Section */}
          <div className="space-y-3">
            <h1 className="uppercase">Partners</h1>
            <ul className="grid grid-cols-4 gap-3">
              {logos.map((logo, index) => (
                <li
                  className="grayscale hover:grayscale-0 duration-300"
                  key={index}
                >
                  <a
                    href="https://www.cgv.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-10 h-10"
                      src={logo}
                      alt={`Partner ${index}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Apps Section */}
          <div className="space-y-3">
            <h1 className="uppercase">Mobile Apps</h1>
            <ul className="grid grid-cols-4 gap-3">
              {mobileApps.map((app, index) => (
                <li key={index}>
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    <img
                      className="w-10 h-10"
                      src={app.img}
                      alt={`App ${index}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3">
            <h1 className="uppercase">Social</h1>
            <ul className="grid grid-cols-4 gap-3">
              {socialMedia.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-10 h-10"
                      src={social.img}
                      alt={`Social ${index}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white"></div>

        {/* Footer Bottom */}
        <div className="py-6 grid lg:flex flex-row gap-12">
          <div className="basis-1/6">
            <img
              src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg"
              alt="Logo"
              className="mx-auto md:mx-0 rounded-lg w-24"
            />
          </div>
          <div className="basis-4/6 space-y-3 text-center md:text-justify">
            <h1 className="uppercase font-bold">
              Cyber Cinema – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN GP04
            </h1>
            <div className="text-sm space-y-1">
              <p>
                Địa chỉ: 366 Đ. Phan Văn Trị, Phường 5, Gò Vấp, Hồ Chí Minh,
                Việt Nam.
              </p>
              <p>Giấy chứng nhận đăng ký kinh doanh số: 19001560,</p>
              <p>
                đăng ký thay đổi lần thứ 32, ngày 20 tháng 04 năm 2024 do Sở kế
                hoạch và đầu tư TPHCM cấp.
              </p>
              <p>Số Điện Thoại (Hotline): 19001560</p>
            </div>
          </div>
          <div className="basis-1/6">
            <img
              src="https://movie-booking-project.vercel.app/img/media/certificate.png"
              alt="Certificate"
              className="mx-auto md:mx-0 w-24"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
