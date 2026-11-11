#!/usr/bin/env python3
"""Download the original full-resolution product photos into assets/images/.

The site ships with small placeholder crops so it works offline. Run this ONCE on a
computer with internet access to replace them with the originals:

    python3 tools/download_images.py

Files keep the same names (assets/images/<name>.jpg), so no HTML needs to change.
Images that fail to download are left untouched. Note: the source links are the
Google-hosted ones from the original design and may already be expired - in that case
just drop your own photos into assets/images/ using the same file names.
"""
import os, sys, urllib.request

IMAGES = {
    "latte": "https://lh3.googleusercontent.com/aida-public/AB6AXuA9oiqwvw3_e4YMb52Du3SKV_TZovxhnzkYY_JA18FDxmJCn1u2-yw8QrQ4bvEzxawRShRUni6YZY6uMMTquhUVI54Ah3duA4t67lBn2bHhddUZXbTC8KGOWA5lLqL8NPRvknT308r45XNXEaVDonAPbx-B70LgaHbrBY6WqzCO4fDf4ggjtKqevnCTUOiunOk_yREBrIqFYaoMBttC6UwwW23U9R2aJR23kFKAxw",
    "matcha": "https://lh3.googleusercontent.com/aida-public/AB6AXuA8iDjPZDhQS9pvTJdhx8HI1rShZpqB5VstmSXfSQoj-bPfHPvvOYlDs8CfSTw2NEdqw_XE-fEa0oAnKrOQNaJci8ae6XJ-mJGYsVM9HR5EYmxreoZRr-Jqu7shfWyqG08RXusCuCrWOSXixqweuZBouFWht2SQCC4LXUSTvBcxvGAJNvgvpHw_P389vvE-4ROhw65scDw978BsP7-5WiT09bNDv7eHdZg0wpwHfQ",
    "macchiato": "https://lh3.googleusercontent.com/aida-public/AB6AXuBNeRzgBNY65cvhwXOXXui_8GcHZuOdX_bcQ9FRyJ0xkzjtxLvjRf5XxZPhyWEzhln4UVDLj6EyDV-VnG0Zwe0RcdU_Lx3FsDW1PpzC3vo0k9S82cY7xE-gDhc6Iab7rtDPNPWxDQuBro-5-oOYTnt0j0UAVqJZxQ-uwSc5hU2T7VuvnAF8UkjxufklPQCD3QIHMiuJs4kwLmNanalNxYTVaVjdr93JNmuIwfBO1w",
    "croissant": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBK2VcG_LXPOHg8Dxe4HwANo7nUKQqCNNjbVYuVdXuaxbJpZiriSKaS0uASHsa9sH4upWtOocjSGOQ0H5Xlndq64DtjeR-VPTdUMmgB65IwZm2u_I-OIAaP8gq-iBSp2Zz433SdIFtPfG0jb9ZXLNnUWZBcSuIuqmPt3FW6TSfNKAi9ualVTEnA7caGm_XlxrWNWYFnCJt3ui-09ZWEOGm5W9MAjLU-ZYqYnrEaQ",
    "redvelvet": "https://lh3.googleusercontent.com/aida-public/AB6AXuBW0hj20cE7cPCJE0ogR6wx2lpajMeFfA5xFDXSDRVOdQ11FP6wykWSpisys8m4RWWzJVGxoygGXlwzyv3schbBuZZGG1HLbjTyjPJGBT8sNdyq2dzRRb1D70YbyHamk_rNych_uEQ90zs7kceLdV215NLzM6o0wsP1Yb77EatDK3XCCMAqeSH5UkSrd72v6D9dGWZu3NtS3WUuyk9J7oFOGeCgwr_wyedriKtzAg",
    "mocha": "https://lh3.googleusercontent.com/aida-public/AB6AXuA-q0VqufEM19YaMiL09lkC98siInPP9DiLBO5kVSuiSbbqfZiwq2K6ZevWcSA0zeHfe727grgbLBzS3W7TmUnVUKnZB2F-28CRX7EPkSTflUBJ4C4nNluByo-bGM2IurmWRzO57PhShSnarK-YoW3_Xwba7QbJ9I010INwKwMpcCZM2T8ELwOg-CdfsJnBZ4IL-M5xBVjbuT7YaJ8KHzP_-Yp3Z8RHfttuxyOG1w",
}

dest = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "images")
ok = 0
for name, url in IMAGES.items():
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=30).read()
        if len(data) < 2000:
            raise ValueError("response too small")
        with open(os.path.join(dest, name + ".jpg"), "wb") as f:
            f.write(data)
        print("saved", name + ".jpg", len(data), "bytes")
        ok += 1
    except Exception as e:
        print("FAILED", name, "-", e, file=sys.stderr)
print(f"{ok}/{len(IMAGES)} images downloaded")
