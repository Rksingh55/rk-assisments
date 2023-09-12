import React from 'react';
import { useTranslation } from 'react-i18next';
import { PRIVACY_POLICY_LANG } from '../../../DB';
import './style.scss';

export default function PrivacyPolicy() {

    const { i18n } = useTranslation();


    return <div className='informative-pgs'>
        <p className='title'>{PRIVACY_POLICY_LANG(i18n.language, 1)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 2)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 3)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 4)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 5)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 6)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 7)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 8)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 9)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 10)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 11)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 12)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 13)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 14)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 15)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 16)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 17)}</p>
        <p className='margin-top-40 weight-500 content'>{PRIVACY_POLICY_LANG(i18n.language, 18)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 19)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 20)}</p>
        <p className='content'>{PRIVACY_POLICY_LANG(i18n.language, 21)}</p>
        <p className='second-title margin-top-40'>{PRIVACY_POLICY_LANG(i18n.language, 22)}</p>
        <p className='content'>
            <p className='weight-500'>{PRIVACY_POLICY_LANG(i18n.language, 23)}</p>
            {PRIVACY_POLICY_LANG(i18n.language, 24)}
        </p>

    </div >;
}
