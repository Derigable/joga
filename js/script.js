window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Инициализирует табы, включает показывание нужного контента по клику на таб
     * 
     * @param {string} tabClass Класс таба 
     * @param {string} tabParentClass Класс родителей таба
     * @param {string} tabContentClass Класс контента таба
     */
    function tabsInitialize(tabClass, tabParentClass, tabContentClass) {
        let headerTab = document.querySelectorAll(`.${tabClass}`),
        header = document.querySelector(`.${tabParentClass}`),
        tabContent = document.querySelectorAll(`.${tabContentClass}`);
        
        /**
         * Прячем табы, начиная с переданного индекса таба
         * 
         * @param {number} tabIndex Индекс таба, начиная с которого надо прятать табы
         */
        function hideTabContent(tabIndex = 0) {
            for (let i = tabIndex; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        hideTabContent(1);

        /**
         * Показываем таб
         * 
         * @param {number} tabIndex Индекс таба, который нужно показать 
         */
        function showTabContent(tabIndex = 0) {
            if (tabContent[tabIndex].classList.contains('hide')) {
                tabContent[tabIndex].classList.remove('hide');
                tabContent[tabIndex].classList.add('show');
            }   
        }

        header.addEventListener('click', function(event) {
            let target = event.target;
            if (target && target.classList.contains(`${tabClass}`)) {
                for (let i = 0; i < headerTab.length; i++) {
                    if (target == headerTab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    }

    tabsInitialize('info-header-tab', 'info-header', 'info-tabcontent');


    /**
     * Устанавливаем таймер обратного отсчета
     * 
     * @param {string} id Id divа, в котором прописывается сам таймер
     * @param {string} endTime дата окончания таймера, в формате ГГГГ-ММ-ДД 
     */
    function setTimer(id, endTime) {
        let timer = document.getElementById(id),
            seconds = timer.querySelector('.seconds'),
            minutes = timer.querySelector('.minutes'),
            hours = timer.querySelector('.hours'),
            timeInterval = setInterval(updateTimer, 1000);
        
        /**
         * Обновляем значения таймера
         */
        function updateTimer() {
            let remainingTime = getTimeRemaining(endTime);
            hours.textContent = remainingTime.hours;
            minutes.textContent = remainingTime.minutes;
            seconds.textContent = remainingTime.seconds;

            if (remainingTime.remainingTime <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

        /**
         * Вычисляем оставшееся время работы таймера
         * 
         * @param {string} endTime Дата, до которой надо запускать таймер,  в формате ГГГГ-ММ-ДД
         */
        function getTimeRemaining(endTime) {
            let remainingTime = Date.parse(endTime) - Date.parse(new Date()),
                seconds = Math.floor((remainingTime / 1000) % 60),
                minutes = Math.floor((remainingTime / 1000 / 60) % 60),
                hours = Math.floor((remainingTime / (1000 * 60 * 60)));
    
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            if (hours < 10) {
                hours = `0${hours}`;
            }
    
            return {
                'remainingTime': remainingTime,
                'seconds': seconds,
                'minutes': minutes,
                'hours': hours
            };
        }
    }

    setTimer('timer', '2020-06-28');

    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        popUpClose = document.querySelector('.popup-close');

    moreBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    popUpClose.addEventListener('click', function() {
        overlay.style.display = 'none';
        moreBtn.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let infoClass = document.querySelector('.info');

    infoClass.addEventListener('click', function(event) {
        if (event.target.classList.contains('description-btn') ) {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

    // форма обратной связи 
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    
    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success; 
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
});