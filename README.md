# စကားဝိုင်းမှတ်တမ်း

Chat screenshot များကို လူတိုင်းဖတ်ရှုနိုင်သည့် public archive ဝက်ဘ်ဆိုက်။ ဝက်ဘ်ဆိုက်တွင် **ကြည့်ရှုခြင်း၊ ရှာဖွေခြင်းနှင့် ပုံကို အပြည့်ကြည့်ခြင်းသာ** ရနိုင်ပြီး viewer များအတွက် upload၊ edit၊ delete၊ import သို့မဟုတ် ပြင်ဆင်ချက်သိမ်းခြင်း မရှိပါ။

## Website

[Public GitHub Pages website](https://daily-wage-app.github.io/memory-chat-hub/)

Public repository ၏ `main` branch မှ GitHub Pages ဖြင့် publish လုပ်ထားသည်။ ပေးထားသော screenshot ၁၀ ပုံနှင့် banner ကို repository ထဲ asset အဖြစ် သိမ်းထားပြီး ပုံထဲကစာများအပါအဝင် လူတိုင်းကြည့်နိုင်သည်။

## Viewer permissions

ဆိုဒ်ထဲတွင် upload form၊ ပြင်ဆင်ရန်ခလုတ်၊ ဖျက်ရန်ခလုတ်၊ backup import/export သို့မဟုတ် မှတ်တမ်းရေးသားသည့် browser storage မပါဝင်ပါ။ ရှာဖွေရေး box သည် စာမျက်နှာပေါ်ရှိပုံများကိုသာ စစ်ထုတ်ပြပြီး ရလဒ်ကို သိမ်းမထားပါ။ GitHub Pages သည် static website ဖြစ်သဖြင့် visitor များက site မှတစ်ဆင့် content ပြောင်းလဲ၍ မရပါ။

Repository ထဲသို့ push လုပ်နိုင်သည့် GitHub account/maintainer များသာ publish လုပ်ထားသော website ကို update လုပ်နိုင်သည်။ Public visitor များသည် repository ကို ကြည့်ရှုနိုင်သော်လည်း `main` branch သို့ တိုက်ရိုက်ရေးသားခွင့် အလိုအလျောက် မရပါ။

## Local preview

```bash
python3 -m http.server 8000
```

ပြီးလျှင် <http://localhost:8000> ကိုဖွင့်ပါ။ အဓိကဖိုင်များမှာ `index.html`, `styles.css`, `script.js`; ပုံများမှာ `assets/memories/` နှင့် `assets/memories-us.jpg` ဖြစ်သည်။
