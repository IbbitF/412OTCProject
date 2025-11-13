CREATE TABLE Brand (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Medicine (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brandID INT NOT NULL,
    FOREIGN KEY (brandID) REFERENCES Brand(id)
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE UserMedicine (
    userID INT,
    medicineID INT,
    dosageForm VARCHAR(50),
    type VARCHAR(50),
    notes TEXT,
    PRIMARY KEY (userID, medicineID),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (medicineID) REFERENCES Medicine(id)
);