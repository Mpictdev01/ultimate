"use client";

import { useState } from "react";
import Image from "next/image";

const branches = [
  {
    name: "Cabang 1",
    address: "Jl Bukit Umbul No 2A, Sumurboto, Banyumanik, Kota Semarang",
    mapsUrl: "https://maps.app.goo.gl/hQoRy71nMUxXfdo29",
  },
  {
    name: "Cabang 2",
    address: "Ruko, Jl. Padma Boulevard No.6 AA 2, Tambakharjo, Kec. Semarang Barat, Kota Semarang",
    mapsUrl: "https://maps.app.goo.gl/x7KzvNX7qousG3Ri8",
  },
];

export default function FloatingButtons() {
  const [showMapsModal, setShowMapsModal] = useState(false);

  return (
    <>
      <div className="floating-buttons">
        <button
          className="floating-btn"
          onClick={() => setShowMapsModal(true)}
          title="Open in Google Maps"
        >
          <Image
            src="/images/icons/map.png"
            alt="Google Maps"
            width={55}
            height={55}
          />
        </button>
        <a
          href="https://wa.me/6289513301689"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn"
          title="Chat with us on WhatsApp"
        >
          <Image
            src="/images/icons/wa.png"
            alt="WhatsApp"
            width={55}
            height={55}
          />
        </a>
      </div>

      {/* Maps Branch Selection Modal */}
      {showMapsModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setShowMapsModal(false)}
          />
          <div className="branch-modal">
            <div className="branch-modal__header">
              <h3>Pilih Lokasi Cabang</h3>
              <button
                className="branch-modal__close"
                onClick={() => setShowMapsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="branch-modal__content">
              {branches.map((branch, index) => (
                <a
                  key={index}
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="branch-card"
                  onClick={() => setShowMapsModal(false)}
                >
                  <div className="branch-card__icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="branch-card__info">
                    <h4>{branch.name}</h4>
                    <p>{branch.address}</p>
                  </div>
                  <div className="branch-card__arrow">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
