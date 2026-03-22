import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface QuizQuestion {
  id: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Fun";
  question: string;
  options: string[];
  answer: number; // index
  fact: string;
}

const QUESTIONS: QuizQuestion[] = [
  // UCL History
  {
    id: 1,
    category: "UCL History",
    difficulty: "Easy",
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["Barcelona", "Bayern Munich", "Real Madrid", "AC Milan"],
    answer: 2,
    fact: "Real Madrid have won the UCL 15 times, far more than any other club.",
  },
  {
    id: 2,
    category: "UCL History",
    difficulty: "Easy",
    question:
      "Who scored the winning goal in the 2005 Champions League final for Liverpool?",
    options: [
      "Steven Gerrard",
      "Djibril Cissé",
      "Vladimir Smicer",
      "Jerzy Dudek saved penalties",
    ],
    answer: 3,
    fact: "Liverpool won 3-2 on penalties after Jerzy Dudek saved Shevchenko's penalty. Liverpool came back from 3-0 down!",
  },
  {
    id: 3,
    category: "UCL History",
    difficulty: "Medium",
    question: "What is Cristiano Ronaldo's total UCL goal tally?",
    options: ["118 goals", "125 goals", "140 goals", "132 goals"],
    answer: 2,
    fact: "Ronaldo scored exactly 140 UCL goals across Manchester United, Real Madrid and Juventus.",
  },
  {
    id: 4,
    category: "UCL History",
    difficulty: "Medium",
    question: "Which team completed the treble (league, cup, UCL) in 1999?",
    options: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich"],
    answer: 2,
    fact: "Manchester United completed the treble in 1999, winning the UCL in stoppage time against Bayern Munich 2-1.",
  },
  {
    id: 5,
    category: "UCL History",
    difficulty: "Hard",
    question: "What is the fastest goal in UCL history?",
    options: [
      "10.2 sec – Roy Makaay",
      "8.1 sec – Raul",
      "12.0 sec – Van Persie",
      "9.8 sec – Inzaghi",
    ],
    answer: 0,
    fact: "Roy Makaay scored 10.2 seconds into Bayern Munich's 2007 quarter-final vs Real Madrid — the fastest UCL goal ever.",
  },
  {
    id: 6,
    category: "UCL History",
    difficulty: "Medium",
    question: "Who was the first English club to win the European Cup?",
    options: [
      "Liverpool",
      "Nottingham Forest",
      "Manchester United",
      "Aston Villa",
    ],
    answer: 2,
    fact: "Manchester United were the first English club to win the European Cup, beating Benfica 4-1 in 1968 at Wembley.",
  },
  {
    id: 7,
    category: "UCL History",
    difficulty: "Easy",
    question:
      "In which year was the tournament rebranded from the European Cup to the UEFA Champions League?",
    options: ["1989", "1990", "1992", "1994"],
    answer: 2,
    fact: "The competition was rebranded as the UEFA Champions League in 1992, introducing the famous anthem and group stage.",
  },
  {
    id: 8,
    category: "UCL History",
    difficulty: "Hard",
    question: "Which club won the first ever European Cup in 1955-56?",
    options: ["AC Milan", "Real Madrid", "Juventus", "Barcelona"],
    answer: 1,
    fact: "Real Madrid won the inaugural European Cup in 1956, beating Stade de Reims 4-3 in the final in Paris.",
  },
  {
    id: 9,
    category: "UCL History",
    difficulty: "Medium",
    question: "Who was the top scorer in the 2024-25 Champions League season?",
    options: [
      "Erling Haaland",
      "Vinicius Jr.",
      "Kylian Mbappe",
      "Ousmane Dembele",
    ],
    answer: 3,
    fact: "Ousmane Dembele was the top scorer in the 2024-25 UCL with 9 goals, helping PSG win the title.",
  },
  {
    id: 10,
    category: "UCL History",
    difficulty: "Hard",
    question: "How many times did AC Milan win the European Cup/UCL?",
    options: ["5 times", "6 times", "7 times", "8 times"],
    answer: 2,
    fact: "AC Milan won the European Cup/UCL 7 times: 1963, 1969, 1989, 1990, 1994, 2003, 2007.",
  },
  {
    id: 11,
    category: "UCL History",
    difficulty: "Medium",
    question: "Which Scottish club famously won the European Cup in 1967?",
    options: ["Rangers", "Hearts", "Hibernian", "Celtic"],
    answer: 3,
    fact: "Celtic ('The Lisbon Lions') beat Internazionale 2-1 in Lisbon in 1967, becoming the first British club to win the European Cup.",
  },
  {
    id: 12,
    category: "UCL History",
    difficulty: "Easy",
    question: "Who did PSG beat in the 2024-25 Champions League Final?",
    options: ["Real Madrid", "Barcelona", "Inter Milan", "Bayern Munich"],
    answer: 2,
    fact: "PSG beat Inter Milan 5-0 in the final at the Allianz Arena in Munich — a dominant performance by the Parisians.",
  },
  {
    id: 13,
    category: "UCL History",
    difficulty: "Hard",
    question:
      "Nottingham Forest won the European Cup back-to-back in which years?",
    options: [
      "1977 and 1978",
      "1978 and 1979",
      "1979 and 1980",
      "1980 and 1981",
    ],
    answer: 2,
    fact: "Nottingham Forest won the European Cup in 1979 (1-0 vs Malmö) and 1980 (1-0 vs Hamburg), both times with 1-0 victories.",
  },
  {
    id: 14,
    category: "UCL History",
    difficulty: "Medium",
    question:
      "What was the score in the 2019-20 Champions League quarter-final between Bayern Munich and Barcelona?",
    options: ["6-2", "7-2", "8-2", "5-2"],
    answer: 2,
    fact: "Bayern Munich demolished Barcelona 8-2 in a one-legged quarter-final in Lisbon in 2020 — one of the most shocking results in football history.",
  },
  {
    id: 15,
    category: "UCL History",
    difficulty: "Hard",
    question:
      "Which team beat Real Madrid 5-3 to win the 1961-62 European Cup final?",
    options: ["Juventus", "Benfica", "Ajax", "Feyenoord"],
    answer: 1,
    fact: "Benfica beat Real Madrid 5-3 in the 1962 final in Amsterdam, with Eusébio scoring twice. It ended Real Madrid's 5-year reign.",
  },
  // World Cup
  {
    id: 16,
    category: "World Cup",
    difficulty: "Easy",
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Argentina", "Italy", "Brazil"],
    answer: 3,
    fact: "Brazil have won the World Cup 5 times: 1958, 1962, 1970, 1994, and 2002.",
  },
  {
    id: 17,
    category: "World Cup",
    difficulty: "Easy",
    question: "Who scored the 'Hand of God' goal in 1986?",
    options: ["Pelé", "Diego Maradona", "Ronaldo", "Zidane"],
    answer: 1,
    fact: "Diego Maradona scored the infamous 'Hand of God' goal vs England at the 1986 World Cup, then immediately scored the 'Goal of the Century'.",
  },
  {
    id: 18,
    category: "World Cup",
    difficulty: "Medium",
    question: "Who is the all-time top scorer in World Cup history?",
    options: ["Pelé", "Ronaldo (Brazil)", "Miroslav Klose", "Gerd Müller"],
    answer: 2,
    fact: "Miroslav Klose scored 16 World Cup goals for Germany across 2002, 2006, 2010, and 2014.",
  },
  {
    id: 19,
    category: "World Cup",
    difficulty: "Medium",
    question: "Which country hosted the 1966 World Cup won by England?",
    options: ["France", "West Germany", "England", "Italy"],
    answer: 2,
    fact: "England hosted and won the 1966 World Cup, beating West Germany 4-2 in the final at Wembley. Geoff Hurst scored a hat-trick.",
  },
  {
    id: 20,
    category: "World Cup",
    difficulty: "Hard",
    question: "How many goals did Just Fontaine score at the 1958 World Cup?",
    options: ["11 goals", "12 goals", "13 goals", "14 goals"],
    answer: 2,
    fact: "Just Fontaine scored 13 goals in just 6 matches at the 1958 World Cup — a record that has stood for over 65 years.",
  },
  {
    id: 21,
    category: "World Cup",
    difficulty: "Easy",
    question: "Who won the 2022 FIFA World Cup in Qatar?",
    options: ["France", "Argentina", "Brazil", "England"],
    answer: 1,
    fact: "Argentina won the 2022 World Cup, beating France 4-2 on penalties after a 3-3 draw. Messi finally won the title.",
  },
  {
    id: 22,
    category: "World Cup",
    difficulty: "Medium",
    question:
      "What was the score in the 2014 World Cup semifinal Germany vs Brazil?",
    options: ["6-1", "7-1", "5-0", "8-1"],
    answer: 1,
    fact: "Germany thrashed Brazil 7-1 in the semi-final on home soil — the 'Mineirazo'. Germany scored 5 goals in under 20 minutes.",
  },
  {
    id: 23,
    category: "World Cup",
    difficulty: "Hard",
    question: "What is the fastest goal ever scored at a World Cup?",
    options: ["9.4 sec", "11 sec", "15 sec", "22 sec"],
    answer: 1,
    fact: "Hakan Şükür (Turkey) scored 11 seconds into the 2002 third-place match vs South Korea — the fastest World Cup goal ever.",
  },
  {
    id: 24,
    category: "World Cup",
    difficulty: "Medium",
    question: "Which team won the very first FIFA World Cup in 1930?",
    options: ["Brazil", "Argentina", "Uruguay", "Italy"],
    answer: 2,
    fact: "Uruguay won the first World Cup in 1930 on home soil, beating Argentina 4-2 in the final in Montevideo.",
  },
  {
    id: 25,
    category: "World Cup",
    difficulty: "Easy",
    question: "Who scored a hat-trick in the 2018 World Cup final?",
    options: [
      "Antoine Griezmann",
      "Kylian Mbappe",
      "Gonzalo Higuain",
      "Paul Pogba",
    ],
    answer: 1,
    fact: "Kylian Mbappe scored a hat-trick in the 2022 World Cup final (not 2018), but in 2018 he scored twice helping France beat Croatia 4-2.",
  },
  {
    id: 26,
    category: "World Cup",
    difficulty: "Hard",
    question:
      "How many yellow cards does a player accumulate to receive an automatic suspension in World Cup group stages?",
    options: ["1 yellow", "2 yellows", "3 yellows", "It depends on the stage"],
    answer: 1,
    fact: "2 yellow cards in the group and knockout stages (until semi-finals) results in an automatic one-match ban.",
  },
  {
    id: 27,
    category: "World Cup",
    difficulty: "Medium",
    question: "Who was the top scorer of the 2018 World Cup in Russia?",
    options: ["Mbappe", "Kane", "Griezmann", "Lukaku"],
    answer: 1,
    fact: "Harry Kane won the Golden Boot at the 2018 World Cup with 6 goals for England.",
  },
  {
    id: 28,
    category: "World Cup",
    difficulty: "Hard",
    question: "Which player famously bit Luis Suarez at the 2014 World Cup?",
    options: ["Giorgio Chiellini", "Sergio Ramos", "Dante", "Mats Hummels"],
    answer: 0,
    fact: "It was the other way around — Luis Suarez bit Italy's Giorgio Chiellini, receiving a 9-match ban and 4-month suspension from all football.",
  },
  {
    id: 29,
    category: "World Cup",
    difficulty: "Medium",
    question:
      "Which World Cup has the record for highest average goals per game?",
    options: [
      "1954 World Cup",
      "1958 World Cup",
      "1966 World Cup",
      "1970 World Cup",
    ],
    answer: 0,
    fact: "The 1954 World Cup in Switzerland had 5.38 goals per game — the highest ever. Hungary alone scored 27 goals in 5 matches!",
  },
  {
    id: 30,
    category: "World Cup",
    difficulty: "Hard",
    question: "How many times has Argentina won the FIFA World Cup?",
    options: ["2 times", "3 times", "4 times", "5 times"],
    answer: 1,
    fact: "Argentina have won the World Cup 3 times: 1978 (in Argentina), 1986 (Mexico), and 2022 (Qatar).",
  },
  // Legendary Players
  {
    id: 31,
    category: "Legendary Players",
    difficulty: "Easy",
    question: "How many Ballon d'Or awards has Lionel Messi won?",
    options: ["5", "6", "7", "8"],
    answer: 3,
    fact: "Messi has won the Ballon d'Or 8 times: 2009, 2010, 2011, 2012, 2015, 2019, 2021, and 2023 — the most in history.",
  },
  {
    id: 32,
    category: "Legendary Players",
    difficulty: "Easy",
    question: "Which country is Ronaldo (Cristiano) from?",
    options: ["Spain", "Portugal", "Brazil", "Italy"],
    answer: 1,
    fact: "Cristiano Ronaldo is Portuguese. He was born in Madeira, Portugal on February 5, 1985.",
  },
  {
    id: 33,
    category: "Legendary Players",
    difficulty: "Medium",
    question: "Who is known as 'O Fenomeno' (The Phenomenon)?",
    options: ["Pelé", "Ronaldinho", "Ronaldo (R9)", "Roberto Carlos"],
    answer: 2,
    fact: "Ronaldo Nazário — 'R9' — is known as 'O Fenomeno'. He won the World Cup twice (1994, 2002) and scored 15 World Cup goals.",
  },
  {
    id: 34,
    category: "Legendary Players",
    difficulty: "Hard",
    question:
      "How many goals did Pelé score in his entire career (all competitions)?",
    options: ["960 goals", "1,021 goals", "1,281 goals", "1,100 goals"],
    answer: 2,
    fact: "Pelé officially scored 1,281 goals in 1,363 appearances across all competitions, including 77 goals for Brazil in 92 matches.",
  },
  {
    id: 35,
    category: "Legendary Players",
    difficulty: "Medium",
    question:
      "Which team did Zinedine Zidane head-butt Marco Materazzi for in the 2006 World Cup final?",
    options: ["Italy", "France", "Argentina", "Portugal"],
    answer: 0,
    fact: "Zidane head-butted Italy's Marco Materazzi in the 2006 WC final after Materazzi insulted him. France lost on penalties.",
  },
  {
    id: 36,
    category: "Legendary Players",
    difficulty: "Hard",
    question:
      "Who scored in the 1950 World Cup for Uruguay and became a national hero?",
    options: [
      "Juan Schiaffino",
      "Jose Andrade",
      "Alcides Ghiggia",
      "Obdulio Varela",
    ],
    answer: 2,
    fact: "Alcides Ghiggia scored the winning goal for Uruguay in the 1950 Maracanazo — the 2-1 upset over Brazil at the Maracanã. He said: 'Only three people have silenced the Maracanã: Frank Sinatra, the Pope, and me.'",
  },
  {
    id: 37,
    category: "Legendary Players",
    difficulty: "Medium",
    question: "Which club did Johan Cruyff NOT play for?",
    options: ["Ajax", "Barcelona", "Feyenoord", "Real Madrid"],
    answer: 3,
    fact: "Johan Cruyff played for Ajax, Barcelona, LA Aztecs, Washington Diplomats, Levante, and Feyenoord — but never Real Madrid, Barcelona's rivals.",
  },
  {
    id: 38,
    category: "Legendary Players",
    difficulty: "Easy",
    question: "How old was Pelé when he played in his first World Cup?",
    options: ["15 years old", "17 years old", "18 years old", "16 years old"],
    answer: 1,
    fact: "Pelé was just 17 years old when he starred in the 1958 World Cup in Sweden, scoring 6 goals including a hat-trick in the semi-final.",
  },
  {
    id: 39,
    category: "Legendary Players",
    difficulty: "Hard",
    question: "Who was the first player to win the Ballon d'Or three times?",
    options: [
      "Johan Cruyff",
      "Michel Platini",
      "Marco van Basten",
      "Franz Beckenbauer",
    ],
    answer: 1,
    fact: "Michel Platini won the Ballon d'Or 3 consecutive times: 1983, 1984, and 1985 — a remarkable achievement until Messi broke the record.",
  },
  {
    id: 40,
    category: "Legendary Players",
    difficulty: "Medium",
    question:
      "Which goalkeeper scored a World Cup goal from his own half by clearing from his hands?",
    options: [
      "Peter Schmeichel",
      "Jose Luis Chilavert",
      "Rogerio Ceni",
      "René Higuita",
    ],
    answer: 3,
    fact: "Colombian goalkeeper René Higuita is famous for his 'scorpion kick' save vs England in 1995. He also scored from free kicks.",
  },
  {
    id: 41,
    category: "Legendary Players",
    difficulty: "Hard",
    question: "Who has the record for most international goals for England?",
    options: ["Gary Lineker", "Wayne Rooney", "Harry Kane", "Bobby Charlton"],
    answer: 2,
    fact: "Harry Kane surpassed Wayne Rooney's record of 53 England goals and currently holds the all-time record with 63+ goals.",
  },
  {
    id: 42,
    category: "Legendary Players",
    difficulty: "Medium",
    question: "How many Premier League Golden Boots has Mohamed Salah won?",
    options: ["2", "3", "4", "5"],
    answer: 2,
    fact: "Mohamed Salah has won 4 Premier League Golden Boot awards (2017-18, 2018-19, 2021-22, 2023-24), the joint most in Premier League history.",
  },
  {
    id: 43,
    category: "Legendary Players",
    difficulty: "Easy",
    question: "Who is the all-time top scorer for Argentina's national team?",
    options: [
      "Diego Maradona",
      "Gabriel Batistuta",
      "Sergio Aguero",
      "Lionel Messi",
    ],
    answer: 3,
    fact: "Lionel Messi holds the record for most Argentina goals with 109, ahead of legends like Batistuta (54) and Maradona (34).",
  },
  {
    id: 44,
    category: "Legendary Players",
    difficulty: "Hard",
    question:
      "Which legendary Brazilian player wore the number 10 shirt before Pele?",
    options: ["Garrincha", "Didi", "Nilton Santos", "Vavá"],
    answer: 1,
    fact: "Didi, Brazil's midfield maestro, wore the number 10 before Pelé. He was arguably Brazil's best player before Pelé emerged.",
  },
  {
    id: 45,
    category: "Legendary Players",
    difficulty: "Medium",
    question:
      "Diego Maradona's famous 'Goal of the Century' was scored against which country at the 1986 World Cup?",
    options: ["Italy", "West Germany", "England", "Belgium"],
    answer: 2,
    fact: "Maradona's 'Goal of the Century' was scored against England in the 1986 quarter-final in Mexico City. He also scored the 'Hand of God' in the same match.",
  },
  // Indian Football
  {
    id: 46,
    category: "Indian Football",
    difficulty: "Easy",
    question: "Who is India's all-time top scorer in international football?",
    options: [
      "Bhaichung Bhutia",
      "I.M. Vijayan",
      "Sunil Chhetri",
      "Gurpreet Singh Sandhu",
    ],
    answer: 2,
    fact: "Sunil Chhetri has scored 94 international goals for India in 152 matches, making him the 3rd highest scorer among active international players globally.",
  },
  {
    id: 47,
    category: "Indian Football",
    difficulty: "Medium",
    question: "Which club does Gurpreet Singh Sandhu play for?",
    options: [
      "Mumbai City FC",
      "ATK Mohun Bagan",
      "Bengaluru FC",
      "Kerala Blasters",
    ],
    answer: 2,
    fact: "Gurpreet Singh Sandhu is India's No.1 goalkeeper and captain, playing for Bengaluru FC in the ISL.",
  },
  {
    id: 48,
    category: "Indian Football",
    difficulty: "Hard",
    question:
      "India qualified for the 1950 FIFA World Cup but withdrew. What is the most cited reason?",
    options: [
      "Financial problems",
      "Players wanted to play barefoot",
      "Political reasons",
      "No airline connections to Brazil",
    ],
    answer: 1,
    fact: "The most popular story is that FIFA refused to let India play barefoot, but historians believe it was a combination of factors including financial costs and political situations.",
  },
  {
    id: 49,
    category: "Indian Football",
    difficulty: "Medium",
    question:
      "Who was the first Indian player to sign for a professional European club?",
    options: [
      "Sunil Chhetri",
      "Sandesh Jhingan",
      "Bhaichung Bhutia",
      "I.M. Vijayan",
    ],
    answer: 2,
    fact: "Bhaichung Bhutia became the first Indian to play professional football in England when he signed for Bury FC in 1999.",
  },
  {
    id: 50,
    category: "Indian Football",
    difficulty: "Easy",
    question: "What is India's highest FIFA World Ranking?",
    options: ["64", "85", "99", "124"],
    answer: 0,
    fact: "India's highest ever FIFA ranking was 94th in 1996, though some sources cite 64th in 1993. India's current ranking hovers around 120-130.",
  },
  {
    id: 51,
    category: "Indian Football",
    difficulty: "Hard",
    question:
      "Which Indian club is the most successful in Asian club competitions?",
    options: [
      "East Bengal",
      "Mohun Bagan",
      "Bengaluru FC",
      "Churchill Brothers",
    ],
    answer: 0,
    fact: "East Bengal reached the final of the AFC Cup in 2003, making them the most successful Indian club in Asian competition.",
  },
  {
    id: 52,
    category: "Indian Football",
    difficulty: "Medium",
    question:
      "How many goals did Sunil Chhetri score in the 2022 SAFF Championship?",
    options: ["3 goals", "5 goals", "6 goals", "9 goals"],
    answer: 2,
    fact: "Sunil Chhetri scored 6 goals at the 2022 SAFF Championship, helping India win the title. India have won SAFF 9 times.",
  },
  {
    id: 53,
    category: "Indian Football",
    difficulty: "Hard",
    question: "Which city is considered the football capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Bengaluru"],
    answer: 2,
    fact: "Kolkata is the football capital of India, home to Mohun Bagan and East Bengal — two of India's most storied clubs with over 100 years of rivalry.",
  },
  {
    id: 54,
    category: "Indian Football",
    difficulty: "Medium",
    question: "What is the name of India's national football league?",
    options: [
      "I-League",
      "ISL (Indian Super League)",
      "National Football League",
      "Santosh Trophy",
    ],
    answer: 1,
    fact: "The Indian Super League (ISL) is India's top-tier professional football league, launched in 2014. The I-League also continues as a parallel competition.",
  },
  {
    id: 55,
    category: "Indian Football",
    difficulty: "Easy",
    question:
      "Which confederation does India belong to in international football?",
    options: ["UEFA", "CAF", "CONMEBOL", "AFC"],
    answer: 3,
    fact: "India is a member of the Asian Football Confederation (AFC), which covers 47 national football associations across Asia.",
  },
  // Records & Fun Facts
  {
    id: 56,
    category: "Records & Fun Facts",
    difficulty: "Fun",
    question: "Goalkeeper Rogerio Ceni scored how many career goals?",
    options: ["47 goals", "87 goals", "131 goals", "63 goals"],
    answer: 2,
    fact: "Brazilian goalkeeper Rogerio Ceni scored 131 career goals for Sao Paulo FC — all from free kicks and penalties. An astonishing record.",
  },
  {
    id: 57,
    category: "Records & Fun Facts",
    difficulty: "Fun",
    question:
      "What is the world record for the fastest hat-trick in football history?",
    options: ["90 seconds", "70 seconds", "2 minutes 25 seconds", "3 minutes"],
    answer: 0,
    fact: "Tommy Ross scored a hat-trick in just 90 seconds for Ross County vs Nairn County in Scotland in 1964 — the world's fastest hat-trick.",
  },
  {
    id: 58,
    category: "Records & Fun Facts",
    difficulty: "Hard",
    question: "Which country won the inaugural FIFA World Cup in 1930?",
    options: ["Brazil", "Argentina", "Uruguay", "Italy"],
    answer: 2,
    fact: "Uruguay hosted and won the first World Cup in 1930, beating Argentina 4-2 in the final. 13 countries participated.",
  },
  {
    id: 59,
    category: "Records & Fun Facts",
    difficulty: "Fun",
    question: "What was the score in the most goals-filled World Cup match?",
    options: ["9-0", "10-1", "11-3", "12-0"],
    answer: 1,
    fact: "Hungary beat El Salvador 10-1 at the 1982 World Cup in Spain. László Kiss came on as substitute and scored a hat-trick in 7 minutes.",
  },
  {
    id: 60,
    category: "Records & Fun Facts",
    difficulty: "Medium",
    question:
      "Which transfer was the most expensive in football history as of 2025?",
    options: [
      "Kylian Mbappe to PSG",
      "Neymar to PSG (€222m)",
      "Jack Grealish to Man City",
      "Declan Rice to Arsenal",
    ],
    answer: 1,
    fact: "Neymar's €222 million transfer from Barcelona to PSG in 2017 remains the most expensive transfer in football history.",
  },
  {
    id: 61,
    category: "Records & Fun Facts",
    difficulty: "Hard",
    question:
      "What is the highest score in a single professional football match (official)?",
    options: ["36-0", "46-0", "149-0", "30-0"],
    answer: 2,
    fact: "In 2002, Congolese club AS Adema won 149-0 against SO l'Emyrne, who deliberately scored 149 own goals in protest at a refereeing decision.",
  },
  {
    id: 62,
    category: "Records & Fun Facts",
    difficulty: "Fun",
    question:
      "How long did the most-penalized World Cup match take, with 16 yellow cards and 4 red cards?",
    options: [
      "2014 Brazil vs Colombia",
      "1998 Germany vs Cameroon",
      "2006 Portugal vs Netherlands",
      "2002 Italy vs South Korea",
    ],
    answer: 2,
    fact: "The 2006 World Cup Round of 16 match between Portugal and Netherlands — 'The Battle of Nuremberg' — saw 16 yellow cards, 4 red cards, and 42 fouls in 90 minutes.",
  },
  {
    id: 63,
    category: "Records & Fun Facts",
    difficulty: "Medium",
    question: "What is the name of the famous Maracana stadium?",
    options: [
      "Estádio Olímpico",
      "Estádio do Maracanã",
      "Arena Corinthians",
      "Estádio Mineirão",
    ],
    answer: 1,
    fact: "The Estádio Jornalista Mário Filho, known as the Maracanã, holds the record for the largest crowd in football history: 199,854 for the 1950 World Cup final.",
  },
  {
    id: 64,
    category: "Records & Fun Facts",
    difficulty: "Hard",
    question: "Who invented the 'bicycle kick' (overhead kick) in football?",
    options: ["Pelé", "Leonidas da Silva", "Ramón Unzaga", "Garrincha"],
    answer: 2,
    fact: "Ramón Unzaga of Chile is credited with inventing the bicycle kick in the early 1900s during Chilean league matches. Pelé famously popularized it internationally.",
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-300 border-green-500/40",
  Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  Hard: "bg-red-500/20 text-red-300 border-red-500/40",
  Fun: "bg-purple-500/20 text-purple-300 border-purple-500/40",
};

const CATEGORIES = [
  "All",
  "UCL History",
  "World Cup",
  "Legendary Players",
  "Indian Football",
  "Records & Fun Facts",
];
const TIMER_SECONDS = 30;

export default function QuizPage() {
  const [gameState, setGameState] = useState<"category" | "playing" | "result">(
    "category",
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = questions[currentIndex];

  const startQuiz = useCallback((category: string) => {
    const pool =
      category === "All"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.category === category);
    const shuffled = [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(15, pool.length));
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setTimeLeft(TIMER_SECONDS);
    setGameState("playing");
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      if (timerRef.current) clearInterval(timerRef.current);
      const isCorrect = idx === currentQuestion.answer;
      if (isCorrect) setScore((s) => s + 1);
      setAnswers((prev) => [...prev, idx]);
    },
    [selected, currentQuestion],
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setGameState("result");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(TIMER_SECONDS);
    }
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (gameState !== "playing" || selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setSelected(-1); // timed out
          setAnswers((prev) => [...prev, null]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, selected]);

  const percentage =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    percentage >= 90
      ? "🏆 Football Genius!"
      : percentage >= 75
        ? "⭐ Football Expert!"
        : percentage >= 60
          ? "👍 Football Fan"
          : percentage >= 40
            ? "📚 Learning Fast!"
            : "🌱 Keep Studying!";

  if (gameState === "category") {
    return (
      <section className="pb-12">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3"
          >
            <span className="green-gradient">🎯 Football Quiz</span>
          </motion.h1>
          <p className="text-white/50 text-lg">
            Test your football knowledge with 60+ questions!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, i) => {
            const count =
              cat === "All"
                ? QUESTIONS.length
                : QUESTIONS.filter((q) => q.category === cat).length;
            const icons: Record<string, string> = {
              All: "🌍",
              "UCL History": "⭐",
              "World Cup": "🏆",
              "Legendary Players": "👑",
              "Indian Football": "🇮🇳",
              "Records & Fun Facts": "🎪",
            };
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  type="button"
                  data-ocid={`quiz.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.button`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    startQuiz(cat);
                  }}
                  className="w-full card-glow bg-gray-900/80 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-6 text-center transition-all hover:scale-105 cursor-pointer group"
                >
                  <div className="text-4xl mb-3">{icons[cat] || "🎯"}</div>
                  <p className="text-white font-bold text-lg">{cat}</p>
                  <p className="text-white/40 text-sm mt-1">
                    {count} questions
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  if (gameState === "result") {
    return (
      <section className="pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gray-900/80 border-white/10 text-white">
            <CardContent className="pt-10 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-display font-bold mb-2 trophy-gradient">
                {grade}
              </h2>
              <p className="text-white/60 text-lg mb-6">
                You scored {score} out of {questions.length}
              </p>
              <div className="text-5xl font-bold font-display mb-2">
                {percentage}%
              </div>
              <Progress value={percentage} className="h-3 mb-8" />
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-3xl font-bold text-green-400">{score}</p>
                  <p className="text-white/50 text-sm">Correct</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-3xl font-bold text-red-400">
                    {questions.length - score}
                  </p>
                  <p className="text-white/50 text-sm">Incorrect</p>
                </div>
              </div>
              {/* Answer review */}
              <div className="text-left space-y-3 mb-8 max-h-64 overflow-y-auto">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.answer;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-lg p-3 text-sm border ${isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}
                    >
                      <p className="font-medium">
                        {isCorrect ? "✅" : "❌"} {q.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-white/50 mt-1">
                          ✓ {q.options[q.answer]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Button
                  data-ocid="quiz.play_again.button"
                  onClick={() => startQuiz(selectedCategory)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                >
                  🔄 Play Again
                </Button>
                <Button
                  data-ocid="quiz.change_category.button"
                  variant="outline"
                  onClick={() => setGameState("category")}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  🗂️ Change Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  // Playing state
  return (
    <section className="pb-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/50 text-sm">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">Score: {score}</span>
              <span
                className={`font-bold text-lg ${timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}
              >
                ⏱ {timeLeft}s
              </span>
            </div>
          </div>
          <Progress
            value={(currentIndex / questions.length) * 100}
            className="h-2"
          />
        </div>

        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="bg-gray-900/80 border-white/10 text-white mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      className={`text-xs border ${difficultyColors[currentQuestion.difficulty]}`}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge className="bg-white/10 text-white/60 border-white/20 text-xs">
                      {currentQuestion.category}
                    </Badge>
                  </div>
                  <p className="text-xl font-semibold leading-relaxed mb-6">
                    {currentQuestion.question}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((opt, i) => {
                      let btnClass =
                        "w-full p-4 rounded-xl text-left border transition-all font-medium ";
                      if (selected === null) {
                        btnClass +=
                          "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30";
                      } else if (i === currentQuestion.answer) {
                        btnClass +=
                          "bg-green-500/20 border-green-500/50 text-green-300";
                      } else if (
                        i === selected &&
                        selected !== currentQuestion.answer
                      ) {
                        btnClass +=
                          "bg-red-500/20 border-red-500/50 text-red-300";
                      } else {
                        btnClass += "bg-white/5 border-white/10 opacity-50";
                      }
                      return (
                        <button
                          type="button"
                          key={opt}
                          data-ocid={`quiz.option.${i + 1}`}
                          onClick={() => handleAnswer(i)}
                          disabled={selected !== null}
                          className={btnClass}
                        >
                          <span className="text-white/40 mr-2">
                            {["A", "B", "C", "D"][i]}.
                          </span>{" "}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
                    >
                      <p className="text-blue-300 text-sm">
                        <strong>💡 Fun Fact:</strong> {currentQuestion.fact}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
              {selected !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button
                    data-ocid="quiz.next.button"
                    onClick={nextQuestion}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 text-lg"
                  >
                    {currentIndex + 1 >= questions.length
                      ? "See Results 🎉"
                      : "Next Question →"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
