import { prisma } from "@/lib/prisma";
import axios from "axios";
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
        const user = await prisma.client.findMany()

        for (const key in user) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-message`,  {
                number: user[key].phone,
                message: `Kelembapan: ${kelembapan}%, Suhu: ${suhu}°C, Ketinggian Air: ${ketinggianAir} cm`
            }).catch((error) => {
                console.error("Error sending message:", error);
            })
        }

        console.log("Data diterima:", { kelembapan, suhu, ketinggianAir });

        return NextResponse.json({ message: "Data berhasil diterima", data: { kelembapan, suhu, ketinggianAir } }, { status: 200 });
    } catch (error: unknown) {
        console.log("Error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}