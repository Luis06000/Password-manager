import React, { useEffect, useRef } from 'react';

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Configuration de l'effet Matrix
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Mettre le canvas en plein écran
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Caractères pour l'effet Matrix (nombres binaires)
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialiser les positions de départ de manière aléatoire
    for (let i = 0; i < columns; i++) {
        // Position initiale aléatoire au-dessus de l'écran
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }

    // Fonction de dessin principale
    function draw() {
        // Fond semi-transparent pour créer l'effet de trace
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Style pour les caractères
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        // Dessiner les caractères
        for (let i = 0; i < drops.length; i++) {
            // Ne dessiner que si la position est positive
            if (drops[i] * fontSize > 0) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                // Variation d'opacité pour plus de dynamisme
                ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.5})`;
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            }

            // Réinitialiser la position quand le caractère atteint le bas
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Vitesse de chute réduite
            drops[i] += Math.random() * 0.5 + 0.5;  // Valeurs réduites pour une chute plus lente
        }
    }

    // Animation
    const interval = setInterval(draw, 33);

    // Nettoyage
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} id="matrix-bg" className="matrix-bg" />;
}

export default MatrixBackground;