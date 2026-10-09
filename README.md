# Memories & Us

နှစ်ယောက်အတူ ဖန်တီးခဲ့တဲ့ chat screenshot၊ ဓာတ်ပုံနဲ့ အမှတ်တရလေးတွေကို သိမ်းထားဖို့ ရိုးရှင်းပြီး responsive ဖြစ်တဲ့ မြန်မာဘာသာ digital scrapbook ဝက်ဘ်ဆိုက်။

## ပါဝင်တဲ့အရာများ

- Desktop နဲ့ ဖုန်းမျက်နှာပြင်အတွက် အလိုက်သင့်ပြောင်းလဲတဲ့ romantic scrapbook design
- အမှတ်တရတစ်ခုချင်းစီမှာ ခေါင်းစဉ်၊ နေ့စွဲ၊ မှတ်ချက်နဲ့ ပုံ URL ထည့်နိုင်ခြင်း
- ပုံဖိုင် (JPG, PNG, WEBP, GIF — 1.5 MB အထိ) တိုက်ရိုက်ရွေးထည့်နိုင်ခြင်း
- ပုံမသိမ်းခင် preview ကြည့်နိုင်ခြင်း၊ ပုံကို full-screen ကြည့်နိုင်ခြင်း
- အကြိုက်ဆုံးမှတ်သားခြင်း၊ ရှာဖွေခြင်း၊ ဖျက်ခြင်း
- JSON backup ထုတ်ယူခြင်း၊ backup ကို ပြန်ထည့်ခြင်း
- Data ကို browser `localStorage` ထဲမှာ သိမ်းဆည်းခြင်း — server/backend မလိုပါ

## စတင်အသုံးပြုရန်

1. Repository ကို clone လုပ်ပါ၊ သို့မဟုတ် GitHub မှာ `index.html` ကိုဖွင့်ပါ။
2. Local preview အတွက် project folder မှာ အောက်က command ကို run လုပ်ပါ။

   ```bash
   python3 -m http.server 8000
   ```

3. Browser မှာ <http://localhost:8000> ကိုဝင်ပါ။
4. “အမှတ်တရအသစ် သိမ်းမယ်” ထဲမှာ ခေါင်းစဉ်၊ နေ့စွဲ၊ မှတ်ချက်နဲ့ ပုံ URL သို့မဟုတ် ပုံဖိုင်ကို ထည့်ပါ။

ပုံ URL က `https://` (သို့မဟုတ် `http://`) နဲ့ စရပါမယ်။ Image hosting လင့်ခ်ကို ထည့်နိုင်ပါတယ်။

## သိမ်းဆည်းမှုနှင့် ကိုယ်ရေးလုံခြုံမှု

ဒီ version မှာ အမှတ်တရအားလုံးဟာ အသုံးပြုနေတဲ့ device/browser ရဲ့ local storage ထဲမှာပဲ ရှိပါတယ်။ အခြားဖုန်း၊ browser သို့မဟုတ် device နဲ့ အလိုအလျောက် မျှဝေမထားပါ။ Browser data ရှင်းလိုက်ရင် မှတ်တမ်းတွေ ပျောက်နိုင်တာကြောင့် “Backup” ကို အခါအားလျော်စွာ download လုပ်ထားပါ။ Backup ဖိုင်ကို ပြန်ထည့်တဲ့အခါ လက်ရှိအမှတ်တရတွေနဲ့ ပေါင်းထည့်ပေးပါတယ်။

ပုံဖိုင်ကို localStorage ထဲ သိမ်းတဲ့အတွက် 1.5 MB ထက်ကြီးတဲ့ ဖိုင်တွေကို လက်မခံပါ။ ပုံအများကြီးသိမ်းရန် image URL အသုံးပြုတာက ပိုအဆင်ပြေပါတယ်။

## ဖိုင်များ

- `index.html` — မြန်မာဘာသာ site structure
- `styles.css` — responsive design
- `script.js` — gallery, local saving, search, favorites, backup/restore
- `assets/memories-us.jpg` — site cover အဖြစ် အသုံးပြုထားတဲ့ ပေးထားသော banner ပုံ
- `chat-gallery.html` — ယခင် standalone chat mockup (အသစ်ပြင်ထားသော gallery ရဲ့ သီးခြားဖိုင်)

Backend/database အလိုအလျောက် sync မပါဝင်သေးပါ။ အနာဂတ်မှာ accounts, cloud sync, သီးသန့် password စတာတွေ ထပ်တိုးလို့ရပါတယ်။
