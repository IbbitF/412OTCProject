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
INSERT INTO Medicine (name, brandID)
VALUES
('Tylenol Extra Strength', 1),
('Tylenol Cold + Flu', 1),
('Tylenol PM', 1),
('Advil Regular Strength', 2),
('Advil PM', 2),
('Advil Migraine', 2),
('Advil Dual Action', 2),
('Aleve Pain Relief', 3),
('Aleve PM', 3),
('Claritin 24-Hour', 4),
('Claritin-D', 4),
('Claritin Chewables', 4),
('Zyrtec Allergy Relief', 5),
('Zyrtec-D', 5),
('Benadryl Allergy', 6),
('Benadryl Ultratabs', 6),
('Pepto-Bismol Liquid', 7),
('Pepto-Bismol Chewables', 7),
('Tums Regular Strength', 8),
('Tums Ultra', 8),
('Imodium A-D', 9),
('Imodium Multi-Symptom Relief', 9),
('Mucinex DM', 10),
('Mucinex Fast-Max Cold & Flu', 10),
('Mucinex Sinus-Max', 10),
('Robitussin Cough + Chest Congestion DM', 11),
('Robitussin Honey Cough', 11),
('Vicks DayQuil Cold & Flu', 12),
('DayQuil Severe', 12),
('Vicks NyQuil Cold & Flu', 13),
('Vicks NyQuil Severe', 13);

-- 3. Users
INSERT INTO Users (username, password)
VALUES
('alex', 'pw1'),
('brenden', 'pw2'),
('bilal', 'pw3'),
('gianna', 'pw4');

-- 4. UserMedicine (links users and medicines)
INSERT INTO UserMedicine (userID, medicineID, dosageForm, type, notes)
VALUES
(1, 1, 'Tablet', 'Pain Reliever', 'Used for headaches and general pain'),
(1, 4, 'Tablet', 'Pain Reliever', 'Used for muscle aches'),
(1, 8, 'Tablet', 'Pain Reliever', 'Alternative to Advil'),
(1, 17, 'Liquid', 'Digestive Relief', 'Used for upset stomach'),
(1, 27, 'Capsule', 'Cough Suppressant', 'Used during flu season'),

(2, 3, 'Caplet', 'Pain Reliever', 'Used for pain relief at night'),
(2, 10, 'Tablet', 'Antihistamine', 'Used for allergies'),
(2, 19, 'Tablet', 'Antacid', 'Helps with acid reflux'),
(2, 21, 'Tablet', 'Anti-Diarrheal', 'Used when traveling'),
(2, 29, 'Liquid', 'Cold & Flu Relief', 'Taken when experiencing congestion'),

(3, 5, 'Capsule', 'Pain Reliever', 'Helps relieve headaches and insomnia'),
(3, 13, 'Tablet', 'Antihistamine', 'Daily allergy prevention'),
(3, 23, 'Tablet', 'Cough Suppressant', 'Used during colds'),
(3, 28, 'Liquid', 'Cold & Flu Relief', 'Used for cough and congestion'),

(4, 6, 'Capsule', 'Pain Reliever', 'Taken for migraines'),
(4, 16, 'Tablet', 'Antihistamine', 'Used for allergic reactions'),
(4, 25, 'Syrup', 'Cough Suppressant', 'Helps with sore throat and cough');