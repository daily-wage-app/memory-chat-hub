# စကားဝိုင်းမှတ်တမ်း

Chat screenshot များကို လူတိုင်းကြည့်နိုင်သည့် public archive website ဖြစ်သည်။ Gallery card တစ်ခုစီတွင် **ပုံနှင့် ပုံ URL လက်ခံရရှိသည့်နေ့** ကိုသာ ပြသထားပြီး အပိုခေါင်းစဉ်၊ placeholder မှတ်ချက် သို့မဟုတ် “နေ့စွဲမသတ်မှတ်ရသေး” စာသားမပြပါ။ ပေးထားသော screenshot ၁၀ ပုံကို ၂၀၂၆ ခုနှစ် အောက်တိုဘာ ၉ ရက်တွင် လက်ခံရရှိထားသည့်နေ့အဖြစ် မှတ်တမ်းတင်ထားသည်။

## Website

[Public GitHub Pages website](https://daily-wage-app.github.io/memory-chat-hub/)

## ကြည့်ရှုခွင့်

Website သည် read-only ဖြစ်သည်။ Visitor များအတွက် upload form၊ ပြင်ဆင်ရန်/ဖျက်ရန်ခလုတ်၊ import/export သို့မဟုတ် browser storage မပါဝင်ပါ။ ပုံများကို အပြည့်ကြည့်နိုင်သော်လည်း site ထဲမှ content ကို ပြောင်းလဲ၍မရပါ။ Gallery ကို update လုပ်နိုင်သူမှာ GitHub repository ၏ `main` branch သို့ push ခွင့်ရှိသည့် maintainer များသာ ဖြစ်သည်။

## နောက်ထပ်ပုံထည့်ခြင်းနှင့် ရက်စွဲ

Owner က နောက်ထပ် photo URL ပေးလာပါက repository ထဲသို့ image asset အသစ်ထည့်ပြီး `script.js` ရှိ `records` list ထဲတွင် ထည့်ပါ။ `date` ကို URL လက်ခံရရှိသည့်နေ့အဖြစ် `YYYY-MM-DD` ပုံစံဖြင့် သတ်မှတ်ပါ။ ထိုရက်စွဲသည် ပုံထဲကစကားဝိုင်း ဖြစ်ပွားသည့်နေ့ကို မဆိုလိုပါ။ Viewer များက website မှတစ်ဆင့် ပုံအသစ် တင်၍မရပါ။

## Local preview

```bash
python3 -m http.server 8000
```

ပြီးလျှင် <http://localhost:8000> ကိုဖွင့်ပါ။ ပုံများမှာ `assets/memories/` ထဲတွင်ရှိသည်။
