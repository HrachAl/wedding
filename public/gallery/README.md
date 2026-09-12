# Gallery images

Drop your own wedding photos here (e.g. `photo-1.jpg`, `photo-2.jpg`), then
update the `GALLERY` array in `lib/constants.ts` to point at them:

```ts
export const GALLERY: GalleryImage[] = [
  { src: "/gallery/photo-1.jpg", alt: "..." },
  { src: "/gallery/photo-2.jpg", alt: "..." },
];
```

Local paths under `/public` are served from the site root, so a file at
`public/gallery/photo-1.jpg` is referenced as `/gallery/photo-1.jpg`.

Recommended: portrait images around **900×1125px** (4:5 ratio) for the grid.
