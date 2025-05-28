# memorycon

## game meachanics

1. Ziel: Alle Paare müssen gefunden werden
   - [ ] `gameEnd === true` -> `if (allCards.length === foundMatches.length)`

2. Es gibt Runden (human und computer wechseln sich ab)
    - [x] Vor der ersten Runde sieht man die aufgedeckten Karten `previewCardsTime`
    - [x] Alle Karten sind `isLocked === true`
    - [x] `isHumanRound` -> 2 Karten anklicken, die `isLocked === false` sind
    - [x] `isComputerRound` -> 2 random Karten anklicken, die `isLocked === false` sind
      - [x] solange der computer dran ist, sind die karten unklickbar

3. Eine Runde
    - [x] Hat eine bestimmteDauer `turnTime`
      - [x] Läuft die `turnTime` ab, werden alle Karten umgedreht
    - [x] Werden 2 Karten angeklickt/umgedreht `isCardFlipped`
      - [x] Karte 1 und 2 werden verglichen
        - [x] Beide Karten sind gleich `matchFound`
          - [x] Beide Karten in `[foundMatches]`
          - [x] `if (humanRound)` -> 1 Punkt in `humanPoints`
          - [x] `if (computerRound)` -> 1 Punkt in `computerPoints`
          
        - [x] Karten sind ungleich `matchFound === false`
          - [x] Beide Karten wieder umdrehen `isCardFlipped -> false`

4. Es gibt Gewinner und Verlierer
    - [x] `gameEnd === true`
      - [x] `humanPoints > computerPoints` -> You Win
      - [x] `humanPoints < computerPoints` -> You Loose
      - [x] `humanPoints = computerPoints` -> Draw

5. Es gibt ein einfaches und schweres Spiel
   - [ ] Zu Beginn wird der `gameMode` festgestellt
   - [ ] `if gameMode.isEasy === true`
       - [ ] Human fängt an `isRoundHuman: true`
       - [ ] aufgedeckte Karten zu Beginn länger sehen `previewCardsTime` 4 Sekunden
   - [ ] `if gameMode.isEasy === false`
       - [ ] Computer fängt an `isRoundHuman: false`
       - [ ] aufgedeckte Karten zu Beginn kürzer sehen `previewCardsTime` 2 Sekunden
       - [ ] Wenn der Computer dran ist `isRoundHuman = false` und Karten sind ungleich `matchFound === false`
           - [ ] Computer klickt nochmal 2 random Karten, die `!isLocked` sind

---

## gameState store

1. [ ] Jedes Spiel wird mit einem `gameState` initialisiert
2. [ ] Je nach `gameMode` wird das Spiel mit unterschiedlichen Konditionen/Variablen initialisiert (siehe oben 5.)
   -

```
const gameState = {
    allCards: [xxx],
    foundMatches: [],
    playersRound: {
        isRoundHuman: true,
        humanPoints: 0,
        computerPoints: 0,
    },
    gameMode: {
        isEasy: true,
        gameEasy: {
            title: "Easy Peasy",
            description: "memorycon easy game",
            previewCardsTime: 4000,
            turnTime: 10000
        }
        gameHard: {
            title: "Go Hard",
            description: "memorycon hard game",
            previewCardsTime: 2000,
            turnTime: 8000
        }
    }
}
```



