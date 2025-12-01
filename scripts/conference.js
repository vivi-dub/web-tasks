// conference.js - обработка формы конференции

function toggleReportField(show) {
    const reportField = document.getElementById('report_field');
    const reportTopic = document.getElementById('report_topic');
    
    if (show) {
        reportField.style.display = 'block';
        reportTopic.required = true;
    } else {
        reportField.style.display = 'none';
        reportTopic.required = false;
        reportTopic.value = '';
        reportTopic.classList.remove('error-field'); // Убираем красную обводку
    }
}

// Добавляем красную обводку при ошибке
function markFieldAsInvalid(fieldId, isValid) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (!isValid) {
            field.classList.add('error-field');
        } else {
            field.classList.remove('error-field');
        }
    }
}

// Валидация формы и инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для радио-кнопок "Доклад"
    const hasReportYes = document.getElementById('has_report_yes');
    const hasReportNo = document.getElementById('has_report_no');
    
    if (hasReportYes && hasReportNo) {
        hasReportYes.addEventListener('change', function() {
            toggleReportField(true);
        });
        
        hasReportNo.addEventListener('change', function() {
            toggleReportField(false);
        });
    }
    
    // Проверяем, если уже выбрано "Да" для доклада
    if (hasReportYes && hasReportYes.checked) {
        toggleReportField(true);
    }
    
    // Реальная валидация ФИО при вводе
    const fullNameInput = document.getElementById('full_name');
    if (fullNameInput) {
        fullNameInput.addEventListener('input', function() {
            const value = this.value.trim();
            if (value && !/^[А-ЯЁ][а-яё]*\s?[А-ЯЁ]?[а-яё]*\s?[А-ЯЁ]?[а-яё]*$/.test(value)) {
                this.classList.add('error-field');
            } else {
                this.classList.remove('error-field');
            }
        });
    }
    
    // Валидация телефона при вводе
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value && !/^\+7[0-9]{10}$/.test(this.value)) {
                this.classList.add('error-field');
            } else {
                this.classList.remove('error-field');
            }
        });
    }
    
    // Валидация email при вводе
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
                this.classList.add('error-field');
            } else {
                this.classList.remove('error-field');
            }
        });
    }
    
    // Валидация формы при отправке
    const form = document.getElementById('conferenceForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Проверка ФИО 
            const fullName = document.getElementById('full_name');
            const fullNameValue = fullName.value.trim();
            const nameParts = fullNameValue.split(/\s+/);
            
            if (nameParts.length !== 3 || 
                !/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/.test(fullNameValue) ||
                nameParts.some(part => part.length < 2) ||
                fullNameValue !== fullNameValue.replace(/\s+/g, ' ').trim()) {
                markFieldAsInvalid('full_name', false);
                isValid = false;
            } else {
                markFieldAsInvalid('full_name', true);
            }
            
            // Проверка телефона
            const phone = document.getElementById('phone');
            if (!/^\+7[0-9]{10}$/.test(phone.value)) {
                markFieldAsInvalid('phone', false);
                isValid = false;
            } else {
                markFieldAsInvalid('phone', true);
            }
            
            // Проверка email
            const email = document.getElementById('email');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                markFieldAsInvalid('email', false);
                isValid = false;
            } else {
                markFieldAsInvalid('email', true);
            }
            
            // Проверка темы доклада 
            const hasReportYes = document.getElementById('has_report_yes');
            if (hasReportYes && hasReportYes.checked) {
                const reportTopic = document.getElementById('report_topic');
                if (!reportTopic.value.trim()) {
                    markFieldAsInvalid('report_topic', false);
                    isValid = false;
                } else {
                    markFieldAsInvalid('report_topic', true);
                }
            } else {
                markFieldAsInvalid('report_topic', true); // Убираем обводку если нет доклада
            }
            
            // Проверка секции
            const section = document.getElementById('section');
            if (!section.value) {
                markFieldAsInvalid('section', false);
                isValid = false;
            } else {
                markFieldAsInvalid('section', true);
            }
            
            if (!isValid) {
                e.preventDefault();
                // Прокручиваем к первой ошибке
                const firstError = form.querySelector('.error-field');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }
});