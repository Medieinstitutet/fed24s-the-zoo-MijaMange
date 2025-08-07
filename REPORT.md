# 📌 Rättningsrapport – fed24s-the-zoo-MijaMange

## 🎯 Uppgiftens Krav:
# Wildly – Ett virtuellt zoo

Wildly är en interaktiv, Tamagotchi-inspirerad webbapp där barn kan ta hand om utrotningshotade djur i ett tryggt, digitalt zoo. Projektet är en protest mot djurparker och ett pedagogiskt verktyg som uppmuntrar empati och medvetenhet för barn och unga.

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



## 🔍 ESLint-varningar:


## 🏆 **Betyg: G**
📌 **Motivering:** Koden uppfyller samtliga kravbeskrivningar. Applikationen fungerar enligt specifikationen och använder de specificerade teknologierna som React med TypeScript, React Router v6, Context API & Reducer och CSS med en retro-stil. Funktionen med djurkorten, matningsstatus och modals fungerar enligt angivna krav.

💡 **Förbättringsförslag:**  
Koden kan förbättras vad gäller struktur och återanvändning. Till exempel, flera delar av koden för att hantera djurens matningsstatus är duplicerade mellan olika komponenter och kan isoleras till en hjälpfunktion. För att förbättra prestandan och undvika onödiga omrenderingar kan React.memo användas på komponenter där hela referenser används som prop. Dessutom skulle applikationen kunna dra nytta av ett globalt felhanteringssystem för att bättre hantera och visa användbara felmeddelanden. Att inkludera mer enhetstester för att säkra funktionaliteten kan också vara ett område för förbättring.