import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { kelembapan, suhu, ketinggianAir } = body;

        if (kelembapan === undefined || suhu === undefined || ketinggianAir === undefined) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        console.log("Data diterima:", { kelembapan, suhu, ketinggianAir });

        return NextResponse.json({ message: "Data berhasil diterima", data: { kelembapan, suhu, ketinggianAir } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}