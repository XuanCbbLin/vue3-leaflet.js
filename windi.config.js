import { defineConfig } from "windicss/helpers";

export default defineConfig({
  // 因為動態產生class 需要設定Safelist : https://windicss.org/integrations/vite.html#safelist
  safelist:
    "bg-[#800026] bg-[#BD0026] bg-[#E31A1C] bg-[#FC4E2A] bg-[#FD8D3C] bg-[#FEB24C] bg-[#FED976] bg-[#FFEDA0]",
});
