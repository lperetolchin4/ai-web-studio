"use client";

import { useMemo, useState } from "react";

const objectTypes = [
  { id: "new", label: "Новостройка", multiplier: 1 },
  { id: "secondary", label: "Вторичка", multiplier: 1.12 },
  { id: "house", label: "Дом", multiplier: 1.2 },
  { id: "commercial", label: "Коммерческое помещение", multiplier: 1.08 },
];

const repairTypes = [
  { id: "cosmetic", label: "Косметический", pricePerMeter: 12000 },
  { id: "capital", label: "Капитальный", pricePerMeter: 18000 },
  { id: "turnkey", label: "Под ключ", pricePerMeter: 24000 },
  { id: "designer", label: "Дизайнерский", pricePerMeter: 32000 },
];

const startTimes = [
  "Как можно скорее",
  "В течение месяца",
  "Через 1–3 месяца",
  "Пока изучаю варианты",
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value));
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [objectType, setObjectType] = useState("new");
  const [area, setArea] = useState(60);
  const [repairType, setRepairType] = useState("turnkey");
  const [startTime, setStartTime] = useState("В течение месяца");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState("");

  const calculatedPrice = useMemo(() => {
    const object = objectTypes.find((item) => item.id === objectType);
    const repair = repairTypes.find((item) => item.id === repairType);

    if (!object || !repair) {
      return 0;
    }

    return area * repair.pricePerMeter * object.multiplier;
  }, [area, objectType, repairType]);

  const minPrice = calculatedPrice * 0.92;
  const maxPrice = calculatedPrice * 1.08;

  function resetCalculator() {
    setStep(1);
    setObjectType("new");
    setArea(60);
    setRepairType("turnkey");
    setStartTime("В течение месяца");
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,181,109,0.16),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <header className="flex items-center justify-between py-6">
            <div className="text-xl font-semibold tracking-[0.2em]">
              FORMA
            </div>

            <nav className="hidden gap-8 text-sm text-white/60 md:flex">
              <a href="#projects" className="transition hover:text-white">
                Проекты
              </a>

              <a href="#calculator" className="transition hover:text-white">
                Стоимость
              </a>

              <a href="#process" className="transition hover:text-white">
                Этапы
              </a>

              <a href="#contacts" className="transition hover:text-white">
                Контакты
              </a>
            </nav>

            <a
              href="tel:+79990000000"
              className="text-sm font-medium text-white/80"
            >
              +7 (999) 000-00-00
            </a>
          </header>

          <div className="grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white/60">
                Ремонт квартир в Краснодаре
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Ремонт квартир
                <span className="block text-[#d7b56d]">
                  с фиксированной сметой
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                Берём ремонт на себя: от замера и сметы до сдачи готовой
                квартиры. Стоимость и сроки фиксируем до начала работ.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#calculator"
                  className="rounded-xl bg-[#d7b56d] px-7 py-4 text-center text-base font-semibold text-black transition hover:opacity-90"
                >
                  Рассчитать стоимость
                </a>

                <a
                  href="#projects"
                  className="rounded-xl border border-white/20 px-7 py-4 text-center text-base font-semibold transition hover:bg-white/5"
                >
                  Посмотреть работы
                </a>
              </div>

              <div className="mt-14 grid max-w-3xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div>
                  <div className="text-2xl font-semibold">0 ₽</div>
                  <div className="mt-1 text-sm text-white/45">
                    скрытых доплат
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-semibold">2 года</div>
                  <div className="mt-1 text-sm text-white/45">
                    гарантия на работы
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-semibold">100%</div>
                  <div className="mt-1 text-sm text-white/45">
                    смета до старта
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1a1a]">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                  alt="Современный интерьер"
                  className="h-full w-full object-cover opacity-90"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-xl sm:block">
                <div className="text-sm text-white/45">
                  Средний срок ремонта
                </div>

                <div className="mt-1 text-2xl font-semibold">
                  от 60 дней
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="bg-[#151515] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#d7b56d]">
                Калькулятор
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Узнайте примерную стоимость ремонта
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
                Ответьте на несколько вопросов. Расчёт займёт меньше минуты.
              </p>

              <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/40">Как считается</div>

                <p className="mt-2 text-sm leading-6 text-white/55">
                  Расчёт является предварительным. Точная стоимость определяется после уточнения деталей проекта и замера объекта.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#101010] p-7 sm:p-9">
              {step < 5 && (
                <div className="mb-7">
                  <div className="flex items-center justify-between text-sm text-white/40">
                    <span>Шаг {step} из 4</span>
                    <span>{step * 25}%</span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#d7b56d] transition-all duration-300"
                      style={{ width: `${step * 25}%` }}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <>
                  <h3 className="text-2xl font-semibold">
                    Какой у вас объект?
                  </h3>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {objectTypes.map((item) => {
                      const active = objectType === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setObjectType(item.id)}
                          className={`rounded-xl border px-5 py-4 text-left transition ${
                            active
                              ? "border-[#d7b56d] bg-[#d7b56d]/10"
                              : "border-white/10 bg-white/[0.03] hover:border-[#d7b56d]/50"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="mt-8 w-full rounded-xl bg-[#d7b56d] px-6 py-4 font-semibold text-black"
                  >
                    Продолжить
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="text-2xl font-semibold">
                    Какая площадь объекта?
                  </h3>

                  <div className="mt-8">
                    <div className="flex items-end gap-2">
                      <input
                        type="number"
                        min={10}
                        max={500}
                        value={area}
                        onChange={(event) =>
                          setArea(Math.max(10, Number(event.target.value)))
                        }
                        className="w-32 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-2xl font-semibold outline-none focus:border-[#d7b56d]"
                      />
                      <span className="pb-4 text-white/50">м²</span>
                    </div>

                    <input
                      type="range"
                      min={10}
                      max={200}
                      value={Math.min(area, 200)}
                      onChange={(event) => setArea(Number(event.target.value))}
                      className="mt-8 w-full accent-[#d7b56d]"
                    />

                    <div className="mt-2 flex justify-between text-xs text-white/35">
                      <span>10 м²</span>
                      <span>200 м²</span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/3 rounded-xl border border-white/10 px-5 py-4 font-medium"
                    >
                      Назад
                    </button>

                    <button
                      onClick={() => setStep(3)}
                      className="w-2/3 rounded-xl bg-[#d7b56d] px-6 py-4 font-semibold text-black"
                    >
                      Продолжить
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-2xl font-semibold">
                    Какой ремонт планируете?
                  </h3>

                  <div className="mt-7 grid gap-3">
                    {repairTypes.map((item) => {
                      const active = repairType === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setRepairType(item.id)}
                          className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                            active
                              ? "border-[#d7b56d] bg-[#d7b56d]/10"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          <span>{item.label}</span>

                          <span className="text-sm text-white/40">
                            от {formatPrice(item.pricePerMeter)} ₽/м²
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/3 rounded-xl border border-white/10 px-5 py-4 font-medium"
                    >
                      Назад
                    </button>

                    <button
                      onClick={() => setStep(4)}
                      className="w-2/3 rounded-xl bg-[#d7b56d] px-6 py-4 font-semibold text-black"
                    >
                      Продолжить
                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="text-2xl font-semibold">
                    Когда хотите начать?
                  </h3>

                  <div className="mt-7 grid gap-3">
                    {startTimes.map((item) => {
                      const active = startTime === item;

                      return (
                        <button
                          key={item}
                          onClick={() => setStartTime(item)}
                          className={`rounded-xl border px-5 py-4 text-left transition ${
                            active
                              ? "border-[#d7b56d] bg-[#d7b56d]/10"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="w-1/3 rounded-xl border border-white/10 px-5 py-4 font-medium"
                    >
                      Назад
                    </button>

                    <button
                      onClick={() => setStep(5)}
                      className="w-2/3 rounded-xl bg-[#d7b56d] px-6 py-4 font-semibold text-black"
                    >
                      Получить расчёт
                    </button>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div className="text-sm uppercase tracking-[0.2em] text-[#d7b56d]">
                    Предварительный расчёт
                  </div>

                  <h3 className="mt-4 text-3xl font-semibold">
                    {formatPrice(minPrice)}–{formatPrice(maxPrice)} ₽
                  </h3>

                  <p className="mt-4 leading-7 text-white/50">
                    Ориентировочная стоимость для площади {area} м².
                    Финальная смета рассчитывается после замера и согласования
                    состава работ.
                  </p>

                  <div className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-white/40">Объект</span>
                      <span>
                        {objectTypes.find((item) => item.id === objectType)?.label}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-white/40">Площадь</span>
                      <span>{area} м²</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-white/40">Ремонт</span>
                      <span>
                        {repairTypes.find((item) => item.id === repairType)?.label}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-white/40">Начало</span>
                      <span className="text-right">{startTime}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-semibold">
                      Получить точную смету
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Оставьте контакты. Специалист уточнит детали и подготовит точный расчёт.
                    </p>

                    <div className="mt-5 space-y-3">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-[#d7b56d]"
                      />

                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-[#d7b56d]"
                      />

                      <button
                        disabled={isSending}
                        onClick={async () => {
                          setFormError("");

                          const cleanName = name.trim();
                          const cleanPhone = phone.replace(/\D/g, "");

                          if (cleanName.length < 2) {
                            setFormError("Введите ваше имя");
                            return;
                          }

                          if (cleanPhone.length < 10) {
                            setFormError("Введите корректный номер телефона");
                            return;
                          }

                          const selectedObject = objectTypes.find(
                            (item) => item.id === objectType
                          );

                          const selectedRepair = repairTypes.find(
                            (item) => item.id === repairType
                          );

                          try {
                            setIsSending(true);

                            const response = await fetch("/api/lead", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                name: cleanName,
                                phone: phone.trim(),
                                objectType: selectedObject?.label,
                                area,
                                repairType: selectedRepair?.label,
                                startTime,
                                minPrice: formatPrice(minPrice),
                                maxPrice: formatPrice(maxPrice),
                              }),
                            });

                            const data = await response.json();

                            if (!response.ok || !data.success) {
                              setFormError(
                                "Не удалось отправить заявку. Попробуйте ещё раз."
                              );
                              return;
                            }

                            setStep(6);
                          } catch (error) {
                            console.error(error);

                            setFormError(
                              "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз."
                            );
                          } finally {
                            setIsSending(false);
                          }
                        }}
                        className={`w-full rounded-xl px-6 py-4 font-semibold text-black transition ${
                          isSending
                            ? "cursor-not-allowed bg-[#d7b56d]/50"
                            : "bg-[#d7b56d] hover:opacity-90"
                        }`}
                      >
                        {isSending ? "Отправляем..." : "Отправить заявку"}
                      </button>
                      {formError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          {formError}
                        </div>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-white/30">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                    </p>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="mt-5 w-full rounded-xl border border-white/10 px-6 py-4 text-sm text-white/60 transition hover:text-white"
                  >
                    Рассчитать заново
                  </button>
                </>
              )}
              {step === 6 && (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d7b56d]/10 text-3xl text-[#d7b56d]">
                    ✓
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold">
                    Заявка отправлена
                  </h3>

                  <p className="mx-auto mt-4 max-w-md leading-7 text-white/50">
                    Спасибо. Специалист свяжется с вами, уточнит детали и подготовит точную
                    смету.
                  </p>

                  <button
                    onClick={resetCalculator}
                    className="mt-8 rounded-xl border border-white/10 px-6 py-4 text-sm text-white/70 transition hover:text-white"
                  >
                    Сделать новый расчёт
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#d7b56d]">
                Наши работы
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Реализованные проекты
              </h2>
            </div>

            <p className="max-w-md text-white/45">
              Пока это демонстрационные карточки. Для настоящего клиента сюда
              загрузим его реальные объекты.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "ЖК Самолёт",
                info: "67 м² · 74 дня",
                image:
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
              },
              {
                title: "ЖК Сердце",
                info: "84 м² · 91 день",
                image:
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
              },
              {
                title: "ЖК Панорама",
                info: "52 м² · 63 дня",
                image:
                  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
              },
            ].map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-[26px] border border-white/10 bg-[#151515]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/45">{project.info}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="border-y border-white/10 bg-[#151515] py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-sm uppercase tracking-[0.25em] text-[#d7b56d]">
            Как мы работаем
          </div>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Понятный процесс без неприятных сюрпризов
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Замер", "Выезжаем на объект и фиксируем все задачи."],
              ["02", "Смета", "Рассчитываем точную стоимость до начала работ."],
              ["03", "Ремонт", "Работаем по этапам и отправляем фотоотчёты."],
              ["04", "Сдача", "Проверяем объект вместе и подписываем акт."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-[24px] border border-white/10 bg-[#101010] p-6"
              >
                <div className="text-sm text-[#d7b56d]">{number}</div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-white/45">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[32px] bg-[#d7b56d] px-7 py-14 text-black sm:px-12 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight">
                Получите бесплатный расчёт вашего ремонта
              </h2>

              <p className="mt-4 text-black/60">
                Ответьте на несколько вопросов — мы подготовим предварительный расчёт стоимости вашего ремонта.
              </p>
            </div>

            <a
              href="#calculator"
              className="mt-8 inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white lg:mt-0"
            >
              Рассчитать стоимость
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-white/35 sm:flex-row sm:justify-between lg:px-8">
          <span>FORMA РЕМОНТ</span>
          <span>Краснодар · 2026</span>
        </div>
      </footer>
    </main>
  );
}