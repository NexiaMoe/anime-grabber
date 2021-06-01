# Flask app that handles application logic


import base64
import json
import re

from flask import Flask, jsonify
from flask import render_template
from flask import request
import requests
from gui import get_root_path
from bs4 import BeautifulSoup

app = Flask(__name__, static_folder=get_root_path('static'), template_folder=get_root_path('templates'))

DATA = ["Data One", "Data Two"]

@app.before_request
def before_request():
    pass


@app.teardown_request
def teardown_request(exception):
    pass


@app.route('/', methods=['GET'])
def index():
    json_data = json.dumps(DATA)
    return render_template('index.html', json_data=json_data)

@app.route('/get_data/', methods=['POST'])
def get_image():
    page = request.form["page"]
    image = []
    num = 0
    link = []
    judul = []
    img = []
    released = []
    source = requests.get("https://anitoki.com/page/"+str(page)).text

    soup = BeautifulSoup(source, 'html.parser')

    for release in soup.find_all('i', class_="fa fa-clock-o"):
        released.append(release.next_sibling)

    for title in soup.find_all('div', class_='content'):
        judul.append(title.h2.text)
        link.append(title.h2.a['href'])

    for thumb in soup.find_all('div', class_="thumbz"):
        img.append(thumb.img['src'])

    return jsonify({
        'link': link,
        'judul': judul,
        'thumb': img,
        'release': released
    })

@app.route('/get_download/', methods=['POST'])
def get_download():
    link = request.form["url"]

    a = requests.get(link).text
    b = BeautifulSoup(a, 'html.parser')

    description = []

    for deskripsi in b.find_all("p", attrs={'style': 'text-align: justify;'}):
        if deskripsi.find("span"):
            continue
        description.append(deskripsi.text)
    
    
    h264_360 = []
    h264_480 = []
    h264_720 = []
    h264_1080 = []

    h265_480 = []
    h265_720 = []
    thumb = ""
    title = ""

    for h1 in b.find_all('h1', class_="jdlx"):
        title = h1.text

    for div in b.find_all('figure', class_="wp-block-image"):
        for img in div.find_all('img', attrs={'loading': 'lazy'}):
            thumb = img['src']

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


    return jsonify({
        'h264_360': h264_360,
        'h264_480': h264_480,
        'h264_720': h264_720,
        'h264_1080': h264_1080,
        'h265_480': h265_480,
        'h265_720': h265_720,
        'description': description,
        'img': thumb,
        'title': title
    })

@app.route('/get_samehadaku/', methods=['POST'])
def get_samehadaku():
    u = "https://samehadaku.vip/"
    r = requests.get(u)

    b = BeautifulSoup(r.text, 'html.parser')

    judul = []
    link = []
    thumb = []
    release = []
    for a in b.find_all("div", class_="dtla"):
        for c in a.find_all('span'):
            
            if "Released on" in c.text:
                setring = c.text

                release.append(setring)

    for title in b.find_all("h2", class_="entry-title", attrs={'itemprop': 'headline'}):
        if "batch" not in title.a['href']:
            judul.append(title.a.text)
        
    
    for url in b.find_all("h2", class_="entry-title", attrs={'itemprop': 'headline'}):

        if "batch" not in url.a['href']:
            link.append(url.a['href'])
        else:
            continue
        
    for thumbz in b.find_all("div", class_="thumb"):

        if "batch" not in thumbz.a['href']:

            thumb.append(thumbz.img['src'])
        else:
            continue
    return jsonify({
        'link': link,
        'judul': judul,
        'thumb': thumb,
        'release': release
    })

@app.route('/get_samehadaku_dl/', methods=['POST'])
def get_samehadaku_dl():
    link = request.form["url"]

    u = "https://samehadaku.vip/"
    r = requests.get(u)

    b = BeautifulSoup(r.text, 'html.parser')

    thumb = []

    for thumbz in b.find_all("div", class_="thumb"):

        if "batch" not in thumbz.a['href']:
            if link in thumbz.a['href']:
                thumb=str(thumbz.img['src']).replace("-scaled", "").replace("?quality=90&resize=154,104","")
        else:
            continue

    
    a = requests.get(link).text
    b = BeautifulSoup(a, 'html.parser')

    description = ""
    title = b.find('h1', class_='entry-title', attrs={'itemprop': 'name'}).text
    description = b.find("div", class_="entry-content entry-content-single").text

    mkv_360 = []
    mkv_480 = []
    mkv_720 = []
    mkv_1080 = []
    h265_480 = []
    h265_720 = []


    for download in b.find_all('div', class_='download-eps'):
        if "MP4" in download.b.text:
            continue

        for dl_link in download.find_all("li"):
            if "MKV" in download.b.text and "360p" in dl_link.strong.text:
                [mkv_360.append(link.a['href']) for link in dl_link.find_all('span')]
            if "MKV" in download.b.text and "480p" in dl_link.strong.text:
                [mkv_480.append(link.a['href']) for link in dl_link.find_all('span')]
            if "MKV" in download.b.text and "720p" in dl_link.strong.text:
                [mkv_720.append(link.a['href']) for link in dl_link.find_all('span')]
            if "MKV" in download.b.text and "1080p" in dl_link.strong.text:
                [mkv_1080.append(link.a['href']) for link in dl_link.find_all('span')]
            if "x265" in download.b.text and "480p" in dl_link.strong.text:
                [h265_480.append(link.a['href']) for link in dl_link.find_all('span')]
            if "x265" in download.b.text and "720p" in dl_link.strong.text:
                [h265_720.append(link.a['href']) for link in dl_link.find_all('span')]

    
    return jsonify({
        'h264_360': mkv_360,
        'h264_480': mkv_480,
        'h264_720': mkv_720,
        'h264_1080': mkv_1080,
        'h265_480': h265_480,
        'h265_720': h265_720,
        'description': description,
        'img': thumb,
        'title': title
    })
if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True, use_reloader=True)
