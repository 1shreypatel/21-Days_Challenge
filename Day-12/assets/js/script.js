(function () {
    const passwordOutput = document.getElementById('passwordOutput');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateBtn = document.getElementById('generateBtn');
    const toast = document.getElementById('toastMessage');

    const LOWERS = 'abcdefghijklmnopqrstuvwxyz';
    const UPPERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?~';

    let toastTimeout;
    function showToast(message = '🔐 New password generated!') {
        if (toastTimeout) clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add('show');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 1800);
    }

    function getCharacterPool() {
        let pool = '';
        if (includeLowercase.checked) pool += LOWERS;
        if (includeUppercase.checked) pool += UPPERS;
        if (includeNumbers.checked) pool += NUMBERS;
        if (includeSymbols.checked) pool += SYMBOLS;
        return pool;
    }

    function enforceMinimumOptions() {
        const anyChecked = includeLowercase.checked || includeUppercase.checked || includeNumbers.checked || includeSymbols.checked;
        if (!anyChecked) {
            includeLowercase.checked = true;
            return true;
        }
        return false;
    }

    const DEFAULT_LENGTH = 16;

    function getRandomCharFromSet(setStr) {
        if (!setStr.length) return '';
        let randomIndex;
        if (typeof window.crypto !== 'undefined' && window.crypto.getRandomValues) {
            const randomBytes = new Uint32Array(1);
            window.crypto.getRandomValues(randomBytes);
            randomIndex = randomBytes[0] % setStr.length;
        } else {
            randomIndex = Math.floor(Math.random() * setStr.length);
        }
        return setStr[randomIndex];
    }
    function generateSecurePassword() {
        enforceMinimumOptions();

        let pool = getCharacterPool();
        if (pool.length === 0) {
            pool = LOWERS;
            includeLowercase.checked = true;
        }

        const length = DEFAULT_LENGTH;

        const requiredChars = [];
        if (includeLowercase.checked) requiredChars.push(getRandomCharFromSet(LOWERS));
        if (includeUppercase.checked) requiredChars.push(getRandomCharFromSet(UPPERS));
        if (includeNumbers.checked) requiredChars.push(getRandomCharFromSet(NUMBERS));
        if (includeSymbols.checked && SYMBOLS.length) requiredChars.push(getRandomCharFromSet(SYMBOLS));

        let passwordArray = [];

        if (typeof window.crypto !== 'undefined' && window.crypto.getRandomValues) {
            const randomValues = new Uint32Array(length);
            window.crypto.getRandomValues(randomValues);
            for (let i = 0; i < length; i++) {
                const randomIndex = randomValues[i] % pool.length;
                passwordArray.push(pool[randomIndex]);
            }
        } else {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * pool.length);
                passwordArray.push(pool[randomIndex]);
            }
        }

        if (requiredChars.length > 0 && length >= requiredChars.length) {
            for (let i = 0; i < requiredChars.length; i++) {
                passwordArray[i] = requiredChars[i];
            }
            for (let i = passwordArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
            }
        } else if (requiredChars.length > length) {
        }

        let password = passwordArray.join('');
        if (password.length !== length) {
            password = password.slice(0, length);
        }
        return password;
    }

    function refreshPassword() {
        enforceMinimumOptions();
        const newPassword = generateSecurePassword();
        passwordOutput.value = newPassword;
    }

    function onOptionsChange() {
        enforceMinimumOptions();
        refreshPassword();
    }

    function protectLastOption() {
        const anyChecked = includeLowercase.checked || includeUppercase.checked || includeNumbers.checked || includeSymbols.checked;
        if (!anyChecked) {
            includeLowercase.checked = true;
            refreshPassword();
        }
    }

    includeUppercase.addEventListener('change', onOptionsChange);
    includeLowercase.addEventListener('change', onOptionsChange);
    includeNumbers.addEventListener('change', onOptionsChange);
    includeSymbols.addEventListener('change', onOptionsChange);
    includeLowercase.addEventListener('change', protectLastOption);
    includeUppercase.addEventListener('change', protectLastOption);
    includeNumbers.addEventListener('change', protectLastOption);
    includeSymbols.addEventListener('change', protectLastOption);

    generateBtn.addEventListener('click', () => refreshPassword());

    refreshPassword();
})();