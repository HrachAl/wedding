# Background music

Place a single soft, looping track here named **`ambient.mp3`**:

```
public/audio/ambient.mp3
```

It will be played (looped, at ~35% volume) when a guest opens the envelope
intro, and can be toggled with the floating speaker button.

- Keep it subtle and instrumental.
- Make sure you have the rights to use the track.
- To use a different filename, pass it to `<MusicToggle src="/audio/your-file.mp3" />`
  in `app/page.tsx`.

If no file is present, the speaker button simply stays silent — nothing breaks.
