-- psql -U postgres -f db/schema.sql

-- IF already exists, drop it.
DROP DATABASE IF EXISTS juschat_dev;

-- Create the database
CREATE DATABASE juschat_dev;

-- Connect to the database
\c juschat_dev;


-- Create the "users" table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100),
  first_name VARCHAR(80),
  last_name VARCHAR(80),
  email VARCHAR(100),
  title TEXT,
  is_online BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create the "chatrooms" table
CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  room_name VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
  managed_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
  open_to_public BOOLEAN DEFAULT false,
  description TEXT
);


-- Create the "members" table
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES chatrooms (id) ON DELETE CASCADE,
  member_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);


-- Create the "messages" table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chatroom_id INTEGER REFERENCES chatrooms (id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
