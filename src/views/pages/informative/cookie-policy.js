import React from 'react';
import { useTranslation } from 'react-i18next';
import { COOKIE_POLICY_LANG } from '../../../DB'
import './style.scss';

export default function CookiePolicy() {
    const { i18n } = useTranslation();

    return <div className='informative-pgs'>
        <h1 className='title'>{COOKIE_POLICY_LANG(i18n.language, 1)}</h1>
        <p>{COOKIE_POLICY_LANG(i18n.language, 2)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 3)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 4)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 5)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 6)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 7)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 8)}</p>
        <p className='margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 9)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 10)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 11)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 12)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 13)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 14)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 15)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 16)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 17)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 18)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 19)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 20)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 21)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 22)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 23)}</p>
        <p className='third-title margin-top-40'>{COOKIE_POLICY_LANG(i18n.language, 24)}</p>
        <p className='content'>{COOKIE_POLICY_LANG(i18n.language, 25)}</p>
        <p className='margin-top-40'>  {COOKIE_POLICY_LANG(i18n.language, 26)} </p>
        <p className='content '> {COOKIE_POLICY_LANG(i18n.language, 27)}</p>
        <p className='content margin-top-40'> {COOKIE_POLICY_LANG(i18n.language, 28)}</p>
        <p> {COOKIE_POLICY_LANG(i18n.language, 29)}</p>
        <p> {COOKIE_POLICY_LANG(i18n.language, 30)}</p>


    </div >;
}
