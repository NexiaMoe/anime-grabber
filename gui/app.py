# Flask app that handles application logic


import base64
import json

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


@app.route('/get_data', methods=['GET'])
def get_data():
    json_data = json.dumps(DATA)
    return json_data


@app.route('/add_data/', methods=['POST'])
def add_data():
    new_value = request.form["new_value"]
    new_value = base64.b64decode(new_value)
    new_value = new_value.decode('utf-8')
    DATA.append(new_value)
    print("Added new value: '{}'".format(new_value))

    return "Success"

@app.route('/get_data/', methods=['POST'])
def get_image():
    page = request.form["page"]
    image = []
    num = 0
    link = []
    judul = []
    img = []
    source = requests.get("https://anitoki.com/page/"+str(page)).text

    soup = BeautifulSoup(source, 'html.parser')
    for title in soup.find_all('div', class_='content'):
        judul.append(title.h2.text)
        link.append(title.h2.a['href'])

    for thumb in soup.find_all('div', class_="thumbz"):
        img.append(thumb.img['src'])

    return jsonify({
        'link': link,
        'judul': judul,
        'thumb': img
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

if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True, use_reloader=True)
