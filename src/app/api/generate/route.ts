import {GoogleGenAI} from '@google/genai';

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { jenjang, kelas, mapel, topik, tipe, jumlah, kesulitan } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Gemini tidak ditemukan." }, { status: 500 });
    }

    const genAI = new GoogleGenAI({apiKey});

    const prompt = `
      Anda adalah pakar pendidik profesional yang ahli dalam menyusun soal kurikulum Indonesia (Merdeka/K13).
      Buatkan ${jumlah} soal ${tipe} untuk:
      - Jenjang: ${jenjang}
      - Kelas: ${kelas}
      - Mata Pelajaran: ${mapel}
      - Topik: "${topik}"
      - Tingkat Kesulitan: ${kesulitan}

      PENTING:
      1. Jika ini soal HOTS, sertakan "context" (stimulus/bacaan/suasana) yang relevan sebelum pertanyaan.
      2. Untuk tipe PG, berikan 4 opsi (A, B, C, D) yang mengecoh namun logis.
      3. Gunakan bahasa Indonesia yang formal, baku, dan mudah dipahami sesuai usia jenjang.
      4. Komposisi 30% C1-C2, 50% C3, 20% C4 (Analisis). Seimbang untuk ujian sekolah.
      Gunakan format JSON murni:
      {
        "questions": [
          {
            "context": "teks bacaan atau stimulus (opsional)",
            "question": "teks pertanyaan di sini",
            "options": ["opsi A", "opsi B", "opsi C", "opsi D"],
            "answer": "jawaban yang benar",
            "explanation": "pembahasan singkat terkait jawaban tersebut"
          }
        ]
      }

      Pastikan output HANYA JSON.
    `;

    const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json",
        }
    });

    const text = result.text || "";
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json({ error: "Format respons AI tidak valid." }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
