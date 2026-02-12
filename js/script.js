const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true, // Показывать номера строк
  mode: 'javascript',       // Режим подсветки синтаксиса 
  theme: 'default',   // Тема оформления
});

// Получаем элементы
const preview = document.getElementById('preview');
const modalOverlay = document.querySelector('.modal_overlay');
const btnModal = document.querySelector('.btn-modal');
const modalClose = document.querySelector('.modal_close');

const iframe = document.createElement('iframe');
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';
preview.appendChild(iframe);

// Функция для обновления превью
function updatePreview() {
  const userInput = editor.getValue(); // Получаем введенный JavaScript-код

  try {
    // Очищаем содержимое iframe
    iframe.contentDocument.body.innerHTML = '';

    // Выполняем код внутри iframe
    const script = iframe.contentDocument.createElement('script');
    script.textContent = userInput; // Вставляем пользовательский код
    iframe.contentDocument.body.appendChild(script);
  } catch (error) {
    // Если произошла ошибка, выводим сообщение
    iframe.contentDocument.body.textContent = `Ошибка: ${error.message}`;
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