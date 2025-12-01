/// Общие функции для всего сайта

// Проверка авторизации при загрузке страницы
function checkAuthStatus() {
    const userNameSpan = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (!userNameSpan || !logoutBtn) return;
    
    // Проверяем, есть ли сохраненная сессия
    const currentUser = localStorage.getItem('currentUser');
    const rememberUser = localStorage.getItem('rememberUser');
    const sessionToken = sessionStorage.getItem('sessionToken');
    
    // Если пользователь выбрал "запомнить меня" и есть сохраненные данные
    if (rememberUser === 'true' && currentUser) {
        // Автоматически авторизуем пользователя
        if (!sessionToken) {
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('sessionToken', generateSessionToken());
        }
        
        userNameSpan.textContent = `Привет, ${currentUser}!`;
        logoutBtn.style.display = 'inline-block';
        
        // Добавляем обработчик выхода
        logoutBtn.addEventListener('click', function() {
            logout();
        });
        
        return true;
    }
    // Если есть активная сессия
    else if (sessionToken) {
        userNameSpan.textContent = `Привет, ${currentUser || 'Пользователь'}!`;
        logoutBtn.style.display = 'inline-block';
        
        logoutBtn.addEventListener('click', function() {
            logout();
        });
        
        return true;
    } else {
        userNameSpan.textContent = '';
        logoutBtn.style.display = 'none';
        return false;
    }
}

// Генерация токена сессии
function generateSessionToken() {
    return 'session_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
}

// Функция выхода
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberUser');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('sessionToken');
    
    // Удаляем куки, если они используются
    document.cookie = "rememberUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    window.location.href = '../index.html';
}

// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// Функция для проверки авторизации на защищенных страницах
function requireAuth(redirectUrl = 'register.html') {
    const currentUser = localStorage.getItem('currentUser');
    const rememberUser = localStorage.getItem('rememberUser');
    const sessionToken = sessionStorage.getItem('sessionToken');
    
    if (!currentUser || (!sessionToken && rememberUser !== 'true')) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}