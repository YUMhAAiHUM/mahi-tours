# Image manifest

Edits applied: phone UI cropped out of screenshots; partial white balance, luminance levels, gentle contrast and saturation; bilateral noise reduction and unsharp mask; background removal (rembg, isnet-general-use) and placement on one studio backdrop with a contact shadow. Vehicle bodies, badges, number plates, paint and decorations are unchanged. One third-party signboard behind the Maharaja traveller (showing another business’s phone numbers) was blurred before cutout.

AI upscaling was attempted but not applied (too slow in the build environment). Images are used at or near native resolution. Sources are ~720 px wide phone screenshots; replacement originals would improve sharpness.

| Original (`assets/originals/`) | Output (`public/images/`) | Size | Used on | Notes |
|---|---|---|---|---|
| BMW.jpeg | fleet/bmw-5-series.webp | 1200×800 | Fleet cards, hero lineup | Model identified from photo, VERIFY |
| BMW.jpeg | weddings/bmw-wedding-decorated.webp | 720×720 | Weddings section | In-scene, toned |
| ertiga.png | fleet/ertiga.webp | 1200×800 | Fleet, lineup | Manufacturer image, labelled |
| innova-crysta.png | fleet/innova-crysta.webp | 1200×800 | Fleet, lineup | Manufacturer image, labelled |
| maharaja-12seater.jpeg | fleet/maharaja-traveller-12-seat.webp | 1200×800 | Fleet, group ladder | Background signboard blurred |
| urbania.png | fleet/force-urbania.webp | 1200×800 | Fleet | Manufacturer image; caption bar removed |
| 20-seater-tempo-traveller.png | fleet/tempo-traveller-20-seat.webp | 1200×800 | Fleet | Manufacturer image |
| 28-seater.jpeg | fleet/mini-coach-28-seat.webp | 1200×800 | Fleet | Carries “Patliputra” branding, VERIFY rights |
| 29-seater.jpeg | fleet/mini-coach-29-seat.webp | 1200×800 | Fleet, lineup | Carries “Jay Jalaram”/“Helly” branding, VERIFY rights |
| 56-seater.jpeg | fleet/ac-coach-56-seat.webp | 1200×800 | Fleet, lineup | Carries “Ambica” branding, VERIFY rights |
| vintage-car.jpg | weddings/vintage-open-top-wedding.webp | 720×818 | Weddings | In-scene only (original crops off the front) |
| audi.jpeg | weddings/audi-q7.webp | 720×720 | Weddings | Contains a person, needs consent or replacement |
| (composite) | hero/fleet-lineup.webp | 3037×720 | Hero, About | BMW, Ertiga, Innova, 29-seat, 56-seat cutouts, scaled by real height |
| (composite) | og/og-image.jpg | 1200×630 | Social sharing | Lineup on ivory |
