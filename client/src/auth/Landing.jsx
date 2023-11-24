import { useEffect } from "react";
import liff from '@line/liff';

export function Landing() {
  useEffect(async () => {
    try {
      await liff.init({ liffId: import.meta.env.VITE_LIFF_ID, withLoginOnExternalBrowser:true }); // Replace with your LIFF ID
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const accessToken = liff.getAccessToken();
        // console.log(liff.getProfile());
        show.current.innerHTML = (await liff.getProfile()).userId;
        if (accessToken) {
          console.log('Access Token:', accessToken);
        } else {
          console.error('Access token not available');
        }
      }
    } catch (error) {
      console.error('LIFF initialization failed', error);
    }
  }, []);
    
  return (
    <div className="main-landing">
      <h1>Waiting for Line...</h1>
    </div>
  );
}