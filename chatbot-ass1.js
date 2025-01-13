document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const faLink = document.createElement('link');
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    faLink.rel = 'stylesheet';
    document.head.appendChild(faLink);

    const chatButton = document.createElement('div');
    const chatBox = document.createElement('div');

    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '30px';
    chatButton.style.right = '30px';
    chatButton.style.width = '80px';
    chatButton.style.height = '80px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.display = 'flex';
    chatButton.style.alignItems = 'center';
    chatButton.style.justifyContent = 'center';
    chatButton.style.cursor = 'pointer';

    const chatIcon = document.createElement('img');
    chatIcon.src = 'https://img.animalaria.cl/general/is-sparkle.png';
    chatIcon.alt = 'Chat';
    chatIcon.style.width = '60px';
    chatIcon.style.height = '60px';
    chatIcon.style.borderRadius = '50%';
    chatIcon.style.backgroundColor = 'white';
    chatIcon.style.padding = '5px';

    chatButton.appendChild(chatIcon);

    chatBox.style.position = 'fixed';
    chatBox.style.bottom = '110px';
    chatBox.style.right = '30px';
    chatBox.style.width = '700px';
    chatBox.style.height = '550px';
    chatBox.style.backgroundColor = '#F9F9F9';
    chatBox.style.border = '1px solid #E0E0E0';
    chatBox.style.borderRadius = '12px';
    chatBox.style.boxShadow = '0px 4px 16px rgba(0, 0, 0, 0.1)';
    chatBox.style.display = 'none';
    chatBox.style.flexDirection = 'column';
    chatBox.style.overflow = 'hidden';
    chatBox.style.fontFamily = "'Poppins', sans-serif";

    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = '#0088cc';
    chatHeader.style.color = '#ffffff';
    chatHeader.style.padding = '15px';
    chatHeader.style.textAlign = 'center';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.borderBottom = '1px solid #E0E0E0';
    chatHeader.style.fontSize = '16px';
    chatHeader.style.fontFamily = "'Poppins', sans-serif";
    chatHeader.textContent = 'Asesor de Ventas';

    const chatBody = document.createElement('div');
    chatBody.style.flex = '1';
    chatBody.style.padding = '15px';
    chatBody.style.overflowY = 'auto';
    chatBody.style.fontSize = '14px';
    chatBody.style.color = '#4A4A4A';
    chatBody.style.fontFamily = "'Poppins', sans-serif";
    chatBody.style.position = 'relative';

    // Estilos personalizados para el scrollbar
    chatBody.style.setProperty('scrollbar-width', 'thin'); // Para navegadores compatibles
    chatBody.style.setProperty('scrollbar-color', '#b3b3b3 #f0f0f0'); // Colores del scrollbar y el fondo

    // Estilos para navegadores WebKit (como Chrome y Safari)
    const style = document.createElement('style');
    style.textContent = `
      div::-webkit-scrollbar {
        width: 8px;
      }
      div::-webkit-scrollbar-thumb {
        background-color: #b3b3b3;
        border-radius: 10px;
      }
      div::-webkit-scrollbar-track {
        background-color: #f0f0f0;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);

    const emptyBackground = document.createElement('div');
    emptyBackground.style.position = 'absolute';
    emptyBackground.style.top = '50%';
    emptyBackground.style.left = '50%';
    emptyBackground.style.transform = 'translate(-50%, -50%)';
    emptyBackground.style.fontSize = '64px';
    emptyBackground.style.color = '#E0E0E0';
    emptyBackground.innerHTML = '<i class="fas fa-comments"></i>';
    chatBody.appendChild(emptyBackground);

    const chatInputContainer = document.createElement('div');
    chatInputContainer.style.display = 'flex';
    chatInputContainer.style.borderTop = '1px solid #E0E0E0';

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.placeholder = 'Escribe un mensaje...';
    chatInput.style.flex = '1';
    chatInput.style.border = 'none';
    chatInput.style.padding = '15px';
    chatInput.style.fontSize = '14px';
    chatInput.style.outline = 'none';
    chatInput.style.fontFamily = "'Poppins', sans-serif";

    chatInput.addEventListener('input', () => {
      if (chatInput.value.length > 100) {
        chatInput.value = chatInput.value.slice(0, 100);
      }
    });

    const chatSendButton = document.createElement('button');
    chatSendButton.textContent = 'Enviar';
    chatSendButton.style.border = 'none';
    chatSendButton.style.backgroundColor = '#0088cc';
    chatSendButton.style.color = '#ffffff';
    chatSendButton.style.padding = '15px';
    chatSendButton.style.cursor = 'pointer';
    chatSendButton.style.fontFamily = "'Poppins', sans-serif";

    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Consultando';
    loadingIndicator.style.display = 'none';
    loadingIndicator.style.textAlign = 'center';
    loadingIndicator.style.marginTop = '10px';
    loadingIndicator.style.color = '#0088cc';
    loadingIndicator.style.fontFamily = "'Poppins', sans-serif";

    chatInputContainer.appendChild(chatInput);
    chatInputContainer.appendChild(chatSendButton);
    chatBox.appendChild(chatHeader);
    chatBox.appendChild(chatBody);
    chatBox.appendChild(loadingIndicator);
    chatBox.appendChild(chatInputContainer);

    chatButton.addEventListener('click', () => {
      chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
      if (chatBox.style.display === 'flex') {
        chatInput.focus();
      }
    });

    let loadingInterval;

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        emptyBackground.style.display = 'none';

        const userMessageBubble = document.createElement('div');
        userMessageBubble.textContent = message;
        userMessageBubble.style.margin = '5px 0';
        userMessageBubble.style.padding = '10px';
        userMessageBubble.style.backgroundColor = '#d1f3ff';
        userMessageBubble.style.borderRadius = '8px';
        chatBody.appendChild(userMessageBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        chatInput.value = '';

        const botMessageBubble = document.createElement('div');
        botMessageBubble.style.margin = '5px 0';
        botMessageBubble.style.padding = '10px';
        botMessageBubble.style.backgroundColor = '#A2D2FF';
        botMessageBubble.style.color = '#4A4A4A';
        botMessageBubble.style.borderRadius = '8px';
        botMessageBubble.style.whiteSpace = 'pre-wrap';
        chatBody.appendChild(botMessageBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        loadingIndicator.style.display = 'block';
        chatInput.disabled = true;
        chatSendButton.disabled = true;

        let dots = '';
        loadingInterval = setInterval(() => {
          dots = dots.length < 3 ? dots + '.' : '';
          loadingIndicator.textContent = `Consultando${dots}`;
        }, 500);

        const source = new EventSource(`https://assistant-ai-mu.vercel.app/v1/ask/assistant?question=${encodeURIComponent(message)}&assistant_id=d3709708-9b11-4b11-83f7-c1ff54428216`);

        let accumulatedText = '';

        source.addEventListener('textDelta', (event) => {
          accumulatedText += event.data;
          const formattedText = accumulatedText.replace(/`/g, '').replace(/html/gi, '');
          botMessageBubble.innerHTML = formattedText;
          chatBody.scrollTop = chatBody.scrollHeight;
        });

        source.addEventListener('end', () => {
          source.close();
          clearInterval(loadingInterval);
          loadingIndicator.style.display = 'none';
          chatInput.disabled = false;
          chatSendButton.disabled = false;
          chatInput.focus();
        });

        source.addEventListener('error', () => {
          const errorMessageBubble = document.createElement('div');
          errorMessageBubble.textContent = 'Error al obtener respuesta';
          errorMessageBubble.style.margin = '5px 0';
          errorMessageBubble.style.padding = '10px';
          errorMessageBubble.style.backgroundColor = '#f8d7da';
          errorMessageBubble.style.color = '#721c24';
          errorMessageBubble.style.borderRadius = '4px';
          chatBody.appendChild(errorMessageBubble);
          chatBody.scrollTop = chatBody.scrollHeight;
          source.close();
          clearInterval(loadingInterval);
          loadingIndicator.style.display = 'none';
          chatInput.disabled = false;
          chatSendButton.disabled = false;
          chatInput.focus();
        });
      }
    };

    chatSendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });

    document.body.appendChild(chatButton);
    document.body.appendChild(chatBox);
  })();
});
