-- psql -U postgres -f db/seed.sql

-- Connect to the database
\c juschat_dev;


-- Insert data into the "users" table
INSERT INTO users
(username, password, first_name, last_name, email, short_bio, is_online, created_at)
VALUES
('michael_scott', 'password101', 'Michael', 'Scott', 'michael.scott@dundermifflin.com', 'Regional Manager', true, '1684328400'),
('jim_halpert', 'password102', 'Jim', 'Halpert', 'jim.halpert@dundermifflin.com', 'Sales Representative', true, '1684328700'),
('pam_beesly', 'password103', 'Pam', 'Beesly', 'pam.beesly@dundermifflin.com', 'Receptionist', true, '1684329000'),
('dwight_schrute', 'password104', 'Dwight', 'Schrute', 'dwight.schrute@dundermifflin.com', 'Assistant to the Regional Manager', true, '1684329300'),
('andy_bernard', 'password105', 'Andy', 'Bernard', 'andy.bernard@dundermifflin.com', 'Sales Representative', true, '1684329600'),
('angela_martin', 'password106', 'Angela', 'Martin', 'angela.martin@dundermifflin.com', 'Senior Accountant', true, '1684329900'),
('kevin_malone', 'password107', 'Kevin', 'Malone', 'kevin.malone@dundermifflin.com', 'Accountant', true, '1684330200'),
('oscar_martinez', 'password108', 'Oscar', 'Martinez', 'oscar.martinez@dundermifflin.com', 'Accountant', true, '1684330500');


-- Insert mock data for "chatrooms" table
INSERT INTO chatrooms
(chatroom_name, created_at, created_by, managed_by, open_to_public, description)
VALUES
('Conference Room', '1684420200', 1, 1, false, 'Main conference room for meetings'),
('Break Room', '1684420500', 1, 3, false, 'Room for relaxing and taking breaks'),
('Sales Team', '1684420800', 1, 2, false, 'Chatroom for the sales team'),
('Accounting', '1684421100', 1, 6, false, 'Chat for the Accounting Dept'),
('Test', '1684421400', 1, 1, true, 'Testing App'),
('Random', '1684421700', 1, 1, true, 'Random chatroom'),
('Fun', '1684422000', 1, 1, true, 'For fun');


-- Insert mock data for "members" table
INSERT INTO members
(chatroom_id, user_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 4),
(3, 5),
(4, 6),
(4, 7),
(4, 8),
(5, 1),
(5, 2),
(6, 1),
(6, 4),
(7, 1),
(7, 2),
(7, 4);


-- Insert mock data for "messages" table
INSERT INTO messages
(chatroom_id, user_id, message, sent_at)
VALUES
(1, 1, 'Good morning, everyone!', '1684509600'),
(1, 2, 'Morning, Pam!', '1684509660'),
(1, 3, 'Hi, Jim!', '1684509720'),
(1, 1, 'Let''s start the meeting.', '1684509780'),
(2, 2, 'Up for a coffee?', '1684509840'),
(2, 3, 'Sure!', '1684509900'),
(3, 2, 'Great job on closing the sale!', '1684509960'),
(3, 4, 'Thanks!', '1684510020'),
(5, 1, 'Hello.', '1684510080'),
(5, 1, 'Nice app!', '1684510140'),
(6, 4, 'Animals that lay eggs don''t have belly buttons.', '1684510200'),
(6, 1, 'Okay..?', '1684510260'),
(6, 4, 'Tigers have striped skin, not just striped fur. The stripes are like fingerprints—no two tigers have the same pattern.', '1684510320'),
(6, 1, 'Interesting..', '1684510380'),
(7, 1, 'How does the ocean say hi? It waves!', '1684510440'),
(7, 2, 'Why do birds fly south in the winter? It''s faster than walking!', '1684510500'),
(7, 4, 'What''s Thanos'' favorite app on his phone? Snapchat.', '1684510560');
