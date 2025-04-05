// Логика для регистрации
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const photo = document.getElementById('photo').files[0];

    if (name && photo) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const participant = {
                name: name,
                photo: reader.result
            };

            // Сохраняем участника в localStorage (можно использовать базу данных для реального проекта)
            let participants = JSON.parse(localStorage.getItem('participants')) || [];
            participants.push(participant);
            localStorage.setItem('participants', JSON.stringify(participants));

            // Перенаправляем на страницу участников
            window.location.href = 'participants.html';
        };

        reader.readAsDataURL(photo);
    }
});

// Отображение участников на странице participants.html
if (window.location.pathname.includes('participants.html')) {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];

    const participantsList = document.getElementById('participants-list');
    participants.forEach(participant => {
        const div = document.createElement('div');
        div.classList.add('participant');
        div.innerHTML = `<img src="${participant.photo}" alt="Фото"><p>${participant.name}</p>`;
        participantsList.appendChild(div);
    });
}

// Логика чата
function sendMessage() {
    const message = document.getElementById('message').value;
    if (message) {
        const li = document.createElement('li');
        li.textContent = message;
        document.getElementById('messages').appendChild(li);
        document.getElementById('message').value = '';
    }
}
