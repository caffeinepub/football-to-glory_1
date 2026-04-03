import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";

import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  type Email = Text;
  type Password = Text;
  type Score = Nat;
  type Category = Text;

  type User = {
    email : Text;
    password : Text;
  };

  public type UserStats = {
    countriesViewed : [Text];
    playersSearched : [Text];
    quizScores : [QuizScore];
  };

  public type ScoreEntry = {
    email : Text;
    score : Nat;
    category : Text;
    timestamp : Int;
  };

  public type QuizScore = {
    score : Nat;
    category : Text;
    totalQuestions : Nat;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  type Country = Text;
  type PlayerQuery = Text;
  type SessionToken = Text;

  let leaderboard = List.empty<ScoreEntry>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userStatsStore = Map.empty<Text, UserStats>();
  let userStore = Map.empty<Email, User>();
  var nextUserId = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func getTopLeaderboardEntry(limit : Nat) : [ScoreEntry] {
    let sortedEntries = leaderboard.toArray().sort(
      func(a, b) { Nat.compare(b.score, a.score) }
    );
    if (sortedEntries.size() > limit) {
      Array.tabulate<ScoreEntry>(
        limit,
        func(i) { sortedEntries[i] },
      );
    } else {
      sortedEntries;
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Register a new user with email and password - accessible to guests
  public shared ({ caller }) func registerUser(email : Text, password : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    if (userStore.containsKey(email)) {
      return #err("User already exists");
    };
    let user : User = { email; password };
    userStore.add(email, user);
    #ok("User registered successfully");
  };

  // Login a user - accessible to guests
  public shared ({ caller }) func loginUser(email : Text, password : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    switch (userStore.get(email)) {
      case (null) { #err("User does not exist") };
      case (?user) {
        if (user.password == password) {
          #ok(user.email);
        } else {
          #err("Incorrect password");
        };
      };
    };
  };

  // Score Management - requires user authentication
  public shared ({ caller }) func saveScore(email : Text, score : Nat, category : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save scores");
    };
    let newEntry : ScoreEntry = {
      email;
      score;
      category;
      timestamp = Time.now();
    };
    leaderboard.add(newEntry);
  };

  // Public leaderboard - accessible to all including guests
  public query ({ caller }) func getTopScores() : async [ScoreEntry] {
    getTopLeaderboardEntry(10);
  };

  // Public leaderboard - accessible to all including guests
  public query ({ caller }) func getGlobalLeaderboard() : async [ScoreEntry] {
    let sortedEntries = leaderboard.toArray().sort(
      func(a, b) { Nat.compare(b.score, a.score) }
    );
    if (sortedEntries.size() > 10) {
      Array.tabulate<ScoreEntry>(
        10,
        func(i) { sortedEntries[i] },
      );
    } else {
      sortedEntries;
    };
  };

  // Track user activity: country views - requires user authentication and ownership
  public shared ({ caller }) func trackCountryView(email : Text, country : Country) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can track activity");
    };
    switch (userStatsStore.get(email)) {
      case (null) { () };
      case (?stats) {
        let updatedCountries = Array.tabulate(
          stats.countriesViewed.size() + 1,
          func(i) {
            if (i < stats.countriesViewed.size()) {
              stats.countriesViewed[i];
            } else {
              country;
            };
          },
        );
        let updatedStats = { stats with countriesViewed = updatedCountries };
        userStatsStore.add(email, updatedStats);
      };
    };
  };

  // Track player searches - requires user authentication and ownership
  public shared ({ caller }) func trackPlayerSearch(email : Text, playerQuery : PlayerQuery) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can track activity");
    };
    switch (userStatsStore.get(email)) {
      case (null) { () };
      case (?stats) {
        let updatedSearches = Array.tabulate(
          stats.playersSearched.size() + 1,
          func(i) {
            if (i < stats.playersSearched.size()) {
              stats.playersSearched[i];
            } else {
              playerQuery;
            };
          },
        );
        let updatedStats = { stats with playersSearched = updatedSearches };
        userStatsStore.add(email, updatedStats);
      };
    };
  };

  // Get owned user stats - requires user authentication and ownership
  public shared ({ caller }) func getUserStats(email : Text) : async ?UserStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view stats");
    };

    userStatsStore.get(email);
  };

  // Submit quiz score - requires user authentication and ownership
  public shared ({ caller }) func submitQuizScore(email : Text, score : Nat, category : Category, totalQuestions : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit scores");
    };
    let newScore : QuizScore = {
      score;
      category;
      totalQuestions;
      timestamp = Time.now();
    };
    switch (userStatsStore.get(email)) {
      case (null) { () };
      case (?stats) {
        let updatedScores = Array.tabulate(
          stats.quizScores.size() + 1,
          func(i) {
            if (i < stats.quizScores.size()) {
              stats.quizScores[i];
            } else {
              newScore;
            };
          },
        );
        let updatedStats = { stats with quizScores = updatedScores };
        userStatsStore.add(email, updatedStats);
      };
    };
  };

  // Get user scores - requires ownership or admin access
  public query ({ caller }) func getUserScores(email : Text) : async [ScoreEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view scores");
    };
    leaderboard.filter(func(entry) { entry.email == email }).toArray().sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    );
  };
};
