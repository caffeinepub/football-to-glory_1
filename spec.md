# Football to Glory

## Current State
- Full football web app with UCL seasons, World Cup data, player database (1500+ real players), countries tab (196 nations), league browser, live scores, quiz/trivia, fun records, and Internet Identity login in header.
- QuizPage.tsx: multiple-choice quiz with unlimited questions and no leaderboard.
- RandomTrivia.tsx: trivia cards with reveal/skip, no question limit, no leaderboard.
- Backend: authorization mixin + userProfiles stored by Principal. No email/password auth. No leaderboard storage.
- No dedicated sign-up/login page; app loads directly.

## Requested Changes (Diff)

### Add
- Dedicated full-screen sign-up / login page shown before app loads (email + password form)
- Email/password registration and login backed by Motoko (store hashed credentials keyed by email)
- Leaderboard backend: save quiz/trivia scores per user (email + score + timestamp), retrieve top 10 global scores
- Quiz limited to exactly 10 questions per session with Next Question button
- Trivia limited to exactly 10 items per session with Next Question button
- Leaderboard modal/popup shown after completing 10 questions, displaying top 10 scores globally

### Modify
- App.tsx: gate entire app behind auth state; show login page if not signed in
- QuizPage.tsx: slice questions to 10, add Next button flow, submit score to backend on completion, show leaderboard
- RandomTrivia.tsx: slice trivia to 10, add Next button flow, submit score to backend on completion, show leaderboard

### Remove
- Internet Identity login button from header (replaced by email/password auth page)

## Implementation Plan
1. Backend: add registerUser(email, password) and loginUser(email, password) functions; add saveScore(email, score, category) and getTopScores(category) returning top 10
2. Frontend auth: LoginPage.tsx component with sign-up / sign-in tabs, email+password fields, calling backend
3. App.tsx: track currentUser state; show LoginPage if null, main app if signed in
4. QuizPage.tsx: limit to 10 questions, currentQuestionIndex state, Next button, score submission, LeaderboardModal
5. RandomTrivia.tsx: same 10-item limit, Next button, score submission, LeaderboardModal
6. Shared LeaderboardModal component showing top 10 scores
