-- Создаем таблицу с правильными настройками
CREATE TABLE participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    section VARCHAR(50) NOT NULL,
    birth_date DATE NULL,
    has_report TINYINT(1) DEFAULT 0,
    report_topic TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_section (section),               -- Индекс для поиска по секции
    INDEX idx_created_at (created_at)          -- Индекс для сортировки по дате
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;