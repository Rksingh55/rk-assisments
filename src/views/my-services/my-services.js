import React, { useEffect, useState } from 'react';
import './style.scss'
import BGImage from '../../assets/backgrounds/chat-bg-2.png'
import { MY_SERVICES_LIST } from '../../DB';
import { useTranslation } from 'react-i18next';

const calculateTimeLeft = () => {
  // let year = new Date().getFullYear();
  let difference = +new Date(`6/30/2022`) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
}


export default function ShopPage() {

  const { i18n, t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return <div id='shop-page'>
    <img src={BGImage} alt='background img' />

    <main>
      <h1>{t("titles.my-services")}</h1>
      <section>
        {MY_SERVICES_LIST(i18n.language).map(i => <div>
          <span><i class="far fa-dot-circle"></i></span>
          <p>{i}</p>
        </div>)}
      </section>
      <div id="shop-page-time">
        {timeLeft && <div>
          <p>{timeLeft?.days} D</p>
          <p>{timeLeft?.hours} H</p>
          <p>{timeLeft?.minutes} M</p>
          <p>{timeLeft?.seconds} S</p>
        </div>}
      </div>
    </main>
  </div>
}