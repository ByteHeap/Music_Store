export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'cum-sa-alegi-prima-chitara',
        title: 'Cum să alegi prima ta chitară electrică: Ghidul Complet',
        excerpt: 'Nu știi de unde să începi? Descoperă la ce trebuie să fii atent când îți cumperi primul instrument și ce accesorii sunt obligatorii.',
        category: 'Instrumente',
        date: '15 Mai 2026',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop',
        content: `
# Primul pas în lumea muzicii

Alegerea primei chitare electrice poate fi o experiență copleșitoare. Există sute de modele, forme și configurații de doze. Aici este tot ce trebuie să știi pentru a face alegerea corectă.

## 1. Forma contează (mai mult decât crezi)
Nu este vorba doar de estetică. Ergonomia instrumentului îți va dicta cât de mult vei exersa.
* **[Fender Stratocaster](#PRODUCT:3):** Este de obicei mai ușoară și are contururi care se mulează pe corp. Acces excelent la tastele de sus. O adevărată legendă a muzicii.
* **Les Paul:** Este mai grea, dar oferă un sustain incredibil și un sunet mult mai plin.
* **Telecaster:** Simplă, robustă, o platformă excelentă pentru învățat, cu un sunet tăios.

## 2. Configurația dozelor (Pickups)
Dozele sunt "microfoanele" chitarei tale.
* **Single-Coil:** Sunet clar, "sticlos", perfect pentru funk, pop, indie și rock clasic.
* **Humbucker:** Sunet gros, puternic, fără zgomot de fond. Ideal pentru rock greu, punk și metal.

> **Sfatul echipei ByteHeap:** Dacă vrei versatilitate maximă ca începător, caută o chitară cu o configurație H-S-S (Humbucker la bridge, Single-coil la mijloc și neck). Vei putea aborda absolut orice gen muzical.

Să cânți la chitară este o călătorie lungă, dar totul începe cu un instrument pe care să îți facă plăcere să îl ții în mână. Spor la exersat!
        `
    },
    {
        slug: 'top-placi-de-sunet-2026',
        title: 'Top 3 Interfețe Audio sub 1000 RON pentru Home Studio',
        excerpt: 'Am testat cele mai populare plăci de sunet de pe piață. Iată care sunt cele mai bune opțiuni de buget pentru producătorii la început de drum.',
        category: 'Echipamente Studio',
        date: '10 Mai 2026',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop',
        content: `
# Sunet profesional, buget de amator

Dacă vrei să înregistrezi voci sau instrumente acasă, placa de sunet a laptopului tău pur și simplu nu este suficientă. Ai nevoie de o interfață audio dedicată (placă de sunet externă) care să convertească semnalul analogic în digital la calitate de studio, fără latență.

Iată topul nostru pentru anul 2026:

## 1. [Focusrite Scarlett 2i2](#PRODUCT:9)
Cea mai populară interfață din lume a primit recent un update major. Preamplificatoarele noi oferă o claritate extraordinară, împrumutată de la sistemele lor flagship RedNet.
* **Pro:** Funcția "Air" adaugă prezență și detalii pe voci instantaneu. 
* **Contra:** Softul inclus poate fi ușor copleșitor pentru un incepător absolut.

## 2. [Universal Audio Volt 2](#PRODUCT:22)
Dacă ești în căutarea acelui sunet analogic clasic, Volt 2 este excepțională. UA a integrat un circuit de emulare a preamplificatorului lor legendar 610 tube amp.

## 3. [Audient iD4 MKII](#PRODUCT:23) 
O bijuterie ascunsă pentru audiofili. Audient folosește aceleași preamplificatoare de microfon din consolele lor analogice de zeci de mii de euro.

> **Concluzia ByteHeap:** Alege modelul Focusrite Scarlett pentru stabilitate garantată și cel mai modern ecosistem!
        `
    },
    {
        slug: 'ghid-tratament-acustic',
        title: 'Adevărul despre bureții fonici: Ghidul tratamentului acustic',
        excerpt: 'De ce camera ta sună a "peșteră" și de ce lipirea cofrajelor de ouă pe pereți este o idee teribilă.',
        category: 'Echipamente Studio',
        date: '02 Mai 2026',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070&auto=format&fit=crop',
        content: `
# Nu, cofrajele de ouă nu funcționează

Este greșeala numărul unu a oricărui producător la început de drum: investești într-o pereche excelentă de monitoare de studio, cum ar fi [Yamaha HS5](#PRODUCT:8), le pui într-o cameră goală pătrată, și te superi că mixajele tale sună teribil. 

Acustica camerei este responsabilă pentru 50% din calitatea sunetului tău.

## Izolare fonică vs. Tratament acustic
Să lămurim cea mai mare confuzie:
* **Izolarea fonică** te ajută să nu îți deranjezi vecinii.
* **Tratamentul acustic** oprește reverbul din cameră pentru a avea un sunet clar la microfon și o audiție precisă în boxe.

## Ce ai nevoie cu adevărat?

### 1. Absorbție (Bass Traps și Panouri)
Frecvențele joase (bass-ul) sunt inamicul tău principal într-o cameră mică. Ele se adună în colțuri și anulează alte frecvențe. 
**Soluția:** Bass Traps amplasate în colțurile camerei. Pentru pereții laterali, folosește panouri din vată minerală acustică. Spuma ieftină de 2cm absoarbe doar înaltele, făcând camera să sune "înfundat", în timp ce bass-ul rămâne necontrolat.

> **Sfat Rapid:** Găsește punctele de reflexie cu o oglindă. Stai pe scaun în poziția de mixaj, roagă un prieten să plimbe o oglindă pe peretele lateral. Acolo unde vezi boxa în oglindă, acolo trebuie pus primul panou absorbant!
        `
    },
    {
        slug: 'echipament-dj-incepatori',
        title: 'Ce îți trebuie pentru a deveni DJ în 2026',
        excerpt: 'De la controller la căști și software, iată setap-ul minimalist cu care poți începe să mixezi mâine.',
        category: 'Echipamente Studio',
        date: '28 Aprilie 2026',
        readTime: '4 min',
        image: 'https://dj.studio/_next/image?url=%2Fi%2FAZP3iduqVRfOSQTcco1Yhz%2Fresize%3Dwidth%3A736%2Cheight%3A490%2FbBj77LSSywZ6IYOKyvsg&w=1487&q=30',
        content: `
# Arta de a pune muzică nu a fost niciodată mai accesibilă

Vrei să faci tranziția de la playlist-uri de Spotify la beatmatching real? Iată echipamentul de bază de care ai nevoie.

## 1. Controller-ul DJ
Acesta este "creierul" operațiunii. Nu ai nevoie de CDJ-uri de club de mii de euro. Caută un controller entry-level cu 2 canale compatibil cu Rekordbox sau Serato.

## 2. Căștile (Cruțiale!)
Ai nevoie de căști cu spatele închis (Closed-Back) pentru a izola zgomotul monitoarelor și a auzi doar piesa pe care o pregătești.
Recomandarea noastră absolută și standardul industriei sunt căștile [Audio-Technica M50x](#PRODUCT:7), care oferă un bass puternic și o izolare perfectă.

## 3. Boxele (Monitoarele)
Evită boxele Bluetooth, au latență (întârziere)! Ai nevoie de cablu direct din controller. O pereche de [Monitoare Yamaha HS5](#PRODUCT:8) vor face o treabă fantastică în oferirea unui sunet clar, de club, direct în dormitorul tău.
        `
    },
    {
        slug: 'microfon-dinamic-vs-condensator',
        title: 'Microfon Dinamic vs. Condensator: Ce ar trebui să cumperi?',
        excerpt: 'Diferențele explicate simplu pentru podcasteri, streameri și muzicieni.',
        category: 'Echipamente Studio',
        date: '20 Aprilie 2026',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000&auto=format&fit=crop',
        content: `
# Războiul Microfoanelor

Cauți un microfon nou și te lovești de acești doi termeni peste tot. Iată cum să iei decizia corectă pe baza mediului în care înregistrezi.

## Microfoanele cu Condensator (Condenser)
Sunt extrem de sensibile, detaliate și captează un spectru larg de frecvențe. 
* **Când să le folosești:** Înregistrarea vocilor pentru piese muzicale, instrumente acustice delicate, voice-over profesional.
* **Condiția:** Necesită o cameră tratată acustic! Pentru că sunt atât de sensibile, vor capta ecoul camerei, câinele vecinului și ventilatorul PC-ului tău. De asemenea, necesită "Phantom Power" (+48V) de la interfața ta audio.

## Microfoanele Dinamice
Sunt robuste, mai puțin sensibile și necesită să stai foarte aproape de ele pentru a fi captat corect.
* **Exemplul perfect:** Nimic nu bate legendarul [Shure SM58](#PRODUCT:11).
* **Când să le folosești:** Podcasturi, streaming, scene live, amplificatoare de chitară puternice.
* **Avantajul major:** Resping zgomotul de fundal extraordinar de bine. Dacă ai o cameră cu mult ecou sau o tastatură mecanică gălăgioasă, un microfon dinamic te va salva.
        `
    },
    {
        slug: 'intretinere-viniluri',
        title: 'Cum să îți întreții colecția de discuri de vinil',
        excerpt: 'Păstrează magia sunetului analogic. Greșelile pe care probabil le faci când îți asculți plăcile.',
        category: 'Muzica',
        date: '12 Aprilie 2026',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop',
        content: `
# Analogicul necesită grijă

Discurile de vinil revin în forță, dar ele necesită mult mai multă dragoste decât un playlist pe telefon. Dacă vrei să te bucuri de un sunet clar pe clasici precum [Pink Floyd - Dark Side of the Moon](#PRODUCT:1) sau legendarul [The Beatles - Abbey Road](#PRODUCT:12), trebuie să ai grijă de ele.

## 1. Stocarea corectă: NICIODATĂ pe orizontală
Vinilurile trebuie stocate **vertical**, exact ca niște cărți într-o bibliotecă. Dacă le stivuiești unele peste altele (pe orizontală), greutatea va cauza deformarea discurilor aflate la bază, făcându-le imposibil de ascultat. 

## 2. Curățarea înainte de FIECARE ascultare
Praful este inamicul acului tău de pickup. 
* Folosește o **perie antistatică din fibră de carbon** înainte să cobori brațul. Lasă discul să se învârtă pe platan, ține peria ușor deasupra lui câteva secunde, apoi trage ușor praful spre exterior.
* Nu sufla pe ele! Umezeala din respirație atrage și lipește mai mult praf în șanțuri.

## 3. Nu atinge șanțurile
Când scoți discul din copertă, atinge-l doar de margini și de eticheta centrală de hârtie. Uleiurile naturale de pe pielea ta atrag praful, creând în timp o peliculă greu de curățat.
        `
    },
    {
        slug: 'top-clape-midi-productie',
        title: 'Producția muzicală in-the-box',
        excerpt: 'De la software-ul potrivit la clape, cum să ai studioul în propriul laptop.',
        category: 'Instrumente',
        date: '05 Aprilie 2026',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop',
        content: `
# Studioul tău încapător într-un rucsac

Fie că scrii beat-uri de trap sau orchestrezi partituri de film, a bate tobe din tastatura qwerty a laptopului este frustrant. Ai nevoie de instrumentele potrivite.

## 1. Software-ul DAWs
Totul pleacă de la programul în care scrii muzică. Unul dintre cele mai avansate programe de pe piață, specializat pe producție electronică și live-looping, este noul [Ableton Live 12](#PRODUCT:16). Oferă instrumente virtuale de top și un workflow extrem de rapid.

## 2. Tastatura MIDI vs. Pianul Digital
Pentru beat-uri rapide, o claviatură mică de 25 de clape de la Akai sau Arturia este suficientă pentru biroul tău.

Însă, dacă ești pianist și vrei să înregistrezi cu feeling autentic, ai nevoie de clape grele (hammer action). În acest caz, un pian digital profesional precum [Roland FP-30](#PRODUCT:13) conectat prin cablu USB la PC-ul tău va funcționa impecabil ca un controller MIDI premium.
        `
    },
    {
        slug: 'sisteme-pa-trupe-live',
        title: 'Ghid: Cum să sune trupa ta bine pe scenă',
        excerpt: 'Sfaturi esențiale pentru trupele care abia încep să cânte live în pub-uri și cluburi.',
        category: 'Echipamente Studio',
        date: '28 Martie 2026',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
        content: `
# Putere și Claritate pe Scenă

Ai o trupă, ați obținut primele gig-uri în baruri și pub-uri locale, dar acum realizați că sunetul live este o provocare.

## 1. Vocile sunt cele mai importante
Publicul iartă o tobă care nu e perfect acordată, dar nu va ierta niciodată o voce care nu se înțelege sau care prinde microfonie (țiuit). 
Standardul absolut pe orice scenă din lume este [Microfonul Shure SM58](#PRODUCT:11). Fiind un microfon dinamic, respinge perfect sunetul tobelor și al chitarelor din spatele solistului, captând doar vocea.

## 2. Sintetizatoarele au nevoie de DI Box
Dacă clăparul trupei vine cu un "monstru" analogic precum magnificul [Moog One](#PRODUCT:4), nu îl conecta direct în mixer printr-un cablu lung de chitară! Semnalul se va degrada. Folosește mereu o cutie DI (Direct Injection) pentru a transforma semnalul în unul balansat (cablu XLR) inainte de a-l trimite la mixerul principal.

> **Sfat pentru buget:** Nu tăiați costuri la stative și cabluri! Un concert se poate ruina dacă pică semnalul dintr-un cablu ieftin cumpărat din hipermarket.
        `
    }
];