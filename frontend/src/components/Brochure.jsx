
import { useState } from "react";
import "./Brochure.css";

const brochures = [
  {
    image: "/brosur1.png",
    title: "Profil Arminareka",
    description: "Informasi perusahaan dan layanan Arminareka."
  },
  {
    image: "/brosur2.png",
    title: "Paket Umroh",
    description: "Informasi pilihan paket perjalanan umroh."
  },
  {
    image: "/brosur3.png",
    title: "Haji Plus",
    description: "Informasi layanan dan program Haji Plus."
  }
];

function Brochure() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="brochure-section">
      <div className="brochure-container">
        <div className="brochure-heading">
          <span>INFORMASI LAYANAN</span>
          <h2>Brosur Arminareka Purbalingga</h2>
          <p>
            Temukan informasi perusahaan, paket umroh,
            dan layanan Haji Plus melalui brosur berikut.
          </p>
        </div>

        <div className="brochure-grid">
          {brochures.map((item, index) => (
            <div className="brochure-card" key={index}>
              <button
                className="brochure-image-button"
                onClick={() => setSelectedImage(item.image)}
                aria-label={`Perbesar ${item.title}`}
              >
                <img src={item.image} alt={item.title} />
              </button>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <button
                className="brochure-view-button"
                onClick={() => setSelectedImage(item.image)}
              >
                Lihat Brosur
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="brochure-modal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="brochure-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Tutup brosur"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Brosur Arminareka"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export default Brochure;
