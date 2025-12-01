// Функции для регистрации и авторизации

// Показывает сообщение в форме
function showFormMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = message;
    element.style.display = 'block';
    element.style.color = type === 'error' ? '#ff4757' : '#2ecc71';
    element.style.fontWeight = 'bold';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Функция переключения на форму входа с заполненным логином
function switchToLoginForm(username) {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    const switchText = document.getElementById('switch-text');
    const switchLink = document.getElementById('switch-link');
    const formMessage = document.getElementById('form-message');
    
    if (!registerForm || !loginForm) return;
    
    // Скрываем форму регистрации, показываем форму входа
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Вход';
    switchText.textContent = 'Нет аккаунта?';
    switchLink.textContent = 'Зарегистрироваться';
    
    // Заполняем логин в форме входа
    const loginUsernameInput = document.getElementById('login-username');
    if (loginUsernameInput && username) {
        loginUsernameInput.value = username;
        // Фокус на поле пароля
        document.getElementById('login-password').focus();
    }
    
    // Скрываем предыдущие сообщения
    if (formMessage) {
        formMessage.style.display = 'none';
    }
    
    // Показываем сообщение о том, что пользователь существует
    const newMessage = document.createElement('div');
    newMessage.id = 'user-exists-message';
    newMessage.style.cssText = `
        margin-top: 20px;
        text-align: center;
        color: #e67e22;
        font-weight: bold;
        padding: 10px;
        background-color: #fff4e6;
        border-radius: 5px;
        border-left: 4px solid #e67e22;
    `;
    newMessage.textContent = `Пользователь "${username}" уже зарегистрирован. Войдите в систему.`;
    
    // Добавляем сообщение после формы
    loginForm.parentNode.insertBefore(newMessage, loginForm.nextSibling);
    
    // Через 5 секунд убираем сообщение
    setTimeout(() => {
        if (document.getElementById('user-exists-message')) {
            document.getElementById('user-exists-message').remove();
        }
    }, 5000);
}

// Функция переключения на форму регистрации
function switchToRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    const switchText = document.getElementById('switch-text');
    const switchLink = document.getElementById('switch-link');
    
    if (!registerForm || !loginForm) return;
    
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = 'Регистрация';
    switchText.textContent = 'Уже есть аккаунт?';
    switchLink.textContent = 'Войти';
    
    // Очищаем поля регистрации
    document.getElementById('reg-login').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('save-data').checked = false;
    
    // Удаляем сообщение о существующем пользователе, если есть
    if (document.getElementById('user-exists-message')) {
        document.getElementById('user-exists-message').remove();
    }
}

// Инициализация форм при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переключателя форм
    initFormSwitcher();
    
    // Если на странице есть формы регистрации/входа
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    if (registerForm) {
        initRegisterForm();
    }
    
    if (loginForm) {
        initLoginForm();
    }
});

// Инициализация переключателя между формами
function initFormSwitcher() {
    const switchLink = document.getElementById('switch-link');
    
    if (!switchLink) return;
    
    switchLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const loginForm = document.getElementById('login-form');
        const isLoginFormVisible = loginForm && loginForm.style.display !== 'none';
        
        if (isLoginFormVisible) {
            // Переключаемся на регистрацию
            switchToRegisterForm();
        } else {
            // Переключаемся на вход
            switchToLoginForm('');
        }
        
        // Скрываем сообщения
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    });
}

// Инициализация формы регистрации
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const loginInput = document.getElementById('reg-login');
    const loginError = document.getElementById('login-error');
    const passwordInput = document.getElementById('reg-password');
    const passwordError = document.getElementById('password-error');
    
    if (!registerForm) return;
    
    // Валидация логина
    if (loginInput) {
        loginInput.addEventListener('input', function() {
            const pattern = /^[a-zA-Z0-9_-]+$/;
            if (!pattern.test(loginInput.value) && loginInput.value !== '') {
                if (loginError) loginError.style.display = 'block';
            } else {
                if (loginError) loginError.style.display = 'none';
            }
        });
    }
    
    // Валидация пароля
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (passwordInput.value.length < 6 && passwordInput.value !== '') {
                if (passwordError) passwordError.style.display = 'block';
            } else {
                if (passwordError) passwordError.style.display = 'none';
            }
        });
    }
    
    // Обработка отправки формы
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = loginInput ? loginInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        const saveData = document.getElementById('save-data') ? document.getElementById('save-data').checked : false;
        
        // Проверка валидации
        const loginPattern = /^[a-zA-Z0-9_-]+$/;
        if (!loginPattern.test(login)) {
            showFormMessage('form-message', 'Логин содержит недопустимые символы', 'error');
            return;
        }
        
        if (password.length < 6) {
            showFormMessage('form-message', 'Пароль должен содержать минимум 6 символов', 'error');
            return;
        }
        
        // Проверка существующего пользователя
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        
        if (users[login]) {
            // ПОЛЬЗОВАТЕЛЬ СУЩЕСТВУЕТ - ОТКРЫВАЕМ ФОРМУ ВХОДА
            showFormMessage('form-message', 'Пользователь с таким логином уже существует. Открывается форма входа...', 'error');
            
            // Через 1 секунду переключаем на форму входа
            setTimeout(() => {
                switchToLoginForm(login);
            }, 1000);
            
            return;
        }
        
        // Регистрация нового пользователя
        users[login] = {
            password: password,
            registered: new Date().toISOString(),
            lastLogin: null
        };
        
        localStorage.setItem('users', JSON.stringify(users));
        showFormMessage('form-message', 'Регистрация успешна!', 'success');
        
        // Автоматическая авторизация после регистрации
        setTimeout(() => {
            performLogin(login, password, saveData);
        }, 1000);
    });
}

// Инициализация формы входа
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (!loginForm) return;
    
    // Проверяем, есть ли сохраненные данные для автоматического входа
    const rememberUser = localStorage.getItem('rememberUser');
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (rememberUser === 'true' && currentUser && users[currentUser]) {
        // Автоматически выполняем вход
        document.getElementById('login-username').value = currentUser;
        document.getElementById('auto-login').checked = true;
        
        // Можно автоматически выполнить вход после небольшой задержки
        setTimeout(() => {
            performLogin(currentUser, users[currentUser].password, true);
        }, 500);
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const autoLogin = document.getElementById('auto-login').checked;
        
        // Проверка пользователя
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        
        if (!users[login] || users[login].password !== password) {
            showFormMessage('form-message', 'Неверный логин или пароль', 'error');
            return;
        }
        
        // Обновляем время последнего входа
        users[login].lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Выполняем вход
        performLogin(login, password, autoLogin);
    });
}

// Функция выполнения входа
function performLogin(login, password, rememberUser) {
    // Сохраняем данные пользователя
    localStorage.setItem('currentUser', login);
    
    // Сохраняем настройку "запомнить меня"
    if (rememberUser) {
        localStorage.setItem('rememberUser', 'true');
    } else {
        localStorage.removeItem('rememberUser');
    }
    
    // Создаем сессию
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('sessionToken', generateSessionToken());
    
    showFormMessage('form-message', 'Вход выполнен успешно! Перенаправление...', 'success');
    
    // Перенаправление на страницу сообщений
    setTimeout(() => {
        window.location.href = 'messages.html';
    }, 1000);
}

// Генерация токена сессии
function generateSessionToken() {
    return 'session_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
}