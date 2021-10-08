from PIL import Image, ImageDraw, ImageFont

canvas = Image.new("RGB", (1280, 720), (255, 255, 255))
drawing = ImageDraw.Draw(canvas)

hfont = ImageFont.truetype("SFCompact.ttf", 48)

drawing.multiline_text(
    (100, 100), "This is a heading for a post", font=hfont, fill=(0, 0, 0)
)

drawing.multiline_text((100, 200), "This is the body text", font=hfont, fill=(0, 0, 0))

canvas.show()
