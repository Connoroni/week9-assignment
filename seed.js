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

//! I won't be able to insert dummy data until I have at least one account created with Clerk so I can get the id
