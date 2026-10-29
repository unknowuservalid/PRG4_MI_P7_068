// src/components/DiskonPalindrom.jsx
import { useState } from 'react';
import './DiskonPalindrom.css';

const DiskonPalindrom = () => {
  // 1. Inisialisasi State
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  // 2. Handler saat tombol diklik
  const handleCekPromo = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);
    
    // Validasi input
    if (isNaN(harga) || harga <= 0 || !namaPelanggan.trim()) {
      alert('Harap masukkan total harga dan nama pelanggan dengan benar!');
      return;
    }

    // Membersihkan nama dari spasi dan diubah ke huruf kecil semua (case-insensitive)
    const namaBersih = namaPelanggan.replace(/\s+/g, '').toLowerCase();

    // A. Mengecek apakah Palindrom (bisa dibaca sama dari depan/belakang)
    const namaDibalik = namaBersih.split('').reverse().join('');
    const isPalindrom = (namaBersih === namaDibalik) && (namaBersih.length >= 3);

    // B. Menghitung Jumlah Karakter Unik menggunakan Set
    const jumlahKarakterUnik = new Set(namaBersih).size;

    // C. Logika Penentuan Diskon
    let statusNama = '';
    let diskonPersen = 0;

    if (isPalindrom) {
      statusNama = 'Palindrom';
      diskonPersen = 25; // Diskon spesial 25%
    } else {
      statusNama = 'Bukan Palindrom';
      diskonPersen = jumlahKarakterUnik * 1; // 1% per karakter unik
    }

    // D. Kalkulasi Harga Akhir
    const totalPotongan = (harga * diskonPersen) / 100;
    const hargaAkhir = harga - totalPotongan;

    // Menyimpan hasil ke State
    setHasil({
      statusNama,
      jumlahKarakterUnik,
      diskonPersen,
      hargaAkhir
    });
  };

  return (
    <div className="container">
      <h2>Program Diskon Palindrom Nama</h2>
      <form onSubmit={handleCekPromo}>
        <div className="form-group">
          <label className="label">Total Harga Pembelian (Rp):</label>
          <input
            type="number"
            className="input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Contoh: 250000"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Nama Pelanggan:</label>
          <input
            type="text"
            className="input"
            value={namaPelanggan}
            onChange={(e) => setNamaPelanggan(e.target.value)}
            placeholder='Contoh: "Anna", "Bob", atau "Budi"'
            required
          />
        </div>

        <button type="submit" className="button">Cek & Hitung</button>
      </form>

      {/* Render Kondisional Hasil Kalkulasi */}
      {hasil && (
        <div className="result">
          <h3>Hasil Promo:</h3>
          <p><strong>Status Nama:</strong> {hasil.statusNama}</p>
          <p><strong>Jumlah Karakter Unik:</strong> {hasil.jumlahKarakterUnik}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.diskonPersen}%</p>
          <p><strong>Harga Pembelian Setelah Diskon:</strong> Rp {hasil.hargaAkhir.toLocaleString('id-ID')}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonPalindrom;