import Image from "next/image";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-footer__top">
        <div className="footer-info">
          <figure className="footer-info__logo">
            <Image
              src="/images/logo2.png"
              alt="Ultimate Autoshop"
              width={80}
              height={80}
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
          </figure>
          <p>
            Hubungi kami segera dan team kami akan dengan senang hati memberikan
            konsultasi gratis &amp; demo produk
          </p>
          <div className="footer-info__field">
            <input type="text" placeholder="Send a message on WhatsApp" />
            <a
              href="https://wa.me/6289513301689"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-icon-link"
            >
              <Image
                src="/images/icons/wa.png"
                alt="WhatsApp"
                width={45}
                height={45}
                style={{ width: "45px", height: "45px" }}
              />
            </a>
          </div>
        </div>

        <address className="footer-address-wrapper">
          <ul className="footer-address">
            <li className="footer-address__ic-location">
              <strong style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Cabang 1:</strong>
              <a
                href="https://maps.app.goo.gl/hQoRy71nMUxXfdo29"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-map-marker-alt" style={{ marginRight: 8 }}></i>
                Jl Bukit Umbul No 2A, Sumurboto, Banyumanik, Kota Semarang
              </a>
            </li>
            <li className="footer-address__ic-location" style={{ marginTop: "15px" }}>
              <strong style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Cabang 2:</strong>
              <a
                href="https://maps.app.goo.gl/x7KzvNX7qousG3Ri8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-map-marker-alt" style={{ marginRight: 8 }}></i>
                Ruko, Jl. Padma Boulevard No.6 AA 2, Tambakharjo, Kec. Semarang Barat, Kota Semarang
              </a>
            </li>
            <li className="footer-address__ic-phone" style={{ marginTop: "15px" }}>
              <a href="tel:+6289513301689">
                <i className="fas fa-phone" style={{ marginRight: 8 }}></i>
                0895-1330-1689
              </a>
            </li>
          </ul>

          <ul className="footer-socials">
            <li>
              <a
                href="https://www.instagram.com/ultimateautoshopsemarang"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@ultadmin"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@ultimateautoshopsemarang"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/ultimateautoshopsemarang"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tokopedia.com/ultimateautoshopsemarang"
                target="_blank"
                rel="noopener noreferrer"
                title="Tokopedia"
              >
                <i className="fas fa-store"></i>
              </a>
            </li>
          </ul>
        </address>
      </div>
    </footer>
  );
}
