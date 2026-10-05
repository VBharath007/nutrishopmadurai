from PIL import Image
import os

def remove_white_bg(input_path, output_path, threshold=220):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # item is (R, G, B, A)
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                newData.append((255, 255, 255, 0)) # transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print("Background removed successfully!")
    except Exception as e:
        print("Error:", e)

input_img = r"D:\suriyamillets\src\assets\realbee.jpg"
output_img = r"D:\suriyamillets\src\assets\realbee_transparent.png"
remove_white_bg(input_img, output_img)
