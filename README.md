# Mongodb:

.env file befindet sich in /software.dealer-service/.env dort kommt die datenbank URL rein

Ich habe die daten die ich benutzt habe in /beispieldaten exportiert damit ihr sie importieren koennt in eure mongodb

Einen benutzer koennt ihr euch selber anlegen unter http://localhost:3000/signup oder einfach auf das profil icon oben rechts klicken

# Projekt starten

## Backend

```bash
cd software.dealer-service
npm run start:dev
```

## Frontend

```bash
cd software.dealer-frontend
npm run start
```

# Artikel hinzufuegen

Das funktionier in dem man eine POST request an http://localhost:4000/products schickt

Beispiel Body:

```
name:wow233
description:wowie
price:10
rating:3
image:https://cdn.icon-icons.com/icons2/3053/PNG/512/mongodb_compass_macos_bigsur_icon_189933.png
stock:50
```
