import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
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

  // User-specific metadata type
  public type UserProfile = {
    name : Text;
    // Add more profile fields here if needed
  };

  public type ScoreEntry = {
    email : Text;
    score : Nat;
    category : Text;
    timestamp : Int;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let leaderboard = List.empty<ScoreEntry>();
  let userStore = Map.empty<Email, User>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

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

  // Returns true if new high score (for leaderboard display)
  public shared ({ caller }) func registerUser(email : Text, password : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    // No authorization check - anyone can register
    if (userStore.containsKey(email)) {
      return #err("User already exists");
    };

    let user : User = {
      email;
      password;
    };
    userStore.add(email, user);
    #ok("User registered successfully");
  };

  public shared ({ caller }) func loginUser(email : Text, password : Text) : async {
    #ok : Text;
    #err : Text;
  } {
    // No authorization check - anyone can attempt login
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

  public query ({ caller }) func getUserByEmail(email : Text) : async ?{ email : Text } {
    // No authorization check - but only return email, not password
    switch (userStore.get(email)) {
      case (null) { null };
      case (?user) {
        ?{ email = user.email };
      };
    };
  };

  public shared ({ caller }) func saveScore(email : Text, score : Nat, category : Text) : async () {
    // Require user authentication
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

  public query ({ caller }) func getTopScores(category : Text) : async [ScoreEntry] {
    // No authorization check - public leaderboard data
    leaderboard.filter(func(entry) { entry.category == category }).toArray().sort(
      // Sort by score descending
      func(a, b) { Nat.compare(b.score, a.score) },
    );
  };

  public query ({ caller }) func getAllTopScores() : async [ScoreEntry] {
    // No authorization check - public leaderboard data
    leaderboard.toArray().sort(
      // Sort by score descending
      func(a, b) { Nat.compare(b.score, a.score) },
    );
  };
};
