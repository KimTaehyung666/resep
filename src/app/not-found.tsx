import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <p className="text-6xl">🍳</p>
      <h1 className="mt-4 text-3xl font-bold">Resep tidak ditemukan</h1>
      <p className="mt-2 text-stone-500">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-red-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
      >
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
