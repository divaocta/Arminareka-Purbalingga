import './Profile.css'

function Profile() {
  return (
    <main className="profile">
      {/* TENTANG ARMINAREKA PURBALINGGA */}
      <section className="profile-branch">
        <div className="profile-branch-content">
          <p className="profile-label">
            TENTANG ARMINAREKA PURBALINGGA
          </p>

          <h2>
            Melayani Jamaah Lebih Dekat
            dari Purbalingga
          </h2>

          <p>
            Arminareka Purbalingga merupakan bagian dari
            PT Arminareka Perdana yang bergerak dalam
            pelayanan perjalanan ibadah Umroh dan Haji Plus.
          </p>

          <p>
            Kehadiran cabang Purbalingga bertujuan untuk
            memberikan kemudahan bagi masyarakat sekitar
            dalam memperoleh informasi, mempersiapkan
            perjalanan ibadah, serta mendapatkan pendampingan
            selama proses keberangkatan.
          </p>

          <div className="profile-branch-points">
            <div>
              <strong>01</strong>
              <span>Informasi Paket Umroh</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Pendampingan Jamaah</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Pelayanan Cabang Purbalingga</span>
            </div>
          </div>
        </div>

        <div className="profile-branch-image">
          <img
            src="/pemandangan.jpg"
            alt="Pemandangan alam"
          />
        </div>
      </section>

      {/* TENTANG ARMINAREKA PERDANA */}
      <section className="profile-about">
        <div className="profile-about-video">
          <iframe
            src="https://www.youtube-nocookie.com/embed/k7tR0y4PFHY"
            title="Video Arminareka Perdana"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <div className="profile-about-content">
          <p className="profile-label">
            TENTANG ARMINAREKA PERDANA
          </p>

          <h2>
            Berpengalaman Mendampingi
            Perjalanan Ibadah
          </h2>

          <p>
            PT. Arminareka Perdana merupakan perusahaan yang
            bergerak di bidang perjalanan ibadah Umroh dan Haji
            Plus. Berdiri sejak tahun 1990, Arminareka Perdana
            telah memiliki pengalaman lebih dari 30 tahun dalam
            melayani dan mendampingi jamaah dalam perjalanan
            menuju Tanah Suci.
          </p>

          <p>
            Dalam menjalankan pelayanannya, Arminareka Perdana
            berkomitmen untuk membantu masyarakat dalam
            mempersiapkan perjalanan ibadah dengan memberikan
            pelayanan dan pendampingan kepada calon jamaah.
          </p>

          <div className="profile-stats">
            <div className="profile-stat">
              <strong>30+</strong>
              <span>Tahun Pengalaman</span>
            </div>

            <div className="profile-stat">
              <strong>1990</strong>
              <span>Tahun Berdiri</span>
            </div>

            <div className="profile-stat">
              <strong>Umroh</strong>
              <span>& Haji Plus</span>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="profile-vision">
        <div className="vision-header">
          <p>VISI & MISI</p>

          <h2>
            Mewujudkan Perjalanan Ibadah
            yang Bermakna
          </h2>
        </div>

        <div className="vision-content">
          {/* VISI */}
          <div className="vision-box">
            <h3>Visi</h3>

            <p>
              Mengajak keluarga dan masyarakat melaksanakan
              ibadah Haji dan Umrah.
            </p>
          </div>

          {/* MISI */}
          <div className="mission-box">
            <div className="mission-title">
              <h3>Misi</h3>
            </div>

            <div className="mission-item">
              <strong>01</strong>

              <p>
                Mengajak keluarga & masyarakat melaksanakan
                ibadah Haji dan Umrah.
              </p>
            </div>

            <div className="mission-item">
              <strong>02</strong>

              <p>
                Meningkatkan taraf hidup keluarga dan masyarakat.
              </p>
            </div>

            <div className="mission-item">
              <strong>03</strong>

              <p>
                Memberi solusi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile