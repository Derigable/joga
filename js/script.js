window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let headerTab = document.querySelectorAll('.info-header-tab'),
        header = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    console.log(header);

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
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < headerTab.length; i++) {
                if (target == headerTab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
});