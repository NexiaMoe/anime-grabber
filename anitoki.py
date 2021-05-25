from bs4 import BeautifulSoup
import requests

link = []
no = 1
page = 1


def first():
    global no
    source = requests.get("https://anitoki.com/").text

    soup = BeautifulSoup(source, 'html.parser')
    for title in soup.find_all('div', class_='content'):
        print("(",no,")", title.h2.text, title.find_all('p')[1].getText())
        no += 1
        link.append(title.h2.a['href'])
    menu()


def menu():
    print("Next page (n) | Previous page (p)")
    pilih = input("Select : ")
    if pilih == "n" or pilih == "N":
        next_page()
    elif pilih == "p" or pilih == "P":
        prev_page()
    else:
        get_data(int(pilih) - 1)


def next_page():
    global page
    global link
    global no
    link = []
    page += 1
    no = 1
    c = requests.get("https://anitoki.com/page/" + str(page)).text

    d = BeautifulSoup(c, 'html.parser')


    for title in d.find_all('div', class_='content'):
        print("(", no, ")", title.h2.text, title.find_all('p')[1].getText())
        no += 1
        link.append(title.h2.a['href'])
    menu()


def prev_page():
    global page
    global link
    global no
    page -= 1
    no = 1
    if page == 0:
        print("This is First Page")
        first()
    else:
        link = []
        a = requests.get("https://anitoki.com/page/"+str(page)).text
        b = BeautifulSoup(a, 'html.parser')

        for title in b.find_all('div', class_='content'):
            print("(", no, ")", title.h2.text, title.find_all('p')[1].getText())
            no += 1
            link.append(title.h2.a['href'])
        menu()


def get_data(pilihan):
    a = requests.get(link[pilihan]).text
    b = BeautifulSoup(a, 'html.parser')

    for download in b.find_all('div', class_= 'smokeddl'):
        print(download.find('div', class_="smokettl").text)
        for dl_link in download.find_all('div', class_="smokeurl"):
            url_link = []
            if dl_link.strong is None:
                continue
            print(dl_link.strong.text)
            for url in dl_link.find_all('a'):
                url_link.append(url['href'])
            print(url_link)


first()