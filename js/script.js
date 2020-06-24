window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Инициализирует табы, включает показывание нужного контента по клику на таб
     * 
     * @param {string} tabClass 
     * @param {string} tabParentClass 
     * @param {string} tabContentClass 
     */
    function tabsInitialize(tabClass, tabParentClass, tabContentClass) {
        let headerTab = document.querySelectorAll(`.${tabClass}`),
        header = document.querySelector(`.${tabParentClass}`),
        tabContent = document.querySelectorAll(`.${tabContentClass}`);
        
        function hideTabContent(tabIndex) {
            for (let i = tabIndex; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        hideTabContent(1);

        function showTabContent(tabIndex) {
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
});