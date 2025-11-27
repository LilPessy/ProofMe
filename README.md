# 🛡️ ProofMe

**La tua carriera, certificata e immutabile.** Piattaforma di
certificazione CV su *Blockchain Permissioned* simulata.

## 📖 Descrizione

**ProofMe** è una piattaforma software sviluppata per il corso di
**Ingegneria del Software**.\
Il progetto affronta il problema della falsificazione dei curricula e
semplifica i processi di background check aziendali.

Grazie a una simulazione di architettura **Blockchain Permissioned**
basata su database relazionale, consente ad aziende e università
(Emittenti) di registrare certificazioni lavorative e accademiche in
modo:

-   verificabile
-   trasparente
-   sicuro

L'architettura implementa il pattern **Hash-on-Chain**:
👉 I dati sensibili restano off-chain (garantendo privacy e conformità
GDPR).
👉 Sul ledger viene salvata soltanto l'impronta digitale (hash) del
certificato.

## ✨ Funzionalità Principali

### 🏢 Gestione Emittenti & Governance

-   Registrazione dedicata per Aziende/Università.
-   Verifica KYB (Know Your Business).
-   Solo gli enti autorizzati possono aggiungere blocchi al Ledger.

### 🔗 Certificazione Hash-on-Chain

-   Simulazione del mining: generazione di blocchi con:
    -   hash SHA-256 del documento
    -   `prev_hash` del blocco precedente
-   Integrità garantita tramite collegamento crittografico.

### 🎓 Wallet del Candidato

-   Dashboard personale con tutte le esperienze certificate:
    -   Lavorative
    -   Accademiche
    -   Formative

### ✅ Verifica Pubblica

-   Accesso per Recruiter.
-   Verifica istantanea dell'autenticità di un certificato confrontando
    l'hash off-chain con quello immutabile on-chain.

## 🛠️ Tecnologie Utilizzate

**Frontend:** React.js + Vite
**Backend:** Node.js + Express (REST API)
**Database:** MySQL
**Sicurezza:** SHA-256, BCrypt, JWT

## 🚀 Installazione e Avvio

### 1️⃣ Prerequisiti

-   Node.js v16+
-   MySQL Server

### 2️⃣ Setup del Database

1.  Crea un database chiamato `proofme`.
2.  Importa `database.sql`.
3.  Configura le credenziali in `server/db.js` o `.env`.

### 3️⃣ Avvio del Progetto

#### Backend

    npm install
    npm run dev

#### Frontend

    cd client
    npm install
    npm run dev

## 👥 Autori

-   Angela Martoccia
-   Daniele Petti
-   Ruggiero Pio Rinaldi

Made with ❤️ using Node.js & React

