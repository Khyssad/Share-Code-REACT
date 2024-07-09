import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import CodeInput from './components/CodeInput';
import ButtonGroup from './components/ButtonGroup';
import UrlList from './components/UrlList';
import './index.css';
import 'animate.css';

const App: React.FC = () => {
  const [nightMode, setNightMode] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const urlID = window.location.href.slice(-3);
    const savedCode = localStorage.getItem(urlID);
    if (savedCode) setCode(savedCode);
    updateUrlList();

    // Appliquer le mode nuit au body
    document.body.classList.toggle('night-mode', nightMode);
  }, [nightMode]);

  const updateUrlList = (): void => {
    const urlList = Object.keys(localStorage)
      .filter(key => key.length === 3)
      .map(key => `${window.location.origin}/${key}`);
    setUrls(urlList);
  };

  const handleCodeChange = (newCode: string): void => {
    const urlID = window.location.href.slice(-3);
    setCode(newCode);
    localStorage.setItem(urlID, newCode);
    updateUrlList();
  };

  const toggleNightMode = (): void => {
    setNightMode(prevMode => !prevMode);
  };

  const copyUrl = (): void => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copiée !!');
      })
      .catch(err => {
        console.error('Erreur lors de la copie de l\'URL:', err);
        alert('Impossible de copier l\'URL. Veuillez la copier manuellement.');
      });
  };

  return (
    <div className={`App ${nightMode ? 'night-mode' : ''}`}>
      <Logo />
      <CodeInput 
        code={code} 
        onChange={handleCodeChange} 
        className="animate__animated animate__fadeInLeftBig animate__delay-1s"
      />
      <ButtonGroup 
        onNightModeToggle={toggleNightMode} 
        onCopyUrl={copyUrl}
        className="animate__animated animate__fadeIn animate__delay-1s"
      />
      <UrlList 
        urls={urls} 
        className="animate__animated animate__fadeIn animate__delay-1s"
      />
    </div>
  );
};

export default App;