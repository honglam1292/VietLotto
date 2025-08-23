interface Language {
  id: string;
  name: string;
}

export const dataLanguage: Array<{
  id: string;
  currency: string;
  img: string;
  symbol: string;
  lang: Language[];
}> = [
  {
    id: "lang",
    img: "",
    symbol: "",
    currency: "PKR",
    lang: [
      {
        id: "en",
        name: "English",
      },
      {
        id: "ur",
        name: "اردو",
      },
    ],
  },
  // {
  //   id: "ms",
  //   name: "Bahasa Melayu",
  //   img: Img_flag_MS,
  // },
  // {
  //   id: "zh",
  //   name: "中文",
  //   img: Img_flag_ZH,
  // },
  // {
  //   id: "th",
  //   name: "ภาษาไทย",
  //   img: Img_flag_TH,
  // },
  // {
  //   id: "vi",
  //   name: "Tiếng Việt",
  //   img: Img_flag_VI,
  // },
  // {
  //   id: "my",
  //   name: "မြန်မာ",
  //   img: Img_flag_MY,
  // },
];
