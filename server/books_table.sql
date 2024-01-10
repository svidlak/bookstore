CREATE TABLE books (
	id INTEGER PRIMARY KEY,
	uuid VARCHAR(40),
	title VARCHAR(50),
	publicationDate VARCHAR(50),
	description TEXT,
	authors VARCHAR(50),
	category VARCHAR(20),
	imageUrl VARCHAR(50),
	price DECIMAL(6,2),
	created_at DATE DEFAULT CURRENT_TIMESTAMP,
	updated_at DATE DEFAULT CURRENT_TIMESTAMP,
	active INTEGER DEFAULT 1
);

CREATE INDEX idx_books_uuid ON books(uuid);
CREATE INDEX idx_books_category ON books(category);