import { NextResponse } from "next/server";

interface SensorData {
    kelembapan: number;
    suhu: number;
    ketinggianAir: number;
}

interface ApiResponse {
    message?: string;
    data?: SensorData;
    error?: string;
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
    try {
        const body: SensorData = await req.json();
        const { kelembapan, suhu, ketinggianAir }: SensorData = body;

        if (kelembapan === undefined || suhu === undefined || ketinggianAir === undefined) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        console.log("Data diterima:", { kelembapan, suhu, ketinggianAir });

        return NextResponse.json({ message: "Data berhasil diterima", data: { kelembapan, suhu, ketinggianAir } }, { status: 200 });
    } catch (error: unknown) {
        console.log("Error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}