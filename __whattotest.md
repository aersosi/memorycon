# Was testen?

## Hohe Priorität
- [x] src/contexts/gameContext.tsx: `gameReducer` – Teste alle Action-Types und State-Transitions
- [ ] src/pages/game/gamePage.tsx: `GamePage` – Teste Kartenrendering, `handleCardFlip`, `handleRestartGame` und Dialog-Anzeige
- [ ] src/components/gameCard.tsx: `GameCard` – Teste Emoji-Sichtbarkeit, Klickbedingungen und Preview-Logik
- [x] src/components/countdown.tsx: `Countdown` – Teste Timer-Logik und `onTimeOver` Callback
- [ ] src/components/gameTime.tsx: `GameTime` – Teste bedingte Zeit-Anzeige und Dispatches
- [ ] src/pages/start/startPage.tsx: `StartPage` – Teste Button-Klicks und Spielmodus-Auswahl
- [ ] src/pages/start/startInput.tsx: `StartInput` – Teste Eingabeverarbeitung und Dispatches
- [ ] src/hooks/useHandleCardMatch.ts: `useHandleCardMatch` – Teste Match-Erkennung und Punktevergabe
- [ ] src/hooks/useComputerTurn.ts: `useComputerTurn` – Teste KI-Logik (Easy vs. Hard Modus)
- [ ] src/hooks/useGameEnd.ts: `useGameEnd` – Teste Spielende-Erkennung
- [x] src/lib/utils.ts: `shuffleArray`, `findDuplicates` – Teste Kartenmischung und Duplikatsuche
- [x] src/lib/config.ts: `gameConfig`

## Mittlere Priorität
- [ ] src/components/gameEndDialog.tsx: `GameEndDialog` – Teste dynamische Texte und Button-Interaktionen
- [ ] src/pages/game/gameHeader.tsx: `GameHeader` – Teste dynamische Inhalte (Spielername, Punkte)
- [ ] src/app/page.tsx: `GamePages` – Teste bedingtes Rendering von StartPage/GamePage
- [ ] src/hooks/useCountdown.ts: `useCountdown` – Teste Timer-Logik (Support für Countdown)
- [ ] src/hooks/useInitializeGame.ts: `useInitializeGame` – Teste Spiel-Setup und Kartenmischung
- [ ] src/hooks/useStrings.ts: `useRoundHumanString`, `useWinnerString` – Teste bedingte String-Logik

## Alle Dateien
- [ ] /src/__mocks__/gameContext.tsx
- [ ] /src/app/layout.tsx
- [ ] /src/app/page.tsx
- [x] /src/components/gameCard.tsx
- [x] /src/components/countdown.tsx
- [x] /src/components/gameEndDialog.tsx
- [x] /src/components/gameTime.tsx
- [x] /src/contexts/gameContext.tsx
- [x] /src/hooks/useComputerTurn.ts
- [ ] /src/hooks/useCountdown.ts
- [x] /src/hooks/useGameEnd.ts
- [x] /src/hooks/useHandleCardMatch.ts
- [x] /src/hooks/useInitializeGame.ts
- [ ] /src/hooks/useStrings.ts
- [ ] /src/hooks/useStyles.ts
- [ ] /src/lib/config.ts
- [x] /src/lib/utils.ts
- [ ] /src/pages/game/gameHeader.tsx
- [x] /src/pages/game/gamePage.tsx
- [ ] /src/pages/start/startHeader.tsx
- [x] /src/pages/start/startInput.tsx
- [x] /src/pages/start/startPage.tsx