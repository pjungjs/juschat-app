-- psql -U postgres -f db/seed.sql

-- Connect to the database
\c juschat_dev;


-- Insert data into the "users" table
INSERT INTO users
(username, password, first_name, last_name, email, title, is_online, created_at)
VALUES
('michael_scott', 'password101', 'Michael', 'Scott', 'michael.scott@dundermifflin.com', 'Regional Manager', false, '2023-05-17 09:00:00'),
('jim_halpert', 'password102', 'Jim', 'Halpert', 'jim.halpert@dundermifflin.com', 'Sales Representative', false, '2023-05-17 09:05:00'),
('pam_beesly', 'password103', 'Pam', 'Beesly', 'pam.beesly@dundermifflin.com', 'Receptionist', false, '2023-05-17 09:10:00'),
('dwight_schrute', 'password104', 'Dwight', 'Schrute', 'dwight.schrute@dundermifflin.com', 'Assistant to the Regional Manager', false, '2023-05-17 09:15:00'),
('andy_bernard', 'password105', 'Andy', 'Bernard', 'andy.bernard@dundermifflin.com', 'Sales Representative', false, '2023-05-17 09:20:00'),
('angela_martin', 'password106', 'Angela', 'Martin', 'angela.martin@dundermifflin.com', 'Senior Accountant', false, '2023-05-17 09:25:00'),
('kevin_malone', 'password107', 'Kevin', 'Malone', 'kevin.malone@dundermifflin.com', 'Accountant', false, '2023-05-17 09:30:00'),
('oscar_martinez', 'password108', 'Oscar', 'Martinez', 'oscar.martinez@dundermifflin.com', 'Accountant', false, '2023-05-17 09:35:00'),
('user1', NULL, NULL, NULL, NULL, NULL, false, '2023-05-17 10:30:00'),
('user2', NULL, NULL, NULL, NULL, NULL, false, '2023-05-17 10:35:00'),
('user3', NULL, NULL, NULL, NULL, NULL, false, '2023-05-17 10:40:00');


-- Insert mock data for "chatrooms" table
INSERT INTO chatrooms
(room_name, created_at, created_by, managed_by, open_to_public, description)
VALUES
('Conference Room', '2023-05-15 10:30:00', 1, 1, false, 'Main conference room for meetings'),
('Break Room', '2023-05-15 11:00:00', 1, 3, false, 'Room for relaxing and taking breaks'),
('Sales Team', '2023-05-15 12:00:00', 1, 2, false, 'Chatroom for the sales team'),
('Accounting', '2023-05-17 10:10:00', 1, 6, false, 'Chat for the Accounting Dept'),
('Test', '2023-05-17 10:45:00', 1, 1, true, 'Testing App'),
('Random', '2023-05-17 10:50:00', 1, 1, true, 'Random chatroom'),
('Fun', '2023-05-17 10:55:00', 1, 1, true, 'For fun');


-- Insert mock data for "members" table
INSERT INTO members
(room_id, member_id)
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
(5, 9),
(5, 10),
(6, 9),
(6, 11),
(7, 9),
(7, 10),
(7, 11);


-- Insert mock data for "messages" table
INSERT INTO messages
(chatroom_id, sender_id, content, sent_at)
VALUES
(1, 1, 'Good morning, everyone!', '2023-05-15 10:35:00'),
(1, 2, 'Morning, Pam!', '2023-05-15 10:36:00'),
(1, 3, 'Hi, Jim!', '2023-05-15 10:36:02'),
(1, 1, 'Let''s start the meeting.', '2023-05-15 10:40:00'),
(2, 2, 'Up for a coffee?', '2023-05-15 11:05:00'),
(2, 3, 'Sure!', '2023-05-15 11:06:00'),
(3, 2, 'Great job on closing the sale!', '2023-05-15 12:10:00'),
(3, 4, 'Thanks!', '2023-05-15 12:11:00'),
(5, 9, 'Hello.', '2023-05-17 11:00:00'),
(5, 9, 'Nice app!', '2023-05-17 11:00:05'),
(6, 11, 'Animals that lay eggs don''t have belly buttons.', '2023-05-17 11:00:10'),
(6, 9, 'Okay..?', '2023-05-17 11:00:15'),
(6, 11, 'Tigers have striped skin, not just striped fur. The stripes are like fingerprints—no two tigers have the same pattern.', '2023-05-17 11:00:20'),
(6, 9, 'Interesting..', '2023-05-17 11:00:25'),
(7, 9, 'How does the ocean say hi? It waves!', '2023-05-17 11:00:30'),
(7, 10, 'Why do birds fly south in the winter? It''s faster than walking!', '2023-05-17 11:00:35'),
(7, 11, 'What''s Thanos'' favorite app on his phone? Snapchat.', '2023-05-17 11:00:40');
