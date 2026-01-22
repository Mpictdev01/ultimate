-- Migration script to populate 'articles' table with initial data
-- Run this in Supabase SQL Editor

INSERT INTO articles (title, slug, excerpt, content, image_url, published_date, published)
VALUES
  (
    'Spesialis Bengkel Lampu Mobil Di Semarang',
    'spesialis-bengkel-lampu-mobil',
    'Ultimate Autoshop Semarang, bengkel spesialis lampu mobil terpercaya, menyediakan layanan pemasangan lampu tembus hujan, anti silau, dan variasi lampu projie. Kami siap meningkatkan performa dan tampilan mobil Anda dengan solusi pencahayaan terbaik....',
    '<p>Ultimate Autoshop Semarang, bengkel spesialis lampu mobil terpercaya, menyediakan layanan pemasangan lampu tembus hujan, anti silau, dan variasi lampu projie. Kami siap meningkatkan performa dan tampilan mobil Anda dengan solusi pencahayaan terbaik.</p><p>Kami melayani berbagai jenis mobil dan memberikan garansi untuk setiap pemasangan. Hubungi kami untuk konsultasi lebih lanjut.</p>',
    '/images/portfolio/13.png',
    '2024-08-20',
    true
  ),
  (
    'Tren Modifikasi Diesel di Indonesia 2024',
    'tren-modifikasi-diesel-2024',
    'Dari Cumi hingga Teknologi Lampu BiLED. Modifikasi mobil diesel di Indonesia telah menjadi tren yang berkembang pesat, dengan semakin banyak penggemar otomotif yang tertarik untuk mengubah kendaraan mereka agar lebih bertenaga, berpenampilan garang, dan lebih fungsional...',
    '<p>Dari Cumi hingga Teknologi Lampu BiLED. Modifikasi mobil diesel di Indonesia telah menjadi tren yang berkembang pesat, dengan semakin banyak penggemar otomotif yang tertarik untuk mengubah kendaraan mereka agar lebih bertenaga, berpenampilan garang, dan lebih fungsional.</p><p>Salah satu tren utama adalah penggunaan lampu BiLED yang tajam dan fokus, sangat cocok untuk perjalanan malam hari.</p>',
    '/images/portfolio/16.png',
    '2024-09-10',
    true
  ),
  (
    'Solusi Lampu Mobil Terang untuk Liburan Bersama Keluarga Saat Musim Hujan',
    'solusi-lampu-mobil-musim-hujan',
    'Musim hujan tidak seharusnya menjadi halangan untuk liburan bersama keluarga, terutama ketika destinasi wisata alam pegunungan menjadi pilihan',
    '<p>Musim hujan tidak seharusnya menjadi halangan untuk liburan bersama keluarga, terutama ketika destinasi wisata alam pegunungan menjadi pilihan. Pencahayaan yang baik sangat krusial untuk keselamatan.</p><p>Lampu kabut (foglamp) BiLED adalah solusi tepat untuk menembus hujan deras dan kabut tebal, memastikan perjalanan keluarga Anda aman dan nyaman.</p>',
    '/images/portfolio/18.png',
    '2024-09-19',
    true
  );
