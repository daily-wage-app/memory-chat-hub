# Memories & Us

နှစ်ယောက်အတူ ဖန်တီးခဲ့တဲ့ chat screenshot၊ ဓာတ်ပုံနဲ့ အမှတ်တရလေးတွေကို သိမ်းထားဖို့ မြန်မာဘာသာ digital scrapbook ဝက်ဘ်ဆိုက်။ ပေးထားတဲ့ banner ပုံနဲ့ chat screenshot ၁၀ ပုံကို repository ထဲ local assets အဖြစ် ထည့်ထားပါတယ်။

## Website

GitHub Pages public website: <https://daily-wage-app.github.io/memory-chat-hub/>

ဒီ repository က public ဖြစ်ပြီး GitHub Pages က `main` branch ရဲ့ root ကို website အဖြစ် တိုက်ရိုက်ထုတ်ဝေထားပါတယ်။ Repository ထဲတင်ထားတဲ့ screenshots နဲ့ ပုံထဲက စာသားတွေကို အင်တာနက်သုံးသူ မည်သူမဆို မြင်နိုင်ပါတယ်။ Private သိမ်းဆည်းမှုလိုချင်ရင် public Pages ကို အသုံးမပြုပါနှင့်။

## ပါဝင်တဲ့အရာများ

- Desktop နဲ့ ဖုန်းမျက်နှာပြင်အတွက် အလိုက်သင့်ပြောင်းလဲတဲ့ scrapbook design
- ပေးထားတဲ့ chat screenshot ၁၀ ပုံကို gallery ထဲကနေ ချက်ချင်းကြည့်နိုင်ခြင်း၊ ပုံအပြည့်ချဲ့ကြည့်နိုင်ခြင်း
- အမှတ်တရအသစ်မှာ ခေါင်းစဉ်၊ နေ့စွဲ၊ မှတ်ချက်နဲ့ ပုံ URL ထည့်နိုင်ခြင်း
- JPG, PNG, WEBP, GIF ပုံဖိုင်ကို 1.5 MB အထိ တိုက်ရိုက်ရွေးထည့်နိုင်ခြင်း
- အကြိုက်ဆုံးမှတ်သားခြင်း၊ ရှာဖွေခြင်း၊ ဖျက်ခြင်း
- JSON backup ထုတ်ယူခြင်း၊ backup ကို ပြန်ထည့်ခြင်း
- Gallery ပြင်ဆင်ချက်နဲ့ user data ကို browser `localStorage` ထဲ သိမ်းဆည်းခြင်း — device/browser တစ်ခုတည်းမှာသာ
- GitHub Pages မှတစ်ဆင့် static hosting; backend/database မပါဝင်ပါ

## စတင်အသုံးပြုရန်

1. Repository ကို clone လုပ်ပါ။
2. Project folder ထဲမှာ local preview စတင်ပါ။

   ```bash
   python3 -m http.server 8000
   ```

3. Browser မှာ <http://localhost:8000> ကိုဝင်ပါ။
4. “အမှတ်တရအသစ် သိမ်းမယ်” ထဲမှာ ခေါင်းစဉ်၊ နေ့စွဲ၊ မှတ်ချက်နဲ့ ပုံ URL သို့မဟုတ် ပုံဖိုင်ကို ထည့်ပါ။

## သိမ်းဆည်းမှုနှင့် ကိုယ်ရေးလုံခြုံမှု

- Seed ထည့်ထားတဲ့ ပုံ ၁၀ ပုံနဲ့ cover ပုံကို repository ထဲမှာ local asset အဖြစ် ထည့်ထားပါတယ်။ မူရင်းပုံ URL ပျက်သွားလည်း repository ထဲက ပုံတွေ ဆက်ရှိနေပါမယ်။
- အမှတ်တရအသစ်များကို အသုံးပြုနေတဲ့ device/browser ရဲ့ local storage ထဲမှာပဲ သိမ်းဆည်းပါတယ်။ အခြားဖုန်းသို့ အလိုအလျောက် sync မဖြစ်ပါ။ Browser data ရှင်းလိုက်ရင် မှတ်တမ်းတွေ ပျောက်နိုင်တာကြောင့် “Backup” ကို download လုပ်ထားပါ။
- Public GitHub Pages ဖြစ်သဖြင့် repository ထဲတွင် commit လုပ်ထားသော screenshot အားလုံးကို လူတိုင်းကြည့်နိုင်ပါတယ်။

## ဖိုင်များ

- `index.html` — မြန်မာဘာသာစာမျက်နှာ
- `styles.css` — responsive design
- `script.js` — gallery, screenshot seed data, local saving, search, favorites, backup/restore
- `assets/memories-us.jpg` — site cover banner
- `assets/memories/` — ပေးထားသော chat screenshot ၁၀ ပုံ
- `chat-gallery.html` — ယခင် standalone chat mockup (အသစ်ပြင်ထားသော gallery ရဲ့ သီးခြားဖိုင်)
