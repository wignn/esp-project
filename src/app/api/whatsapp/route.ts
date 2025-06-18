import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

type Status = "AMAN" | "WASPADA" | "BAHAYA";

interface SensorData {
  ketinggianAir: number;
  status: Status;
}

interface ApiResponse {
  message?: string;
  data?: SensorData;
  error?: string;
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const body: SensorData = await req.json();
    const { ketinggianAir, status }: SensorData = body;

    await prisma.report.create({
      data: {
        ketinggian: Number(ketinggianAir),
        status: status,
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    if (status == "WASPADA" || status == "BAHAYA") {
      const user = await prisma.client.findMany();
      for (const u of user) {
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/api/send-message`, {
            number: u.phone,
            message: `⚠️ ${
              status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
            }! Ketinggian air saat ini mencapai ${ketinggianAir} cm. Harap bersiap dan perhatikan kondisi sekitar.`,
          })
          .catch((error) => {
            console.error(`Gagal kirim ke ${u.phone}:`, error.message);
          });
      }
    }

    return NextResponse.json(
      {
        message: "Data berhasil diterima",
        data: { ketinggianAir, status },
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
