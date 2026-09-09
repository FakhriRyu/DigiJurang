import type { QuizQuestion } from '../types';

export const LEARNING_OBJECTIVES = [
  {
    title: 'Mengenal Konsep Pengurangan',
    desc: 'Memahami bahwa pengurangan adalah kegiatan mencari selisih atau sisa dari dua bilangan dengan peragaan benda konkret (pipet/sedotan).',
    icon: '➖',
    color: 'bg-rose-500'
  },
  {
    title: 'Pengurangan Berdasarkan Nilai Tempat',
    desc: 'Setiap 1 batang sedotan bernilai sesuai kolomnya: 1 sedotan di Ratusan = 100, di Puluhan = 10, di Satuan = 1.',
    icon: '🎯',
    color: 'bg-amber-500'
  },
  {
    title: 'Pengurangan Dengan Teknik Meminjam',
    desc: 'Saat angka satuan tidak cukup, kita meminjam 1 sedotan dari kolom sebelah kiri (1 sedotan puluhan = 10 satuan, 1 sedotan ratusan = 10 puluhan).',
    icon: '💡',
    color: 'bg-sky-500'
  },
  {
    title: 'Penerapan dalam Kehidupan Sehari-hari',
    desc: 'Mampu menyelesaikan masalah kontekstual sehari-hari, seperti menghitung uang kembalian belanja (contoh uang Dina Rp500 − Rp350).',
    icon: '💰',
    color: 'bg-emerald-500'
  }
];

export const PLACE_VALUE_GUIDE = [
  {
    type: 'satuan',
    title: 'Kolom Satuan (1)',
    value: 1,
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-800',
    tagColor: 'bg-amber-100 text-amber-900',
    icon: '🥢',
    desc: 'Setiap 1 batang sedotan pada kantong Satuan bernilai 1. Selalu kurangkan kolom satuan terlebih dahulu.',
    rule: 'Jika angka satuan atas lebih kecil dari bawah, pinjam 1 sedotan dari kolom puluhan (menjadi 10 satuan).'
  },
  {
    type: 'puluhan',
    title: 'Kolom Puluhan (10)',
    value: 10,
    color: 'from-sky-400 to-blue-600',
    borderColor: 'border-sky-300',
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-800',
    tagColor: 'bg-sky-100 text-sky-900',
    icon: '🥢',
    desc: 'Setiap 1 batang sedotan pada kantong Puluhan bernilai 10. Nilai puluhan berada di kolom tengah.',
    rule: '1 Sedotan Puluhan bernilai sama dengan 10 Sedotan Satuan. Jika dipinjamkan, puluhan berkurang 1 dan satuan bertambah 10.'
  },
  {
    type: 'ratusan',
    title: 'Kolom Ratusan (100)',
    value: 100,
    color: 'from-emerald-400 to-teal-600',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    tagColor: 'bg-emerald-100 text-emerald-900',
    icon: '🥢',
    desc: 'Setiap 1 batang sedotan pada kantong Ratusan bernilai 100. Berada di kolom paling kiri.',
    rule: '1 Sedotan Ratusan bernilai sama dengan 10 Sedotan Puluhan. Jika dipinjamkan, ratusan berkurang 1 dan puluhan bertambah 10.'
  }
];

export const PRESET_EXAMPLES = [
  {
    label: '🟢 Contoh 1: 500 − 200 (Dasar Pengurangan)',
    row1: { ratusan: 5, puluhan: 0, satuan: 0 },
    row2: { ratusan: 2, puluhan: 0, satuan: 0 },
    operation: 'subtraction' as const,
    desc: '5 sedotan ratusan dikurangi 2 sedotan ratusan = 3 sedotan ratusan (300)'
  },
  {
    label: '🔵 Contoh 2: 567 − 234 (Tanpa Meminjam)',
    row1: { ratusan: 5, puluhan: 6, satuan: 7 },
    row2: { ratusan: 2, puluhan: 3, satuan: 4 },
    operation: 'subtraction' as const,
    desc: 'Satuan (7−4=3), Puluhan (6−3=3), Ratusan (5−2=3) = 333'
  },
  {
    label: '🟣 Contoh 3: 352 − 127 (Dengan Meminjam Puluhan)',
    row1: { ratusan: 3, puluhan: 5, satuan: 2 },
    row2: { ratusan: 1, puluhan: 2, satuan: 7 },
    operation: 'subtraction' as const,
    desc: 'Satuan 2 pinjam 1 puluhan jadi 12 (12−7=5), Puluhan jadi 4 (4−2=2) = 225'
  },
  {
    label: '💰 Contoh 4: Rp500 − Rp350 (Uang Kembalian Dina)',
    row1: { ratusan: 5, puluhan: 0, satuan: 0 },
    row2: { ratusan: 3, puluhan: 5, satuan: 0 },
    operation: 'subtraction' as const,
    desc: 'Pinjam 1 sedotan ratusan menjadi 10 sedotan puluhan, tersisa 150'
  },
  {
    label: '➕ Contoh 5: 124 + 233 (Penjumlahan)',
    row1: { ratusan: 1, puluhan: 2, satuan: 4 },
    row2: { ratusan: 2, puluhan: 3, satuan: 3 },
    operation: 'addition' as const,
    desc: 'Operasi penggabungan dua bilangan'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    level: 'Mudah (Satuan & Puluhan)',
    story: 'Dina mempunyai uang Rp500. Ia membeli makanan seharga Rp350. Berapa uang kembalian Dina?',
    num1: 500,
    num2: 350,
    operation: 'subtraction',
    explanation: '500 − 350 = 150. Pinjam 1 sedotan ratusan ke puluhan (10 puluhan − 5 puluhan = 5 puluhan, 4 ratusan − 3 ratusan = 1 ratusan). Jadi kembalian Dina Rp150!'
  },
  {
    id: 'q2',
    level: 'Mudah (Satuan & Puluhan)',
    story: 'Di sebuah toples terdapat 500 batang sedotan peraga. Pak Guru mengambil 200 batang sedotan untuk kelompok belajar. Berapa sisa sedotan di toples?',
    num1: 500,
    num2: 200,
    operation: 'subtraction',
    explanation: '500 − 200 = 300. Pada kolom ratusan 5 sedotan − 2 sedotan = 3 sedotan ratusan (300).'
  },
  {
    id: 'q3',
    level: 'Sedang (Ratusan)',
    story: 'Siswa kelas 2 memiliki 567 sedotan di Kotak 1. Mereka menggunakan 234 sedotan untuk prakarya di Kotak 2. Berapa sedotan yang tersisa di Kotak Hasil?',
    num1: 567,
    num2: 234,
    operation: 'subtraction',
    explanation: '567 − 234 = 333 (Satuan: 7 − 4 = 3, Puluhan: 6 − 3 = 3, Ratusan: 5 − 2 = 3).'
  },
  {
    id: 'q4',
    level: 'Tantangan (Menyimpan)',
    story: 'Toko alat tulis memiliki 352 sedotan di Kotak 1. Pembeli membeli 127 sedotan di Kotak 2. Coba selesaikan dengan teknik meminjam di Papan Jurang!',
    num1: 352,
    num2: 127,
    operation: 'subtraction',
    explanation: '352 − 127 = 225. Satuan 2 sedotan tidak cukup dikurangi 7 sedotan, pinjam 1 sedotan puluhan dari 5 (5 jadi 4, 2 jadi 12). 12 − 7 = 5. Puluhan 4 − 2 = 2. Ratusan 3 − 1 = 2.'
  },
  {
    id: 'q5',
    level: 'Sedang (Ratusan)',
    story: 'Ani memiliki 735 biji manik-manik. Ia memberikan 215 biji kepada temannya. Hitung berapa sisa manik-manik Ani!',
    num1: 735,
    num2: 215,
    operation: 'subtraction',
    explanation: '735 − 215 = 520 (Satuan: 5 − 5 = 0, Puluhan: 3 − 1 = 2, Ratusan: 7 − 2 = 5).'
  }
];
