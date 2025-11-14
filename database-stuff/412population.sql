-- 1. Brand
INSERT INTO Brand (name)
VALUES 
('Tylenol'),
('Advil'),
('Aleve'),
('Claritin'),
('Zyrtec'),
('Benadryl'),
('Pepto-Bismol'),
('Tums'),
('Imodium'),
('Mucinex'),
('Robitussin'),
('DayQuil'),
('NyQuil');

-- 2. Medicine
INSERT INTO Medicine (name, brandID, type)
VALUES
('Tylenol Extra Strength', 1, 'Pain Reliever'),
('Tylenol Cold + Flu', 1, 'Cold/Flu'),
('Tylenol PM', 1, 'Pain Reliever'),

('Advil Regular Strength', 2, 'Pain Reliever'),
('Advil PM', 2, 'Pain Reliever'),
('Advil Migraine', 2, 'Pain Reliever'),
('Advil Dual Action', 2, 'Pain Reliever'),

('Aleve Pain Relief', 3, 'Pain Reliever'),
('Aleve PM', 3, 'Pain Reliever'),

('Claritin 24-Hour', 4, 'Antihistamine'),
('Claritin-D', 4, 'Antihistamine'),
('Claritin Chewables', 4, 'Antihistamine'),

('Zyrtec Allergy Relief', 5, 'Antihistamine'),
('Zyrtec-D', 5, 'Antihistamine'),

('Benadryl Allergy', 6, 'Antihistamine'),
('Benadryl Ultratabs', 6, 'Antihistamine'),

('Pepto-Bismol Liquid', 7, 'Digestive'),
('Pepto-Bismol Chewables', 7, 'Digestive'),

('Tums Regular Strength', 8, 'Antacid'),
('Tums Ultra', 8, 'Antacid'),

('Imodium A-D', 9, 'Digestive'),
('Imodium Multi-Symptom Relief', 9, 'Digestive'),

('Mucinex DM', 10, 'Cough'),
('Mucinex Fast-Max Cold & Flu', 10, 'Cold/Flu'),
('Mucinex Sinus-Max', 10, 'Cold/Flu'),

('Robitussin Cough + Chest Congestion DM', 11, 'Cough'),
('Robitussin Honey Cough', 11, 'Cough'),

('Vicks DayQuil Cold & Flu', 12, 'Cold/Flu'),
('DayQuil Severe', 12, 'Cold/Flu'),

('Vicks NyQuil Cold & Flu', 13, 'Cold/Flu'),
('Vicks NyQuil Severe', 13, 'Cold/Flu');

-- 3. Users
INSERT INTO Users (username, password)
VALUES
('alex', 'pw1'),
('brenden', 'pw2'),
('bilal', 'pw3'),
('gianna', 'pw4');

-- 4. UserMedicine (links users and medicines)
INSERT INTO UserMedicine (userID, medicineID, dosageForm, notes)
VALUES
(1, 1, 'Tablet', 'Used for headaches and general pain'),
(1, 4, 'Tablet', 'Used for muscle aches'),
(1, 8, 'Tablet', 'Alternative to Advil'),
(1, 17, 'Liquid', 'Used for upset stomach'),
(1, 27, 'Capsule', 'Used during flu season'),

(2, 3, 'Caplet', 'Used for pain relief at night'),
(2, 10, 'Tablet', 'Used for allergies'),
(2, 19, 'Tablet', 'Helps with acid reflux'),
(2, 21, 'Tablet', 'Used when traveling'),
(2, 29, 'Liquid', 'Taken when experiencing congestion'),

(3, 5, 'Capsule', 'Helps relieve headaches and insomnia'),
(3, 13, 'Tablet', 'Daily allergy prevention'),
(3, 23, 'Tablet', 'Used during colds'),
(3, 28, 'Liquid', 'Used for cough and congestion'),

(4, 6, 'Capsule', 'Taken for migraines'),
(4, 16, 'Tablet', 'Used for allergic reactions'),
(4, 25, 'Syrup', 'Helps with sore throat and cough');