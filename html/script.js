// Инициализация CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true, // Показывать номера строк
  mode: 'htmlmixed',       // Режим подсветки синтаксиса (в данном случае HTMLmixed)
  theme: 'default',   // Тема оформления
});

// Получаем элементы
const preview = document.getElementById('preview');
const modalOverlay = document.querySelector('.modal_overlay');
const btnModal = document.querySelector('.btn-modal');
const modalClose = document.querySelector('.modal_close');

// Функция для обновления превью
function updatePreview() {
  const userInput = editor.getValue(); // Получаем введенный HTML
  preview.innerHTML = ''; // Очищаем предыдущее содержимое
  try {
    // Вставляем HTML в контейнер для отображения
    preview.innerHTML = userInput;
  } catch (error) {
    // Если произошла ошибка (например, некорректный HTML), выводим сообщение
    preview.textContent = 'Ошибка: Некорректный HTML';
  }
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