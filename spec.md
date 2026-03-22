# Football to Glory

## Current State
- App has real player data (~500-1000 players), UCL seasons browser, live scores via TheSportsDB, countries tab (196 nations), league browser, quiz/trivia, fun records, legends, India section, Internet Identity login
- Players display height (ft/in), weight (kg), specific positions (ST, LW, RW, CAM, CF, CDM, RM, LM, CM, CB, RWB, LWB, LB, RB, GK)
- League browser shows clubs; clicking club shows players from that club
- No player images or team logos currently
- Live scores via TheSportsDB API

## Requested Changes (Diff)

### Add
- Player images: show real player photos using Wikipedia/Wikimedia public image URLs for well-known players; fallback to a silhouette SVG placeholder for others
- Team/club logos: show official logos via Wikipedia/Wikimedia public URLs in league browser and player cards
- Significantly expand real player database: add hundreds more real players across all major leagues and national teams, with accurate stats (goals, assists, caps, height, weight, position)
- Support player image field in player data structure
- Support club logo field in league/club data structure

### Modify
- Player cards: show player photo thumbnail in top-left of card
- Player detail modal: show larger player photo
- League browser: show team logo next to club name
- Player data: add imageUrl field; populate for well-known players with Wikimedia URLs
- Club data: add logoUrl field; populate with Wikimedia URLs
- Expand the players array with more real players across Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Brasileirao, MLS, J-League, Saudi Pro League, ISL, and all 196 national teams

### Remove
- Nothing removed

## Implementation Plan
1. Update player data type to include optional imageUrl field
2. Update club/league data type to include optional logoUrl field
3. Add Wikipedia/Wikimedia image URLs for 200+ top players (Messi, Ronaldo, Mbappe, Haaland, etc.)
4. Add Wikipedia/Wikimedia logo URLs for major clubs (Man City, Real Madrid, Barcelona, Bayern, PSG, etc.)
5. Add 300+ more real players across all leagues with accurate stats
6. Update PlayerCard component to show player image thumbnail with fallback silhouette
7. Update player detail modal to show larger player photo
8. Update LeagueBrowser to show club logos
9. Live scores stays on TheSportsDB (no change needed)
