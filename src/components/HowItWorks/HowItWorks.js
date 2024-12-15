import React from 'react';
import css from './HowItWorks.module.css';
import img1 from '../../media/landing/1.png';
import img2 from '../../media/landing/2.png';
import img3 from '../../media/landing/3.png';

const HowItWorks = () => {
  return (
    <>
      <h2 className={css.title}>Come Funziona?</h2>
      <div className={css.container}>
        <div className={css.steps}>
          {/* Step 1 */}
          <div className={css.step}>
            <img src={img1} alt="Step 1" className={css.image} />
            <p className={css.text}>esplora</p>
          </div>

          <div className={css.arrow}></div>

          {/* Step 2 */}
          <div className={css.step}>
            <img src={img2} alt="Step 2" className={css.image} />
            <p className={css.text}>scegli</p>
          </div>

          <div className={css.arrow}></div>

          {/* Step 3 */}
          <div className={css.step}>
            <img src={img3} alt="Step 3" className={css.image} />
            <p className={`${css.text} ${css.enjoy}`}>en<span style={{color: ' #004494'}}>joy</span></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;


