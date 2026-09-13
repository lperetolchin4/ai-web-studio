import { NextResponse } from "next/server";

const requestLog = new Map<string, number>();

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

    const now = Date.now();
    const lastRequestTime = requestLog.get(ip);

    if (lastRequestTime && now - lastRequestTime < 10_000) {
      return NextResponse.json(
        {
          success: false,
          message: "Слишком много запросов. Попробуйте позже.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      name,
      phone,
      objectType,
      area,
      repairType,
      startTime,
      minPrice,
      maxPrice,
    } = body;

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Некорректное имя",
        },
        { status: 400 }
      );
    }

    if (typeof phone !== "string" || !isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Некорректный телефон",
        },
        { status: 400 }
      );
    }

    if (
      typeof area !== "number" ||
      !Number.isFinite(area) ||
      area < 10 ||
      area > 500
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Некорректная площадь",
        },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram environment variables are missing");

      return NextResponse.json(
        {
          success: false,
          message: "Telegram не настроен",
        },
        { status: 500 }
      );
    }

    const message = `
Новая заявка с сайта

Имя: ${name.trim()}
Телефон: ${phone.trim()}

Объект: ${objectType || "Не указан"}
Площадь: ${area} м²
Тип ремонта: ${repairType || "Не указан"}
Начало работ: ${startTime || "Не указано"}

Предварительный расчёт:
${minPrice || "—"} – ${maxPrice || "—"} ₽
    `.trim();

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();

      console.error("Telegram error:", errorText);

      return NextResponse.json(
        {
          success: false,
          message: "Ошибка отправки в Telegram",
        },
        { status: 500 }
      );
    }

    requestLog.set(ip, now);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Lead API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Ошибка сервера",
      },
      { status: 500 }
    );
  }
}