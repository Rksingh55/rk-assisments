import React from 'react'
import { Link } from 'react-router-dom';
import { __MAIN_CATEGORIES, __CONTENT_TYPES } from '../../../DB'
import { useTranslation } from 'react-i18next'
import "./style.scss"

export default function SiteMapPage() {
    const { t } = useTranslation();
    window.document.title = "Sitemap";

    return <main id="sitemap">

        <h1>{t("menu.sitemap")}</h1>

        <section>
            <h3>{t("menu.explore")}</h3>
            <div>
                <p><Link to="/">{t("menu.home")}</Link></p>
                {__MAIN_CATEGORIES.map(item => <p><Link to={`/filter/${item.title}`}>{t(`main-categories-info.${item.title}`)}</Link></p>)}
                {__CONTENT_TYPES.map(item => <p><Link to={`/filter/type-${item.title}`}>{t(`content-types.${item.title}`)}</Link></p>)}
            </div>
        </section>

        <section>
            <h3>Stories</h3>
            <div>
                {__MAIN_CATEGORIES.map(item => <p><Link to={`/filter/${item.title}`}>{t(`main-categories-info.${item.title}`)}</Link></p>)}
                {__CONTENT_TYPES.map(item => <p><Link to={`/filter/type-${item.title}`}>{t(`content-types.${item.title}`)}</Link></p>)}
            </div>
        </section>

        <section>
            <h3>Videos</h3>
            <div>
                {__MAIN_CATEGORIES.map(item => <p><Link to={`/filter/${item.title}`}>{t(`main-categories-info.${item.title}`)}</Link></p>)}
                {__CONTENT_TYPES.map(item => <p><Link to={`/filter/type-${item.title}`}>{t(`content-types.${item.title}`)}</Link></p>)}
            </div>
        </section>

        <section>
            <h3>Discussion's</h3>
            <div>
                {__MAIN_CATEGORIES.map(item => <p><Link to={`/what?tag=${item.title}`}>{t(`main-categories-info.${item.title}`)}</Link></p>)}
            </div>
        </section>

    </main>
};