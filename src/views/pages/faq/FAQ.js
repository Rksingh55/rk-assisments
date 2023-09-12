import React, { useState } from 'react';
import './style.scss'
import { FAQ_LIST } from '../../../DB';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AiOutlineDown } from 'react-icons/ai'
import { useTranslation } from 'react-i18next';

export default function SimpleAccordion() {

  const { i18n, t } = useTranslation()

  return (
    <div id="faq-page"> 
      <h1>{t("titles.faq")}</h1>

      <main id="faq-page-list-qna">
        {FAQ_LIST(i18n.language).map((item, index) => {
          return <Accordion key={index}>
            <AccordionSummary
              expandIcon={<AiOutlineDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4 className='faq-page-list-question'>{item.question}</h4>
            </AccordionSummary>
            <AccordionDetails>
              <p className='faq-page-list-answer'>{item.answer}</p>
            </AccordionDetails>
          </Accordion>
        })}
      </main>


    </div>
  );
}




