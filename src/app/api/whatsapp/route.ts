import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

interface SensorData {
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
    const {ketinggianAir }: SensorData = body;
    const user = await prisma.client.findMany();

    for (const u of user) {
      const message = `⚠️ Waspada! Ketinggian air saat ini mencapai ${ketinggianAir} cm. Harap bersiap dan perhatikan kondisi sekitar.`;

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-message`, {
          number: u.phone,
          message,
        })
        .catch((error) => {
          console.error(`Gagal kirim ke ${u.phone}:`, error.message);
        });
    }



    return NextResponse.json(
      {
        message: "Data berhasil diterima",
        data: {ketinggianAir },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
