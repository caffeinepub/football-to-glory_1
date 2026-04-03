# Football to Glory

## Current State
The draft has expired. Rebuilding from scratch with all previously implemented features intact.

## Requested Changes (Diff)

### Add
- Rebuild from expired state with all Version 20 features
- Verified player stats for all major legends (goals official+unofficial, assists, caps)

### Modify
- N/A (full rebuild)

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- User authentication: email + password sign-up/login, session persistence
- Quiz/Trivia score storage per user (date + score)
- Global leaderboard: top 10 scores across all users
- Profile data: quiz history, countries viewed, players searched

### Frontend Features
1. **Login/Sign-up page** -- Football-themed full-screen background, email+password form, shown at app start
2. **Navigation tabs**: Home, Players, Countries, UCL Seasons, Live Scores, Quiz, Trivia, Fun Records, League Browser, Profile
3. **Players tab** -- 2000+ real players, paginated 24 at a time, searchable/filterable, specific positions (ST, LW, RW, CAM, CF, CDM, RM, LM, CM, CB, RWB, LWB, LB, RB, GK), height (ft/in), weight (kg), goals (official + unofficial), assists, caps, player images from Wikipedia
4. **Countries tab** -- All 196 FIFA nations grouped by confederation, clickable for full detail panel: FIFA ranking, confederation ranking, World Cup history, continental history, top scorers, current squad by specific position, legends, domestic leagues
5. **UCL Seasons Browser** -- All seasons 1956-2026, drill-down to group stage and knockout rounds. 2025-26 corrected: Puskas Arena Budapest venue, correct Knockout Playoffs, R16, QF
6. **Live Scores** -- TheSportsDB API, Live Now / Recent Results / Upcoming tabs, 6+ major leagues, player stat cards
7. **Quiz** -- 10 questions per session, Next Question button, leaderboard popup at end showing top 10 global scores
8. **Random Trivia** -- 10 items per session, Reveal Answer, rate Knew It / Learned It, leaderboard popup at end
9. **Fun Records** -- Interesting football records page
10. **League Browser** -- All major leagues → clubs → real players with height, weight, position, club logos from Wikipedia
11. **Profile page** -- Quiz/trivia score history (date + score), countries viewed, players searched stats

### Player Stats (Wikipedia-verified)
- Cristiano Ronaldo: 964 goals (official + unofficial), 413 assists, 219 caps
- Lionel Messi: 900 goals, 406 assists, 190 caps
- Pelé: 1283 goals, 582 assists, 92 caps
- Romário: 1000+ goals
- Josef Bican: 805 goals
- Gerd Müller: 735 goals, 68 caps
- Ronaldo Nazário: 414 goals, 150 assists, 98 caps
- Zlatan Ibrahimović: 571 goals, 297 assists, 120 caps
- Neymar: 437 goals, 231 assists, 128 caps
- Ronaldinho: 298 goals, 180 assists, 97 caps
- Diego Maradona: 345 goals, 267 assists, 91 caps
