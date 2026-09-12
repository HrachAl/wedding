/**
 * Central configuration for the wedding invitation.
 * Update these values to personalise the website.
 */

export const WEDDING = {
  groom: "Հրաչ",
  groomFull: "Հրաչ Ալավերդյան",
  bride: "Լիդա",
  brideFull: "Լիդա Հովնաթանյան",
  // ISO date in the Asia/Yerevan timezone (UTC+4): 07 October 2026, 17:00
  dateISO: "2026-10-07T17:00:00+04:00",
  dateLabel: "07 Հոկտեմբերի 2026",
  timeLabel: "17:00",
  // Calendar grid target — October (month index 9) 2026, day 7
  calendarYear: 2026,
  calendarMonth: 9,
  calendarDay: 7,
  calendarMonthLabel: "Հոկտեմբեր 2026",
  venue: "Ոսկե Ծիրան ռեստորանային համալիր (premium hall)",
  invitation:
    "«Սիրով հրավիրում ենք Ձեզ կիսելու մեր կյանքի ամենաերջանիկ օրը»",
  footerNote: "«Սիրով սպասում ենք Ձեզ»",
} as const;

/** Welcome / invitation message shown near the top of the page. */
export const WELCOME = {
  eyebrow: "Սիրելի Հյուրեր",
  text: "Մեր կյանքում շատ գեղեցիկ իրադարձություն է սպասվում։ Մենք ամուսնանում ենք և մեծ սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանեկան արարողությանը։",
} as const;

/** Armenian weekday abbreviations, Monday-first (matches the calendar). */
export const WEEKDAYS = ["ԵՐԿ", "ԵՐԲ", "ՉՈՐ", "ՀՆԳ", "ՈՒՐԲ", "ՇԲԹ", "ԿԻՐ"] as const;

export interface ScheduleItem {
  time: string;
  title: string;
  icon: "home" | "church" | "restaurant";
}

export const SCHEDULE: ScheduleItem[] = [
  { time: "10:30", title: "Փեսայի տուն", icon: "home" },
  { time: "12:30", title: "Հարսի տուն", icon: "home" },
  {
    time: "14:00",
    title: "Պսակադրություն — Աղավնատան Սուրբ Աննա եկեղեցի",
    icon: "church",
  },
  {
    time: "17:00",
    title: "Ոսկե Ծիրան ռեստորանային համալիր",
    icon: "restaurant",
  },
];

export interface NoteContent {
  id: string;
  eyebrow: string;
  text: string;
  bg: string;
  intensity?: "normal" | "strong";
}

export const NOTES: Record<"presence" | "children", NoteContent> = {
  presence: {
    id: "note-presence",
    eyebrow: "Հարգելի հյուրեր",
    text: "Մեր համար շատ կարևոր է Ձեր բոլորի ներկայությունը",
    bg: "/photos/p3.jpg",
    intensity: "strong",
  },
  children: {
    id: "note-children",
    eyebrow: "Փոքրիկ խնդրանք",
    text: "Խնդրում ենք հարսի պարի ժամանակ զերծ պահել երեխաներին և լինել ուշադիր",
    bg: "/photos/note.jpg",
    intensity: "strong",
  },
};

export interface Venue {
  /** Short role label (e.g. ceremony / reception). */
  label: string;
  name: string;
  subtitle?: string;
  time: string;
  image: string;
  alt: string;
  mapEmbedSrc: string;
  mapLink: string;
}

export const VENUES: Venue[] = [
  {
    label: "Պսակադրություն",
    name: "Աղավնատան Սուրբ Աննա եկեղեցի",
    subtitle: "Aghavnatun, Armavir Province",
    time: "14:00",
    image: "/venues/church.jpg",
    alt: "Աղավնատան Սուրբ Աննա եկեղեցի",
    mapEmbedSrc:
      "https://www.google.com/maps?q=67J2%2B4CF+Aghavnatun+Armavir+Armenia&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=67J2%2B4CF+Aghavnatun+Armavir+Armenia",
  },
  {
    label: "Հարսանյաց հանդիսություն",
    name: "Ոսկե Ծիրան ռեստորանային համալիր",
    subtitle: "Premium Hall",
    time: "17:00",
    image: "/venues/restaurant.jpg",
    alt: "Ոսկե Ծիրան ռեստորանային համալիր",
    mapEmbedSrc:
      "https://www.google.com/maps?q=Voske+Tsiran+Premium+Hall+Armenia&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Voske+Tsiran+Premium+Hall+Armenia",
  },
];

export interface StoryItem {
  date: string;
  title: string;
  text: string;
}

/** "How we met" milestones. Edit freely. */
export const STORY: StoryItem[] = [
  {
    date: "2019",
    title: "Առաջին հանդիպումը",
    text: "Ճակատագիրը մեզ իրար հանդիպեցրեց ընկերների շրջապատում մի աշնանային երեկո։",
  },
  {
    date: "2021",
    title: "Առաջին ճամփորդությունը",
    text: "Միասին հայտնաբերեցինք նոր վայրեր ու հասկացանք, որ ուզում ենք ամբողջ աշխարհը տեսնել կողք կողքի։",
  },
  {
    date: "2025",
    title: "Ամուսնության առաջարկը",
    text: "Մայրամութի պահին հնչեց այն հարցը, որի պատասխանը փոխեց մեր կյանքը՝ «Այո»։",
  },
  {
    date: "2026",
    title: "Մեր հարսանիքը",
    text: "Եվ ահա մենք հրավիրում ենք Ձեզ կիսելու մեր սիրո ամենագեղեցիկ օրը։",
  },
];

export interface DressColor {
  name: string;
  hex: string;
}

export const DRESS_CODE = {
  title: "Dress Code",
  description:
    "Կդիմավորենք Ձեզ նրբագեղ երեկոյան տեսքով։ Ուրախ կլինենք, եթե Ձեր հագուստը ներդաշնակվի մեր գույների հետ։",
  palette: [
    { name: "Ivory", hex: "#faf7f2" },
    { name: "Champagne", hex: "#f5ead9" },
    { name: "Gold", hex: "#b9935a" },
    { name: "Sage", hex: "#9caf88" },
    { name: "Bordeaux", hex: "#6e2433" },
    { name: "Midnight", hex: "#1f2433" },
  ] as DressColor[],
} as const;
