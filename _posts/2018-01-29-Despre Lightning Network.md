---
layout: post
title: Despre Lightning Network
author: Alexandru Ilies
---


Articol tradus. Sursa [originală](https://medium.com/@x0100/%EF%B8%8Flightning-network-7c618c9cd68)

Lighting Network = LN

În partea 0 vom vedea, de ce este nevoie de așa ceva. 
În partea 1 vom explica cum se desfășoară toate plățile în rețeaua Bitcoin, Lightning Network și problemele care se regăsesc. În partea 2 vom introduce componentele de bază din care e construit LN. În partea 3, în sfârșit vom descrie în detaliu cum sunt procesate plățile în protocolul LN. În a 4 parte, în mod rapid vom vorbi despre criticile care se regăsesc și comisionale existente. În partea 5, vom face un mic sumar.


! În mod conștient renunț/simplific unele momente tehnice. Încă nu sunt expert și pot să mă înșel în unele afirmări.


## 0. De ce?
**Bitcoin Blockchain** - are la bază o bază date descentralizată, în care se salvează toate tranzacțiile din rețeaua Bitcoin. Pâna aici, ”toate tranzacțiile” este o parte destul de fundamentală la acest protocol. Ca întreg sistem să fie întradevăr descentralizat, și totodată funcționeze fără vreo oarecare eroare, trebuie, ca toate miile de noduri din rețea să re-verifice și să salveze toate tranzacțiile. Acest lucru, în mod clar, nu duce la o scalare: Blockchain ocupă zeci de Gigabytes pe disk, minerii folosesc mai mult curent decât are nevoie unele țări, blocurile sunt suprasolicitate, comisioanele cresc, oamenii înjură și fac fork la Bitcoin. Din aceaste cauze, la moment, în mod activ se construiesc soluții alternative. Una dintre aceste soluții este Lightning Network.


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Q: When will the Lightning Network be rolled out?<br>A: The rollout has already begun. This is an iterative distributed learning process; it&#39;s unlikely there will be a single point in time at which we say LN is &quot;deployed&quot; because it will grow organically. Software is never finished.</p>&mdash; Jameson Lopp (@lopp) <a href="https://twitter.com/lopp/status/947808940255006726?ref_src=twsrc%5Etfw">January 1, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

### 1. Ideea
Idea de soluționare a problemei de la nivelului doi (second layer solution), la care se referă LN, sună foarte simplu:
<blockquote>
În loc să se salveze și să se verifice toate tranzacțiile în Blokchain, vom realiza o mare parte din plăți în afara rețelei Blockchain, iar în Blockchain vom sincroniza din timp în timp balanțele și vom rezolva conflictele. De funționat toate acestea vor funcționa, ca deobicei cu ajutorul criptomagiei.
</blockquote>

Sună bine, însă nu știm cum toate acestea funcționează.
### 1.1. Canalul de plată
Să începem prin a simplifica viața a două persoane, Alisa și Bob, care foarte des se plătesc între ei. Se oferă următoarea schema:

1. Alisa și Bob trimit depozituri la adresa o adresă comună care se administrează cu ajutorul a două chei private.
2. Fiecare din ei, crează o tranzacție specială - Smart Contract(da, Bitcoin dispune de Smart-Contracts, despre asta în partea următoare). Această tranzacție este corectă, dar încă nu este scrisă în Blochain.
3. De la început, tranzacția conține informație conform căreia, Alisa și Bob pot lua înapoi depozitele lor.
4. Cand Alisa se achită cu Bob, printr-o înțelegere comună -updatează informația din aceste tranzacții. Alisa acceptă să primească mai puțină valoare din propriul depozit, iar Bob - mai multă. Defapt, aceste tranzacții reprezintă niste obligațiuni(IOU, I owe you)
5. În așa mod, ei pot schimba între ei sume nu foarte mari(în limitele depozitelor lor), măcar până la nesfârșit.
6. La un anumit moment, oricare din părți, poate să ceară să se achite pentru totdeauna. Atunci Lisa(sau Bob) pur și simplu înscriu tranzacția finală în Blockchain-ul principal și primesc suma depozitului împreună cu suma provenită din plățile care au fost făcute către acest depozit. 

Punctele 1-3 din această schemă se numesc deschiderea canalului de plătă/plăți(payment channel). Punctele 4 și 5 - folosirea canalului. Punctul 6 - închiderea canalului de plată/plăți.


<blockquote>
👍 În blockchain se înscriu doar două tranzacții: tranzacția de depozitare, în care are loc deschiderea canalului de plată și tranzacția finală(închiderea canalului). Toate tranzacțiile interemediare dintre aceste două tranzacții nu se folosesc de Blockchain și nu sunt salvate în acesta, de aceea acestea sunt făcute fără nici un cost(comision) și sunt momentane.
</blockquote>



### 1.2. Rețeaua de canale de plată

Canalele de plăți între două persoane - nu este ceva foarte util. La urma urmei, cu marea majoritate a oamenilor noi nu facem tranzacții regulare. Dar...
<blockquote>
💡 Cand canalele de plată formează o rețea, se ivește posibilitatea de a face plăți între fiecare utilizator al rețelei, către care există o legătură în graful acestei rețele(chiar dacă ei nu au legătură directă unul cu altul). Aceasta și este ideea de bază a Lighting Network.
</blockquote>

Așa arată graful canalelor de plată, în momentul 22.01.2018: (https://lnmainnet.gaben.win).
![](https://cdn-images-1.medium.com/max/1600/1*vYgP4rEOttWssox5l-LGig.png)

În principiu, analog protocolului TCP, unui om simplu îi este îndeajuns să aibă doar un singur canal deschis, ca acesta să poată să utilizeze tranzacții cu oricine. Desigur, este nevoie să se caute și segmentul cel mai optim între doi utilizatori, și mai trebuie cumva să se motiveze participanții rețelei ca aceștia să verifice tranzacțiile străine. Dar, sa începem cu problema de bază: problema încrederii.

### 1.3. Problema încrederii
Cum se întâmplă des în criptografie, sistema canalelor de plată este foarte simplu de imaginat, dacă toate parțile au încredere între ele. Nu este nevoie să îngrădim grădina cu depozite, chei private, tranzacții speciale. Se poate simplu de scris doar cui și cu cât este cineva dator.
Următorul lucru de înțeles: cum putem realiza un canal de plăți fără a avea încredere între parți?
Problemele de bază for fi trei.

1. Ambele depozite, ale Alisei și Bob se află întrun portofel virtual comun. Dacă Bob nu va fi deacord să semneze tranzacția, cum Alisa își va întoarce depozitul ei?
2. În procesul de calculare, sunt create multiple versiuni ale oblicațiunilor. Să presupunem că, practic, Alisa îl plătește pe Bob. Atunci, în versiunea finală a tranzacției, Bob va primi un depozit mai mare decât depozitul lui inițial iar Alisa - mai puțin. Dar Alisa poate înșela și poate înscrie singură în Blockchain prima versiune validă a tranzacției, ca și cum Bob niciodată nu a primit bani. Cu ce va rămâne Bob?
3. Dacă Alisa și Bob, transferă banii prin rețea folosind o a treia persoană - Victor, atunci cum ei pot fi siguri că Victor întradevăr va transmite banii și nu îi va lua lui?

Să numim aceste probleme corespunzător: 

- problema depozitului comun
- problema ultimei tranzacții
- problema persoanei terțe


## 2. Smart-contracts
Bitcoin are suport pentru un limbaj simplu al smart-contractelor - Script. În fiecare tranzacție Bitcoin există un câmp special, care conține un script scris în acest limbaj. Acest script verifică, după aplicarea a căror reguli, ieșirea tranzacției poate fi folosită.
”Folosirea ieșirei tranzacției A” - este un mod mult mai corect tehnic spus ”folosirea banilor din adresa/portofelul K, unde aceștia au fost depuși cu ajutorul tranzacției A”

<blockquote>
☝ În comparație, de exemplu, cu Ethereum, posibilitățile smart-contractelor Bitcoin sunt cu mult mai limitate. Este legat acest lucru de Script, și anume că acesta nu este destul pentru Turing. De exemplu, în acesta nu se poate folosi cicluri/recursivitate și nu se poate crea variabile(lipsa memoriei).
</blockquote>

Să vedem cele mai importante operații ale acestui limbaj.

### 2.1 Autorizația
Probail, partea cea mai standard a oricărei tranzacții - este verificarea semnăturii. Să presupunem că tranzacția A, transferă resurse la o oarecare adresă K. Ca să fie cheltuite resursele din K, trebuie să se demonstreze deținerea cheii(cheia privată). De acest lucru răspunde operația **OP_CheckSig**. Dar, după dorință, se poate verifica și ceva adaugător. De exemplu, se poate verifica, că persoana deține un număr secret, iar hash-ul este egal cu acel număr. Pentru aceasta, este nevoie de două operațiuni: **OP_SHA256**(citește hash-ul) și **OP_EqualVerify**(verifică egalitatea). De ce avem nevoie de toate acestea, va fi clar în partea 4.

### 2.2. Cooperarea
Un alt exemplu simplu de smart-contract la Bitcoin se bazează pe operația **OP_CheckMultiSig**. Aceasta permite să se folosească resursele doar prin semnarea câtorva chei predefinite. Pe acest principiu funționează așa spusele ”multiple signature wallets”. La fel ca și celula unei bănci, care este încuiată cu două chei, una aflându-se la angajatorul băncii iar alta la client.
### 2.3. Perioadele
Bitcoin are suport și pentru operația **OP_CheckSequesnceVerify**, care permite folosirea resurselor doar peste un număr fix de blocuri. De exemplu, aceasta permite educarea oamenilor, care nu pot salva resursele. Blockchain este mai eficient decât oricare cont de economii: dacă utilizatorul a decis să înghețe suma acumulată pe o anumită perioadă, această sumă va fi înghețată garantat. Dar, pe lângă acest scenariu, **OP_CheckSequenceVerify**, și alte componente, în mod activ se folosesc pentru realizarea canalelor de plăți.

## 3. Realizarea canalului
Acum, când toate blocurile de control sunt la locul lor, se poate descrie unele detalii ale funcționării canalului de plată.  Defapt, unele imaginări ale canalului de plăți, au fost descrise încă de Satoshi. Eu ma voi axa mai mult pe specificația, care se numește Poon-Dryja payment channels(după părerea autorilor principali Lightning Network).

### 3.1. Deschiderea canalului
1. Alisa și Bob crează tranzacții, care depun resursele într-o adresă de depozit comun. Să presupunem că X bitcoins se transferă din portofelul Alisei, și Y - din portofelul lui Bob. Resursele din depozitul comun pot fi folosite doar prin semnarea împreună a cheilor private ale Alisei și Bob. (OP_CheckMultiSig). 
2. Primul truc, se evidențiază prin aceea că ei încă NU semnează și NU transmit tranzacția în Blockchain(dealtfel, Bob o poate minți pe Lisa și poate să-i înghețe rezursele pe veșnicie).)
3. În loc de acestea, Alisa și Bob crează două noi tranzacții de retur a depozitului initial. Intrarea acestor tranzacții sunt resursele din depozitul comun(ieșirea tranzacției 0). Ieșiri ale tranzacțiilor sunt două: X se duce înapoi la adresa Alisei, Y - la adresa lui Bob. În realitate, toate acestea sunt un pic mai dificile, dar despre asta, un pic mai târziu.
4. Mai departe, Bob, semnează tranzacția A1 și o transmite către Alisa. Alisa semnează tranzacția B1 și o trimite lui Bob.
5. În acest moment, tranzacția de depunere a depozitului, se poate înscrie în Blockchain, nimeni nu minte. Dacă Bob va fi deacord să coopereze, Alisa oricând poate semna tranzacția A1, să o înscrie în Blockchain și să obțină depozitul acesteia înapoi.

În acest moment ”problema depozitului comun” este rezolvată. Deschiderea canalului de plată poate ave loc fără a avea încredere în cealaltă persoană.
<blockquote>
☝ Un fapt interesant. Încă cu jumătate de an în urmă(înainte de a se introduce SegWit) semnarea tranzacțiilor neconfirmate(punctul 4) avea loc mult mai greu, din cauza problemei maleabilitatății(transaction malleability)
</blockquote>

### 3.2 Folosirea canalului
Plățile din interiourul canalului se realizează defapt prin re-rescrierea tranzacției A1 și B1 în noi tranzacții.

1. Alisa îl plătește pe Bob pentru o cafea, care costă C.
2. Tot Alisa, este deacord că, la închiderea canalului de plată ea va lua înapoi, nu suma depusa la început X, ci X' = (X - C).
3.  Iar Bob: Y' = (Y + C).

Deasemenea, noile tranzacții A2 și B2 vor arăta la fel ca A1 și B1, doar că cu sume noi. Fiecare din părți, poate în orice moment să închidă canalul de plată, scriind ultima versiune a tranzacției în Blockchain.

Cum ne asigurăm că Alisa nu va scrie în Blockchain tranzacția A1  în loc de tranzacția A2? Pentru aceasta, exista încă un truc.


1. De fiecare dată când Alisa și Bob crează noi tranzacții, ei aleg o cheie privată de unică folosință, de care au nevoie ca să poată lua depozitul înapoi(OP_CheckSig).
2. La fiecare plată i, Alisa îi va arăta lui Bob cheia privată precedentă AK(i-1), și va crea o nouă cheie AKi pentru noua tranzacție. Bob nu va accepta plata făra cheia anterioară.
3. Dacă Bob știe cheia, atunci acesta poate cheltui toți banii Alisei, doar dacă Alisa va decide să înscrie tranzacția greșită în Blockchain.
4. În așa fel, Alisa întodeauna este interesată de a înscrie în Blockchain tranzacția corectă, adică utlima.

*Modificare minoră*
Pentru ca Bob să aibă posibilitatea să dispute tranzacția cu Alisa și să obțină cheia acesteia, Bob are nevoie de timp. De aceea, Alisa, va obține depozitul ei nu în același timp, dar după câteva blocuri T(OP_CheckSequenceVerify). De exemplu, peste 48 blocuri, adică peste 8 ore.


Dacă Alisa semnează una din tranzacțiile ei(ele sunt semnate deja de Bob), și transmite această tranzacție în Blockchain, atunci pot avea loc două scenarii.

1. Alisa emite tranzacția finală => Bob nu cunoaște utlima cheie a Alisei Aki. Aceasta este o închidere corectă a canalului, toți trebuie să primească banii lor înapoi. Alisa îi va primi peste ceva timp.
2. Alisa încearcă să semneze tranzacția veche în loc de cea nouă, finală => Alisa încearcă să-l mintă pe Bob. În acest caz, Bob cunoaște cheia lui Alisa și acesta poate să o folosească pentru a primi toată suma Alisei. Este clar că, Alisa nu este interesată în acest scenariu.

Așadar, ”problema ultimei tranzacții” este la fel - rezolvată și canalul de comunicare între două persoane este în regulă. Acum, deasemenea, devin evidente câteva avantaje și neajunsuri.

👍 **Avanteje:**

1. Plățile din interiorul canalului sunt instante și gratis, ele nu duc la solicitarea Blockchain-ului principal. 
2. Părțile nu sunt obligate să aibă încredere una în alta.

👎 **Neajunsuri**

1. Depozitele sunt blocate pe toată perioada existenții canalului.
2. Fiecare dintre părți, trebuie periodic să se ivească online(cel puțin o dată-n T)

👌 În realitate, ambele neajunsuri sunt necesare pentru canalele de plăți între două persoane, dar nu prea sunt importante pentru LN. Primul neajuns încetează să mai fie neajuns dacă un canal de plăți poate fi folosit pentru tranzacții cu alte persoane.
Al doilea neajuns lipsește în LN, așa cum verificarea corectitudinei poate fi făcută de oricare utilizator al rețelei( dacă Vasile va observa țeapa Alisei, atunci acesta va împărți cu Bob valoarea confiscată.

## 4. Lightning Network

### 4.1. Canalul de plăți printr-o persoană terță

Să presupunem acum că Alisa și Bob nu au un canal deschis între ei, dar ei, ambii au un canal deschis cu Victor. Alisa poate fără probleme să trimită bani lui Victor, iar Victor fără probleme poate trimite banii lui Bob.
Dar, cum să fim siguri, că Victor, obținând banii, întradevăr îi va trimite mai departe lui Bob?

În realitate, ideea este foarte similară cu trucul anterior, doar că în loc de cheile de unică folosință se folosește un oarecare număr secret.

1. Bob generează un număr secret S, hash-ul al acestei chei HS și transmite această informație Alisei. HS în acest caz poate fi folosit ca un bon de plată virtual.
2. Alisa crează tranzacția AV, care transmite banii lui Victor, numai în cazul în care Victor va oferi numărul secret S. Pentru aceasta, Alisa folosește un script, care verifică egalitatea hash-ului oferit de numărul și valoarea HS(aici se folosește operația OP_SHA256 și OP_EqualVerify).
3. Victor crează o tranzacție analog VB, care transmite banii lui Bob, doar în cazul în care Bob va prezenta numărul secret.
4. Bob vede că poate primi bani de la Victor, și îi arată acestuia numărul secret S. Acum, Victor poate demonstra că acesta a transmis banii lui Bob.

Aici sunt câteva variante în care scenariile pot avea loc:

1. Înainte de toate, Victor nu are nici un sens să o mintă pe Alisa. El nu poate să nu transmită banii lui Bob, deoarece, dealtfel, Victor oricum nu va primi bani de la Alisa.
2. Însă Bob, poate să decidă să-l mintă pe Victor și să nu-i dea acestuia numărul secret. Pe lângă asta, el poate închide canalul cu Victor și să înscrie în blockchain tranzacția VB. Însă, pentru primirea banilor, el oricum este nevoit să arate  numărul lui secret, și aici - Victor îl va recunoaște.

Aici există câteva nuanțe, legate de timpul în care Alisa, Bob și Victor pot rezolva conflictele. Dar, aceasta este o temă mult prea tehnică. Dacă sunteți interesați - Google it (Time-Locked Contracts or HTLCs).


## 4.2. Rutarea

În practică, Alisa și Bob pot fi legați între ei nu prin cunoscutul lor comun - Victor, ci prin câțiva necunoscuți intermediari din întreaga lume. Problema căutării celui mai scurt drum în graf, în rețea, se numește problema rutării.

![](https://cdn-images-1.medium.com/max/1600/1*933GpxVj8PzBVPMQGbDeng.png)
(Împărțirea geografică a nodurilor în rețeaua de test)
Photo by: https://explorer.acinq.co/#/)

Problema rutării, în realitate este o ramură în care se fac cercetări active în acest moment. Alegerea drumului optim în graf depinde de mai mulți factori dinamici: numărul de noduri, topologia rețelei, capacitatea canalului de plăți, comisia nodurilor intermediare.

Ca să nu intrăm în detalii, căutarea drumului și transmiterea plăților în LN se realizează pe baza Onion Routing - tehnologia raspândirii informației în mod anonim, în rețelele peer-to-peer.  În acest fel, de exemplu, funcționează Tor.


Totul este descentralizat, tot traficul este criptat. Nimeni nu știe de la cine și către cine, vin și se duc banii. De aici, încă un avantaj.


👍 **Avantaj**:
Rețeaua LN este cu mult mai anonimă, decât însăși el - Bitcoin.
În primul rând, persoanele care fac plăți între ei, sunt văzute doar de câțiva membri ai rețelei. În al doilea rând, chiar și între membrii rețelei, doar primul și ultimul știe exact, de la cine și către cine vin și se transmit banii.

### 4.3. Comisioanele
Rămân două întrebări evidente.

**Întrebare numărul 1:** De ce intermediarii trebuie să verifice tranzacții străine?
În primul rând deoarece ei însuși vor folosi mai ușor LN. În al doilea rând, deoarece ei vor primi din toată asta un comision foarte mic, dar totuși comision. În acest moment, rețeaua este întreținută în mare parte de entuziaști iar comisionul este aproape 0: 1 satoshi, sau 0.01 cent pentru fiecare intermediar.


👍 Capacitatea canalelor - nu este o resursă mai scumpă decât mărimea blocului. Deschiderea canelelor se face ușor și necostisitor. De aceea comisioanele în LN sunt cu mult mai mici decât comisioanele din Blockchain.

**Întrebarea numărul 2:** Cum e cu comisionul la deschiderea/închiderea canalului?

Întradevăr, acest comision poate fi uneori și zeci de dolari. În acest fel, plățile vor fi mai profitabile dacă se vor deschide/închide canale mai puține. Aceasta motivează oamenii să deschidă canale cu depozite mari, și să folosească canalele în două direcții: nu doar pentru plățile care pleacă ci și pentru cele care vin. De exemplu: eu deschid un canal, fac o depunere de 1000$, și folosesc canalul dat doar pentru plățile de ieșire. Valoarea canalului va fi de 1000 dolari, din care undeva 20 de doloari se vor plăti pentru deschiderea/închiderea canalului. Adică, comisia totală va fi de 2%. Un pic mai bine decât cum e la Visa și Mastercard, dar evident mai mult decât aș fi dorit. Situația se schimbă drastic când eu încep să folosesc Lightning la maxim: făcând depozite mai mari și primind bani prin intermediul canalelor, ci nu doar cheltuindu-i. Atunci, depinzând de proporția intrare/ieșire a banilor, canalul poate fi deschis la infinit și comisioanele vor tinde spre zero.

### 4.4. Critici
Pe internet se poate găsi o mulțime de critici legate de soluția    layer-ului 2 și de Lighting Network în general. Careva puncte întradevăr merită atenție, multe - trebuie deja uitate. Câteva exemple:

1. **Folosirea LN va duce la centralizare: utilizatorii vor fi motivați să se conecteze la hub-uri mari iar aceste hub-uri vor controla tot traficul.**

Un asemenea risc există, dar acesta este foarte mic. În primul rând, e foarte economic și foarte simplu de realizat un nou nod care va respinge hub-urile mari. În al doilea rând, algoritmii de rutare urmăresc balansarea traficului. În al treilea rând, la acest moment, asemenea problemă nu există.

2. **Capacitatea mică a canaleleor va face ca LN să fie suprasolicită, comisioanele vor crește și cel mai probabil situația va fi la fel, ca și în Blockchainul de baza.**

Încă o dată, îndată ce așa ceva se va întâmpla, persoanele vor fi motivate să deschidă noduri personale. În comparație cu mărimea blocului, numărul de noduri, este practic nelimitată.

3. **O rutare efectivă la un număr mare de noduri peer-to-peer este imposibilă. Mai ales ținând cont de dificultatea deschiderii a noi canale.**

Până la o asemenea problemă este foarte și foarte departe iar cercetările în acest domeniu în mod activ au loc chiar în acest moment. Cu siguranță se vor lua ceva măsuri.

4. **Canele sunt nevoie mereu să fie deschise și închise, comisioanele folosite pentru așa ceva vor fi mari iar folosirea LN nu se va merita.** 

Defapt, problema dată este deja din trecut, pe care, nu înțeleg de ce, încă o discută. Ceva timp în urmă, versiunile canalelor de plată întradevăr, erau doar într-o singură direcție, iar canalul putea să existe doar o perioadă scurtă de timp. Acum aceste probleme sunt rezolvate.

5. **Pentru folosirea LN este nevoie să fii online.**

În comparație cu versiunile anterioare ale LN, utilizatorul nu este nevoit să se afle tot timpul online: alte noduri din rețea  vor verifica că doi deținători ale canalului de plată nu încearcă să se mintă unul pe altul. În mod cert, trebuie să fii online doar pentru trimiterea și primirea plăților, care fără nici o îndoială este un neajuns, dar de această dată, mult mai neimportant.

6. **LN - aceasta nu este sigur.**
Plățile LN sunt un pic mai periculoase decât plățile făcute direct în Blockchain. Dar, doar întrun singur context: un atac cu succes de 51% asupra Blockchain-ului Bitcoin. Riscul dat este unul catastrofic de mic.


## 5. LN astăzi

Lucrul cel mai important pe care trebuie să-l cunoașteți: 
**Lighthing** deja se folosește și funcționează în realiate.

Mai mult de o mie de noduri în rețeaua de testare bitcoin și mai mult de 200 de noduri(numărul crește în fiecare zi) în rețeaua de bază bitcoin(mainnet) deja verifică plăți.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Anyone want to help bug test new <a href="https://twitter.com/Blockstream?ref_src=twsrc%5Etfw">@Blockstream</a> <a href="https://twitter.com/hashtag/LightningNetwork?src=hash&amp;ref_src=twsrc%5Etfw">#LightningNetwork</a> store? The Github repos should make it easy enough for even <a href="https://twitter.com/coinbase?ref_src=twsrc%5Etfw">@coinbase</a> &amp; <a href="https://twitter.com/BitPay?ref_src=twsrc%5Etfw">@BitPay</a> to integrate with the second layer. Cypherpunks do not whine they write code. Right <a href="https://twitter.com/adam3us?ref_src=twsrc%5Etfw">@adam3us</a>? <a href="https://twitter.com/hashtag/MYOTHERNODEISASATELLITE?src=hash&amp;ref_src=twsrc%5Etfw">#MYOTHERNODEISASATELLITE</a> <a href="https://twitter.com/hashtag/DONTTRUSTVERIFY?src=hash&amp;ref_src=twsrc%5Etfw">#DONTTRUSTVERIFY</a> <a href="https://t.co/Il3YBvirYo">pic.twitter.com/Il3YBvirYo</a></p>&mdash; Trace Mayer (@TraceMayer) <a href="https://twitter.com/TraceMayer/status/953430172019101696?ref_src=twsrc%5Etfw">January 17, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 


Ce ține de softuri - există trei implementări de bază, lnt de la Lightning Labs, c-lightning de la Blockstream, eclair de la ACINQ.

Aceste echipe, nu doar de un an lucrează împreună, pentru a dezvolta un standard comun de interacțiune a nodurilor: Lighthing Network Specifications(BOLTs). Și uite că chiar la sfârșitul anului 2017, au testat protocolul de plăți, împreună, și toate cele trei implementări au fost cu succes. 

Să achiți cu bitcoini reali folosind LN, se poate doar la câteva magazine online. Dar, asta e doar cu câteva magazine mai multe decât acum o lună, iar acesta deja este succes. 

Desigur, momentul general de transfer de la on-chain bitcoin la plăți off-chain este încă foarte departe. O muncă imensă urmează să o facă dezvoltatorii de portofele virtuale, nodurile de plată, bursele, magazinele-online, și, nu în ultimul rând - utilizatorii. Cel mai interesant în această istorie este că tranzacții mult mai rapide, anonime și gratis - sunt doar începutul! Urmează o mai multă anonimitate, swap-uri atomice, schimburi distribuite și mult, mult mai mult.

Viitorul arată interesant!


