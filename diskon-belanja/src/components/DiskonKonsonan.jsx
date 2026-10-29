// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const DiskonKonsonan = () => {
  // 1. Inisialisasi State
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  // 2. Handler saat tombol diklik
  const handleHitungDiskon = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);
    
    // Validasi input
    if (isNaN(harga) || harga <= 0 || !namaPelanggan.trim()) {
      alert('Harap masukkan total harga dan nama pelanggan dengan benar!');
      return;
    }

    // A. Menghitung Jumlah Huruf Konsonan
    // Regex /[bcdfghjklmnpqrstvwxyz]/gi memastikan hanya huruf konsonan alfabet yang terhitung (angka/simbol diabaikan)
    const konsonanMatch = namaPelanggan.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    const jumlahKonsonan = konsonanMatch ? konsonanMatch.length : 0;

    // B. Menghitung Jumlah Kata
    const kataArray = namaPelanggan.trim().split(/\s+/);
    const jumlahKata = kataArray.length;

    // C. Logika Perhitungan Diskon
    let diskonPersen = jumlahKonsonan * 2; // 2% per huruf konsonan

    // Bonus 5% jika lebih dari 2 kata
    if (jumlahKata > 2) {
      diskonPersen += 5;
    }

    // Maksimal total diskon adalah 20%
    if (diskonPersen > 20) {
      diskonPersen = 20;
    }

    // D. Perhitungan Harga
    const totalPotongan = (harga * diskonPersen) / 100;
    const hargaAkhir = harga - totalPotongan;

    // Simpan hasil ke State untuk dirender
    setHasil({
      jumlahKonsonan,
      jumlahKata,
      diskonPersen,
      totalPotongan,
      hargaAkhir
    });
  };

  return (
    <div className="container">
      <h2>Program Diskon Huruf Konsonan</h2>
      <form onSubmit={handleHitungDiskon}>
        <div className="form-group">
          <label className="label">Total Harga Pembelian (Rp):</label>
          <input
            type="number"
            className="input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Contoh: 150000"
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
            placeholder="Contoh: Muhammad Ali"
            required
          />
        </div>

        <button type="submit" className="button">Hitung Diskon</button>
      </form>

      {/* Render Kondisional Hasil Kalkulasi */}
      {hasil && (
        <div className="result">
          <h3>Rincian Diskon:</h3>
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.diskonPersen}%</p>
          <p><strong>Total Potongan Harga:</strong> Rp {hasil.totalPotongan.toLocaleString('id-ID')}</p>
          <p><strong>Harga Pembelian Setelah Diskon:</strong> Rp {hasil.hargaAkhir.toLocaleString('id-ID')}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;