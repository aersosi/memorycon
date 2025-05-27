# memorycon

## game meachanics

1. Ziel: Alle Paare müssen gefunden werden
   - `gameEnd === true` -> `if (allCards.length === foundMatches.length)`

2. Es gibt Runden (human und computer wechseln sich ab)
    - Vor der ersten Runde sieht man die aufgedeckten Karten `seeCardsTime`
      - `isHumanTurn` -> 2 Karten anklicken, die `!isLocked` sind
    - `isComputerTurn` -> 2 random Karten anklicken, die `!isLocked` sind

3. Eine Runde
    - Hat eine bestimmteDauer `turnTime`
    - Werden 2 Karten angeklickt/umgedreht `isCardFlipped`
      - Karte 1 und 2 werden verglichen
        - Beide Karten sind gleich `matchFound`
          - Beide Karten in `[foundMatches]`
          - `if (humanTurn)` -> 1 Punkt in `humanPoints`
          - `if (computerTurn)` -> 1 Punkt in `computerPoints`
          
        - Karten sind ungleich `matchFound === false`
          - Beide Karten `isCardFlipped -> false`

4. Es gibt Gewinner und Verlierer
    - `gameEnd === true`
      - `humanPoints > computerPoints` -> You Win
      - `humanPoints < computerPoints` -> You Loose

5. Es gibt ein einfaches und schweres Spiel
   - Zu Beginn wird der `gameMode` festgestellt
   - `if gameMode.isEasy === true`
       - Human fängt an `isTurnHuman: true`
       - aufgedeckte Karten zu Beginn länger sehen `seeCardsTime` 4 Sekunden
   - `if gameMode.isEasy === false`
       - Computer fängt an `isTurnHuman: false`
       - aufgedeckte Karten zu Beginn kürzer sehen `seeCardsTime` 2 Sekunden
       - Wenn der Computer dran ist `isTurnHuman = false` und Karten sind ungleich `matchFound === false`
           - Computer klickt nochmal 2 random Karten, die `!isLocked` sind

---

## gameState store

1. Jedes Spiel wird mit einem `gameState` initialisiert
2. Je nach `gameMode` wird das Spiel mit unterschiedlichen Konditionen/Variablen initialisiert (siehe oben 5.)
   -

```
const gameState = {
    allCards: [xxx],
    matchedCards: [],
    isGameEnd: false,
    playersTurn: {
        isTurnHuman: true,
        humanPoints: 0,
        computerPoints: 0,
    },
    gameMode: {
        isEasy: true,
        gameEasy: {
            title: "Easy Peasy",
            description: "memorycon easy game",
            seeCardsTime: 4000,
            turnTime: 10000
        }
        gameHard: {
            title: "Go Hard",
            description: "memorycon hard game",
            seeCardsTime: 2000,
            turnTime: 8000
        }
    }
}
```



