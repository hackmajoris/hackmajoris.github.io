# VPN Personal în doar 3 minute  😱
## De ce?
Dacă ai ajuns să cauți informații depsre VPN, cel mai probabil dorești să îți securitezi cât de cât prezenta ta pe Internet, fie că ai motive evidente sau pur și simplu ești un simplu utilizator de Internet. Oricare ar fi motivul - folosirea unui VPN este de neevitat, vedem imediat de ce.

De câte ori ai folosit o rețea de Wireless, publică, fără nici o mică bănuială legată de riscuri sau consecințe? 

Răspuns: de fiecare dată(cel mai probabil).
Cât de mici sau cât de mari pot fi riscurile folosirii unui Wireless public, depinde de acțiunile tale care le-ai făcut pe Internet, în timp ce foloseai acea rețea. Astfel de rețele sunt cele mai des vulnerabile. Sunt zeci, sau sute de utilizatori care au acces direct la acea rețea iar cafeneaua, ca proprietar al rețelei, de regulă, nu este interesată de securitate. De aceea, nu îți dorești să te trezești fără bani pe card, în cazul în care ai făcut o cumpărătură online în timp ce erai conectat la acea rețea. 

Pe lângă partea de securitate și anonimitate pe Internet, VPN-ul îți oferă acces la site-uri cenzurate pe teritoriul în care te afli(de exemplu Spotify, până acum 2 luni), access la magazinele de aplicații (AppStore, GooglePlay) din alte regiuni și alte posibile facilități de acest gen. 

## Cum?

Există zeci de aplicații care oferă servicii VPN pentru mobile cât și pentru alte platforme. Cele mai evidente probleme pe care le oferă sunt: prețul, anonimitatea, lipsa controlului asupra propriului trafic. Singurul serviciu de acest gen, în care am încredere este [TunellBear](https://www.tunnelbear.com/pricing).  Sugerez să-l folosiți în cazul în care aveți nevoie de un VPN și nu vă aranjeză soluția propusă mai jos. Acest serviciu oferă 500MB gratis, lunar iar pentru un trafic nelimitat - prețul este de 10 USD. Mai jost o să vedem cum putem obține așa ceva cu resurse mai puține.


! Soluția de mai jos este pentru utilizatorii de rând. Nu necesită cunoștințe în nici un domeniu. Necesită doar dorința de a te proja pe Internet.

### De ce avem nevoie:

- Un cont pe [DigitalOcean](https://www.digitalocean.com)
- Să pornim un Droplet pe [DigitalOcean](https://www.digitalocean.com)
- Să configurăm VPN-ul pe acel droplet.
- Să configurăm device-urile pentru a folosi acel VPN.

Să începem.

### Creare cont pe DigitalOcean.

Cel mai basic Droplet pe DigitalOcean - ne costă 5 USD/lună. Acesta are:

- Memorie RAM: 1GB
- Disk: 25GB SSD
- Transfer: 1TB
- CPU: 1 Core

Ce ne interesează aici este capacitatea de transfer - 1 TB / lună este de cele mai multe ori îndeajuns pentru un utilizator mediu. 

Pentru a primi 10 USD credit la înregistrare, da-ți click [aici](https://m.do.co/c/6f4b7837cd02). Acesta vă va oferi 2 luni de acces gratuit, în cazul în care nu aveți încă cont.

Mai departe.... 

1. Apăsăm butonul - Create
![](https://www.dropbox.com/s/89pf6jpt80qegem/1.png?raw=1)

2. Alegem creare Droplet nou
![](https://www.dropbox.com/s/1s8oxsfx5iaq1ck/2.png?raw=1)

3. Selectăm One-click apps 
![](https://www.dropbox.com/s/tuz4apyy2dnum62/3.png?raw=1)

4.  Selectăm tipul
![](https://www.dropbox.com/s/83ul7cctr7bjcw8/4.png?raw=1)

5. Selectăm resursele
![](https://www.dropbox.com/s/wxxc48xm0itv55z/5.png?raw=1)

6. Selectăm locația  
![](https://www.dropbox.com/s/q9jkwo36osl2jze/6.png?raw=1)

7. Dăm un nume la host
![](https://www.dropbox.com/s/xjoeztg9lf2gip4/7.png?raw=1)

8. Accesăm consola
![](https://www.dropbox.com/s/o72r5v9dwxyb5nl/8.png?raw=1)

9. După ce am schimbat parola de accesare a Droplet-ului, scrim  următoarea comandă:

CID=$(docker run -d --restart=always --privileged -p 1194:1194/udp -p 443:443/tcp jpetazzo/dockvpn)

Va trebui să așteptați pentru a se descărca toate dependențele.

Consola o să arate undeva așa:
![](https://www.dropbox.com/s/ftl6co5y5wjg3rx/9.png?raw=1)

10. După, scriem în consolă comanda

docker run -t -i -p 8080:8080 --volumes-from $CID jpetazzo/dockvpn serveconfig

După executare, în consolă vom vedea o adresă, de genul: 0.0.0.0:8080 (La fiecare va fi diferită)

11. Mergem în Browser, și accesăm acea adresă.

Accesând resursa, în mod normal, Browserul se va plânge din cauza securității. Ignorăm acea plângere, în așa se va descărca un fisier pe care-l vom folosi mai departe.

![](https://www.dropbox.com/s/vsxw4ur59qsqe90/10.png?raw=1)
![](https://www.dropbox.com/s/nokabrhe7q0sjh9/11.png?raw=1)


După descărcare, redenumim fișierul în așa fel încât acesta să aibă extensia .ovpn
![](https://www.dropbox.com/s/4p1xny119pbs5je/12.png?raw=1)

12. Descărcăm aplicația-client pentru platforma pe care o folosim. Sunt diferite aplicații de genul VPN-client prin care ne-am putea conecta la serverul de VPN creat mai sus. Eu folosesc [OpenVPN](https://openvpn.net/index.php/open-source/downloads.html). Simplu de folosit și are și suport pentru toate platformele. Mai jos, o să vedem cum putem configura clientul pe macOS și iOS. Pe Windows, Linux, Android, etc - e aceeași procedură
13. [Descărcăm](https://openvpn.net/index.php/open-source/downloads.html) clientul dacă nu am făcut-o și îi dăm fișierul de .ovpn descărcat anterior, după care ne conectăm.
![](https://www.dropbox.com/s/yeoivmd8ldxdtki/13.png?raw=1)

14. După o conexiune reușită, navigăm pe [whatismyipaddress.com](https://whatismyipaddress.com) și convingem că VPN-ul în face treaba. 😊


### Configurare VPN client - iOS

- Instalăm [OpenVPN Connect](https://itunes.apple.com/us/app/openvpn-connect/id590379981?mt=8)
- Deschidem aplicația, și introducem același adresă de IP:
![](https://www.dropbox.com/s/wjb0akzuha2t3id/14.png?raw=1)
- Deschidem fișierul cu applicația OpenVPN
![](https://www.dropbox.com/s/gwqfmzj8j3sz6x6/15.jpg?raw=1)
- Instalăm certificatul 
![](https://www.dropbox.com/s/0knsibq6cajhsfc/16.jpg?raw=1)
- Ne conectăm
![](https://www.dropbox.com/s/z5ckietmjora1pg/17.jpg?raw=1)
- Verificăm pe [whatismyipaddress.com](https://whatismyipaddress.com)


## Important
După ce am configurat toate device-urile, ne întoarce la consola Dropletului de pe Digital Ocean, și dăm un Ctrl/cmd+c pentru a opri ultimul container pornit, în așa fel, nimeni nu va mai pute a descărca fișierul descărcat mai sus daca va accesa IP-ul Droplet-ului. 

## Cat te costă?
Soluția dată poate fi hostată și pe un server local, dacă acesta există. Dacă nu - metoda descrisă mai sus te va costa 5 USD/lună(nu uita - primele 2 luni le ai gratuit dacă te-ai înregistrat folosind link-ul menționat mai sus).  

Cam asta este tot, 

May the security be with you. 😋 





