// Not actually sending queries from here, just showing the ones done in supabase

//! Users Table
// CREATE TABLE IF NOT EXISTS users (
//     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     clerk_id VARCHAR(255) UNIQUE,
//     username VARCHAR(255) UNIQUE,
//     first_name VARCHAR(255),
//     last_name VARCHAR (255),
//     email VARCHAR(255),
//     profile_pic TEXT,
//     location VARCHAR(255),
//     bio TEXT
//   );

//! Posts Table
//   CREATE TABLE IF NOT EXISTS posts (
//     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     user_id VARCHAR(255) REFERENCES users(clerk_id),
//     timestamp TIMESTAMP,
//     post_title VARCHAR(255),
//     post_img TEXT
//   );

// Didn't insert any dummy data because I had to wait until the Clerk account creation was set up (to get user ids) and then I forgot to do it but I made the create-post page before the posts page anyway so it didn't cause any problems

//! Selecting data for the feed
// SELECT users.username, users.profile_pic, posts.id, posts.user_id, posts.timestamp, posts.post_title, posts.post_img
// FROM users
// JOIN posts ON posts.user_id = users.clerk_id

//! Adding alt_text column to posts table
// ALTER TABLE posts
// ADD post_alt VARCHAR(255);

// I had to add alt text manually in the table editor to the posts I'd already created, please forgive me
