import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Clima } from './Clima'



function App() {

  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

 useEffect(() => {
    const detectDeveloperMode = () => {
      const devtools = /./;
      devtools.toString = () => {
        setIsDeveloperMode(true);
        // para mostrar el msj en el log
        console.log(
          '%c⚠️ Modo desarrollador activado',
          'color: white; background-color: red; font-size: 24px; padding: 8px;'
        );
      };
      console.log('%c', devtools);
    };

    detectDeveloperMode();
  }, []);




  return (
   <>
    <div>
       {isDeveloperMode && (
         <div className="developer-mode-ad">
           <p>¡Modo desarrollador activado!</p>
           <p>Este es un anuncio para los desarrolladores.</p>
         </div>
       )}
       {/* Resto del contenido de tu aplicación */}
     </div>
   <Clima />
   </>
  )
}

export default App
