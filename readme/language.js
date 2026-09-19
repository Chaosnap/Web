function switchLanguage(language) {
    const englishTab = document.getElementById('tab-english');
    const chineseTab = document.getElementById('tab-chinese');
    const englishText = document.querySelector('.text-english');
    const chineseText = document.querySelector('.text-chinese');

    if (language === 'en') {
        englishTab.classList.add('active');
        chineseTab.classList.remove('active');
        englishText.style.display = 'block';
        chineseText.style.display = 'none';
        applyCheckboxListener('en');
    } else if (language === 'zh') {
        chineseTab.classList.add('active');
        englishTab.classList.remove('active');
        chineseText.style.display = 'block';
        englishText.style.display = 'none';
        applyCheckboxListener('zh');
    }
}

function sitePath(path) {
    return window.resolveSitePath ? window.resolveSitePath(path) : path;
}

function applyCheckboxListener(language) {
    let termsCheckbox, agreeButton, declineButton;

    if (language === 'en') {
        termsCheckbox = document.getElementById('termsCheckboxEnglish');
        agreeButton = document.getElementById('agreeButtonEnglish');
        declineButton = document.getElementById('declineButtonEnglish');
    } else if (language === 'zh') {
        termsCheckbox = document.getElementById('termsCheckboxChinese');
        agreeButton = document.getElementById('agreeButtonChinese');
        declineButton = document.getElementById('declineButtonChinese');
    }

    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            if (termsCheckbox.checked) {
                agreeButton.disabled = false;
                agreeButton.classList.add('enabled');
            } else {
                agreeButton.disabled = true;
                agreeButton.classList.remove('enabled');
            }
        });
    }

    if (agreeButton) {
        agreeButton.addEventListener('click', () => {
            if (termsCheckbox.checked) {
                window.location.href = sitePath('/vsqxnust');
            }
        });
    }

    if (declineButton) {
        declineButton.addEventListener('click', () => {
            window.location.href = sitePath('/');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('en');
});
