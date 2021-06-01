import requests
from bs4 import BeautifulSoup

url = "https://anitoki.com/2021/05/kyuukyoku-shinka-shita-full-dive-rpg-ga-genjitsu-yori-mo-kusoge-dattara-08-subtitle-indonesia/"

r = requests.get(url)
b = BeautifulSoup(r.text, 'html.parser')


h264_360 = []
h264_480 = []
h264_720 = []
h264_1080 = []

h265_480 = []
h265_720 = []

for download in b.find_all('div', class_= 'smokeddl'):
    # print(download.find('div', class_="smokettl").text)
    for dl_link in download.find_all('div', class_="smokeurl"):
        url_link = []
        if dl_link.strong is None:
            continue
        # print(dl_link.strong.text)
        # h264
        if "h264" in download.find('div', class_="smokettl").text and "360P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h264_360.append(url['href'])

        if "h264" in download.find('div', class_="smokettl").text and "480P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h264_480.append(url['href'])

        if "h264" in download.find('div', class_="smokettl").text and "720P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h264_720.append(url['href'])
        
        if "h264" in download.find('div', class_="smokettl").text and "1080P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h264_1080.append(url['href'])
        
        # h265
        if "h265" in download.find('div', class_="smokettl").text and "480P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h265_480.append(url['href'])

        if "h265" in download.find('div', class_="smokettl").text and "720P" in dl_link.strong.text:
            for url in dl_link.find_all('a'):
                h265_720.append(url['href'])


print(h264_360)
print(h264_480)
print(h264_720)
print(h264_1080)
print(h265_480)
print(h265_720)

        # if str(dl_link.strong.text).find("360p") == -1 and str(download.find('div', class_="smokettl").text).find("h264") == -1:  
        #     for url in dl_link.find_all('a'):
        #         url_link.append(url['href'])
        #     print(url_link)
        # print(url_link)

for div in b.find_all('figure', class_="wp-block-image"):
    for img in div.find_all('img', attrs={'loading': 'lazy'}):
        print(img['src'])

for h1 in b.find_all('h1', class_="jdlx"):
        title = h1.text
        print(h1.text)