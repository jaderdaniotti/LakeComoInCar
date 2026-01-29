

## 🔴 DA COMPLETARE DOPO IL DEPLOY

### FASE 1: Verifica e Indicizzazione (Giorno 1)

#### A. Google Search Console
1. Vai su: https://search.google.com/search-console
2. Clicca su "Aggiungi proprietà"
3. Scegli "Prefisso URL" e inserisci: `https://lakecomoincar.eu`
4. **Metodo di verifica consigliato**: Tag HTML
   - Copia il meta tag che Google ti fornisce
   - Aggiungilo in `app/layout.tsx` nella sezione `verification.google`
   - Sostituisci `'your-google-verification-code'` con il codice reale
5. Dopo la verifica:
   - Clicca su "Sitemap" nel menu laterale
   - Aggiungi: `https://lakecomoincar.eu/sitemap.xml`
   - Clicca "Invia"
6. Richiedi l'indicizzazione delle pagine principali:
   - Usa lo strumento "Controllo URL"
   - Inserisci ogni URL importante e clicca "Richiedi indicizzazione"

**URLs da indicizzare subito**:
```
https://lakecomoincar.eu/it
https://lakecomoincar.eu/it/servizi
https://lakecomoincar.eu/it/prenota
https://lakecomoincar.eu/it/veicoli
https://lakecomoincar.eu/it/contatti
https://lakecomoincar.eu/en
https://lakecomoincar.eu/fr
https://lakecomoincar.eu/es
```

#### B. Bing Webmaster Tools
1. Vai su: https://www.bing.com/webmasters
2. Importa direttamente da Google Search Console (più veloce)
3. Oppure ripeti il processo di verifica manualmente
4. Aggiungi la sitemap

#### C. Google Analytics 4
1. Vai su: https://analytics.google.com
2. Crea una nuova proprietà GA4
3. Ottieni il Measurement ID (formato: G-XXXXXXXXXX)
4. Crea file `lib/analytics.ts` con il codice di tracking
5. Aggiungi lo script in `app/layout.tsx`

#### D. Google Tag Manager (Opzionale ma consigliato)
1. Vai su: https://tagmanager.google.com
2. Crea un nuovo contenitore
3. Installa GTM nel `<head>` del sito
4. Gestisci tutti i tracking da un unico posto

---

## 🔧 DATI DA AGGIORNARE NEL CODICE

Prima del deploy, modifica questi file con i dati reali:

### 1. `components/seo/StructuredData.tsx`
```typescript
"telephone": "+39-YOUR-PHONE",  // ← INSERISCI NUMERO REALE
"email": "lakecomoincar@gmail.com",  // ← VERIFICA EMAIL
"streetAddress": "Via Example 123",  // ← INSERISCI INDIRIZZO REALE
"postalCode": "22100",  // ← VERIFICA CAP
"latitude": "45.8080",  // ← COORDINATE REALI (trova su Google Maps)
"longitude": "9.0852",  // ← COORDINATE REALI
```

### 2. `app/layout.tsx`
```typescript
verification: {
  google: 'your-google-verification-code',  // ← DA Google Search Console
}
```

### 3. Social Media URLs (quando li crei)
In `StructuredData.tsx`:
```typescript
"sameAs": [
  "https://www.facebook.com/lakecomoincar",  // ← Crea pagina Facebook
  "https://www.instagram.com/lakecomoincar"  // ← Crea profilo Instagram
]
```

---

## ✅ CHECKLIST FINALE PRE-DEPLOY

- [ ] Tutte le traduzioni completate (IT, EN, FR, ES)
- [ ] Chiavi Stripe LIVE configurate
- [ ] Chiavi PayPal LIVE configurate
- [ ] Numero WhatsApp configurato
- [ ] Email contact form funzionante
- [ ] Test prenotazione end-to-end
- [ ] Test pagamenti Stripe
- [ ] Test pagamenti PayPal
- [ ] Verifica responsive mobile
- [ ] Test velocità pagina
- [ ] Backup database configurato
- [ ] SSL/HTTPS attivo
- [ ] Dominio lakecomoincar.eu puntato correttamente

---

