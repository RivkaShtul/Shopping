-- Create the database
CREATE DATABASE shopping_app;
GO
USE shopping_app;
GO

-- ==============================================
-- Categories Table
-- ==============================================
CREATE TABLE categories (
    id INT PRIMARY KEY IDENTITY(1,1),
    categoryName NVARCHAR(100) NOT NULL UNIQUE
);

-- ==============================================
-- Products Table
-- ==============================================
CREATE TABLE products (
    id INT PRIMARY KEY IDENTITY(1,1),
    categoryId INT NOT NULL,
    productName NVARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    
    -- Foreign Key Constraint
    CONSTRAINT FK_products_categories 
        FOREIGN KEY (categoryId) REFERENCES categories(id) 
        ON DELETE NO ACTION ON UPDATE CASCADE
);

-- ==============================================
-- Sample Data for Categories
-- ==============================================
INSERT INTO categories (categoryName) VALUES 
('פירות'),
('ירקות'),
('מוצרי חלב'),
('בשר ועוף'),
('דגים'),
('לחם ומאפים'),
('שימורים'),
('משקאות'),
('חטיפים וממתקים'),
('מוצרי ניקיון');

-- ==============================================
-- Sample Data for Products
-- ==============================================
INSERT INTO products (categoryId, productName, price) VALUES 
-- פירות (Category ID: 1)
(1, 'תפוחים', 12.90),
(1, 'בננות', 8.50),
(1, 'תפוזים', 10.00),
(1, 'ענבים', 15.90),

-- ירקות (Category ID: 2)
(2, 'עגבניות', 6.90),
(2, 'מלפפונים', 5.50),
(2, 'גזר', 4.90),
(2, 'בצל', 3.90),

-- מוצרי חלב (Category ID: 3)
(3, 'חלב 3%', 5.90),
(3, 'גבינה צהובה', 25.90),
(3, 'יוגורט טבעי', 4.50),
(3, 'חמאה', 8.90),

-- בשר ועוף (Category ID: 4)
(4, 'חזה עוף', 32.90),
(4, 'בשר טחון', 45.90),
(4, 'נקניקיות', 18.90),

-- משקאות (Category ID: 8)
(8, 'מים מינרליים', 3.50),
(8, 'קוקה קולה', 6.90),
(8, 'מיץ תפוזים', 8.90);