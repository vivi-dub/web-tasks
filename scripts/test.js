// Скрипт для проверки теста по веб-программированию

document.addEventListener('DOMContentLoaded', function() {
    const testForm = document.getElementById('web-test-form');
    const testResult = document.getElementById('test-result');
    const scoreElement = document.getElementById('score');
    const incorrectAnswers = document.getElementById('incorrect-answers');
    const incorrectList = document.getElementById('incorrect-list');
    const retryBtn = document.getElementById('retry-btn');
    
    // Правильные ответы
    const correctAnswers = {
        q1: 'a', // Hyper Text Markup Language
        q2: ['a', 'c', 'd'], // div, p, section
        q3: 'd', // inline style
        q4: 'a', // Создает flex-контейнер
        q5: ['a'], // GET
        q6: 'javascript' // javascript
    };
    
    // Описания правильных ответов для отображения
    const answerDescriptions = {
        q1: 'Hyper Text Markup Language',
        q2: 'div, p, section',
        q3: 'inline style',
        q4: 'Создает flex-контейнер',
        q5: 'GET',
        q6: 'JavaScript'
    };
    
    // Обработка отправки формы теста
    if (testForm) {
        testForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let score = 0;
            let incorrect = [];
            const totalQuestions = 6;
            
            // Проверка вопроса 1
            const q1Answer = getRadioValue('q1');
            if (q1Answer === correctAnswers.q1) {
                score++;
            } else {
                incorrect.push({
                    question: 1,
                    correct: answerDescriptions.q1,
                    userAnswer: getRadioLabel('q1', q1Answer)
                });
            }
            
            // Проверка вопроса 2
            const q2Answers = getCheckboxValues('q2');
            const q2Correct = correctAnswers.q2;
            if (arraysEqual(q2Answers, q2Correct)) {
                score++;
            } else {
                incorrect.push({
                    question: 2,
                    correct: answerDescriptions.q2,
                    userAnswer: getCheckboxLabels('q2', q2Answers)
                });
            }
            
            // Проверка вопроса 3
            const q3Answer = getRadioValue('q3');
            if (q3Answer === correctAnswers.q3) {
                score++;
            } else {
                incorrect.push({
                    question: 3,
                    correct: answerDescriptions.q3,
                    userAnswer: getRadioLabel('q3', q3Answer)
                });
            }
            
            // Проверка вопроса 4
            const q4Answer = getRadioValue('q4');
            if (q4Answer === correctAnswers.q4) {
                score++;
            } else {
                incorrect.push({
                    question: 4,
                    correct: answerDescriptions.q4,
                    userAnswer: getRadioLabel('q4', q4Answer)
                });
            }
            
            // Проверка вопроса 5
            const q5Answers = getCheckboxValues('q5');
            const q5Correct = correctAnswers.q5;
            if (arraysEqual(q5Answers, q5Correct)) {
                score++;
            } else {
                incorrect.push({
                    question: 5,
                    correct: answerDescriptions.q5,
                    userAnswer: getCheckboxLabels('q5', q5Answers)
                });
            }
            
            // Проверка вопроса 6
            const q6Answer = document.querySelector('input[name="q6"]').value.toLowerCase().trim();
            if (q6Answer === correctAnswers.q6) {
                score++;
            } else {
                incorrect.push({
                    question: 6,
                    correct: answerDescriptions.q6,
                    userAnswer: q6Answer || '(нет ответа)'
                });
            }
            
            // Отображение результатов
            displayResults(score, totalQuestions, incorrect);
        });
    }
    
    // Кнопка "Пройти снова"
    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            testForm.reset();
            testResult.style.display = 'none';
            testForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Вспомогательные функции
    
    // Получить значение выбранного radio button
    function getRadioValue(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : null;
    }
    
    // Получить текст выбранного radio button
    function getRadioLabel(name, value) {
        if (!value) return '(нет ответа)';
        const option = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (option) {
            const label = option.closest('.option-label');
            if (label) {
                const textSpan = label.querySelector('.option-text');
                return textSpan ? textSpan.textContent : value;
            }
        }
        return value;
    }
    
    // Получить значения выбранных checkbox
    function getCheckboxValues(name) {
        const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checked).map(input => input.value);
    }
    
    // Получить текст выбранных checkbox
    function getCheckboxLabels(name, values) {
        if (!values || values.length === 0) return '(нет ответа)';
        const labels = [];
        values.forEach(value => {
            const option = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (option) {
                const label = option.closest('.option-label');
                if (label) {
                    const textSpan = label.querySelector('.option-text');
                    labels.push(textSpan ? textSpan.textContent : value);
                }
            }
        });
        return labels.join(', ');
    }
    
    // Сравнить два массива
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();
        return sortedArr1.every((value, index) => value === sortedArr2[index]);
    }
    
    // Отобразить результаты теста
    function displayResults(score, totalQuestions, incorrect) {
        const percentage = Math.round((score / totalQuestions) * 100);
        
        // Определяем цвет в зависимости от процента
        let color, message;
        if (percentage >= 85) {
            color = '#2ecc71';
            message = 'Отлично!';
        } else if (percentage >= 70) {
            color = '#27ae60';
            message = 'Хорошо!';
        } else if (percentage >= 50) {
            color = '#f39c12';
            message = 'Удовлетворительно';
        } else {
            color = '#e74c3c';
            message = 'Попробуйте еще раз';
        }
        
        scoreElement.innerHTML = `
            <div style="font-size: 1.5rem; color: ${color}; margin-bottom: 10px;">${message}</div>
            Вы ответили правильно на <strong>${score} из ${totalQuestions}</strong> вопросов<br>
            <span style="font-size: 1.8rem; color: ${color}; font-weight: bold;">
                ${percentage}%
            </span>
        `;
        
        // Отображение неправильных ответов
        if (incorrect.length > 0) {
            incorrectAnswers.style.display = 'block';
            incorrectList.innerHTML = '';
            
            incorrect.forEach(item => {
                const li = document.createElement('li');
                li.className = 'incorrect-item';
                li.innerHTML = `
                    <div><strong>Вопрос ${item.question}:</strong></div>
                    <div style="margin-top: 5px;">Ваш ответ: <span style="color: #e74c3c">${item.userAnswer}</span></div>
                    <div>Правильный ответ: <span style="color: #27ae60; font-weight: bold">${item.correct}</span></div>
                `;
                incorrectList.appendChild(li);
            });
        } else {
            incorrectAnswers.style.display = 'none';
        }
        
        // Показываем результаты
        testResult.style.display = 'block';
        testResult.scrollIntoView({ behavior: 'smooth' });
        
        // Сохраняем результат в localStorage
        saveTestResult(score, totalQuestions, percentage);
    }
    
    // Сохранить результат теста
    function saveTestResult(score, totalQuestions, percentage) {
        const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
        const currentUser = localStorage.getItem('currentUser') || 'Гость';
        
        const result = {
            user: currentUser,
            date: new Date().toLocaleString('ru-RU'),
            score: score,
            total: totalQuestions,
            percentage: percentage
        };
        
        testResults.push(result);
        
        // Сохраняем только последние 10 результатов
        if (testResults.length > 10) {
            testResults.shift();
        }
        
        localStorage.setItem('testResults', JSON.stringify(testResults));
    }
    
    // Показываем лучший результат при загрузке страницы
    showBestResult();
    
    // Функция показа лучшего результата
    function showBestResult() {
        const testResults = JSON.parse(localStorage.getItem('testResults') || '[]');
        if (testResults.length > 0) {
            const currentUser = localStorage.getItem('currentUser');
            let userResults = testResults;
            
            if (currentUser) {
                userResults = testResults.filter(result => result.user === currentUser);
            }
            
            if (userResults.length > 0) {
                const bestResult = userResults.reduce((best, current) => {
                    return current.percentage > best.percentage ? current : best;
                });
                
                // Добавляем информацию о лучшем результате на страницу
                const bestResultElement = document.createElement('div');
                bestResultElement.className = 'best-result';
                bestResultElement.style.cssText = `
                    text-align: center;
                    margin: 20px auto;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    max-width: 500px;
                    border-left: 4px solid #6a11cb;
                `;
                
                bestResultElement.innerHTML = `
                    <h3 style="margin-bottom: 10px; color: #2c3e50;">Ваш лучший результат</h3>
                    <div>Дата: ${bestResult.date}</div>
                    <div>Результат: <strong>${bestResult.score}/${bestResult.total}</strong> (${bestResult.percentage}%)</div>
                `;
                
                const testTitle = document.querySelector('.test-title');
                if (testTitle) {
                    testTitle.insertAdjacentElement('afterend', bestResultElement);
                }
            }
        }
    }
});