import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
const URL = 'http://localhost:3001';
const socket = io(URL); // Подключение к серверу через веб-сокеты


function App() {
  const [results, setResults] = useState([]);

  // Функция для отправки голоса
  // Функция для отправки голоса на сервер
  const vote = (choiceIndex) => {
    // Отправляем выбранный вариант ответа на сервер
    // Например, с помощью fetch API или другой HTTP клиентской библиотеки
    // ...
    console.log('body', JSON.stringify({ choiceIndex }));
    // Пример отправки POST-запроса с использованием fetch API:
    fetch(`${URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choiceIndex }),
    })
      .then((response) => {
        if (response.ok) {
          // Голос успешно отправлен
        } else {
          // Обработка ошибки
        }
      })
      .catch((error) => {
        // Обработка ошибки
      });
  };

  useEffect(() => {
    // Обработчик события для обновления результатов голосования
    socket.on('resultsUpdated', (updatedResults) => {
      setResults(updatedResults);
    });


    // Код очистки при размонтировании компонента
    return () => {
      socket.off('resultsUpdated');
    };
  }, []); // Пустой массив зависимостей, чтобы выполнить эффект только при монтировании


  return (
    <div>
      <div>
        <h2>Голосование</h2>
        {/* Отображение результатов */}
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.choice}: {result.votes} голосов
            </li>
          ))}
        </ul>
        {/* Кнопки для отправки голоса */}
        <button onClick={() => vote(0)}>JavaScript</button>
        <button onClick={() => vote(1)}>Python</button>
        <button onClick={() => vote(2)}>Java</button>
        <button onClick={() => vote(3)}>C++</button>
      </div>
    </div>
  );
}

export default App;
