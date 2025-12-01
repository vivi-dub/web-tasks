<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $full_name = trim($_POST['full_name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $section = $_POST['section'] ?? '';
    $birth_date = !empty($_POST['birth_date']) ? $_POST['birth_date'] : null;
    
    // Получаем значение has_report
    $has_report = isset($_POST['has_report']) && $_POST['has_report'] == '1' ? 1 : 0;
    
    // Тему доклада получаем только если has_report = 1
    $report_topic = $has_report ? trim($_POST['report_topic'] ?? '') : null;
    
    // Валидация на сервере
    $errors = [];
    
    // Проверка ФИО
    if (!preg_match('/^[А-Яа-яЁё\s]+$/u', $full_name)) {
        $errors[] = 'ФИО должно содержать только русские буквы';
    }
    
    // Проверка телефона
    if (!preg_match('/^\+7[0-9]{10}$/', $phone)) {
        $errors[] = 'Неверный формат телефона. Должен быть: +7XXXXXXXXXX';
    }
    
    // Проверка email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Неверный формат email';
    }
    
    // Проверка секции
    if (!in_array($section, ['математика', 'физика', 'информатика'])) {
        $errors[] = 'Неверная секция конференции';
    }
    
    // Проверка темы доклада - ТОЛЬКО если выбран доклад
    if ($has_report == 1 && empty($report_topic)) {
        $errors[] = 'Введите тему доклада';
    }
    
    // Если есть ошибки, показываем их
    if (!empty($errors)) {
        http_response_code(400);
        echo '<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ошибка регистрации</title>
            <link rel="stylesheet" href="../style/style.css">
        </head>
        <body>
            <header>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="../index.html">Главная</a></li>
                        <li><a href="../pages/gallery.html">Фотогалерея</a></li>
                        <li><a href="../pages/register.html">Регистрация</a></li>
                        <li><a href="../pages/messages.html">Сообщения</a></li>
                        <li><a href="../pages/test.html">Тест</a></li>
                        <li><a href="../pages/conference.html">Конференция</a></li>
                        <li><a href="../pages/conference-participants.html">Участники</a></li>
                    </ul>
                </nav>
            </header>
            <main class="main-content">
                <div class="form-container">
                    <h2>Ошибки при заполнении формы</h2>
                    <div class="error-list">
                        <ul>';
        foreach ($errors as $error) {
            echo '<li>' . htmlspecialchars($error) . '</li>';
        }
        echo '</ul>
                    </div>
                    <a href="../pages/conference.html" class="btn">Вернуться к форме</a>
                </div>
            </main>
            <footer>
                <p>&copy; 2025 Веб-технология. Итоговое задание.</p>
            </footer>
        </body>
        </html>';
        exit;
    }
    
    // Сохраняем в базу данных
    try {
        $stmt = $pdo->prepare("INSERT INTO participants (full_name, phone, email, section, birth_date, has_report, report_topic, created_at) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$full_name, $phone, $email, $section, $birth_date, $has_report, $report_topic]);
        
        // Получаем ID нового участника
        $participant_id = $pdo->lastInsertId();
        
        // Показываем страницу с данными пользователя
        echo '<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Регистрация успешна!</title>
            <link rel="stylesheet" href="../style/style.css">
        </head>
        <body>
            <header>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="../index.html">Главная</a></li>
                        <li><a href="../pages/gallery.html">Фотогалерея</a></li>
                        <li><a href="../pages/register.html">Регистрация</a></li>
                        <li><a href="../pages/messages.html">Сообщения</a></li>
                        <li><a href="../pages/test.html">Тест</a></li>
                        <li><a href="../pages/conference.html">Конференция</a></li>
                        <li><a href="../pages/conference-participants.html">Участники</a></li>
                    </ul>
                </nav>
            </header>
            <main class="main-content">
                <div class="success-container">
                    <div class="success-icon">✓</div>
                    <h1>Регистрация успешно завершена!</h1>
                    <p>Спасибо за регистрацию на конференцию.</p>
                    
                    <div class="registration-data">
                        <h3>Ваши данные:</h3>
                        <div class="data-item"><strong>ФИО:</strong> ' . htmlspecialchars($full_name) . '</div>
                        <div class="data-item"><strong>Телефон:</strong> ' . htmlspecialchars($phone) . '</div>
                        <div class="data-item"><strong>Email:</strong> ' . htmlspecialchars($email) . '</div>
                        <div class="data-item"><strong>Секция:</strong> ' . htmlspecialchars($section) . '</div>';
        
        if ($birth_date) {
            echo '<div class="data-item"><strong>Дата рождения:</strong> ' . htmlspecialchars($birth_date) . '</div>';
        }
        
        echo '<div class="data-item"><strong>Доклад:</strong> ' . ($has_report ? 'Да' : 'Нет') . '</div>';
        
        if ($has_report && $report_topic) {
            echo '<div class="data-item"><strong>Тема доклада:</strong> ' . htmlspecialchars($report_topic) . '</div>';
        }
        
        echo '<div class="data-item"><strong>ID регистрации:</strong> ' . $participant_id . '</div>
                        <div class="data-item"><strong>Дата регистрации:</strong> ' . date('d.m.Y H:i:s') . '</div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
                        <a href="../pages/conference.html" class="btn" style="background: #6a11cb;">Зарегистрировать еще</a>
                        <a href="../pages/conference-participants.html" class="btn" style="background: #28a745;">Список участников</a>
                        <a href="../index.html" class="btn" style="background: #2575fc;">На главную</a>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; 2025 Веб-технология. Итоговое задание.</p>
            </footer>
        </body>
        </html>';
        
    } catch(PDOException $e) {
        http_response_code(500);
        echo '<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ошибка сервера</title>
            <link rel="stylesheet" href="../style/style.css">
        </head>
        <body>
            <header>
                <nav>
                    <ul class="nav-menu">
                        <li><a href="../index.html">Главная</a></li>
                        <li><a href="../pages/gallery.html">Фотогалерея</a></li>
                        <li><a href="../pages/register.html">Регистрация</a></li>
                        <li><a href="../pages/messages.html">Сообщения</a></li>
                        <li><a href="../pages/test.html">Тест</a></li>
                        <li><a href="../pages/conference.html">Конференция</a></li>
                        <li><a href="../pages/conference-participants.html">Участники</a></li>
                    </ul>
                </nav>
            </header>
            <main class="main-content">
                <div class="form-container">
                    <h2>Ошибка при сохранении данных</h2>
                    <p>Произошла ошибка при сохранении данных в базу данных.</p>
                    <p><small>Техническая информация: ' . htmlspecialchars($e->getMessage()) . '</small></p>
                    <a href="../pages/conference.html" class="btn">Вернуться к форме</a>
                </div>
            </main>
            <footer>
                <p>&copy; 2025 Веб-технология. Итоговое задание.</p>
            </footer>
        </body>
        </html>';
        exit;
    }
} else {
    // Если кто-то попытается открыть страницу напрямую
    header('Location: ../pages/conference.html');
    exit;
}
?>