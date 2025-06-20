# Wildly – Ett virtuellt reservat

Wildly är en interaktiv, Tamagotchi-inspirerad webbapp där barn kan ta hand om utrotningshotade djur i ett tryggt, digitalt reservat. Projektet är en protest mot djurparker och ett pedagogiskt verktyg som uppmuntrar empati och medvetenhet.

## Syfte
Att skapa engagemang för utrotningshotade arter – utan att hålla djur i fångenskap. Wildly ger barn ett alternativ till djurparker genom ett roligt, lärorikt och digitalt djurvårdsspel.

## Funktioner
- Djurkort med status: "Mätt", "Börjar bli hungrig", "Behöver mat NU"
- Nedräkning till nästa matning (4 timmar)
- Fallback-bilder för saknade djur
- Färgglada ramar och animationer beroende på status
- Modal för varje djur med mer info och matningsfunktion
- Responsiv layout och Tamagotchi-känsla

## Teknik
- React + TypeScript
- React Router v6
- Context API & Reducer för tillstånd
- CSS med retro-stil och LCD-liknande font via Google Fonts

## Starta lokalt

```bash
git clone https://github.com/ditt-användarnamn/wildly.git
cd wildly
npm install
npm run dev
