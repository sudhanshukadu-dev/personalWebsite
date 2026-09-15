/*
  Laptop and phone frames with skeleton screens, used by the case study hero's
  device showcase and inside Solution cards. The screens are placeholders until
  the real exports arrive; device colours stay fixed in both themes, like real
  hardware. Purely decorative, so every frame is aria-hidden: pair it with text.
*/

export function Laptop() {
  return (
    <div aria-hidden className="w-full max-w-[880px]">
      <div className="rounded-[clamp(10px,2.2vw,22px)] bg-[#0f1012] p-[1.4%] shadow-[0_40px_80px_-40px_rgba(15,16,18,0.55)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(4px,1vw,10px)] bg-[#f2f3f5]">
          <DesktopScreen />
        </div>
      </div>
      <div className="relative -mx-[6%] h-[clamp(8px,1.8vw,18px)] rounded-b-[clamp(8px,2vw,20px)] bg-gradient-to-b from-[#dfe2e6] to-[#a7abb2]">
        <span className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[6px] bg-[#c3c7cd]" />
      </div>
    </div>
  );
}

export function Phone() {
  return (
    <div
      aria-hidden
      className="relative aspect-[9/19.5] w-[min(280px,64vw)] rounded-[clamp(30px,11vw,46px)] bg-[#0f1012] p-[3.2%] shadow-[0_40px_80px_-40px_rgba(15,16,18,0.55)]"
    >
      <div className="relative h-full overflow-hidden rounded-[clamp(22px,8.5vw,36px)] bg-[#16171a]">
        <MobileScreen />
        <span className="absolute left-1/2 top-[2.2%] h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

// Skeleton of the desktop expense form: top bar, receipt drop zone and fields, Tips panel on the right.
function DesktopScreen() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex h-[8%] flex-none items-center gap-[1.6%] border-b border-[#e2e4e8] bg-white px-[3%]">
        <span className="h-[34%] w-[8%] rounded-full bg-[#0f1012]" />
        <span className="ml-[3%] h-[26%] w-[7%] rounded-full bg-[#e2e4e8]" />
        <span className="h-[26%] w-[7%] rounded-full bg-[#2f63db]/25" />
        <span className="h-[26%] w-[7%] rounded-full bg-[#e2e4e8]" />
        <span className="ml-auto aspect-square h-[46%] rounded-full bg-[#e2e4e8]" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.65fr_1fr] gap-[2.5%] p-[3%]">
        <div className="flex min-h-0 flex-col gap-[3.5%] rounded-[clamp(4px,1vw,12px)] bg-white p-[3.5%]">
          <span className="h-[5%] w-[34%] rounded-full bg-[#0f1012]/80" />
          <div className="grid h-[34%] place-items-center rounded-[clamp(3px,0.8vw,10px)] border border-dashed border-[#2f63db]/45 bg-[#2f63db]/[0.06]">
            <span className="h-[22%] w-[26%] rounded-full bg-[#2f63db]/30" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-[4%]">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex flex-col gap-[10%]">
                <span className="h-[14%] w-[40%] rounded-full bg-[#e2e4e8]" />
                <span className="h-[46%] rounded-[clamp(2px,0.6vw,8px)] bg-[#f2f3f5]" />
              </div>
            ))}
          </div>
          <span className="h-[9%] w-[26%] self-end rounded-full bg-[#2f63db]" />
        </div>

        <div className="flex min-h-0 flex-col gap-[4%] rounded-[clamp(4px,1vw,12px)] bg-[#2f63db]/[0.1] p-[6%]">
          <span className="h-[5%] w-[30%] rounded-full bg-[#2f63db]" />
          {[82, 64, 74, 52].map((width) => (
            <span key={width} className="h-[3.5%] rounded-full bg-[#2f63db]/30" style={{ width: `${width}%` }} />
          ))}
          <div className="mt-[6%] flex flex-col gap-[8%] rounded-[clamp(3px,0.8vw,10px)] bg-white p-[8%]">
            <span className="h-[10px] max-h-[40%] w-[46%] rounded-full bg-[#0f1012]/70" />
            <span className="h-[8px] max-h-[30%] w-[80%] rounded-full bg-[#e2e4e8]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton of mobile capture: a receipt framed in the camera, the details sheet and shutter below.
function MobileScreen() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-x-[20%] bottom-[12%] top-[20%] flex -rotate-3 flex-col gap-[5%] rounded-[6%] bg-[#f7f8fa] p-[9%]">
          <span className="h-[5%] w-[55%] rounded-full bg-[#0f1012]/70" />
          {[90, 70, 84, 60, 76].map((width) => (
            <span key={width} className="h-[3%] rounded-full bg-[#e2e4e8]" style={{ width: `${width}%` }} />
          ))}
          <span className="mt-auto h-[6%] w-[45%] self-end rounded-full bg-[#0f1012]/70" />
        </div>
        <span className="absolute inset-x-[14%] bottom-[7%] top-[14%] rounded-[8%] border-2 border-[#2f63db]" />
      </div>
      <div className="flex h-[30%] flex-none flex-col gap-[8%] rounded-t-[22px] bg-white px-[9%] pb-[10%] pt-[8%]">
        <span className="h-[7%] w-[38%] rounded-full bg-[#0f1012]/80" />
        <span className="h-[14%] rounded-[10px] bg-[#f2f3f5]" />
        <span className="h-[14%] rounded-[10px] bg-[#2f63db]/[0.12]" />
        <span className="mx-auto mt-auto aspect-square h-[24%] rounded-full border-4 border-[#2f63db]/30 bg-[#2f63db]" />
      </div>
    </div>
  );
}
