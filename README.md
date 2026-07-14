# 💳 Kasir Pintar

Aplikasi Kasir Online sederhana untuk manajemen penjualan dan transaksi.

## 🎯 Fitur

- ✅ Pilih produk dan tambahkan ke keranjang
- ✅ Lihat daftar produk dengan harga
- ✅ Hitung subtotal, pajak (10%), dan total
- ✅ Berikan diskon pada transaksi
- ✅ Berbagai metode pembayaran (Tunai, Kartu, Transfer, E-Wallet)
- ✅ Hitung kembalian otomatis untuk pembayaran tunai
- ✅ Riwayat transaksi tersimpan di LocalStorage
- ✅ Interface responsif untuk desktop dan mobile

## 📦 Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

## 🚀 Cara Menggunakan

1. Clone repository ini:
   ```bash
   git clone https://github.com/enakaku12-ctrl/kasir_alor.git
   ```

2. Buka file `index.html` di browser Anda

3. Gunakan aplikasi:
   - Klik produk untuk menambahkan ke keranjang
   - Atur jumlah atau hapus item dari keranjang
   - Masukkan diskon jika ada
   - Klik "Checkout" untuk proses pembayaran
   - Pilih metode pembayaran
   - Selesaikan transaksi

## 💰 Produk Tersedia

- ☕ Kopi - Rp 12.000
- 🍵 Teh - Rp 8.000
- 🍫 Coklat - Rp 15.000
- 🍩 Donat - Rp 10.000
- 🍰 Kue - Rp 20.000
- 🥐 Roti - Rp 5.000
- 🥪 Sandwich - Rp 25.000
- 🥤 Minuman - Rp 6.000

## 📝 Fitur Pembayaran

### Metode Pembayaran:
1. **Tunai** - Masukkan jumlah uang untuk hitung kembalian
2. **Kartu Debit/Kredit** - Pembayaran langsung
3. **Transfer Bank** - Informasi transfer
4. **E-Wallet** - Pembayaran digital

## 💾 Penyimpanan Data

Semua transaksi disimpan di LocalStorage browser. Akses data transaksi melalui:
```javascript
JSON.parse(localStorage.getItem('transactions'))
```

## 🎨 Desain

- Gradient background modern
- Responsive layout (mobile-first)
- Smooth animations dan transitions
- User-friendly interface

## 🔄 Pengembangan Lanjutan

Rencana fitur di masa depan:
- Backend database
- User authentication
- Laporan penjualan
- Export invoice
- Multi-user support
- Inventory management

## 📄 Lisensi

MIT License

## 👨‍💻 Developer

enakaku12-ctrl

---

Made with ❤️ for better cashier management