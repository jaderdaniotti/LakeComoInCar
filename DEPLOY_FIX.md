# 🚀 FIX DEPLOY - Checklist Completa

**Data:** 21 Gennaio 2026  
**Errori risolti:** Dynamic route + Missing credentials

---

## ✅ **FIX 1: Dynamic Route Error**

### **Errore:**
```
Dynamic server usage: Route /admin couldn't be rendered statically because it used `cookies`
```

### **Causa:**
La route `/admin` usa `cookies()` per l'autenticazione ma Next.js cerca di renderizzarla staticamente.

### **Soluzione Applicata:**
Aggiunto `export const dynamic = 'force-dynamic';` in `app/admin/page.tsx`

**Codice aggiunto:**
```typescript
// Forza rendering dinamico per questa route (usa cookies)
export const dynamic = 'force-dynamic';
```

✅ **RISOLTO**

---

## ✅ **FIX 2: Missing Credentials for PLAIN**

### **Errore:**
```
❌ Errore configurazione email: Error: Missing credentials for "PLAIN"
```

### **Causa:**
Le variabili d'ambiente NON sono configurate sulla piattaforma di deploy.

### **Soluzione:**

#### **VERCEL (se usi Vercel):**

1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto
3. **Settings → Environment Variables**
4. **Aggiungi tutte queste variabili:**

```
GMAIL_USER = lakecomoincar@gmail.com
GMAIL_APP_PASSWORD = [password 16 caratteri da Gmail]
ADMIN_EMAIL = lakecomoincar@gmail.com
COMPANY_NAME = LakeComoInCar
COMPANY_PHONE = +39 338 405 6027
COMPANY_EMAIL = lakecomoincar@gmail.com

NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
```

5. **Seleziona environment:** Production, Preview, Development (tutte e tre)
6. **Salva**
7. **Re-deploy:** Deployments → ultimo deploy → "Redeploy"

#### **NETLIFY (se usi Netlify):**

1. Vai su [app.netlify.com](https://app.netlify.com)
2. Seleziona il sito
3. **Site settings → Environment variables**
4. **Add variable** per ognuna delle variabili sopra
5. **Trigger deploy**

---

## 📋 **CHECKLIST COMPLETA DEPLOY**

### **Codice (già fatto):**
- [x] ✅ Aggiunto `export const dynamic = 'force-dynamic'` in `/app/admin/page.tsx`
- [x] ✅ Fix import email: `@/src/lib/email` (già corretto)
- [x] ✅ Fix params async in route dinamiche `[id]` (già corretto)
- [x] ✅ Installato `@types/nodemailer` (già fatto)

### **Piattaforma Deploy (da fare):**
- [ ] Configurare `GMAIL_USER`
- [ ] Configurare `GMAIL_APP_PASSWORD` ⚠️ **CRITICA**
- [ ] Configurare `ADMIN_EMAIL`
- [ ] Configurare `COMPANY_NAME`
- [ ] Configurare `COMPANY_PHONE`
- [ ] Configurare `COMPANY_EMAIL`
- [ ] Configurare `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Configurare `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Configurare `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Re-deploy dopo aver salvato le variabili

---

## 🧪 **TEST POST-DEPLOY**

Dopo il deploy:

1. **Vai sul sito in produzione**
2. **Test Login Admin:**
   - Vai su `/admin`
   - Dovresti vedere il form di login
   - Login con credenziali admin
   - Dovresti entrare nella dashboard

3. **Test Preventivo:**
   - Vai su `/preventivo`
   - Compila e invia
   - Controlla che arrivi email
   - Vai su `/admin/dashboard` → Tab Preventivi
   - Dovresti vedere il preventivo

4. **Test Prenotazione:**
   - Vai su `/prenota`
   - Compila e invia
   - Controlla che arrivi email
   - Vai su `/admin/dashboard` → Tab Prenotazioni
   - Dovresti vedere la prenotazione

5. **Controlla Log Produzione:**
   - Vercel: Dashboard → Functions → Real-time logs
   - Netlify: Dashboard → Functions → Logs
   - Dovresti vedere: `✅ Server email pronto` e `✅ Email inviata`

---

## ⚠️ **SE ANCORA NON FUNZIONA**

### **Errore: cookies() still causing issues**

Se vedi ancora errori con cookies, verifica:
- Il file `app/admin/page.tsx` ha `export const dynamic = 'force-dynamic'`
- Hai fatto commit e push delle modifiche
- Il deploy ha preso le ultime modifiche

### **Errore: Missing credentials persiste**

Se vedi ancora "Missing credentials":
1. Verifica che le variabili d'ambiente siano **salvate** sulla piattaforma
2. Verifica che `GMAIL_APP_PASSWORD` sia **esattamente** quella generata da Gmail (16 caratteri)
3. Verifica che NON ci siano spazi extra nelle variabili
4. **RE-DEPLOY** dopo aver salvato le variabili (non basta salvarle, serve re-deploy)

### **Errore: Supabase connection failed**

Se vedi errori Supabase:
1. Verifica che tutte e 3 le variabili Supabase siano configurate
2. Verifica che gli URL e le chiavi siano corretti
3. Copia-incolla direttamente da Supabase Dashboard → Settings → API
4. Re-deploy

---

## 🔒 **SICUREZZA**

### **NON fare MAI:**
- ❌ Committare `.env.local` su Git
- ❌ Esporre `GMAIL_APP_PASSWORD` pubblicamente
- ❌ Esporre `SUPABASE_SERVICE_ROLE_KEY` pubblicamente

### **FARE sempre:**
- ✅ Usare variabili d'ambiente della piattaforma
- ✅ `.env.local` nel `.gitignore` (già fatto)
- ✅ Verificare che le variabili sensibili NON siano nei log pubblici

---

## 📝 **COMANDO GIT PER DEPLOY**

Dopo aver fatto le modifiche al codice:

```bash
# Verifica modifiche
git status

# Aggiungi tutto
git add .

# Commit
git commit -m "Fix: dynamic route admin + email config"

# Push (triggera auto-deploy su Vercel/Netlify)
git push origin main
```

---

## ✅ **RISULTATO ATTESO**

Dopo aver applicato tutti i fix:

1. ✅ Build di Next.js completa senza errori
2. ✅ Route `/admin` funzionante
3. ✅ Login admin funzionante
4. ✅ Dashboard visibile
5. ✅ Email inviate correttamente
6. ✅ Prenotazioni salvate in database
7. ✅ Preventivi salvati in database
8. ✅ Tutto visibile dalla dashboard

---

## 📞 **SUPPORTO**

Se dopo aver seguito tutti gli step continui ad avere problemi:

1. Controlla i **log della piattaforma** (Vercel/Netlify)
2. Copia l'errore esatto
3. Verifica che le variabili d'ambiente siano **tutte** configurate
4. Verifica che il codice sia stato deployato (check ultimo commit)

---

**Ultimo aggiornamento:** 21 Gennaio 2026  
**Versione:** 1.0  
**Status:** ✅ Fix applicati, pronto per deploy
