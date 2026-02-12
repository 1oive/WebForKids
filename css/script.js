// Инициализация CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true, // Показывать номера строк
  mode: 'css',       // Режим подсветки синтаксиса (в данном случае HTMLmixed)
  theme: 'default',   // Тема оформления
});

// Получаем элементы
const preview = document.getElementById('preview');
const modalOverlay = document.querySelector('.modal_overlay');
const btnModal = document.querySelector('.btn-modal');
const modalClose = document.querySelector('.modal_close');

let userStyleElement = null;  

function updatePreview() {
  const userInput = editor.getValue();  

  const previewContainer = document.getElementById('preview');

  if (!userStyleElement) {
    userStyleElement = document.createElement('style');
    previewContainer.appendChild(userStyleElement); 
  }

  userStyleElement.textContent = userInput;

}

// Функция для открытия модального окна
function openModal() {
  modalOverlay.style.display = 'flex'; // Показываем оверлей
}

// Функция для закрытия модального окна
function closeModal() {
  modalOverlay.style.display = 'none'; // Скрываем оверлей
}

// Добавляем обработчик события на кнопку "Проверить"
document.getElementById('check-button').addEventListener('click', updatePreview);

// Добавляем обработчик события на кнопку "Подсказка" для открытия модального окна
btnModal.addEventListener('click', openModal);

// Добавляем обработчик события на крестик модального окна для его закрытия
modalClose.addEventListener('click', closeModal);

// Закрытие модального окна при клике на оверлей (вне самого окна)
modalOverlay.addEventListener('click', function(event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Инициализация при загрузке страницы (если нужно)
updatePreview();