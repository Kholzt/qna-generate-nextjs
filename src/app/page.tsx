"use client";

import { useState } from "react";
import {
    ClipboardCheck,
    Send,
    Loader2,
    BookOpen,
    HelpCircle,
    Plus,
    GraduationCap,
    Calculator,
    FileQuestion
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // States for form fields
    const [jenjang, setJenjang] = useState("");
    const [kelas, setKelas] = useState("");
    const [mapel, setMapel] = useState("");
    const [customMapel, setCustomMapel] = useState("");
    const [topik, setTopik] = useState("");
    const [tipe, setTipe] = useState("PG");
    const [jumlah, setJumlah] = useState(10);
    const [kesulitan, setKesulitan] = useState("Level Standar");

    // Constants for mapping
    const kelasOptions: Record<string, string[]> = {
        "SD": ["1", "2", "3", "4", "5", "6"],
        "SMP": ["7", "8", "9"],
        "SMA": ["10", "11", "12"]
    };

    const mapelOptions: Record<string, { label: string; value: string }[]> = {
        "SD": [
            { label: "Matematika", value: "Matematika" },
            { label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
            { label: "IPA", value: "IPA" },
            { label: "IPS", value: "IPS" },
            { label: "PPKn", value: "PPKn" },
            { label: "Seni Budaya", value: "Seni Budaya" },
            { label: "PJOK", value: "PJOK" },
            { label: "Pendidikan Agama Islam", value: "Pendidikan Agama Islam" },
            { label: "Pendidikan Agama Kristen", value: "Pendidikan Agama Kristen" },
            { label: "Lainnya (Tulis Manual)...", value: "custom" }
        ],
        "SMP": [
            { label: "Matematika", value: "Matematika" },
            { label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
            { label: "Bahasa Inggris", value: "Bahasa Inggris" },
            { label: "IPA", value: "IPA" },
            { label: "IPS", value: "IPS" },
            { label: "PPKn", value: "PPKn" },
            { label: "Seni Budaya", value: "Seni Budaya" },
            { label: "Prakarya", value: "Prakarya" },
            { label: "PJOK", value: "PJOK" },
            { label: "Informatika", value: "Informatika" },
            { label: "Pendidikan Agama Islam", value: "Pendidikan Agama Islam" },
            { label: "Pendidikan Agama Kristen", value: "Pendidikan Agama Kristen" },
            { label: "Lainnya (Tulis Manual)...", value: "custom" }
        ],
        "SMA": [
            { label: "Matematika Wajib", value: "Matematika Wajib" },
            { label: "Matematika Peminatan", value: "Matematika Peminatan" },
            { label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
            { label: "Bahasa Inggris", value: "Bahasa Inggris" },
            { label: "Fisika", value: "Fisika" },
            { label: "Kimia", value: "Kimia" },
            { label: "Biologi", value: "Biologi" },
            { label: "Ekonomi", value: "Ekonomi" },
            { label: "Sosiologi", value: "Sosiologi" },
            { label: "Geografi", value: "Geografi" },
            { label: "Sejarah", value: "Sejarah" },
            { label: "PPKn", value: "PPKn" },
            { label: "Seni Budaya", value: "Seni Budaya" },
            { label: "Informatika", value: "Informatika" },
            { label: "Pendidikan Agama Islam", value: "Pendidikan Agama Islam" },
            { label: "Pendidikan Agama Kristen", value: "Pendidikan Agama Kristen" },
            { label: "Lainnya (Tulis Manual)...", value: "custom" }
        ]
    };

    const handleGenerate = async () => {
        const finalMapel = mapel === "custom" ? customMapel : mapel;

        if (!jenjang || !topik || !kelas || !finalMapel) {
            alert("Harap lengkapi semua data formulir");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jenjang,
                    kelas,
                    mapel: finalMapel,
                    topik,
                    tipe,
                    jumlah,
                    kesulitan
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setResult(data.questions);
        } catch (error: any) {
            alert("Gagal membuat soal: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center">
            <div className="w-full max-w-6xl p-4 md:p-8 space-y-6">

                {/* Header Section */}
                <header className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 md:p-8 text-white shadow-lg flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl border border-white/30 backdrop-blur-sm">
                        <ClipboardCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Pembuat Soal Otomatis</h1>
                        <p className="text-white/80 text-sm md:text-base">Buat Soal, Kunci Jawaban, dan Kisi-kisi dalam Sekejap dengan AI.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Form Left Side */}
                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">

                        {/* Jenjang */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-indigo-500" /> Jenjang Pendidikan
                            </label>
                            <select
                                value={jenjang}
                                onChange={(e) => {
                                    setJenjang(e.target.value);
                                    setKelas(""); // Reset kelas when jenjang changes
                                    setMapel(""); // Reset mapel
                                    setCustomMapel("");
                                }}
                                className="input-field cursor-pointer"
                            >
                                <option value="">Pilih Jenjang...</option>
                                <option value="SD">SD / MI</option>
                                <option value="SMP">SMP / MTs</option>
                                <option value="SMA">SMA / MA / SMK</option>
                            </select>
                        </div>

                        {/* Kelas - Conditional */}
                        {jenjang && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-indigo-500" /> Pilih Kelas
                                </label>
                                <select
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    className="input-field cursor-pointer"
                                >
                                    <option value="">Pilih Kelas...</option>
                                    {kelasOptions[jenjang]?.map((k) => (
                                        <option key={k} value={k}>Kelas {k}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Mata Pelajaran - Conditional */}
                        {kelas && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-500" /> Mata Pelajaran
                                </label>
                                <select
                                    value={mapel}
                                    onChange={(e) => {
                                        setMapel(e.target.value);
                                        if (e.target.value !== "custom") setCustomMapel("");
                                    }}
                                    className="input-field cursor-pointer"
                                >
                                    <option value="">Pilih Mata Pelajaran...</option>
                                    {jenjang && mapelOptions[jenjang]?.map((m) => (
                                        <option key={m.value} value={m.value}>{m.label}</option>
                                    ))}
                                </select>

                                {mapel === "custom" && (
                                    <input
                                        type="text"
                                        placeholder="Tulis Mata Pelajaran..."
                                        value={customMapel}
                                        onChange={(e) => setCustomMapel(e.target.value)}
                                        className="input-field mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
                                    />
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Send className="w-4 h-4 text-indigo-500" /> Topik / Materi Spesifik
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Ekosistem Laut"
                                value={topik}
                                onChange={(e) => setTopik(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Tipe</label>
                                <select
                                    value={tipe}
                                    onChange={(e) => setTipe(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="PG">PG</option>
                                    <option value="PG Kompleks">PG Kompleks</option>
                                    <option value="Menjodohkan">Menjodohkan</option>
                                    <option value="Benar/Salah">Benar/Salah</option>
                                    <option value="Isian">Isian</option>
                                    <option value="Esai">Esai</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Jumlah</label>
                                <input
                                    type="number"
                                    value={jumlah}
                                    onChange={(e) => setJumlah(parseInt(e.target.value))}
                                    className="input-field text-center"
                                    min="1"
                                    max="50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-indigo-500" /> Kesulitan
                            </label>
                            <select
                                value={kesulitan}
                                onChange={(e) => setKesulitan(e.target.value)}
                                className="input-field"
                            >
                                <option value="Level Dasar">Level Dasar</option>
                                <option value="Level Standar">Level Standar</option>
                                <option value="Level HOTS">Level HOTS</option>
                                <option value="Lengkap C1 - C6">Lengkap C1 - C6</option>
                            </select>
                            <p className="text-[10px] text-slate-400 italic leading-relaxed pt-1">
                                *Komposisi 30% C1-C2, 50% C3, 20% C4 (Analisis). Seimbang untuk ujian sekolah.
                            </p>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={loading || !jenjang || !topik || !kelas || !mapel}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all shadow-md",
                                loading || !jenjang || !topik || !kelas || !mapel
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white active:scale-[0.98]"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Membuat Soal...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Buat Soal Sekarang
                                </>
                            )}
                        </button>
                    </div>

                    {/* Result Right Side */}
                    <div className="lg:col-span-8 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-start min-h-[500px]">
                        {!result && !loading && (
                            <div className="my-auto text-center space-y-4 max-w-sm">
                                <div className="bg-slate-50 p-6 rounded-full inline-block">
                                    <FileQuestion className="w-12 h-12 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Belum ada soal</h3>
                                <p className="text-slate-500 text-sm">
                                    Isi formulir di samping untuk mulai membuat naskah soal otomatis.
                                </p>
                            </div>
                        )}

                        {loading && (
                            <div className="my-auto flex flex-col items-center gap-4 text-center">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
                                    <Loader2 className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                </div>
                                <div>
                                    <p className="text-slate-800 font-bold text-lg">Gemini Berpikir...</p>
                                    <p className="text-slate-500 text-sm animate-pulse">Merancang soal berkualitas sesuai kurikulum...</p>
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-900 leading-none">Hasil Naskah Soal</h2>
                                        <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider font-semibold">
                                            {mapel} • Kelas {kelas} {jenjang}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => window.print()}
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 transition-colors flex items-center gap-2"
                                    >
                                        <ClipboardCheck className="w-4 h-4" /> Cetak / PDF
                                    </button>
                                </div>
                                <div className="space-y-12">
                                    {result.map((q: any, idx: number) => (
                                        <div key={idx} className="relative pl-12 group">
                                            {/* Circular Number */}
                                            <div className="absolute left-0 top-0 w-9 h-9 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                                                {idx + 1}
                                            </div>

                                            <div className="space-y-4">
                                                {/* Stimulus / Context box */}
                                                {q.context && (
                                                    <div className="p-4 bg-slate-50 border-l-4 border-indigo-400 rounded-r-xl italic text-slate-600 text-[15px] leading-relaxed shadow-sm">
                                                        {q.context}
                                                    </div>
                                                )}

                                                {/* Question Text */}
                                                <p className="font-bold text-slate-800 text-[17px] leading-relaxed">
                                                    {q.question}
                                                </p>

                                                {/* Options Layout */}
                                                {q.options ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {q.options.map((opt: string, i: number) => {
                                                            const label = String.fromCharCode(65 + i);
                                                            return (
                                                                <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:bg-slate-50 transition-all cursor-default relative overflow-hidden group/opt min-h-[60px]">
                                                                    <span className="font-black text-indigo-600 text-sm mt-0.5">{label}.</span>
                                                                    <span className="text-slate-700 text-[15px] leading-tight flex-1">
                                                                        {opt}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Answer Key & Explanation Section */}
                                <div id="answer-key-section" className="mt-20 pt-10 border-t-2 border-dashed border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="flex items-center gap-3 mb-8 bg-violet-50 p-4 rounded-2xl border border-violet-100">
                                        <div className="bg-violet-600 p-2 rounded-lg text-white">
                                            <Calculator className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Kunci Jawaban & Pembahasan</h2>
                                    </div>

                                    <div className="space-y-8">
                                        {result.map((q: any, idx: number) => (
                                            <div key={idx} className="flex gap-4 group">
                                                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center font-black text-sm group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                                    {idx + 1}
                                                </div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Jawaban:</span>
                                                        <span className="font-extrabold text-indigo-600 text-[15px]">{q.answer}</span>
                                                    </div>
                                                    {q.explanation && (
                                                        <p className="text-[14px] text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-3">
                                                            {q.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <footer className="text-center py-8">
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                        © 2026 Pembuat Soal Otomatis • Powered by <span className="text-indigo-500 font-bold">Gemini AI</span>
                    </p>
                </footer>
            </div>

            <style jsx global>{`
                @media print {
                  header, .lg\:col-span-4, footer, button, .text-green-700 {
                    display: none !important;
                  }
                  .lg\:col-span-8 {
                    width: 100% !important;
                    box-shadow: none !important;
                    border: none !important;
                    padding: 0 !important;
                  }
                  body {
                    background: white !important;
                  }
                  .pl-12 {
                    padding-left: 2.5rem !important;
                    margin-bottom: 2rem !important;
                  }
                  #answer-key-section {
                    break-before: page;
                    margin-top: 0 !important;
                    padding-top: 0 !important;
                    border-top: none !important;
                  }
                }
            `}</style>
        </main>
    );
}
