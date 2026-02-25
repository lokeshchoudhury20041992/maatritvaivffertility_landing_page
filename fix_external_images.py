import urllib.request
import os
import glob

os.makedirs('img/localized', exist_ok=True)

url_mapping = {
    'https://www.exp.com/wp-content/uploads/2020/05/sharp_chula_latest.jpg': 'img/localized/sharp_chula_latest.jpg',
    'https://prashanthfertility.com/wp-content/uploads/2024/05/What-is-the-Success-rate-of-IVF-on-the-First-Try-1.png': 'img/localized/What-is-the-Success-rate-of-IVF-on-the-First-Try-1.png',
    'https://aspirefertility.in/wp-content/uploads/2023/09/AFC-TipsPCOS-9Sep23.png': 'img/localized/AFC-TipsPCOS-9Sep23.png',
    'https://harshahospitals.co.in/wp-content/uploads/2023/11/Managing-High-Risk-Pregnancy-with-Care.png.webp': 'img/localized/Managing-High-Risk-Pregnancy-with-Care.webp',
    'https://phoenixhealthy.com/uimages/In-Vitro-Fertilization-(IVF)-.png': 'img/localized/In-Vitro-Fertilization-IVF.png',
    'https://www.fertilityturkey.com/wp-content/uploads/2023/05/intrauterine-insemination-iui.png': 'img/localized/intrauterine-insemination-iui.png',
    'https://www.snehivf.com/wp-content/uploads/2023/09/529964.jpeg': 'img/localized/snehivf_529964.jpeg'
}

for url, local_path in url_mapping.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {local_path}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        # Even if it fails, we will replace the HTML to break the malicious link connection.
        # We can create an empty placeholder file so the build doesn't crash.
        if not os.path.exists(local_path):
            open(local_path, 'wb').close()

html_files = glob.glob('*.html')
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    original_content = content
    for url, local_path in url_mapping.items():
        content = content.replace(url, local_path)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {file_path}")

print("Done fixing external image links.")
